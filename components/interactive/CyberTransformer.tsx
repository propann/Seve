"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Aperture, Sparkles } from "lucide-react";

export const CyberTransformer: React.FC = () => {
  const [promptStrength, setPromptStrength] = useState(0);
  const [activeStyle, setActiveStyle] = useState<"brut" | "cyber" | "onirique">("brut");

  const styles = {
    brut: { color: "text-gray-400", glow: "shadow-none", label: "Réalité Brute" },
    cyber: { color: "text-cyan-400", glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]", label: "Synthèse Cyber" },
    onirique: { color: "text-purple-400", glow: "shadow-[0_0_20px_rgba(192,132,252,0.5)]", label: "Éveil Onirique" }
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-cyan-500/20 bg-zinc-900 group">
        {/* Base Image Simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
           <motion.div 
             className={`w-32 h-32 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center transition-all duration-1000 ${styles[activeStyle].glow}`}
             animate={{ 
               rotate: promptStrength * 1.8,
               scale: 1 + (promptStrength / 200),
               borderRadius: activeStyle === "onirique" ? "50%" : "8px"
             }}
           >
             {activeStyle === "brut" && <Aperture className="w-12 h-12 text-white/10" />}
             {activeStyle === "cyber" && <Cpu className="w-12 h-12 text-cyan-500/50" />}
             {activeStyle === "onirique" && <Sparkles className="w-12 h-12 text-purple-500/50" />}
           </motion.div>
        </div>

        {/* Latent Noise Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        {/* HUD Data */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 font-mono text-[8px] uppercase tracking-widest">
            <span className="text-cyan-500">Signal: {100 - promptStrength}% Réel</span>
            <span className="text-purple-500">Synthèse: {promptStrength}% Latent</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-4">
        {(["brut", "cyber", "onirique"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setActiveStyle(s)}
            className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
              activeStyle === s 
              ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
              : "bg-white/5 border-white/5 text-white/20 hover:border-white/10"
            }`}
          >
            <Zap className={`w-4 h-4 ${activeStyle === s ? "animate-pulse" : ""}`} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{styles[s].label}</span>
          </button>
        ))}
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-between font-mono text-[9px] text-white/40 uppercase">
            <span>Force du Prompt (Guidance Scale)</span>
            <span className="text-cyan-400">{promptStrength / 10}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={promptStrength} 
          onChange={(e) => setPromptStrength(parseInt(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>
    </div>
  );
};
