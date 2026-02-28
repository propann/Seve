"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Mountain, Clock } from "lucide-react";

/**
 * SUN PATH SIMULATOR (B2.N.1)
 * Simule l'évolution des ombres sur un relief selon l'heure du jour.
 */
export const SunPathSimulator = () => {
  const [time, setTime] = useState(12); // Heure de 6 à 22

  const getSunPosition = (h: number) => {
    const angle = ((h - 6) / 16) * Math.PI;
    return {
      x: 50 - Math.cos(angle) * 40,
      y: 80 - Math.sin(angle) * 60
    };
  };

  const sunPos = getSunPosition(time);
  const shadowLength = (time - 12) * 5;
  const shadowOpacity = Math.max(0, 1 - Math.abs(time - 12) / 8);

  const isGoldenHour = (time >= 17 && time <= 19) || (time >= 7 && time <= 9);

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-zinc-950 rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/5 font-mono">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Hélios Engine v1.0</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white">{time}:00</span>
            {isGoldenHour && <span className="text-[8px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-black uppercase animate-pulse">Heure d'Or</span>}
        </div>
      </div>

      {/* Viewport */}
      <div className="relative aspect-video bg-gradient-to-b from-slate-900 to-black rounded-2xl border border-white/5 overflow-hidden mb-8">
        
        {/* Sun/Moon */}
        <motion.div 
          animate={{ left: `${sunPos.x}%`, top: `${sunPos.y}%` }}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        >
          {time > 7 && time < 20 ? (
            <div className={`p-2 rounded-full ${isGoldenHour ? 'bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-yellow-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]'}`}>
                <Sun className={`w-6 h-6 ${isGoldenHour ? 'text-white' : 'text-yellow-600'}`} />
            </div>
          ) : (
            <div className="p-2 rounded-full bg-slate-400/20">
                <Moon className="w-6 h-6 text-slate-300" />
            </div>
          )}
        </motion.div>

        {/* Relief (Mountain) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center">
            <Mountain className="w-64 h-64 text-emerald-900/40 relative z-20" />
            
            {/* Dynamic Shadow */}
            <motion.div 
               animate={{ 
                 skewX: `${shadowLength * 2}deg`,
                 opacity: shadowOpacity * 0.4
               }}
               className="absolute bottom-0 w-64 h-8 bg-black blur-md origin-bottom z-10"
            />
        </div>

        {/* Atmosphere Overlay */}
        <div 
            className="absolute inset-0 pointer-events-none transition-colors duration-1000"
            style={{ 
                backgroundColor: isGoldenHour ? 'rgba(245,158,11,0.1)' : 'transparent' 
            }}
        />
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
            <span>Cycle Solaire</span>
            <span className="text-emerald-400">Azimut: {((time-6)*11.25).toFixed(0)}°</span>
        </div>
        <input 
            type="range" min="6" max="22" step="0.5" value={time}
            onChange={(e) => setTime(parseFloat(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[8px] font-black text-white/20 uppercase tracking-tighter">
            <span>Aube</span>
            <span>Zénith</span>
            <span>Crépuscule</span>
        </div>
      </div>
    </div>
  );
};
