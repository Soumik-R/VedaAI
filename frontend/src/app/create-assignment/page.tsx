"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Plus, Calendar, FileText, CheckSquare, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTION_TYPES = ["MCQ", "Short Answer", "Long Answer", "True/False", "Fill in the Blanks"];

export default function CreateAssignment() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    dueDate: "",
    questionTypes: [] as string[],
    numQuestions: 10,
    marks: 5,
    instructions: "",
  });

  const toggleType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(type)
        ? prev.questionTypes.filter((t) => t !== type)
        : [...prev.questionTypes, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.dueDate) return setError("Please select a due date.");
    if (formData.questionTypes.length === 0) return setError("Please select at least one question type.");
    if (formData.numQuestions <= 0) return setError("Number of questions must be positive.");
    if (formData.marks <= 0) return setError("Marks must be positive.");

    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:5000/api/assignments", formData);
      if (res.data.success) {
        router.push(`/assignment/${res.data.data._id}`);
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to create assignment");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 flex flex-col pt-16 sm:pt-24 pb-12 px-6">
      <div className="max-w-2xl w-full mx-auto">
        <div className="mb-10 space-y-3 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight">Create AI Assessment</h1>
          <p className="text-lg text-zinc-500 font-medium">Configure parameters to generate an instant exam paper.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-950 p-8 sm:p-10 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800/80 space-y-8">
          
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
              <Calendar className="w-4 h-4 text-zinc-400" /> Due Date
            </label>
            <input
              type="date"
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
              <CheckSquare className="w-4 h-4 text-zinc-400" /> Question Types
            </label>
            <div className="flex flex-wrap gap-2">
              {QUESTION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    formData.questionTypes.includes(type)
                      ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                      : "bg-transparent text-zinc-600 border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                <Target className="w-4 h-4 text-zinc-400" /> Total Questions
              </label>
              <input
                type="number"
                min="1"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                value={formData.numQuestions}
                onChange={(e) => setFormData({ ...formData, numQuestions: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                <Target className="w-4 h-4 text-zinc-400" /> Marks per Question
              </label>
              <input
                type="number"
                min="1"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                value={formData.marks}
                onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-200">
              <FileText className="w-4 h-4 text-zinc-400" /> Optional Instructions
            </label>
            <textarea
              rows={4}
              placeholder="e.g., Focus on quantum mechanics principles..."
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            />
          </div>

          {error && <div className="p-4 bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 rounded-xl text-sm font-medium">{error}</div>}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5" /> Generate Assessment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
