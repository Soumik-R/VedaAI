import { Router } from "express";
import {
  createAssignment,
  getAssignment,
} from "../controllers/assignment.controller";

const router = Router();

router.post("/", createAssignment);
router.get("/:id", getAssignment);

export default router;
