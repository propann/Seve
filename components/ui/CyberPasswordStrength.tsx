"use client";

import React from "react";
import { motion } from "framer-motion";

interface CyberPasswordStrengthProps {
  strength: number; // 0 to 4
  length: number;
}

/**
 * CYBER-ORGANIC PASSWORD STRENGTH
 * Represents security as a growing root.
 */
export const CyberPasswordStrength: React.FC<CyberPasswordStrengthProps> = ({ strength, length }) => {
  const isLengthOk = length >= 10;
  
  // Colors for the root based on strength
  const colors = ["#ef4444", "#f59e0b", "#10b981", "#2ecc71"];
  const currentColor = strength === 0 ? "#333" : colors[Math.min(strength - 1, 3)];

  return (
    <div className="mt-4 space-y-3">
      <div className="flex justify-between items-center text-[8px] font-black tracking-widest uppercase">
        <span className={isLengthOk ? "text-seve" : "text-white/20"}>
          {isLengthOk ? "ENTROPIE VALIDE" : "RACINE TROP COURTE (MIN 10)"}
        </span>
        <span className="text-white/40">SÉCURITÉ DU MYCÉLIUM</span>
      </div>
      
      {/* The Root Visualizer */}
      <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ 
            width: `${(strength / 4) * 100}%`,
            backgroundColor: currentColor,
            boxShadow: `0 0 10px ${currentColor}44`
          }}
          className="h-full rounded-full transition-colors duration-500"
        />
      </div>

      {/* Mini-Nodes for length feedback */}
      <div className="flex gap-1">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              length > i ? "bg-seve/40 shadow-[0_0_5px_#2ecc7144]" : "bg-white/5"
            }`} 
          />
        ))}
      </div>
    </div>
  );
};
