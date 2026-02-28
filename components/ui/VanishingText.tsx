"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * VANISHING TEXT : Le texte s'efface pour symboliser l'oubli
 */
export const VanishingText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ 
        opacity: isHovered ? 1 : 0.15,
        filter: isHovered ? "blur(0px)" : "blur(4px)"
      }}
      transition={{ duration: 0.8 }}
      className="cursor-default my-10"
    >
      <div className="text-xl md:text-2xl font-light leading-relaxed text-textMain">
        {children}
      </div>
      {!isHovered && (
        <p className="text-[10px] font-black text-seve uppercase tracking-[0.4em] mt-4 animate-pulse">
          Survolez pour raviver le souvenir
        </p>
      )}
    </motion.div>
  );
};
