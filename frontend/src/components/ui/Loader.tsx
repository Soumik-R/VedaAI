import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  text?: string;
  className?: string;
}

export function Loader({ text = "Generating...", className }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4 p-12 text-zinc-500", className)}>
      <Loader2 className="w-10 h-10 animate-spin text-zinc-800 dark:text-zinc-200" />
      <p className="text-sm font-medium animate-pulse">{text}</p>
    </div>
  );
}
