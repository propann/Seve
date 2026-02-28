"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface KnowledgeNodeProps {
  title: string;
  children: ReactNode;
}

export const KnowledgeNode: React.FC<KnowledgeNodeProps> = ({ title, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="bg-white/5 border-l-4 border-seve p-10 rounded-r-3xl my-16 relative overflow-hidden group hover:bg-white/[0.07] transition-all"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-all">
        <BookOpen className="w-16 h-16 text-seve" />
      </div>
      
      <h3 className="text-xl font-serif italic text-white mb-6 flex items-center gap-3">
        <span className="w-2 h-2 bg-seve rounded-full animate-pulse shadow-[0_0_8px_#2ECC71]" />
        {title}
      </h3>
      
      <div className="text-textMain/80 leading-relaxed text-lg font-light">
        {children}
      </div>
    </motion.div>
  );
};
