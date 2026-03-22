"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { socket } from "@/socket";
import { useAssignmentStore, Assignment } from "@/store/useAssignmentStore";
import { SectionCard } from "@/components/SectionCard";
import { Loader } from "@/components/ui/Loader";

export default function AssignmentOutput() {
  const params = useParams();
  const assignmentId = params.id as string;

  const { assignment, isLoading, setAssignment, setIsLoading } = useAssignmentStore();

  const fetchAssignment = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<{ success: boolean; data: Assignment }>(`http://localhost:5000/api/assignments/${assignmentId}`);
      if (res.data.success) {
        setAssignment(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch assignment:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!assignmentId) return;

    fetchAssignment();

    socket.emit("join-assignment", assignmentId);

    const handleGenerated = (data: { assignmentId: string }) => {
      console.log("WebSocket: Assignment generated!", data);
      fetchAssignment();
    };

    socket.on("assignment:generated", handleGenerated);

    return () => {
      socket.off("assignment:generated", handleGenerated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId]);

  if (isLoading && !assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <Loader text="Loading assessment details..." />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black text-rose-500 gap-2">
         <span className="text-xl font-bold">Assessment not found</span>
         <span className="text-zinc-500">ID: {assignmentId}</span>
      </div>
    );
  }

  if (assignment.status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black text-rose-500 gap-4">
         <span className="text-2xl font-bold">Generation Failed</span>
         <span className="text-zinc-500">The AI encountered an error while generating this assessment. Please try again.</span>
         <button 
           onClick={() => window.location.href = "/"}
           className="mt-4 px-6 py-2 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-full font-medium hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-colors"
         >
           Go Back Home
         </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden text-zinc-200 py-12 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Ambient background glow */}
      <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-indigo-900/20 via-blue-900/10 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        
        {/* Futuristic Header Card */}
        <header className="relative bg-white/[0.02] border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl rounded-3xl p-8 md:p-10 overflow-hidden">
          {/* Top colored edge accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1.5 w-8 bg-cyan-400 rounded-full shadow-[0_0_8px_theme(colors.cyan.400)]" />
                <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Veda AI Framework</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 drop-shadow-md">
                Examination Paper
              </h1>
              <p className="text-zinc-400 font-medium tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> Auto-generated Assessment <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> {assignment.dueDate.split("T")[0]}
              </p>
            </div>
            
            {assignment.status === "generating" && (
              <div className="flex items-center gap-3 bg-indigo-500/10 text-indigo-300 px-6 py-2.5 rounded-full border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] animate-pulse will-change-transform">
                <Loader text="AI Engine Generating..." className="p-0 space-y-0 flex-row gap-3 [&>svg]:w-[18px] [&>svg]:h-[18px] [&>p]:text-[13px] [&>p]:font-bold [&>p]:tracking-widest [&>p]:uppercase" />
              </div>
            )}
            
            {assignment.status === "completed" && (
              <div className="bg-emerald-500/10 text-emerald-400 px-5 py-2.5 rounded-full border border-emerald-500/30 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_theme(colors.emerald.400)] animate-pulse" />
                Ready for Print
              </div>
            )}
            
            {assignment.status === "pending" && (
              <div className="bg-zinc-800/50 text-zinc-300 px-5 py-2.5 rounded-full border border-zinc-700/50 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="animate-spin text-lg leading-none">⚙</span>
                Pending Job
              </div>
            )}
          </div>
          
          {/* Student Info Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 pt-8 border-t border-white/5">
            <div className="flex flex-col gap-2 group">
              <span className="text-zinc-500 font-semibold uppercase text-[10px] tracking-[0.2em] transition-colors group-hover:text-cyan-400">Candidate Name</span>
              <div className="h-8 border-b border-dashed border-zinc-700 transition-colors group-hover:border-cyan-500/50"></div>
            </div>
            <div className="flex flex-col gap-2 group">
              <span className="text-zinc-500 font-semibold uppercase text-[10px] tracking-[0.2em] transition-colors group-hover:text-purple-400">Registration ID</span>
              <div className="h-8 border-b border-dashed border-zinc-700 transition-colors group-hover:border-purple-500/50"></div>
            </div>
            <div className="flex flex-col gap-2 group">
              <span className="text-zinc-500 font-semibold uppercase text-[10px] tracking-[0.2em] transition-colors group-hover:text-indigo-400">Section / Group</span>
              <div className="h-8 border-b border-dashed border-zinc-700 transition-colors group-hover:border-indigo-500/50"></div>
            </div>
          </div>
        </header>

        {/* Dynamic Instructions Panel */}
        {assignment.instructions && (
          <div className="relative bg-black/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-lg overflow-hidden group hover:border-zinc-700 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 3.8l7.5 15H4.5L12 5.8z"/>
              </svg>
            </div>
            <h4 className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-[0.25em] text-white mb-4">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_theme(colors.blue.500)]" />
               System Directives
            </h4>
            <p className="text-zinc-400 text-sm leading-8 font-light tracking-wide whitespace-pre-wrap pl-3.5 border-l border-zinc-800">
              {assignment.instructions}
            </p>
          </div>
        )}

        {/* Paper Sections Container */}
        {assignment.status === "completed" && assignment.result?.sections ? (
          <main className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {assignment.result.sections.map((section, idx) => (
              <SectionCard key={section._id || idx} section={section} />
            ))}
            
            <div className="py-24 text-center flex flex-col items-center justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
               <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-8" />
               <p className="text-xs font-bold tracking-[0.3em] text-zinc-600 uppercase">End of Documentation</p>
            </div>
          </main>
        ) : assignment.status === "generating" ? (
          <div className="py-40 flex flex-col items-center justify-center text-center relative z-20">
             <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />
             <div className="bg-white/[0.03] border border-white/10 p-16 rounded-[2rem] shadow-2xl backdrop-blur-md relative overflow-hidden">
               <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(transparent,theme(colors.indigo.500/0.1),transparent)] animate-spin" style={{ animationDuration: '4s' }} />
               <div className="relative z-10">
                 <Loader text="Synthesizing Knowledge Blocks..." className="scale-125 [&>svg]:text-indigo-400 [&>p]:text-indigo-200" />
               </div>
             </div>
          </div>
        ) : (
          <div className="py-32 text-center text-zinc-600 font-medium font-mono uppercase tracking-widest text-sm flex flex-col items-center gap-4">
             <div className="w-8 h-8 rounded-full border border-dashed border-zinc-600 animate-spin" style={{ animationDuration: '3s' }} />
             Waiting for execution. State: {assignment.status}
          </div>
        )}

      </div>
    </div>
  );
}

