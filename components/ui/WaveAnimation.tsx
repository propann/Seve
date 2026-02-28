"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * WAVE ANIMATION : La Dualité Onde-Particule
 */
export const WaveAnimation = () => {
  return (
    <div className="w-full h-40 bg-black/20 rounded-3xl border border-white/5 my-12 flex items-center justify-center relative overflow-hidden">
      <svg viewBox="0 0 400 100" className="w-full h-full stroke-seve fill-none">
        {/* L'Onde qui arrive */}
        <motion.path
          d="M 0 50 Q 25 20 50 50 T 100 50 T 150 50 T 200 50"
          strokeWidth="2"
          strokeDasharray="5 5"
          animate={{ x: [0, 50, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Le Capteur (Impact) */}
        <line x1="300" y1="20" x2="300" y2="80" stroke="white" strokeWidth="4" strokeOpacity="0.1" />

        {/* La Particule (Photon) à l'impact */}
        <motion.circle
          cx="300" cy="50" r="4"
          fill="#2ECC71"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="shadow-[0_0_15px_#2ECC71]"
        />

        {/* Électron libéré */}
        <motion.circle
          cx="300" cy="50"
          r="2"
          fill="#F1C40F"
          animate={{ x: 50, opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
        Dualité Onde-Particule (Effet Photoélectrique)
      </div>
    </div>
  );
};
