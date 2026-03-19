import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <div className="max-w-3xl w-full text-center space-y-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-black dark:bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-4">
          <BookOpen className="w-10 h-10 text-white dark:text-black" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-black dark:text-white">
          VedaAI
        </h1>

        <p className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          The intelligent platform for instantly generating production-ready examination papers.
        </p>

        <div className="pt-8">
          <Link
            href="/create-assignment"
            className="group inline-flex h-16 items-center justify-center gap-3 rounded-full bg-black dark:bg-white px-8 text-lg font-bold text-white dark:text-black transition-all hover:scale-105 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95"
          >
            Create Assessment
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
