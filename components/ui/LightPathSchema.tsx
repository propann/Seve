"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * SCHEMA INTERACTIF : Le Miracle du Sténopé
 * Illustration SVG animée du trajet de la lumière à travers un trou.
 */
export const LightPathSchema = () => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center my-20 p-8 bg-black/40 rounded-[48px] border border-white/5 relative overflow-hidden group">
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-seve/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <svg viewBox="0 0 800 400" className="w-full h-full stroke-white/20 fill-none">
        
        {/* Objet Extérieur (Un Arbre Stylisé) */}
        <motion.path
          d="M 100 350 L 100 150 M 70 200 L 100 150 L 130 200"
          stroke="#2ECC71"
          strokeWidth="4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        />
        <text x="70" y="380" className="fill-white/20 text-[10px] font-black tracking-widest uppercase">Objet Lumineux</text>

        {/* La Chambre Noire (Boîte) */}
        <rect x="400" y="100" width="300" height="200" className="stroke-white/10" strokeWidth="2" />
        <line x1="400" y1="190" x2="400" y2="210" className="stroke-background" strokeWidth="4" />
        
        {/* Trajet de la Lumière (Le Miracle) */}
        {/* Rayon Haut -> Bas */}
        <motion.path
          d="M 100 150 L 400 200 L 700 250"
          stroke="#2ECC71"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0.1 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
        
        {/* Rayon Bas -> Haut */}
        <motion.path
          d="M 100 350 L 400 200 L 700 150"
          stroke="#2ECC71"
          strokeWidth="1"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0.1 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity, delay: 0.5 }}
        />

        {/* Image Inversée à l'Intérieur */}
        <motion.path
          d="M 700 250 L 700 150 M 670 200 L 700 250 L 730 200"
          stroke="#2ECC71"
          strokeWidth="2"
          strokeOpacity="0.4"
          initial={{ opacity: 0, scaleY: 1 }}
          whileInView={{ opacity: 1, scaleY: -1 }}
          transition={{ delay: 1 }}
        />
        <text x="630" y="340" className="fill-seve/40 text-[10px] font-black tracking-widest uppercase">Image Inversée (Trace)</text>

        {/* Le Sténopé (Le Trou) */}
        <circle cx="400" cy="200" r="4" fill="#2ECC71" className="animate-pulse shadow-[0_0_10px_#2ECC71]" />
        <text x="360" y="80" className="fill-seve text-[10px] font-black tracking-[0.3em] uppercase">Le Sténopé (Pinhole)</text>

      </svg>
    </div>
  );
};
