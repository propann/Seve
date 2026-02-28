"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Microscope, Layers, Ruler, Focus } from "lucide-react";

/**
 * DOF VISUALIZER (B2.N.2)
 * Simule la réduction drastique de la profondeur de champ en macrophotographie.
 */
export const DOFVisualizer = () => {
  const [distance, setDistance] = useState(10); // Distance en cm (10 à 100)
  const [aperture, setAperture] = useState(2.8); // f/2.8 à f/22

  // Calcul simulé de la zone de netteté (en mm)
  // Plus la distance est petite, plus la zone est fine.
  // Plus l'ouverture est grande (petit chiffre), plus la zone est fine.
  const calculateDOF = (dist: number, f: number) => {
    return (Math.pow(dist, 2) * f) / 1000; 
  };

  const dofWidth = calculateDOF(distance, aperture);
  
  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-zinc-950 rounded-3xl border border-lime-500/20 shadow-2xl shadow-lime-500/5 font-mono">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <Microscope className="w-4 h-4 text-lime-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-400">Micro-Lab v1.0</span>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
                <span className="text-[8px] text-white/20 uppercase">Tranche de netteté</span>
                <span className="text-xs font-black text-white">{dofWidth.toFixed(2)} mm</span>
            </div>
        </div>
      </div>

      {/* Viewport Simulation */}
      <div className="relative h-48 bg-black rounded-2xl border border-white/5 overflow-hidden mb-10 flex items-center justify-center">
        {/* Background (Blurred) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=500')] bg-cover opacity-20 blur-xl" />
        
        {/* Focus Subject Area */}
        <div className="relative z-10 flex items-center gap-8">
            {/* Out of focus (Front) */}
            <div className="w-12 h-12 rounded-full bg-lime-500/10 blur-md border border-lime-500/20" />
            
            {/* SHARP FOCUS POINT */}
            <div className="relative">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-lime-500 blur-2xl opacity-20"
                />
                <div className="w-20 h-20 rounded-xl border-2 border-lime-500 flex items-center justify-center bg-lime-500/5">
                    <Focus className="w-8 h-8 text-lime-400" />
                </div>
                {/* DOF Indicator Line */}
                <motion.div 
                    animate={{ width: Math.max(2, dofWidth * 10) }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 bg-lime-500 shadow-[0_0_10px_#84cc16]"
                />
            </div>

            {/* Out of focus (Back) */}
            <div className="w-12 h-12 rounded-full bg-lime-500/5 blur-lg border border-lime-500/10" />
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
            <Layers className="w-3 h-3 text-lime-500/40" />
            <span className="text-[8px] text-white/40 uppercase">Rapport de grandissement 1:1</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-8">
        <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                <span className="flex items-center gap-2"><Ruler className="w-3 h-3" /> Distance au sujet</span>
                <span className="text-lime-400">{distance} cm</span>
            </div>
            <input 
                type="range" min="10" max="100" value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-lime-500"
            />
        </div>

        <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                <span>Ouverture de Diaphragme</span>
                <span className="text-lime-400">f/{aperture}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {[2.8, 5.6, 11, 22].map((f) => (
                    <button 
                        key={f}
                        onClick={() => setAperture(f)}
                        className={`py-2 rounded-lg text-[10px] font-black border transition-all ${
                            aperture === f 
                            ? "bg-lime-500/20 border-lime-500/40 text-lime-400" 
                            : "bg-white/2 border-white/5 text-white/20 hover:text-white/40"
                        }`}
                    >
                        f/{f}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
