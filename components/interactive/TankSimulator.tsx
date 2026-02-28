"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Droplets, Thermometer, RotateCw, AlertTriangle } from "lucide-react";

export const TankSimulator: React.FC = () => {
  const [agitation, setAgitation] = useState(0);
  const [temp, setTemp] = useState(20);
  const [isAgitating, setIsAgitating] = useState(false);
  const controls = useAnimation();

  const handleAgitate = async () => {
    if (isAgitating) return;
    setIsAgitating(true);
    setAgitation(prev => Math.min(prev + 15, 100));
    
    await controls.start({
      rotate: [0, -15, 15, -15, 0],
      transition: { duration: 0.5 }
    });
    
    setIsAgitating(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAgitation(prev => Math.max(prev - 0.5, 0));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8 font-mono">
      <div className="relative flex items-center justify-center p-12 bg-zinc-900 rounded-full border-4 border-white/5 shadow-inner">
        {/* TANK VISUAL */}
        <motion.div 
          animate={controls}
          className="relative w-32 h-32 bg-zinc-800 rounded-2xl border-2 border-silver-500/30 flex items-center justify-center shadow-2xl"
        >
            <div className="absolute top-0 w-full h-4 bg-zinc-700 rounded-t-xl border-b border-black/50" />
            <RotateCw className={`w-8 h-8 text-silver-400/20 ${isAgitating ? 'animate-spin' : ''}`} />
            
            {/* Liquid Level */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-silver-500/10"
                style={{ height: `${agitation}%` }}
            />
        </motion.div>

        {/* HUD Data */}
        <div className="absolute -right-12 top-0 flex flex-col gap-2">
            <div className="bg-black/60 p-2 rounded-lg border border-silver-500/20">
                <Thermometer className="w-3 h-3 text-red-500 mb-1" />
                <span className="text-[8px] text-white font-black">{temp.toFixed(1)}°C</span>
            </div>
            <div className={`bg-black/60 p-2 rounded-lg border transition-colors ${agitation > 80 ? 'border-red-500' : 'border-silver-500/20'}`}>
                <Droplets className="w-3 h-3 text-blue-400 mb-1" />
                <span className="text-[8px] text-white font-black">{agitation.toFixed(0)}% AGIT</span>
            </div>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-6 text-center">
        <button 
            onMouseDown={handleAgitate}
            className="w-full py-4 bg-silver-500/10 hover:bg-silver-500/20 border border-silver-500/30 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-silver-400 transition-all active:scale-95"
        >
            --- Inverser la Cuve ---
        </button>

        <div className="flex justify-between items-center px-4">
            <span className="text-[8px] text-white/20 uppercase">Grain Fin</span>
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-1 rounded-full ${agitation > i * 20 ? 'bg-silver-400' : 'bg-white/5'}`} />
                ))}
            </div>
            <span className="text-[8px] text-white/20 uppercase">Contraste Élevé</span>
        </div>

        {agitation > 85 && (
            <div className="flex items-center justify-center gap-2 text-red-500 animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                <span className="text-[7px] font-black uppercase">Risque de sur-agitation : Grain grossier</span>
            </div>
        )}
      </div>
    </div>
  );
};
