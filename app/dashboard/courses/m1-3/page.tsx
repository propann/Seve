"use client";

import React from "react";
import { LectureLayout, Hook, Immersion, ScienceWell } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { ColorHarmonyTool } from "@/components/interactive/ColorHarmonyTool";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { motion } from "framer-motion";
import { Palette, Sun, Thermometer, ShieldCheck } from "lucide-react";

/**
 * MODULE 1.3 : LE SPECTRE DES ÉMOTIONS
 * Clôture du Tronc - Niveau 1.3
 */
export default function Module13() {
  return (
    <LectureLayout 
      title="M1.3 - Le Spectre des Émotions" 
      level="Tronc"
      prevSlug="m1-2"
      nextSlug="m1-4"
    >
      
      <Hook>
        "La lumière est la peinture, l'ombre est le relief, et la couleur est la musique de votre cadre."
      </Hook>

      <Immersion>
        <p>
          La couleur ne sert pas à décrire la réalité. Elle sert à décrire <strong>comment vous vous sentez</strong> face à elle. 
          Une même rue peut paraître accueillante sous l'ambre d'un coucher de soleil ou menaçante sous le bleu électrique d'un néon.
        </p>
        <p>
          Maîtriser le spectre, c'est passer de la vision à la perception. C'est comprendre que chaque teinte porte une charge psychologique 
          que vous pouvez utiliser pour guider l'âme du spectateur.
        </p>
      </Immersion>

      <KnowledgeNode title="I. La Danse des Kelvins">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4 font-light text-lg">
                <p>
                    La lumière a une température, mesurée en <strong>Kelvins (K)</strong>. 
                    Elle n'est jamais vraiment blanche. Elle voyage du feu d'une bougie (1500K) au bleu glacial du ciel de midi (10000K).
                </p>
                <p>
                    Décider de votre balance des blancs, c'est choisir le filtre émotionnel à travers lequel vous montrez le monde. 
                    Voulez-vous la vérité neutre ou la poésie d'un instant teinté ?
                </p>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Thermometer className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="my-24 space-y-8">
        <header className="text-center space-y-2">
            <h3 className="text-xs font-black text-amberGlow uppercase tracking-[0.5em]">Simulateur d'Harmonies Chromatiques</h3>
            <p className="text-[10px] text-white/20 uppercase italic font-mono">Apprivoisez la température et les opposés</p>
        </header>
        <ColorHarmonyTool />
      </section>

      <KnowledgeNode title="II. Le Contraste de Complémentarité">
        <div className="flex flex-col md:flex-row-reverse gap-10">
            <div className="flex-1 space-y-4 font-light">
                <p>
                    Une couleur n'existe jamais seule ; elle est définie par celles qui l'entourent. 
                    Le <strong>contraste complémentaire</strong> (Orange vs Bleu, Rouge vs Vert) est la technique la plus puissante pour isoler un sujet.
                </p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-sm italic text-textMain/60 leading-relaxed">
                        "Un sujet chaud (ambre) sur un fond froid (bleu) créera une profondeur immédiate que la règle des tiers seule ne peut pas offrir."
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Palette className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <ScienceWell title="Données du Puits Chromatique">
        <ul className="space-y-4">
          <li><span className="text-amberGlow">●</span> <strong>Golden Hour :</strong> Période juste avant le coucher du soleil où la lumière est rasante et chaude (~3000K).</li>
          <li><span className="text-amberGlow">●</span> <strong>Heure Bleue :</strong> Période juste après le coucher où le ciel s'assombrit vers un bleu profond et uniforme (~8000K).</li>
          <li><span className="text-amberGlow">●</span> <strong>Contraste Simultané :</strong> Phénomène où l'œil intensifie une couleur en présence de sa complémentaire.</li>
        </ul>
      </ScienceWell>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-8 border-l-2 border-amberGlow/20 pl-8"
      >
        <h3 className="text-amberGlow font-mono text-[10px] tracking-[0.5em] uppercase flex items-center gap-2">
            <Sun className="w-4 h-4" /> La Résonance de l'Auteur
        </h3>
        <p className="text-textMain/60 italic font-light text-xl leading-relaxed">
          "L'IA sait quelle couleur est statistiquement 'belle'. Mais seul l'auteur sait quelle couleur est 'juste'. 
          La justesse d'une teinte est celle qui résonne avec le souvenir que vous voulez laisser. Ne laissez pas l'appareil corriger votre émotion."
        </p>
      </motion.section>

      {/* LE DÉFI FINAL DU TRONC */}
      <section className="mt-32 p-12 border-2 border-amberGlow bg-black rounded-[48px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <ShieldCheck className="w-32 h-32 text-amberGlow" />
        </div>
        
        <div className="absolute -top-4 -right-4 bg-amberGlow text-background px-6 py-2 font-black rotate-3 text-xs tracking-widest uppercase shadow-xl">
          Certification Tronc
        </div>

        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-8">
            Défi : L'Harmonie des Opposés
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12">
            <p>
                C'est votre examen final pour valider le <strong>Tronc</strong>. Vous devez soumettre une image qui utilise :
            </p>
            <ul className="text-xs text-white/40 italic space-y-3">
                <li className="flex gap-3"><span className="text-amberGlow font-bold">1.</span> Un contraste de couleurs complémentaires (ex: Sujet Orange / Fond Bleu).</li>
                <li className="flex gap-3"><span className="text-amberGlow font-bold">2.</span> Une gestion précise de la balance des blancs (Golden Hour ou Heure Bleue).</li>
                <li className="flex gap-3"><span className="text-amberGlow font-bold">3.</span> Une composition vue en M1.2.</li>
            </ul>
        </div>
        
        <UploadExercise moduleId="1.3" />
        
        <p className="mt-8 text-center text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic italic">
            Analyse IA : Le système calculera les pics de saturation et la distance chromatique entre vos teintes dominantes.
        </p>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center italic">
        "Le Tronc est solide. Les Branches s'ouvrent devant vous."
      </footer>

    </LectureLayout>
  );
}
