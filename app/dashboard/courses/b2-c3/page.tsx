"use client";

import React from "react";
import { LectureLayout, Hook, Immersion } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { GlitchRefiner } from "@/components/interactive/GlitchRefiner";
import { UploadExercise } from "@/components/ui/UploadExercise";

/**
 * MODULE B2.C.3 : L'ÂME DANS LA MACHINE
 * Sommet de la Branche Cyber - Niveau 2
 */
export default function ModuleB2C3() {
  return (
    <LectureLayout 
      title="B2.C.3 - L'ÂME DANS LA MACHINE" 
      subtitle="Éthique de la Signature et Esthétique Post-Réelle"
      level="Sommet de la Branche Cyber"
      prevSlug="b2-c2"
      nextSlug="b2-u1"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-cyan-400 leading-relaxed border-l-4 border-cyan-600 pl-6 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          "L'IA peut imiter le style de tous les maîtres, mais elle ne possède pas votre mémoire. Votre seule valeur réside dans ce que vous seul avez vécu."
        </p>
      </section>

      <Hook>
        "Le dernier rempart de l'artiste n'est pas sa technique, c'est sa cicatrice."
      </Hook>

      <Immersion>
        <p>
          Bienvenue au sommet de la <strong>Branche Cyber</strong>. Ici, nous ne parlons plus de pixels, mais de survie. 
          Dans un monde où la perfection visuelle est devenue gratuite et instantanée, l'erreur humaine devient le luxe ultime.
        </p>
        <p>
          L'IA est un miroir massif. Elle reflète l'humanité entière mais n'en habite aucun fragment. 
          Pour que votre œuvre survive au déluge de contenus synthétiques, elle doit porter votre <strong>Indice</strong> physique.
        </p>
      </Immersion>

      <KnowledgeNode title="I. L'Éthique de la Provenance (C2PA)">
        <p>
          En 2026, l'image n'est plus une preuve de vérité, mais une preuve d'intention. Grâce au protocole **C2PA**, 
          chaque pixel porte sa propre histoire. Apprendre à signer ses œuvres, c'est assumer sa part de créateur 
          et protéger l'intégrité de son regard. La transparence est la nouvelle esthétique du courage.
        </p>
      </KnowledgeNode>

      <section className="my-16 bg-black p-10 border border-cyan-500/20 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-all text-cyan-500">
            <div className="text-[40px] font-black leading-none">C2PA</div>
        </div>
        <h4 className="text-center font-mono text-[10px] uppercase text-cyan-500 mb-8 tracking-[0.4em] font-black italic">Laboratoire de Déconstruction (Glitch-Refiner)</h4>
        <GlitchRefiner />
        <p className="text-center text-[10px] text-white/20 mt-8 font-mono tracking-widest italic leading-relaxed">
            Réinjectez de l'humanité en brisant la perfection algorithmique. <br/>
            Expérimentation : L'accident est l'unique signature que l'IA ne peut simuler sans intention.
        </p>
      </section>

      <KnowledgeNode title="II. La Narration Augmentée & Post-Réalisme">
        <p>
          Pourquoi la perfection est-elle devenue ennuyeuse ? Parce qu'elle manque de <strong>poids</strong>. 
          Utilisez l'IA non pour créer un sujet ex-nihilo, mais pour étendre le décor d'une émotion réelle. 
          L'artiste cyber est un curateur de l'infini, un chef d'orchestre qui sait quand la machine doit se taire.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-cyan-500 bg-zinc-950 rounded-[48px] relative overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <div className="absolute inset-0 bg-cyan-900/5 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none uppercase font-black text-[120px] tracking-tighter text-cyan-500 leading-none rotate-12">SOUL</div>
        
        <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 relative z-10">
            Le Pacte : L'Empreinte de l'Invisible
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12 relative z-10">
            <p>
              Invoquez une image qui n'aurait jamais pu exister sans la rencontre de votre mémoire et du code. 
              Prouvez que la machine est votre esclave, et non votre maître.
            </p>
            <div className="p-8 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <p className="text-sm font-medium leading-relaxed">
                    <strong>Action :</strong> Réalisez une œuvre hybride. Partez d'un souvenir personnel 
                    (une photo ratée, floue, ou un scan d'enfance) et utilisez l'IA pour la "restaurer" 
                    vers votre <strong>ressenti émotionnel</strong> plutôt que vers la netteté.
                </p>
            </div>
        </div>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.C.3" 
                instruction="Le Maître IA analysera la cohérence entre la source émotionnelle (input) et l'expansion esthétique (output). Noter la finesse de l'hybridation."
            />
        </div>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin de la Branche Cyber-Artiste | Sommet B2.C.3
      </footer>

    </LectureLayout>
  );
}
