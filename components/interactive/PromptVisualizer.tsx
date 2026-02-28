"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Camera, Sun, Layers, Terminal } from "lucide-react";

type Category = "Lumière" | "Optique" | "Matière";

export const PromptVisualizer: React.FC = () => {
  const [selections, setSelections] = useState({
    Lumière: "Rembrandt Lighting",
    Optique: "35mm f/1.4",
    Matière: "Kodak Portra 400"
  });

  const options = {
    Lumière: ["Rembrandt Lighting", "Cinematic Rim Light", "Golden Hour", "Chiaroscuro"],
    Optique: ["35mm f/1.4", "85mm Bokeh Master", "Fish-eye 8mm", "Tilt-shift"],
    Matière: ["Kodak Portra 400", "Silver Gelatin Print", "Cyber-Glitch", "Oil Painting Texture"]
  };

  const generatePrompt = () => {
    return `Shot on ${selections.Optique}, ${selections.Lumière}, texture ${selections.Matière}, high detail, 8k, professional photography.`;
  };

  return (
    <div className="w-full space-y-8 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(options) as Category[]).map((cat) => (
          <div key={cat} className="space-y-3">
            <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
              {cat === "Lumière" && <Sun className="w-3 h-3" />}
              {cat === "Optique" && <Camera className="w-3 h-3" />}
              {cat === "Matière" && <Layers className="w-3 h-3" />}
              {cat}
            </label>
            <div className="flex flex-col gap-2">
              {options[cat].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelections({ ...selections, [cat]: opt })}
                  className={`text-[9px] text-left px-3 py-2 rounded-lg border transition-all ${
                    selections[cat] === opt
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                      : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-black rounded-2xl border border-cyan-500/30 relative group">
        <div className="absolute -top-3 left-6 px-3 py-1 bg-cyan-500 text-black text-[8px] font-black uppercase tracking-tighter rounded-full flex items-center gap-2">
          <Terminal className="w-2 h-2" /> Output Latent
        </div>
        
        <div className="min-h-[60px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
                <motion.p 
                    key={generatePrompt()}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-cyan-200 text-xs italic leading-relaxed"
                >
                    "{generatePrompt()}"
                </motion.p>
            </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-end">
            <button className="text-[8px] font-black text-cyan-500/40 uppercase hover:text-cyan-500 transition-colors">
                --- Envoyer au Moteur ---
            </button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
        <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
        <p className="text-[9px] text-cyan-300/60 leading-tight uppercase tracking-tight">
            Note : Chaque brique de vocabulaire agit comme un projecteur virtuel. La précision de votre terme définit la netteté du rendu final.
        </p>
      </div>
    </div>
  );
};
