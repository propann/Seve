"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, Wind, Triangle, Upload, ImageIcon } from "lucide-react";

type GridType = "thirds" | "fibonacci" | "triangle" | "none";

/**
 * COMPOSITION ANALYZER
 * Laboratoire interactif pour décoder la géométrie des images.
 */
export const CompositionAnalyzer = () => {
  const [grid, setGrid] = useState<GridType>("thirds");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full space-y-8 font-mono">
      {/* Zone d'Affichage Interactif */}
      <div className="relative aspect-video w-full bg-black rounded-[32px] border border-white/10 overflow-hidden shadow-2xl group">
        <AnimatePresence mode="wait">
          {image ? (
            <motion.img 
              key="uploaded-image"
              src={image} 
              alt="Analyse" 
              className="w-full h-full object-cover opacity-80 transition-opacity duration-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
            />
          ) : (
            <motion.div 
              key="empty-state"
              className="absolute inset-0 flex flex-col items-center justify-center text-white/20 gap-4"
            >
              <ImageIcon className="w-16 h-16 opacity-10" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">En attente de matière visuelle</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OVERLAYS SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
          {grid === "thirds" && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stroke-seve/60" strokeWidth="1">
              <line x1="33.33%" y1="0" x2="33.33%" y2="100%" />
              <line x1="66.66%" y1="0" x2="66.66%" y2="100%" />
              <line x1="0" y1="33.33%" x2="100%" y2="33.33%" />
              <line x1="0" y1="66.66%" x2="100%" y2="66.66%" />
              {/* Points Forts */}
              <circle cx="33.33%" cy="33.33%" r="4" fill="#2ECC71" className="animate-pulse" />
              <circle cx="66.66%" cy="33.33%" r="4" fill="#2ECC71" className="animate-pulse" />
              <circle cx="33.33%" cy="66.66%" r="4" fill="#2ECC71" className="animate-pulse" />
              <circle cx="66.66%" cy="66.66%" r="4" fill="#2ECC71" className="animate-pulse" />
            </motion.g>
          )}

          {grid === "fibonacci" && (
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              d="M 0 100 C 60 100 100 40 100 0 M 100 0 C 100 40 40 60 0 60 M 0 60 C 40 60 60 20 60 0 M 60 0 C 60 20 20 40 0 40"
              className="stroke-amberGlow/60"
              strokeWidth="2"
              fill="none"
              transform="scale(8, 4.5)"
            />
          )}

          {grid === "triangle" && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="stroke-blue-400/60" strokeWidth="1">
              <line x1="0" y1="100%" x2="100%" y2="0" />
              <line x1="0" y1="0" x2="66%" y2="100%" />
              <line x1="100%" y1="100%" x2="33%" y2="0" />
            </motion.g>
          )}
        </svg>

        {/* Upload Label Overlaid */}
        <label className="absolute bottom-6 right-6 p-4 bg-white/10 hover:bg-seve/20 border border-white/10 rounded-2xl cursor-pointer transition-all backdrop-blur-md z-30 group">
          <Upload className="w-5 h-5 text-white group-hover:text-seve" />
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>
      </div>

      {/* Barre de Contrôle */}
      <div className="flex justify-center gap-4">
        {[
          { id: "thirds", label: "Tiers", icon: Grid3X3 },
          { id: "fibonacci", label: "Fibonacci", icon: Wind },
          { id: "triangle", label: "Triangle", icon: Triangle },
          { id: "none", label: "Pur", icon: ImageIcon }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setGrid(btn.id as GridType)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all ${
              grid === btn.id 
              ? "bg-seve/20 border-seve text-seve shadow-[0_0_15px_rgba(46,204,113,0.2)]" 
              : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
            }`}
          >
            <btn.icon className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
