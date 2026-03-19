import { Badge } from "./ui/Badge";
import type { Question } from "@/store/useAssignmentStore";

export function QuestionCard({ question, index }: { question: Question; index: number }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-5 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 transition-colors px-3 rounded-xl sm:items-start group">
      <div className="font-semibold text-zinc-400 dark:text-zinc-500 min-w-8 sm:pt-0.5 select-none">Q{index}.</div>
      <div className="flex-1 space-y-3 mt-1 sm:mt-0">
        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-[15px] group-hover:text-black dark:group-hover:text-white transition-colors">{question.text}</p>
        <div className="flex items-center gap-3">
          <Badge variant={question.difficulty}>{question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</Badge>
          <span className="text-xs text-zinc-400 font-medium tracking-wide">[{question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}]</span>
        </div>
      </div>
    </div>
  );
}
