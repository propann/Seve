"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface AvatarProps {
  level: number; // 0 à 5
  xp: number;
}

/**
 * AVATAR ÉVOLUTIF (Cyber-Organic)
 * Mute visuellement selon la progression de l'élève.
 */
export const EvolutionaryAvatar: React.FC<AvatarProps> = ({ level, xp }) => {
  // Détermination du stade
  const stages = [
    { name: "La Graine", color: "#2ECC71" }, // Niv 0
    { name: "Le Germe", color: "#27AE60" },  // Niv 1
    { name: "L'Arbrisseau", color: "#16A085" }, // Niv 2-3
    { name: "L'Arbre Maître", color: "#F1C40F" }, // Niv 4
    { name: "Le Grand Sage", color: "#ffffff" }   // Niv 5
  ];

  const currentStage = stages[Math.min(level, 4)];
  const [particles] = useState(() =>
    [...Array(8)].map(() => ({
      cx: 20 + Math.random() * 60,
      cy: 20 + Math.random() * 40,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  );

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Glow Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ backgroundColor: currentStage.color }}
      />

      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
        {/* STADE 0 : La Graine */}
        {level === 0 && (
          <motion.circle
            cx="50" cy="50" r="15"
            fill="none"
            stroke={currentStage.color}
            strokeWidth="2"
            animate={{ 
              r: [15, 17, 15],
              strokeWidth: [2, 4, 2]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* STADE 1-2 : Germe & Arbrisseau (Structure de croissance) */}
        {level >= 1 && level <= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.path
              d="M 50 80 Q 50 50 50 30"
              stroke={currentStage.color}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            {level >= 2 && (
              <>
                <motion.path 
                  d="M 50 50 Q 30 40 20 30" 
                  stroke={currentStage.color} strokeWidth="3" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                />
                <motion.path 
                  d="M 50 50 Q 70 40 80 30" 
                  stroke={currentStage.color} strokeWidth="3" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                />
              </>
            )}
          </motion.g>
        )}

        {/* STADE 4-5 : Arbre Maître & Sage (Particules & Cercle) */}
        {level >= 4 && (
          <motion.g>
            {/* Ouroboros Circle for Sage */}
            {level === 5 && (
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke={currentStage.color}
                strokeWidth="1"
                strokeDasharray="5 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            )}
            {/* Tree Core */}
            <circle cx="50" cy="50" r="20" fill={currentStage.color} className="opacity-20 blur-sm" />
            <motion.path
              d="M 50 90 L 50 40 M 50 60 L 30 30 M 50 60 L 70 30"
              stroke={currentStage.color}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Luminous Pixels (Falling) */}
            {particles.map((particle, i) => (
              <motion.circle
                key={i}
                cx={particle.cx}
                cy={particle.cy}
                r="1.5"
                fill={currentStage.color}
                animate={{ 
                  y: [0, 40],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: particle.duration,
                  repeat: Infinity, 
                  delay: particle.delay
                }}
              />
            ))}
          </motion.g>
        )}
      </svg>
      
      {/* XP Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="64" cy="64" r="60"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          className="transform scale-[0.5]"
        />
        <motion.circle
          cx="64" cy="64" r="60"
          fill="none"
          stroke={currentStage.color}
          strokeWidth="2"
          strokeDasharray="377"
          initial={{ strokeDashoffset: 377 }}
          animate={{ strokeDashoffset: 377 - (377 * (xp % 100)) / 100 }}
          className="transform scale-[0.5]"
        />
      </svg>
    </div>
  );
};
