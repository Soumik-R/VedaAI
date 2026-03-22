"use client";

import Link from "next/link";
import { ArrowLeft, Server, Database, BrainCircuit, Activity, Shield, Cpu } from "lucide-react";

export default function AboutArchitecture() {
  return (
    <main className="min-h-screen relative flex flex-col items-center py-20 px-4 sm:px-6 md:px-12 text-zinc-200 overflow-hidden">
      
      {/* Subtle top light ray */}
      <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent pointer-events-none blur-3xl z-[-1]" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-[-1]" />

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Navigation */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Terminal
        </Link>
        
        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-md">
            <div className="h-1.5 w-8 bg-purple-400 rounded-full shadow-[0_0_8px_theme(colors.purple.400)]" />
            <span className="text-purple-300 text-[10px] font-bold tracking-[0.2em] uppercase">System Overview</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-xl mb-6">
            Veda Architecture.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl font-medium">
            A high-performance, containerized environment designed to map raw educational directives into structured, neural-generated assessment schemas.
          </p>
        </header>

        {/* System Diagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Animated connection lines (background) */}
          <div className="absolute inset-0 border border-white/[0.03] rounded-[2rem] -z-10 bg-black/20" />

          {/* Core Engine Node */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-indigo-500/50 hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Neural AI Engine</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Powered by advanced LLM endpoints (Gemini 2.5). The worker cluster processes highly restrictive JSON prompts to strictly regulate formatting, difficulty matrices, and deterministic output structuring.
            </p>
          </div>

          {/* Database Node */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-emerald-500/50 hover:bg-white/[0.04] transition-all duration-500 group mt-0 md:mt-12">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
              <Database className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Data Persistence Layer</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              NoSQL Document storage (MongoDB) enforcing flexible yet validated schemas. Tracks state transitions across the worker pipeline from `pending` tracking to `completed` assessment states.
            </p>
          </div>

          {/* Redis / BullMQ Node */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-rose-500/50 hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(244,63,94,0.1)] group-hover:scale-110 group-hover:bg-rose-500/20 transition-all duration-300">
              <Activity className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Background Queues</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Implemented using BullMQ and Redis. The web backend offloads all heavy API inferences to independent worker nodes, preventing thread blocks and guaranteeing resilient retries for rate-limited requests.
            </p>
          </div>

          {/* Client Node */}
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-cyan-500/50 hover:bg-white/[0.04] transition-all duration-500 group mt-0 md:mt-12">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Client Interface</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Next.js 15 Client rendering engine integrated with Zustand state management. The UI utilizes strict hardware-accelerated Framer Motion physics and glassmorphic spatial rendering.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
