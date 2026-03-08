"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Aperture, Timer, Zap, AlertTriangle, Check } from "lucide-react";

/**
 * EXPOSURE SIMULATOR v2.0
 * Simule l'équilibre entre Ouverture, Vitesse et ISO.
 */
export const ExposureSim = () => {
  const [aperture, setAperture] = useState(2.8); // f/1.8 to f/22
  const [shutter, setShutter] = useState(125);   // 1/1s to 1/4000s (index)
  const [iso, setIso] = useState(100);           // 100 to 12800
  const apertureEffect = Math.log2(aperture ** 2);
  const shutterEffect = Math.log2(shutter);
  const isoEffect = Math.log2(iso / 100);
  const exposure = isoEffect - (apertureEffect + shutterEffect) + 14;

  const getStatus = () => {
    if (exposure < 13) return { label: "SOUS-EXPOSÉ", color: "text-blue-400", bg: "bg-blue-400/10" };
    if (exposure > 15) return { label: "SUREXPOSÉ", color: "text-red-400", bg: "bg-red-400/10" };
    return { label: "EXPOSITION PARFAITE", color: "text-seve", bg: "bg-seve/10" };
  };

  const status = getStatus();

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contrôles Techniques */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
              <Aperture className="w-4 h-4" /> Ouverture (f-stop)
            </h4>
            <input 
              type="range" min="1.8" max="22" step="0.1" value={aperture}
              onChange={(e) => setAperture(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none accent-seve cursor-pointer"
            />
            <div className="flex justify-between text-xs font-bold italic text-white/60">
              <span>f/1.8 (Bokeh Max)</span>
              <span className="text-seve">f/{aperture}</span>
              <span>f/22 (Net)</span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
              <Timer className="w-4 h-4" /> Vitesse (Shutter)
            </h4>
            <input 
              type="range" min="1" max="4000" step="1" value={shutter}
              onChange={(e) => setShutter(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none accent-seve cursor-pointer"
            />
            <div className="flex justify-between text-xs font-bold italic text-white/60">
              <span>1s (Flou)</span>
              <span className="text-seve">1/{shutter}s</span>
              <span>1/4000s (Figé)</span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
              <Zap className="w-4 h-4" /> Sensibilité (ISO)
            </h4>
            <select 
              value={iso}
              onChange={(e) => setIso(parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-black text-seve outline-none focus:border-seve appearance-none cursor-pointer"
            >
              {[100, 200, 400, 800, 1600, 3200, 6400, 12800].map(v => (
                <option key={v} value={v}>ISO {v}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Aperçu du Résultat */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-black flex items-center justify-center">
            {/* Simulation visuelle de l'image */}
            <motion.div 
              animate={{ 
                opacity: Math.max(0.1, Math.min(1, (exposure - 10) / 5)),
                filter: `blur(${Math.max(0, (aperture - 1.8) * 0.5)}px)`
              }}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/image.jpg')" }}
            />
            
            {/* Overlay de bruit ISO */}
            {iso > 1600 && (
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
              />
            )}

            {/* Posemètre (Light Meter) UI */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <div className={`w-2 h-2 rounded-full ${status.label === "EXPOSITION PARFAITE" ? "bg-seve shadow-[0_0_10px_#2ECC71]" : "bg-white/20"}`} />
                <span className={`text-[10px] font-black tracking-widest ${status.color}`}>{status.label}</span>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border flex items-center gap-4 transition-all ${status.bg} ${status.color} border-current/20`}>
            {status.label === "EXPOSITION PARFAITE" ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 animate-pulse" />}
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
              {status.label === "EXPOSITION PARFAITE" 
                ? "Équilibre atteint. L'histoire est prête à être capturée." 
                : `Ajustez vos réglages. Le capteur a ${exposure < 14 ? 'faim' : 'trop'} de lumière.`}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
