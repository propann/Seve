"use client";

import React, { useState } from "react";
import { Eye, Camera } from "lucide-react";

/**
 * INTERACTIVE COMPARISON : Vision Humaine vs Camera Obscura
 */
export const InteractiveComparison = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full h-[500px] rounded-[40px] overflow-hidden border border-white/10 my-20 shadow-2xl group">
      {/* Vision Camera Obscura (Fond) */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-75 scale-y-[-1] blur-[2px]"
          style={{ 
            backgroundImage: "url('/image.jpg')", 
            maskImage: "radial-gradient(circle, black 30%, transparent 80%)" 
          }}
        />
        <div className="absolute top-8 left-8 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-seve/30">
          <Camera className="w-4 h-4 text-seve" />
          <span className="text-[10px] font-black text-seve uppercase tracking-widest text-white">Vision Camera Obscura</span>
        </div>
      </div>

      {/* Vision Humaine (Dessus, découpée par le slider) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image.jpg')" }}
        />
        <div className="absolute top-8 right-8 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <Eye className="w-4 h-4 text-white" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Vision Humaine</span>
        </div>
      </div>

      {/* Le Slider (Contrôle) */}
      <input 
        type="range"
        min="0" max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(parseInt(e.target.value))}
        className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-ew-resize"
      />
      
      {/* Barre visuelle du slider */}
      <div 
        className="absolute top-0 bottom-0 z-15 w-1 bg-seve shadow-[0_0_15px_#2ECC71] pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-seve rounded-full flex items-center justify-center border-4 border-background">
            <div className="w-1 h-4 bg-background rounded-full mx-[1px]" />
            <div className="w-1 h-4 bg-background rounded-full mx-[1px]" />
        </div>
      </div>
    </div>
  );
};
