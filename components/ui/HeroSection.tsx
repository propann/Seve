"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenManifest: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenManifest }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Roots Pattern (Framer Motion Animation) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1000 1000" className="w-full h-full stroke-seve">
          <motion.path
            d="M 500 1000 C 520 800, 480 600, 500 400 S 550 200, 500 0"
            fill="none"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 500 700 C 400 650, 300 500, 200 400 S 100 200, 50 100"
            fill="none"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.path
            d="M 500 700 C 600 650, 700 500, 800 400 S 900 200, 950 100"
            fill="none"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Hero Content */}
      <motion.div 
        className="z-10 text-center px-4 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
          L'ARBRE DE LA <br/> 
          <span className="text-seve glow-text italic">PHOTOGRAPHIE</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-textMain font-light leading-relaxed mb-10 max-w-2xl mx-auto opacity-80">
          À l’ère de l’image synthétique, la photographie n'est pas une simple capture de pixels. 
          C’est un acte organique. <span className="text-seve font-bold">Plantez votre regard.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            className="px-10 py-4 bg-seve text-background font-black rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-seve/20"
            onClick={() => {
              const el = document.getElementById('onboarding');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            INITIALISER MON ARBRE
          </button>
          
          <button 
            className="px-10 py-4 border-2 border-seve text-seve font-black rounded-full hover:bg-seve/10 transition-all"
            onClick={onOpenManifest}
          >
            LIRE LE MANIFESTE
          </button>
        </div>
      </motion.div>

      {/* Floating Particles Effect (Aesthetic Decor) */}
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-seve/10 blur-3xl rounded-full" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-seve/5 blur-3xl rounded-full" />
    </div>
  );
};
