"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full text-center space-y-10 flex flex-col items-center relative z-10 pt-20 pb-32"
      >
        <motion.div variants={itemVariants} className="relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
          <div className="relative w-24 h-24 bg-black/50 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Sparkles className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-zinc-300 mb-6 group cursor-pointer hover:bg-white/10 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse"></span>
            VedaAI is now in beta
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-400 drop-shadow-sm">
            <span className="block mb-2">Intelligence for</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 animate-gradient-x">
              Education.
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            Instantly generate <strong className="text-zinc-200 font-medium">production-ready</strong> examination papers with state-of-the-art AI. Built for modern institutions.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/create-assignment"
            className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-8 text-base font-semibold text-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            Start Creating
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/about"
            className="inline-flex h-14 items-center justify-center px-8 text-base font-medium text-zinc-300 hover:text-white transition-colors hover:bg-white/5 rounded-full"
          >
            View Documentation
          </Link>
        </motion.div>
        
        {/* Decorative elements simulating UI components */}
        <motion.div 
          variants={itemVariants} 
          className="w-full max-w-5xl mt-20 relative perspective-1000 hidden md:block" // Hid on small screens for performance
        >
           <div className="absolute -inset-4 bg-gradient-to-b from-violet-600/20 to-transparent blur-2xl -z-10 rounded-[3rem]"></div>
           <div className="glass rounded-2xl w-full h-64 border-t border-white/20 shadow-2xl transform rotate-x-12 translate-y-12 overflow-hidden flex flex-col">
              <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 h-4 w-48 bg-white/10 rounded-full"></div>
              </div>
              <div className="p-6 flex-1 flex gap-6">
                 <div className="w-1/4 h-full space-y-4">
                    <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                    <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                    <div className="h-4 w-full bg-white/10 rounded"></div>
                    <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                 </div>
                 <div className="flex-1 h-full bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col gap-4">
                    <div className="h-8 w-1/3 bg-white/10 rounded"></div>
                    <div className="h-32 w-full bg-white/5 rounded"></div>
                 </div>
              </div>
           </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
