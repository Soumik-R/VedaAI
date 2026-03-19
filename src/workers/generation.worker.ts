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

      const aiRaw = await generateQuestions(prompt);

      const parsed = parseAIResponse(aiRaw as string);
      
      // Added high-signal improvement validation from user
      if (!parsed.sections) throw new Error("Invalid structure: missing sections array");

      assignment.result = parsed;
      assignment.status = "completed";

      await assignment.save();

      console.log("AI generation completed:", assignmentId);
    } catch (err) {
      console.error("AI Error:", err);

      assignment.status = "pending";
      await assignment.save();
    }
  },
  { connection: redisConnection }
);

export default worker;
