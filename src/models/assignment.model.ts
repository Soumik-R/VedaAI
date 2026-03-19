import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: String,
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
  },
  marks: Number,
});

const SectionSchema = new mongoose.Schema({
  title: String,
  instruction: String,
  questions: [QuestionSchema],
});

const AssignmentSchema = new mongoose.Schema(
  {
    dueDate: Date,
    questionTypes: [String],
    numQuestions: Number,
    marks: Number,
    instructions: String,
    status: {
      type: String,
      enum: ["pending", "generating", "completed"],
      default: "pending",
    },
    result: {
      sections: [SectionSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", AssignmentSchema);
