"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cursus } from "@/lib/data/cursus";
import styles from "./tree.module.css";
import { EvolutionaryAvatar } from "@/components/ui/EvolutionaryAvatar";
import { useRouter } from "next/navigation";
import { Lock, Zap, BookOpen } from "lucide-react";

interface PhotographyTreeProps {
  currentLevel: number;
  completedModules: string[];
  unlockedModules: string[];
  xp: number;
}

export const PhotographyTree: React.FC<PhotographyTreeProps> = ({ 
  currentLevel = 0,
  completedModules = [],
  unlockedModules = ["0.1"],
  xp = 0
}) => {
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);

  const handleNodeClick = (moduleId: string) => {
    // On retire la vérification de déblocage pour le test
    // if (!unlockedModules.includes(moduleId)) return;
    
    // On cherche le module correspondant dans le cursus pour récupérer son slug exact
    const moduleData = cursus.flatMap(level => level.modules).find(m => m.id === moduleId);
    
    if (moduleData) {
      // Si le slug commence par un chiffre (0-x, 1-x), on rajoute le préfixe "m"
      // Si c'est déjà "b2-c1", on le laisse tel quel.
      const finalSlug = /^\d/.test(moduleData.slug) ? `m${moduleData.slug}` : moduleData.slug;
      router.push(`/dashboard/courses/${finalSlug}`);
    }
  };

  return (
    <div className={`${styles.container} bg-background p-10 rounded-3xl border border-white/5 shadow-2xl shadow-seve/5 flex flex-col items-center relative`}>
      
      {/* Visual Header : Evolutionary Avatar */}
      <div className="mb-10 text-center">
        <EvolutionaryAvatar level={currentLevel} xp={xp % 100} />
        <div className="mt-4 flex flex-col gap-1">
          <span className="text-[10px] font-black tracking-widest text-seve uppercase">Stade de Croissance</span>
          <span className="text-[8px] font-bold text-white/20 tracking-[0.3em] uppercase italic">
            Niveau {currentLevel} | EXP {xp}
          </span>
        </div>
      </div>

      {/* TOOLTIP DYNAMIQUE */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute z-[100] bg-[#1A1A1A] border border-seve/30 p-4 rounded-2xl shadow-2xl w-64 pointer-events-none font-mono"
            style={{ 
                top: hoveredNode.y - 100, 
                left: hoveredNode.x + 40 
            }}
          >
            <div className="flex justify-between items-start mb-2">
                <span className="text-[8px] font-black text-seve uppercase tracking-widest">Module {hoveredNode.id}</span>
                {hoveredNode.isLocked ? <Lock className="w-3 h-3 text-white/20" /> : <Zap className="w-3 h-3 text-seve animate-pulse" />}
            </div>
            <h4 className="text-white text-xs font-bold uppercase mb-1">{hoveredNode.title}</h4>
            <p className="text-[9px] text-textMain/40 italic leading-relaxed">{hoveredNode.objective}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <svg viewBox="0 0 400 600" className={styles.svg}>
        {/* TRUNK & BRANCHES (Visuels simplifiés pour l'interaction) */}
        <motion.path
          d="M 200 560 Q 200 400 200 300"
          stroke="#2ECC71" strokeWidth="12" fill="none" strokeLinecap="round"
          className="opacity-10"
        />

        {/* NODES: Modules cliquables */}
        {cursus.flatMap(level => level.modules).map((module, index) => {
          const y = 550 - (index * 80);
          const x = 200 + (index % 2 === 0 ? -60 : 60);
          
          const isCompleted = completedModules.includes(module.id);
          const isUnlocked = unlockedModules.includes(module.id) || isCompleted; 
          const isLocked = !isUnlocked;
          
          return (
            <motion.g
              key={module.id}
              className={`${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'} group`}
              onMouseEnter={() => setHoveredNode({ ...module, x, y, isLocked })}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(module.id)}
            >
              {/* Glow effect for unlocked/completed */}
              {isUnlocked && (
                <motion.circle
                  cx={x} cy={y} r="20"
                  fill="#2ECC71"
                  className="opacity-20 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <circle
                cx={x} cy={y} r="14"
                fill={isCompleted ? "#2ECC71" : isUnlocked ? "#1A1A1A" : "#050505"}
                stroke={isCompleted ? "#fff" : isUnlocked ? "#2ECC71" : "#222"}
                strokeWidth="2"
                className={`transition-all duration-500 ${isCompleted ? 'shadow-[0_0_20px_#2ECC71]' : ''}`}
              />
              
              {isLocked && <circle cx={x} cy={y} r="4" fill="#333" />}

              <text
                x={x + 25} y={y + 5}
                fontSize="10"
                fill={isUnlocked ? "#2ECC71" : "#333"}
                fontWeight="900"
                className="uppercase tracking-widest pointer-events-none font-mono"
              >
                {module.id}
              </text>
            </motion.g>
          );
        })}
      </svg>
      
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <BookOpen className="w-3 h-3 text-seve" />
        <span className="text-[10px] font-black tracking-widest text-seve uppercase italic">Navigation Synaptique Active</span>
      </div>
    </div>
  );
};
