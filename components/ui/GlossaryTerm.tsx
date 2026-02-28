"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface GlossaryTermProps {
  term: string;
  definition: string;
}

/**
 * GLOSSARY TERM : Définition stylisée au survol
 */
export const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b border-seve/40 text-white font-medium group-hover:text-seve transition-colors">
        {term}
      </span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-[#1A1A1A] border border-seve/30 rounded-2xl shadow-2xl z-[100] text-xs font-mono leading-relaxed"
          >
            <span className="flex items-center gap-2 text-seve font-black uppercase mb-2">
              <Info className="w-3 h-3" /> Définition
            </span>
            <span className="text-textMain/80">{definition}</span>
            {/* Arrow */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1A1A1A]" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
