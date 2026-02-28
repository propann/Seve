"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const FocalSimulator: React.FC = () => {
  const [focal, setFocal] = useState(50);

  // Simulation visuelle simplifiée : le "zoom" affecte la taille du sujet
  // et la "compression" affecte le flou et la proximité perçue de l'arrière-plan.
  const getScale = () => (focal / 50) * 1.5;
  const getBgScale = () => 1 + (focal / 400) * 0.5;
  const getBlur = () => (focal > 85 ? (focal - 85) / 20 : 0);

  return (
    <div className="w-full bg-black/40 p-6 rounded-3xl border border-white/5 overflow-hidden">
      <div className="relative h-64 w-full rounded-2xl bg-zinc-800 overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
        
        {/* ARRIÈRE-PLAN (Compression) */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-900 opacity-40 flex items-center justify-center"
          animate={{ scale: getBgScale(), filter: `blur(${getBlur()}px)` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="grid grid-cols-4 gap-4 w-[200%] h-[200%] opacity-20">
             {[...Array(16)].map((_, i) => (
               <div key={i} className="border border-white/20 rounded-lg aspect-square" />
             ))}
          </div>
        </motion.div>

        {/* SUJET (Magnification) */}
        <motion.div
          className="relative z-10 w-24 h-24 bg-sky-500/80 rounded-full border-2 border-white shadow-[0_0_30px_rgba(14,165,233,0.4)]"
          animate={{ scale: getScale() }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-white font-black text-[8px] uppercase tracking-tighter">
            SUJET
          </div>
        </motion.div>
        
        {/* OVERLAY INFOS */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] font-black text-sky-400 tracking-widest uppercase italic">
            Perspective : {focal < 35 ? 'Immersive' : focal > 85 ? 'Compressée' : 'Standard'}
          </span>
        </div>
      </div>

      <div className="mt-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
            Longueur Focale : <span className="text-sky-400">{focal}mm</span>
          </label>
          <div className="flex gap-2">
            {[24, 35, 50, 85, 200].map(val => (
                <button 
                    key={val} 
                    onClick={() => setFocal(val)}
                    className={`text-[8px] font-black px-2 py-1 rounded border transition-all ${focal === val ? 'bg-sky-500 border-sky-400 text-white' : 'border-white/10 text-white/20 hover:border-white/30'}`}
                >
                    {val}mm
                </button>
            ))}
          </div>
        </div>
        
        <input 
          type="range" 
          min="14" 
          max="400" 
          step="1" 
          value={focal} 
          onChange={(e) => setFocal(parseInt(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
        
        <div className="flex justify-between mt-2 text-[8px] font-bold text-white/20 uppercase tracking-widest">
          <span>Grand Angle</span>
          <span>Standard</span>
          <span>Téléobjectif</span>
        </div>
      </div>
    </div>
  );
};
