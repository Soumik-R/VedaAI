import { create } from "zustand";

export interface Question {
  _id?: string;
  text: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  options?: string[];
}

export interface Section {
  _id?: string;
  title: string;
  instruction: string;
  questions: Question[];
}

export interface Assignment {
  _id: string;
  dueDate: string;
  questionTypes: string[];
  numQuestions: number;
  marks: number;
  instructions: string;
  status: "pending" | "generating" | "completed" | "failed";
  result?: {
    sections: Section[];
  };
}

interface AssignmentStore {
  assignment: Assignment | null;
  isLoading: boolean;
  isConnected: boolean;
  setAssignment: (assignment: Assignment | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsConnected: (connected: boolean) => void;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignment: null,
  isLoading: false,
  isConnected: false,
  setAssignment: (assignment) => set({ assignment }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsConnected: (isConnected) => set({ isConnected }),
}));
