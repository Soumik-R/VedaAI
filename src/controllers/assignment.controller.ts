import { Request, Response } from "express";
import Assignment from "../models/assignment.model";
import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

const generateQueue = new Queue("generate-question-paper", { connection: redisConnection });

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      status: "generating", // Setting to generating so UI knows it's working
    });

    await generateQueue.add("generate", { assignmentId: assignment._id });

    res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    res.json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
