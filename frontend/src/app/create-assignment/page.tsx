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
    <div className="min-h-screen bg-[#050505] relative overflow-hidden text-zinc-200 py-12 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Ambient background glow */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-3/4 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-10 p-2 sm:p-0">
        <header className="mb-12 space-y-4 text-center sm:text-left pt-6 sm:pt-10">
          <div className="inline-flex items-center gap-3 mb-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-md">
            <div className="h-1.5 w-8 bg-indigo-400 rounded-full shadow-[0_0_8px_theme(colors.indigo.400)]" />
            <span className="text-indigo-300 text-[10px] font-bold tracking-[0.2em] uppercase">Veda AI Engine</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Create Assessment
          </h1>
          <p className="text-lg text-zinc-400 font-medium pl-1">
            Configure parameters to synthesize an instant, intelligent exam paper.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="relative bg-white/[0.02] p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 backdrop-blur-xl overflow-hidden group/form transition-all duration-700 hover:border-white/15 hover:shadow-[0_8px_40px_rgba(99,102,241,0.05)] space-y-8">
          
          {/* Top colored edge accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 transition-opacity duration-500 group-hover/form:opacity-100" />
          
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
              <Calendar className="w-4 h-4 text-indigo-400" /> Target Date
            </label>
            <input
              type="date"
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 transition-all hover:bg-black/60 shadow-inner [color-scheme:dark]"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
              <CheckSquare className="w-4 h-4 text-cyan-400" /> Knowledge Domains
            </label>
            <div className="flex flex-wrap gap-3">
              {QUESTION_TYPES.map((type) => {
                const isSelected = formData.questionTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 border backdrop-blur-sm shadow-sm",
                      isSelected
                        ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-105"
                        : "bg-black/20 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300 hover:bg-white/[0.02]"
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
                <Target className="w-4 h-4 text-purple-400" /> Query Volume
              </label>
              <input
                type="number"
                min="1"
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all hover:bg-black/60 shadow-inner"
                value={formData.numQuestions}
                onChange={(e) => setFormData({ ...formData, numQuestions: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
                <Target className="w-4 h-4 text-emerald-400" /> Weight per Query
              </label>
              <input
                type="number"
                min="1"
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 transition-all hover:bg-black/60 shadow-inner"
                value={formData.marks}
                onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
              <FileText className="w-4 h-4 text-blue-400" /> Custom Directives
            </label>
            <textarea
              rows={4}
              placeholder="e.g., Focus specifically on quantum mechanics entanglement and basic relativity equations..."
              className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all hover:bg-black/60 shadow-inner resize-none placeholder:text-zinc-600 leading-relaxed"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-[13px] font-bold tracking-wide flex items-center gap-3 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_5px_theme(colors.rose.500)]" />
              {error}
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none group"
            >
              {isSubmitting ? (
                 <Loader2 className="w-5 h-5 animate-spin text-black" />
              ) : (
                <>
                  <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" /> Initiate Synthesis
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
