"use client";

import React, { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap, TreePine } from "lucide-react";
import Link from "next/link";

interface LectureLayoutProps {
  children: ReactNode;
  level: string;
  title: string;
  subtitle?: string;
  prevSlug?: string;
  nextSlug?: string;
}

export const LectureLayout: React.FC<LectureLayoutProps> = ({ children, prevSlug, nextSlug }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background relative font-sans text-textMain selection:bg-seve selection:text-background pb-32">
      
      {/* Effet Vignettage Chambre Noire */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle,transparent_40%,#000_100%)] opacity-80" />

      {/* Main Content Flow */}
      <main className="max-w-3xl mx-auto pt-32 px-6 space-y-24 relative z-10">
        {children}

        {/* NAVIGATION DE FIN DE COURS */}
        <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            {prevSlug ? (
                <Link href={`/dashboard/courses/${prevSlug}`} className="flex items-center gap-4 group p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:text-seve">
                        <ChevronLeft />
                    </div>
                    <div>
                        <span className="block text-[8px] font-black text-white/20 uppercase">Précédent</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Leçon Antérieure</span>
                    </div>
                </Link>
            ) : <div />}

            <Link href="/garden" className="flex flex-col items-center gap-2 group opacity-40 hover:opacity-100 transition-opacity">
                <TreePine className="w-6 h-6 text-white group-hover:text-seve transition-colors" />
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">Retour au Jardin</span>
            </Link>

            {nextSlug ? (
                <Link href={`/dashboard/courses/${nextSlug}`} className="flex items-center gap-4 group p-4 rounded-2xl border border-seve/20 bg-seve/5 hover:bg-seve/10 transition-all">
                    <div className="text-right">
                        <span className="block text-[8px] font-black text-seve/40 uppercase">Suivant</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-seve">Leçon Suivante</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-seve text-background flex items-center justify-center shadow-[0_0_15px_#2ECC71]">
                        <ChevronRight />
                    </div>
                </Link>
            ) : (
                <div className="p-4 rounded-2xl border border-amberGlow/20 bg-amberGlow/5">
                    <span className="text-xs font-black text-amberGlow uppercase tracking-widest italic">Branche en croissance...</span>
                </div>
            )}
        </footer>
      </main>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-seve z-[70] origin-left shadow-[0_0_10px_#2ECC71]"
        style={{ scaleX }}
      />
    </div>
  );
};

export const Hook = ({ children }: { children: ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="border-l-4 border-seve pl-8 py-4 mb-32"
  >
    <p className="text-3xl md:text-5xl font-serif italic font-light leading-tight text-white">
      {children}
    </p>
  </motion.section>
);

export const Immersion = ({ children }: { children: ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="prose prose-invert prose-emerald max-w-none text-xl leading-relaxed text-textMain/80 font-light"
  >
    {children}
  </motion.section>
);

export const ScienceWell = ({ children, title }: { children: ReactNode, title: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden my-16 group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-all text-seve">
        <Zap className="w-12 h-12" />
    </div>
    <h4 className="text-[10px] font-black tracking-[0.5em] text-seve uppercase mb-6">{title}</h4>
    <div className="font-mono text-sm text-textMain/60 leading-loose">
      {children}
    </div>
  </motion.div>
);
