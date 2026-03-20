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

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-12 px-6 sm:px-12 md:px-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Section */}
        <header className="mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-black dark:text-white">Examination Paper</h1>
              <p className="text-zinc-500 font-medium">Auto-generated Assessment • {assignment.dueDate.split("T")[0]}</p>
            </div>
            
            {assignment.status === "generating" && (
              <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 px-5 py-2.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm animate-pulse">
                <Loader text="AI is generating..." className="p-0 space-y-0 flex-row gap-3 [&>svg]:w-[18px] [&>svg]:h-[18px] [&>p]:text-sm [&>p]:font-bold" />
              </div>
            )}
            
            {assignment.status === "completed" && (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 text-sm font-bold tracking-wide uppercase shadow-sm">
                Ready for Print
              </div>
            )}
            
            {assignment.status === "pending" && (
              <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-bold tracking-wide uppercase shadow-sm">
                Pending Server Job
              </div>
            )}
          </div>
          
          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm font-medium mt-10">
            <div className="flex flex-col gap-3">
              <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase text-[11px] tracking-widest">Candidate Name</span>
              <div className="h-10 border-b-2 border-dashed border-zinc-300 dark:border-zinc-800"></div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase text-[11px] tracking-widest">Roll Number</span>
              <div className="h-10 border-b-2 border-dashed border-zinc-300 dark:border-zinc-800"></div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase text-[11px] tracking-widest">Section / Group</span>
              <div className="h-10 border-b-2 border-dashed border-zinc-300 dark:border-zinc-800"></div>
            </div>
          </div>
        </header>

        {/* Instructions */}
        {assignment.instructions && (
          <div className="mb-14 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h4 className="font-bold text-sm uppercase tracking-wider text-black dark:text-white mb-3">General Instructions</h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{assignment.instructions}</p>
          </div>
        )}

        {/* Sections */}
        {assignment.status === "completed" && assignment.result?.sections ? (
          <main className="space-y-12 animate-in fade-in duration-1000">
            {assignment.result.sections.map((section, idx) => (
              <SectionCard key={section._id || idx} section={section} />
            ))}
            
            <div className="py-20 text-center flex flex-col items-center justify-center">
               <div className="w-16 h-px bg-zinc-300 dark:bg-zinc-700 mb-6" />
               <p className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase">End of Assessment</p>
            </div>
          </main>
        ) : assignment.status === "generating" ? (
          <div className="py-32 flex flex-col items-center justify-center text-center opacity-80 backdrop-blur-sm">
             <div className="bg-white/50 dark:bg-black/50 p-12 rounded-3xl">
               <Loader text="Analyzing requirements and generating question paper..." className="scale-125" />
             </div>
          </div>
        ) : (
          <div className="py-32 text-center text-zinc-500 font-medium">
             Waiting for processor. Status: {assignment.status}
          </div>
        )}

      </div>
    </div>
  );
}
