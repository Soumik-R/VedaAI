import { Request, Response } from "express";
import Assignment from "../models/assignment.model";

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      status: "pending",
    });

    // TODO: add queue here (Phase 3)

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
