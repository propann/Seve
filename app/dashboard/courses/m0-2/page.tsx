"use client";

import React from "react";
import { LectureLayout } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { LensSimulator } from "@/components/ui/LensSimulator";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { WaveAnimation } from "@/components/ui/WaveAnimation";

export default function Module02() {
  return (
    <LectureLayout 
      title="M0.2 - La Particule et l'Onde" 
      level="Racines"
      prevSlug="m0-1"
      nextSlug="m0-3"
    >
      {/* SECTION 1 : L'ACCROCHE PHILO */}
      <section className="mb-20">
        <h2 className="text-seve font-mono text-xs uppercase tracking-[0.4em] mb-6">Philosophie de la lumière</h2>
        <p className="text-3xl md:text-4xl font-serif italic leading-relaxed text-white">
          "Photographier, c'est écrire avec des fantômes. Chaque photon qui frappe votre capteur est un voyageur temporel qui porte le message d'une étoile ou d'un visage."
        </p>
      </section>

      {/* SECTION 2 : PHYSIQUE (LA DUALITÉ) */}
      <KnowledgeNode title="I. Le Message de la Lumière">
        <p>
          La lumière est schizophrène. Elle est à la fois une **onde** (qui se déplace comme un cercle dans l'eau) 
          et une **particule** (le photon). 
        </p>
        <WaveAnimation />
        <p className="mt-8">
          En photographie, nous utilisons cette dualité : l'onde nous permet de focaliser la lumière grâce aux lentilles, 
          tandis que la particule vient frapper les halogénures d'argent (argentique) ou les photosites (numérique) 
          pour créer l'image. C'est l'**effet photoélectrique**, théorisé par Einstein.
        </p>
      </KnowledgeNode>

      {/* SECTION 3 : OPTIQUE (SIMULATEUR) */}
      <KnowledgeNode title="II. Plier la Réalité">
        <p className="mb-8 text-xl font-light">
          Une lentille n'est rien d'autre qu'un morceau de verre qui ralentit la lumière pour la forcer à se rejoindre 
          en un point précis : **le foyer**. C'est là que la magie du "Focus" opère.
        </p>
        
        {/* Intégration du simulateur interactif */}
        <div className="my-12">
          <LensSimulator />
          <p className="text-center text-[10px] text-white/20 mt-4 italic uppercase tracking-widest font-black">
            Interaction : Déplacez la lentille pour faire converger les rayons sur le capteur.
          </p>
        </div>
      </KnowledgeNode>

      {/* SECTION 4 : LE DÉFI (SPECTRE) */}
      <section className="mt-32 p-12 border border-seve/30 bg-black/40 rounded-[48px] relative overflow-hidden group hover:bg-black/60 transition-all">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-seve/5 blur-3xl rounded-full" />
        
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-6">Défi : La Décomposition du Spectre</h3>
        <p className="mb-10 text-textMain/60 leading-relaxed font-light text-lg">
          La lumière blanche est un mensonge. Elle cache toutes les couleurs du monde. 
          Votre mission est de la briser. Utilisez un prisme, un CD, ou un verre d'eau au soleil pour créer un 
          <span className="text-seve font-bold"> arc-en-ciel artificiel</span>.
        </p>
        
        <UploadExercise 
                    moduleId="0.2"
           
        />
        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mt-6 text-center italic">
            Protocole IA : L'IA analysera la présence de diffraction chromatique (spectre visible).
        </p>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole M0.2 | L'Arbre de la Photographie
      </footer>
    </LectureLayout>
  );
}
