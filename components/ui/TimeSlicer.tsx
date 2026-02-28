"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Clock } from "lucide-react";

/**
 * TIME SLICER : Découper l'instant dans le flux du temps
 */
export const TimeSlicer = () => {
  const [frame, setFocus] = useState(50);

  // Simulation de décomposition de mouvement
  const frames = [
    { pos: 10, label: "L'Avant", opacity: frame < 30 ? 1 : 0.1 },
    { pos: 50, label: "L'Instant T", opacity: frame >= 30 && frame <= 70 ? 1 : 0.1 },
    { pos: 90, label: "L'Après", opacity: frame > 70 ? 1 : 0.1 }
  ];

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 my-20 relative overflow-hidden group">
      <div className="flex flex-col items-center gap-10">
        <div className="text-center space-y-2">
            <h4 className="text-xs font-black text-seve uppercase tracking-[0.4em]">Extracteur de Temps</h4>
            <p className="text-[10px] text-textMain/40 uppercase italic">Isolez la trace physique du flux temporel</p>
        </div>

        <div className="relative w-full h-40 flex items-center justify-between px-10 bg-black/40 rounded-3xl border border-white/5 overflow-hidden">
            {frames.map((f, i) => (
                <motion.div 
                    key={i}
                    animate={{ opacity: f.opacity, scale: f.opacity === 1 ? 1.1 : 0.9 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Clock className={`w-6 h-6 ${f.opacity === 1 ? 'text-seve' : 'text-white/10'}`} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20">{f.label}</span>
                </motion.div>
            ))}
            
            {/* Moving Cutter Line */}
            <motion.div 
                animate={{ left: `${frame}%` }}
                className="absolute top-0 bottom-0 w-px bg-seve shadow-[0_0_15px_#2ECC71] z-20"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 p-2 bg-seve text-background rounded-full">
                    <Scissors className="w-3 h-3" />
                </div>
            </motion.div>
        </div>

        <input 
            type="range" min="0" max="100" value={frame}
            onChange={(e) => setFocus(parseInt(e.target.value))}
            className="w-full max-w-md h-1 bg-white/10 rounded-full appearance-none accent-seve cursor-pointer"
        />
      </div>
    </div>
  );
};
