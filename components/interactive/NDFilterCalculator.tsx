"use client";

import React, { useState } from "react";
import { Timer, Zap, Calculator, Droplets } from "lucide-react";

/**
 * ND FILTER CALCULATOR (B2.U.3)
 * Calcule le temps de pose final selon la densité du filtre.
 */
export const NDFilterCalculator = () => {
  const [baseShutter, setBaseShutter] = useState(0.008); // 1/125s
  const [ndDensity, setNdDensity] = useState(1000); // ND1000

  const calculateFinalTime = (base: number, density: number) => {
    return base * density;
  };

  const finalTime = calculateFinalTime(baseShutter, ndDensity);

  const formatTime = (time: number) => {
    if (time >= 60) {
      const min = Math.floor(time / 60);
      const sec = Math.round(time % 60);
      return `${min}min ${sec}s`;
    }
    return `${time.toFixed(2)}s`;
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-zinc-950 rounded-3xl border border-yellow-500/10 shadow-xl shadow-yellow-500/5 font-mono">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">Long Exposure Calculator</span>
        </div>
        <Droplets className="w-4 h-4 text-white/10" />
      </div>

      <div className="space-y-8">
        {/* Input Base Shutter */}
        <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                <span>Vitesse de Base (sans filtre)</span>
                <span className="text-white">{(1/baseShutter).toFixed(0)}s⁻¹</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {[0.001, 0.008, 0.04, 0.5].map((val) => (
                    <button 
                        key={val}
                        onClick={() => setBaseShutter(val)}
                        className={`py-2 rounded-lg text-[10px] font-black border transition-all ${
                            baseShutter === val 
                            ? "bg-white/10 border-white/20 text-white" 
                            : "bg-white/2 border-white/5 text-white/20 hover:text-white/40"
                        }`}
                    >
                        {val < 1 ? `1/${Math.round(1/val)}` : `${val}s`}
                    </button>
                ))}
            </div>
        </div>

        {/* Input ND Density */}
        <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                <span>Densité du Filtre (ND)</span>
                <span className="text-yellow-500">ND{ndDensity}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {[8, 64, 500, 1000].map((val) => (
                    <button 
                        key={val}
                        onClick={() => setNdDensity(val)}
                        className={`py-2 rounded-lg text-[10px] font-black border transition-all ${
                            ndDensity === val 
                            ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-500" 
                            : "bg-white/2 border-white/5 text-white/20 hover:text-white/40"
                        }`}
                    >
                        ND{val}
                    </button>
                ))}
            </div>
        </div>

        {/* Result Area */}
        <div className="p-8 bg-black rounded-2xl border border-yellow-500/10 flex flex-col items-center justify-center text-center gap-4 group">
            <Timer className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform duration-500" />
            <div className="space-y-1">
                <span className="block text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Temps de Pose Final</span>
                <span className="text-4xl font-black text-white italic tracking-tighter">{formatTime(finalTime)}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-[8px] font-black text-yellow-500/80 uppercase tracking-widest">Lissage Optimal</span>
            </div>
        </div>
      </div>
    </div>
  );
};
