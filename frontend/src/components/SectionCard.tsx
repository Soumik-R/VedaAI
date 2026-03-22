import { QuestionCard } from "./QuestionCard";
import type { Section } from "@/store/useAssignmentStore";

export function SectionCard({ section }: { section: Section }) {
  return (
    <section className="mb-16 break-inside-avoid relative">
      <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/50 via-transparent to-transparent hidden md:block" />
      
      <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-md px-6 py-5 rounded-3xl mb-8 group overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-600 rounded-l-3xl opacity-80" />
        <h3 className="text-2xl font-black tracking-tight text-white mb-2 ml-2 flex items-center gap-3">
          {section.title}
        </h3>
        {section.instruction && (
          <p className="text-[13px] text-zinc-400 font-medium uppercase tracking-widest ml-2 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-600"></span>
            {section.instruction}
          </p>
        )}
      </div>
      
      <div className="space-y-4 md:pl-2">
        {section.questions.map((q, i) => (
           <QuestionCard key={q._id || i} question={q} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
