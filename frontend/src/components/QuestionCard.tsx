
import type { Question } from "@/store/useAssignmentStore";

export function QuestionCard({ question, index }: { question: Question; index: number }) {
  return (
    <div className="relative flex flex-col sm:flex-row gap-5 py-6 px-5 sm:px-6 bg-transparent border border-zinc-800/40 hover:border-zinc-700/80 hover:bg-white/[0.02] transition-all duration-300 rounded-2xl group overflow-hidden">
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="font-mono text-lg font-bold text-zinc-600 group-hover:text-indigo-400 transition-colors min-w-10 pt-1 select-none">
        {index < 10 ? `0${index}` : index}.
      </div>
      
      <div className="flex-1 space-y-4 relative z-10 mt-1 sm:mt-0">
        <p className="text-zinc-300 leading-relaxed text-[16px] group-hover:text-white transition-colors">{question.text}</p>
        
        {question.options && question.options.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 mb-2">
            {question.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              return (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-zinc-800/60 bg-white/[0.01] hover:bg-white/[0.04] hover:border-zinc-700 transition-all group/opt">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-xs font-bold text-zinc-400 group-hover/opt:bg-indigo-500/20 group-hover/opt:text-indigo-400 transition-colors shrink-0">
                    {letter}
                  </span>
                  <span className="text-sm text-zinc-400 group-hover/opt:text-zinc-200 transition-colors pt-0.5">
                    {opt}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="flex items-center gap-4 pt-2">
          {question.difficulty === 'easy' && (
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">Easy</div>
          )}
          {question.difficulty === 'medium' && (
            <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.1)]">Medium</div>
          )}
          {question.difficulty === 'hard' && (
            <div className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(225,29,72,0.1)]">Hard</div>
          )}
          
          <div className="h-4 w-px bg-zinc-700" />
          
          <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
          </span>
        </div>
      </div>
    </div>
  );
}
