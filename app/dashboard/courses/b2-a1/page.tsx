"use client";

import React from "react";
import { LectureLayout, Hook, Immersion, ScienceWell } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";

/**
 * MODULE 2.A.1 : L'ÂME DU GRAIN
 * Branche Alchimiste - Niveau 2
 */
export default function Module2A1() {
  return (
    <LectureLayout 
      title="B2.A.1 - L'Âme du Grain" 
      level="Branche Alchimiste"
      prevSlug="m1-5"
      nextSlug="b2-a2"
    >
      
      <Hook>
        "Le grain n'est pas un défaut de l'image, c'est sa respiration atomique."
      </Hook>

      <Immersion>
        <p>
          En entrant dans la <strong>Branche Alchimiste</strong>, nous quittons le monde du pixel lisse pour celui de la matière brute. 
          Le grain argentique n'est pas du bruit numérique ; c'est la structure même de la lumière figée dans l'argent.
        </p>
        <p>
          Maîtriser le grain, c'est comprendre comment la taille des cristaux d'halogénures d'argent influence la sensibilité, le contraste et le piqué de vos images.
        </p>
      </Immersion>

      <KnowledgeNode title="I. La Structure du Chaos">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                    Contrairement au capteur numérique où chaque pixel est un carré parfait, le film est composé de cristaux de formes et de tailles irrégulières. 
                    C'est cette irrégularité qui donne à la photographie argentique sa texture organique et son "modelé" unique.
                </p>
                <div className="p-6 bg-amberGlow/5 border border-amberGlow/20 rounded-2xl">
                    <p className="text-sm font-black text-amberGlow uppercase tracking-widest italic leading-relaxed">
                        Plus le film est sensible (ISO élevé), plus les grains sont gros et visibles. <br/>
                        Plus le film est lent (ISO bas), plus le grain est fin et l'image détaillée.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Activity className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <ScienceWell title="Émulsion et Physique">
        <p className="leading-loose">
            L'émulsion est une couche de gélatine contenant des cristaux d'argent. Lorsqu'un photon frappe un cristal, il crée une "image latente". 
            C'est cette trace invisible qui sera révélée par la chimie. La morphologie de ces cristaux (T-Grain vs Cubique) définit le caractère esthétique du film.
        </p>
      </ScienceWell>

      <section className="mt-32 p-12 border-2 border-amberGlow bg-black rounded-[48px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <Zap className="w-32 h-32 text-amberGlow" />
        </div>
        
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-8">
            L'Épreuve du Grain
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12">
            <p>
                Pour valider cette initiation alchimique, vous devez soumettre une image qui célèbre la texture :
            </p>
            <ul className="list-disc ml-6 space-y-2 text-sm text-white/60">
                <li>Capturez une scène où la texture est le sujet principal.</li>
                <li>Utilisez une simulation de grain argentique (si numérique) ou un vrai film 400 ISO+.</li>
                <li>Le grain doit servir l'émotion de l'image, sans l'étouffer.</li>
            </ul>
        </div>
        
        <UploadExercise moduleId="2.A.1" />
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole B2.A.1 | L'Arbre de la Photographie
      </footer>

    </LectureLayout>
  );
}
