import { QuestionCard } from "./QuestionCard";
import type { Section } from "@/store/useAssignmentStore";

export function SectionCard({ section }: { section: Section }) {
  return (
    <section className="mb-14 break-inside-avoid">
      <div className="bg-zinc-100/60 dark:bg-zinc-900/40 px-5 py-4 rounded-2xl mb-6 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-sm">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">{section.title}</h3>
        {section.instruction && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{section.instruction}</p>
        )}
      </div>
      
      <div className="space-y-1">
        {section.questions.map((q, i) => (
           <QuestionCard key={q._id || i} question={q} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
