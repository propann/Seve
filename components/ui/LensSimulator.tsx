"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, ScanLine } from "lucide-react";

/**
 * LENS SIMULATOR : Comprendre la réfraction et le focus
 */
export const LensSimulator = () => {
  const [focus, setFocus] = useState(50); // Position de la lentille

  // Le flou est minimal quand focus est proche de 70 (foyer simulé)
  const blurAmount = Math.abs(focus - 70) / 5;

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 my-20 relative overflow-hidden group">
      <div className="flex flex-col items-center gap-10">
        <div className="text-center space-y-2">
            <h4 className="text-xs font-black text-seve uppercase tracking-[0.4em]">Simulateur de Foyer Optique</h4>
            <p className="text-[10px] text-textMain/40 uppercase italic">Déplacez la lentille pour faire converger la lumière</p>
        </div>

        {/* Zone de Visualisation */}
        <div className="relative w-full h-64 bg-black/40 rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-around px-20">
                {/* Objet source */}
                <div className="w-12 h-12 bg-amberGlow/20 border border-amberGlow/40 rounded-lg flex items-center justify-center animate-pulse">
                    <Target className="text-amberGlow w-6 h-6" />
                </div>

                {/* La Lentille mobile */}
                <motion.div 
                    animate={{ x: (focus - 50) * 2 }}
                    className="w-4 h-32 bg-seve/20 border-x-2 border-seve rounded-full relative z-20 backdrop-blur-sm cursor-ew-resize"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-seve rounded-full" />
                </motion.div>

                {/* Le Capteur (Image finale) */}
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <motion.div
                        animate={{ filter: `blur(${blurAmount}px)`, scale: 1.5 - (blurAmount / 10) }}
                        className="text-amberGlow"
                    >
                        <Target className="w-10 h-10" />
                    </motion.div>
                    <ScanLine className="absolute inset-0 w-full h-full text-white/5 pointer-events-none" />
                </div>
            </div>

            {/* Rayons de lumière simulés */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line x1="20%" y1="50%" x2={`${focus}%`} y2="50%" stroke="#F1C40F" strokeWidth="1" />
                <line x1={`${focus}%`} y1="50%" x2="80%" y2="50%" stroke="#2ECC71" strokeWidth="1" />
            </svg>
        </div>

        {/* Contrôle */}
        <input 
            type="range" min="0" max="100" value={focus}
            onChange={(e) => setFocus(parseInt(e.target.value))}
            className="w-full max-w-md h-1 bg-white/10 rounded-full appearance-none accent-seve cursor-pointer"
        />
        
        <div className="flex justify-between w-full max-w-md text-[8px] font-black text-white/20 uppercase tracking-widest">
            <span>Divergence</span>
            <span className={blurAmount < 1 ? "text-seve animate-pulse" : ""}>Convergence (Focus)</span>
            <span>Divergence</span>
        </div>
      </div>
    </div>
  );
};
