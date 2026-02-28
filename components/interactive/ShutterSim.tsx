"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Timer, Zap, Wind, Bird } from "lucide-react";

/**
 * SHUTTER SIM (B2.N.3)
 * Simule l'effet de la vitesse d'obturation sur un sujet en mouvement rapide (battement d'ailes).
 */
export const ShutterSim = () => {
  const [shutterSpeed, setShutterSpeed] = useState(125); // 1/125s à 1/4000s

  // Calcul du flou (plus la vitesse est basse, plus le flou est grand)
  const blurAmount = Math.max(0, (2000 - shutterSpeed) / 100);
  const opacityAmount = Math.max(0.2, shutterSpeed / 2000);

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-zinc-950 rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/5 font-mono">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <Timer className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">High-Speed Shutter v1.0</span>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[8px] text-white/20 uppercase tracking-widest">Temps d'exposition</span>
            <span className="text-xs font-black text-white">1/{shutterSpeed}s</span>
        </div>
      </div>

      {/* Viewport Simulation */}
      <div className="relative h-64 bg-black rounded-2xl border border-white/5 overflow-hidden mb-10 flex items-center justify-center">
        {/* Background Forest (Blurred) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-10" />
        
        {/* Bird Subject with dynamic blur */}
        <div className="relative z-10">
            <motion.div
                animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 2, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <Bird 
                    className="w-32 h-32 text-emerald-400"
                    style={{ 
                        filter: `blur(${blurAmount}px)`,
                        opacity: opacityAmount
                    }}
                />
            </motion.div>

            {/* Wing movement ghosting (if shutter is slow) */}
            {shutterSpeed < 1000 && (
                <motion.div 
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                    className="absolute inset-0 text-emerald-600 blur-sm"
                >
                    <Bird className="w-32 h-32" />
                </motion.div>
            )}
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
            <Zap className="w-3 h-3 text-emerald-500" />
            <span className="text-[8px] text-white/40 uppercase">Mode AF-C : Suivi Prédictif Actif</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-8">
        <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest">
                <span className="flex items-center gap-2"><Wind className="w-3 h-3" /> Vitesse d'obturation</span>
                <span className="text-emerald-400">1/{shutterSpeed}s</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {[125, 500, 1000, 4000].map((v) => (
                    <button 
                        key={v}
                        onClick={() => setShutterSpeed(v)}
                        className={`py-2 rounded-lg text-[10px] font-black border transition-all ${
                            shutterSpeed === v 
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                            : "bg-white/2 border-white/5 text-white/20 hover:text-white/40"
                        }`}
                    >
                        1/{v}
                    </button>
                ))}
            </div>
        </div>

        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <p className="text-[9px] text-emerald-400/60 leading-relaxed italic text-center">
                {shutterSpeed >= 1000 
                  ? "Action figée. La structure des plumes est visible." 
                  : "Flou de mouvement détecté. L'énergie est présente mais le détail est perdu."}
            </p>
        </div>
      </div>
    </div>
  );
};
