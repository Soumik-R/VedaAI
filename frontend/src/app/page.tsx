"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, BrainCircuit, Network } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative text-zinc-200">
      
      {/* Subtle top light ray */}
      <div className="absolute top-0 inset-x-0 h-[30vh] bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent pointer-events-none blur-2xl" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl w-full text-center space-y-12 flex flex-col items-center relative z-10 pt-20 pb-32"
      >
        <motion.div variants={itemVariants} className="relative group perspective-1000 cursor-default">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition duration-700 animate-spin-slow"></div>
          <div className="relative w-28 h-28 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-500/50">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <BrainCircuit className="w-12 h-12 text-indigo-100 drop-shadow-[0_0_15px_rgba(165,180,252,0.8)]" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs font-bold tracking-[0.2em] uppercase text-zinc-300 mb-4 group cursor-pointer hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_theme(colors.cyan.400)] animate-pulse"></span>
            Veda AI Framework v2.0
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-300 transition-colors ml-1" />
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 drop-shadow-xl p-2 leading-[1.1]">
            <span className="block mb-2">Automated</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 animate-gradient-x drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              Intelligence.
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Instantly synthesize <strong className="text-white">production-grade</strong> knowledge assessments with state-of-the-art neural generation. Built specifically for elite educators.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto sm:max-w-none">
          <Link
            href="/create-assignment"
            className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white px-10 text-[15px] font-black uppercase tracking-[0.1em] text-black overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.7)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            Initialize Engine
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          
          <Link
            href="/about"
            className="group inline-flex h-16 w-full sm:w-auto items-center justify-center px-10 text-[13px] font-bold uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-all hover:bg-white/[0.05] rounded-full border border-transparent hover:border-white/10"
          >
            View Architecture
            <Network className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>
        
        {/* Abstract 3D UI Simulation */}
        <motion.div 
          variants={itemVariants} 
          className="w-full max-w-6xl mt-28 relative perspective-[2000px] hidden md:block" 
        >
           <div className="absolute -inset-10 bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl -z-10 rounded-[3rem] pointer-events-none"></div>
           
           <div className="glass rounded-[2rem] w-full h-[400px] bg-black/40 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl transform rotate-x-[15deg] translate-y-12 overflow-hidden flex flex-col relative group">
              
              {/* Animated scanning line over UI visualizer */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan z-20" />
              <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent z-10 pointer-events-none" />

              {/* Fake Window Header */}
              <div className="h-14 border-b border-white/10 bg-white/[0.02] flex items-center px-6 gap-3 z-20">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.3)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.3)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                <div className="ml-auto h-6 w-64 bg-black/50 border border-white/10 rounded-full flex items-center justify-center px-3">
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest">veda.engine.host</span>
                </div>
              </div>

              {/* Fake Dashboard Elements */}
              <div className="p-8 flex-1 flex gap-8 z-10 relative">
                 <div className="w-1/4 h-full space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="h-3 w-1/2 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="h-2 w-3/4 bg-white/[0.05] rounded-full"></div>
                    <div className="h-2 w-1/2 bg-white/[0.05] rounded-full"></div>
                    <div className="h-2 w-full bg-white/[0.05] rounded-full"></div>
                    <div className="h-2 w-5/6 bg-white/[0.05] rounded-full"></div>
                 </div>
                 
                 <div className="flex-1 h-full bg-black/50 rounded-2xl border border-white/[0.05] p-6 flex flex-col gap-6 relative overflow-hidden group/card shadow-inner">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                      <Network className="w-24 h-24 text-indigo-400" />
                    </div>
                    
                    <div className="flex justify-between items-center w-full">
                      <div className="h-6 w-1/3 bg-white/10 rounded-md"></div>
                      <div className="h-6 w-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full"></div>
                    </div>
                    <div className="flex-1 w-full bg-gradient-to-b from-white/[0.03] to-transparent rounded-xl border border-white/[0.02]"></div>
                 </div>
              </div>
           </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
