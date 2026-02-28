"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, Image as ImageIcon, RotateCcw } from "lucide-react";

export const ExposureTimer: React.FC = () => {
  const [exposureTime, setExposureTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"under" | "perfect" | "over" | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (100 / (exposureTime * 10)); // 10 ticks per second
          if (next >= 100) {
            setIsRunning(false);
            evaluateResult();
            return 100;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress, exposureTime]);

  const evaluateResult = () => {
    // Simulation d'un temps idéal à 12.5s pour l'exercice
    if (exposureTime < 10) setResult("under");
    else if (exposureTime > 15) setResult("over");
    else setResult("perfect");
  };

  const startExposure = () => {
    setProgress(0);
    setResult(null);
    setIsRunning(true);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 font-mono">
      <div className="relative w-64 h-80 bg-zinc-900 rounded-3xl border-4 border-white/5 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6">
        
        {/* LIGHT PROJECTION SIMULATION */}
        <AnimatePresence>
          {isRunning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-yellow-400/20 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* PAPER SIMULATION */}
        <div className="relative w-full h-48 bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center mb-6">
            <motion.div 
              className="absolute inset-0 bg-blue-500/20"
              style={{ opacity: progress / 100 }}
            />
            <ImageIcon className={`w-12 h-12 ${result === 'perfect' ? 'text-blue-400' : 'text-white/5'}`} />
            
            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20"
              >
                <div className="text-center">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${result === 'perfect' ? 'text-green-400' : 'text-red-500'}`}>
                    {result === 'perfect' ? 'Tirage Réussi' : result === 'under' ? 'Sous-Exposé' : 'Sur-Exposé'}
                  </span>
                  <p className="text-[8px] text-white/40 mt-1 uppercase italic">
                    {result === 'perfect' ? 'Gamme tonale parfaite' : result === 'under' ? 'Blancs grisâtres' : 'Noirs bouchés'}
                  </p>
                </div>
              </motion.div>
            )}
        </div>

        {/* TIMER DISPLAY */}
        <div className="text-center">
            <div className="text-3xl font-black text-white flex items-center gap-2 justify-center mb-1">
                <Timer className="w-5 h-5 text-blue-500" />
                {((exposureTime * (100 - progress)) / 100).toFixed(1)}s
            </div>
            <span className="text-[8px] text-white/20 uppercase tracking-[0.3em]">Minuteur Agrandisseur</span>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="flex justify-between items-center text-[9px] font-black uppercase text-white/40 px-2">
            <span>Temps de Pose : <span className="text-blue-400">{exposureTime}s</span></span>
        </div>
        <input 
          type="range" min="2" max="30" step="0.5" value={exposureTime} 
          onChange={(e) => setExposureTime(parseFloat(e.target.value))}
          disabled={isRunning}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-30"
        />
        
        <button 
          onClick={isRunning ? undefined : startExposure}
          disabled={isRunning}
          className={`w-full py-4 rounded-xl border flex items-center justify-center gap-3 transition-all uppercase font-black text-[10px] tracking-widest ${isRunning ? 'bg-white/5 border-white/10 text-white/20' : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 active:scale-95'}`}
        >
          <Zap className="w-3 h-3" />
          {isRunning ? "Exposition en cours..." : "Déclencher l'Exposition"}
        </button>
        
        {result && (
          <button onClick={() => {setResult(null); setProgress(0);}} className="w-full text-[8px] text-white/20 uppercase hover:text-white flex items-center justify-center gap-2">
            <RotateCcw className="w-2 h-2" /> Réinitialiser le Papier
          </button>
        )}
      </div>
    </div>
  );
};
