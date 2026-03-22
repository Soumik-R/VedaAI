import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import Assignment from "../models/assignment.model";
import { buildPrompt } from "../services/prompt.service";
import { generateQuestions } from "../services/ai.service";
import { parseAIResponse } from "../utils/parser";
import mongoose from "mongoose";

// The worker needs to connect to MongoDB to fetch and save Assignments
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("Worker connected to MongoDB"))
  .catch((err) => console.error("Worker MongoDB error", err));

const worker = new Worker(
  "generate-question-paper",
  async (job) => {
    const { assignmentId } = job.data;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return;

    try {
      console.log(`Generating questions for assignment: ${assignmentId}`);
      const prompt = buildPrompt(assignment);

      // Hard timeout for Gemini API (20 seconds)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("AI Generation Timeout")), 20000)
      );

      const aiRaw = (await Promise.race([
        generateQuestions(prompt),
        timeoutPromise,
      ])) as string;

      console.log("RAW AI Response received:", aiRaw.substring(0, 100) + "...");

      const parsed = parseAIResponse(aiRaw);
      
      if (!parsed.sections) throw new Error("Invalid structure: missing sections array");

      assignment.result = parsed;
      assignment.status = "completed";

      await assignment.save();

      console.log("AI generation completed:", assignmentId);
      return { assignmentId }; // Emit to queue events listener
    } catch (err: any) {
      console.error("AI Error:", err?.message || err);

      (assignment as any).status = "failed";
      assignment.result = {
        sections: [] as any,
        error: "AI generation failed",
      };
      await assignment.save();

      // Even if it fails, return the assignment ID so the frontend WebSocket
      // updates and stops the "Generating..." loading spinner!
      return { assignmentId, error: true };
    }
  },
  { connection: redisConnection }
);

export default worker;
