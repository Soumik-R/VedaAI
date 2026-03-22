"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030305]">
      {/* Giant Ambient Mesh Gradient Orbs */}
      
      {/* Top Left - Deep Indigo */}
      <motion.div
        animate={{ x: [0, 150, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none"
      />
      
      {/* Bottom Right - Vivid Purple */}
      <motion.div
        animate={{ x: [0, -150, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"
      />

      {/* Center Top - Cyan Accent */}
      <motion.div
        animate={{ x: [-100, 100, -100], y: [0, 50, 0], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"
      />

      {/* Grid pattern overlay (sleeker, more transparent) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Vignette Edge Darkening */}
      <div className="absolute inset-0 bg-[#030305]/60 max-w-[100vw] [mask-image:radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />
    </div>
  );
}
