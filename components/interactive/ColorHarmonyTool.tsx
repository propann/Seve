"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Wind, Palette, Zap } from "lucide-react";

/**
 * COLOR HARMONY TOOL
 * Simulateur de température (Kelvins) et de cercle chromatique.
 */
export const ColorHarmonyTool = () => {
  const [kelvin, setKelvin] = useState(5500); // Lumière du jour par défaut
  const [hue, setHue] = useState(0); // Position sur le cercle

  // Calcul de la couleur de température simplifiée
  const getKelvinColor = (k: number) => {
    if (k < 4000) return "rgba(245, 158, 11, 0.2)"; // Ambre (Chaud)
    if (k > 7000) return "rgba(59, 130, 246, 0.2)"; // Bleu (Froid)
    return "rgba(255, 255, 255, 0.1)"; // Neutre
  };

  return (
    <div className="w-full space-y-12 font-mono">
      
      {/* Simulation de Température (Kelvins) */}
      <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/5">
        <div className="flex justify-between items-center">
            <h5 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Sun className="w-3 h-3" /> Température de Lumière
            </h5>
            <span className="text-seve font-bold">{kelvin}K</span>
        </div>
        
        <input 
            type="range" min="2000" max="10000" step="100" value={kelvin}
            onChange={(e) => setKelvin(parseInt(e.target.value))}
            className="w-full h-1 bg-gradient-to-r from-amber-500 via-white to-blue-500 rounded-full appearance-none accent-white cursor-pointer"
        />

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
            <motion.div 
                animate={{ backgroundColor: getKelvinColor(kelvin) }}
                className="absolute inset-0 z-10 pointer-events-none"
            />
            <img src="/image.jpg" alt="Test" className="w-full h-full object-cover opacity-60 grayscale" />
            <div className="absolute bottom-4 left-4 z-20">
                <p className="text-[10px] font-black text-white/60 uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                    {kelvin < 4000 ? "Ambiance Intimiste / Golden Hour" : kelvin > 7000 ? "Ambiance Froide / Heure Bleue" : "Balance Neutre (Daylight)"}
                </p>
            </div>
        </div>
      </div>

      {/* Cercle Chromatique et Harmonies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-8 rounded-3xl border border-white/5 flex flex-col items-center gap-6">
            <h5 className="text-[10px] font-black text-white/40 uppercase tracking-widest self-start flex items-center gap-2">
                <Palette className="w-3 h-3" /> Cercle des Harmonies
            </h5>
            
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 animate-[spin_10s_linear_infinite] opacity-40 blur-xl" />
            
            <div className="absolute flex gap-10">
                {/* Couleur Choisie */}
                <div className="w-12 h-12 rounded-full border-2 border-white shadow-2xl" style={{ backgroundColor: `hsl(${hue}, 70%, 50%)` }} />
                {/* Complémentaire */}
                <div className="w-12 h-12 rounded-full border-2 border-white/20 shadow-2xl" style={{ backgroundColor: `hsl(${(hue + 180) % 360}, 70%, 50%)` }} />
            </div>

            <input 
                type="range" min="0" max="360" value={hue}
                onChange={(e) => setHue(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none accent-seve cursor-pointer"
            />
            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest italic text-center">
                Faites glisser pour trouver la couleur complémentaire (opposée)
            </p>
        </div>

        <div className="bg-seve/5 p-8 rounded-3xl border border-seve/10 space-y-4 flex flex-col justify-center">
            <Zap className="w-6 h-6 text-seve" />
            <h6 className="text-white font-bold uppercase text-xs">Le Secret de l'Architecte</h6>
            <p className="text-xs text-textMain/60 leading-relaxed italic">
                "Pour qu'un sujet 'claque' visuellement, placez-le dans une zone dont la couleur est à l'opposé exact de son environnement sur ce curseur. C'est le contraste chromatique."
            </p>
        </div>
      </div>

    </div>
  );
};
