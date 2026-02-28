"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video w-full rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10 group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* AFTER IMAGE (Bottom) */}
      <div className="absolute inset-0 bg-zinc-900">
        <img src={after} alt="After" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 right-4 bg-purple-500/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 z-20">
            <span className="text-[8px] font-black text-white tracking-widest uppercase italic">Révélé</span>
        </div>
      </div>

      {/* BEFORE IMAGE (Top) */}
      <motion.div 
        className="absolute inset-0 z-10 overflow-hidden border-r-2 border-white/50"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="w-[100vw] h-full"> {/* Force width to container width to avoid scaling */}
           <img src={before} alt="Before" className="w-full h-full object-cover grayscale opacity-60" style={{ width: containerRef.current?.offsetWidth }} />
        </div>
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 z-20">
            <span className="text-[8px] font-black text-white/40 tracking-widest uppercase italic">Brut (RAW)</span>
        </div>
      </motion.div>

      {/* SLIDER HANDLE */}
      <div 
        className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-1 h-full bg-white/50" />
        <div className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-black/20">
           <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-black/40 rounded-full" />
              <div className="w-0.5 h-3 bg-black/40 rounded-full" />
           </div>
        </div>
      </div>
    </div>
  );
};
