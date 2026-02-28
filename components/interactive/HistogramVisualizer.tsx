"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const HistogramVisualizer: React.FC = () => {
  const [exposure, setExposure] = useState(0);

  // Génère un chemin SVG dynamique pour l'histogramme
  const getPath = () => {
    const shift = exposure * 20;
    return `M 0 100 Q ${20 + shift} ${10 - Math.abs(shift)} ${50 + shift} 80 T 100 100`;
  };

  return (
    <div className="w-full bg-zinc-900/80 p-6 rounded-2xl border border-white/5 font-mono">
      <div className="relative h-32 w-full bg-black rounded-lg overflow-hidden border border-white/10 mb-6">
        {/* Grilles de zones */}
        <div className="absolute inset-0 flex justify-between opacity-10">
          <div className="w-px h-full bg-white" />
          <div className="w-px h-full bg-white" />
          <div className="w-px h-full bg-white" />
          <div className="w-px h-full bg-white" />
        </div>

        {/* L'Histogramme Dynamique */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            d={getPath()}
            fill="url(#grad)"
            stroke="#2ECC71"
            strokeWidth="0.5"
            animate={{ d: getPath() }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2ECC71" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2ECC71" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Alertes d'écrêtage */}
        {exposure > 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 right-2 text-[8px] text-red-500 font-black animate-pulse uppercase">
            ⚠️ Écrêtage Hautes Lumières
          </motion.div>
        )}
        {exposure < -2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 left-2 text-[8px] text-blue-500 font-black animate-pulse uppercase">
            ⚠️ Noirs Bouchés
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-white/40">
          <span>Sous-Ex</span>
          <span className="text-seve">Compensation d'Exposition : {exposure > 0 ? `+${exposure}` : exposure} EV</span>
          <span>Sur-Ex</span>
        </div>
        <input 
          type="range" 
          min="-4" 
          max="4" 
          step="0.1" 
          value={exposure} 
          onChange={(e) => setExposure(parseFloat(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-seve"
        />
      </div>
    </div>
  );
};
