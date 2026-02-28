"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, ShieldAlert, RefreshCcw } from "lucide-react";

/**
 * GLITCH REFINER (B2.C.3)
 * Réinjecte du bruit et des accidents analogiques dans le parfait algorithmique.
 */
export const GlitchRefiner = () => {
  const [glitchLevel, setGlitchLevel] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRefine = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-zinc-950 rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 font-mono">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Entropy Engine v1.0</span>
        </div>
        <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-amberGlow animate-pulse' : 'bg-cyan-500'}`} />
      </div>

      {/* Visualizer Placeholder */}
      <div className="relative aspect-video bg-black rounded-2xl border border-white/5 overflow-hidden group mb-8">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <ShieldAlert className="w-24 h-24 text-cyan-500 group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Animated Glitch Layers */}
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0.5] }}
            className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"
          />
        )}
        
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(34,211,238,${glitchLevel/200}) 2px)`,
            backgroundSize: '100% 3px'
          }}
        />

        <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="px-2 py-1 bg-cyan-500 text-black text-[8px] font-black uppercase">Signal: Corrupted</div>
            <div className="px-2 py-1 bg-white/5 text-white/40 text-[8px] font-black uppercase">Entropy: {glitchLevel}%</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Intensité du Glitch</span>
                <span className="text-cyan-400">{glitchLevel}%</span>
            </div>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={glitchLevel}
                onChange={(e) => setGlitchLevel(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>

        <button 
          onClick={handleRefine}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-[0.2em] ${
            isProcessing 
            ? "bg-white/5 text-white/20 cursor-wait" 
            : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black"
          }`}
        >
          {isProcessing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {isProcessing ? "Infection en cours..." : "Injecter de l'Humanité"}
        </button>
      </div>
    </div>
  );
};
