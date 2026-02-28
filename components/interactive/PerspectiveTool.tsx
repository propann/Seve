"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Move, Check, RotateCcw, Building2 } from "lucide-react";

/**
 * PERSPECTIVE TOOL (B2.U.3)
 * Simulateur de correction de perspective (Tilt-Shift Digital).
 */
export const PerspectiveTool = () => {
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const reset = () => {
    setSkewX(0);
    setSkewY(0);
    setIsDone(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-zinc-950 rounded-3xl border border-yellow-500/20 shadow-2xl shadow-yellow-500/5 font-mono">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="w-4 h-4 text-yellow-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500">Tilt-Shift Engine v1.0</span>
        </div>
        <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
      </div>

      {/* Visualizer */}
      <div className="relative aspect-[4/3] bg-black rounded-2xl border border-white/5 overflow-hidden mb-8 flex items-center justify-center">
        {/* Grille de référence */}
        <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border border-white/20" />
          ))}
        </div>

        {/* Building Simulation */}
        <motion.div 
          animate={{ 
            skewX: `${skewX}deg`,
            skewY: `${skewY}deg`
          }}
          className="w-32 h-48 bg-yellow-500/10 border-2 border-yellow-500/40 relative"
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-2 p-4">
             {[...Array(12)].map((_, i) => (
               <div key={i} className="bg-yellow-500/20 rounded-sm" />
             ))}
          </div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-yellow-500" />
        </motion.div>

        <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="px-2 py-1 bg-yellow-500 text-black text-[8px] font-black uppercase tracking-tighter">Verticality: {100 - Math.abs(skewX)}%</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                    <span>Axe Horizontal (Skew X)</span>
                    <span className="text-yellow-500">{skewX}°</span>
                </div>
                <input 
                    type="range" min="-20" max="20" value={skewX}
                    onChange={(e) => setSkewX(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                    <span>Axe Vertical (Skew Y)</span>
                    <span className="text-yellow-500">{skewY}°</span>
                </div>
                <input 
                    type="range" min="-20" max="20" value={skewY}
                    onChange={(e) => setSkewY(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
            </div>
        </div>

        <div className="flex gap-4">
            <button 
                onClick={reset}
                className="flex-1 py-4 rounded-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase"
            >
                <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button 
                onClick={() => setIsDone(true)}
                className="flex-[2] py-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase"
            >
                {isDone ? <Check className="w-3 h-3" /> : <Move className="w-3 h-3" />}
                {isDone ? "Perspective Alignée" : "Fixer la Géométrie"}
            </button>
        </div>
      </div>
    </div>
  );
};
