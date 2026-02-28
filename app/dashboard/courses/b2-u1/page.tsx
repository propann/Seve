"use client";

import React from "react";
import { LectureLayout, Hook, Immersion } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { Camera, Zap } from "lucide-react";

/**
 * MODULE B2.U.1 : L'INSTINCT DE LA RUE
 */
export default function ModuleB2U1() {
  return (
    <LectureLayout 
      title="B2.U.1 - L'Instinct de la Rue" 
      subtitle="Anticipation et Instant Décisif"
      level="Branche Urbanite"
      prevSlug="b2-c3"
      nextSlug="b2-u2"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-yellow-400 leading-relaxed border-l-4 border-yellow-500 pl-6 shadow-glow">
          "Photographier, c'est mettre sur la même ligne de mire la tête, l'œil et le cœur." — Henri Cartier-Bresson
        </p>
      </section>

      <Hook>
        "Dans la rue, le monde ne s'arrête jamais pour vous. C'est à vous de prévoir où la vie va exploser."
      </Hook>

      <Immersion>
        <p>
          Bienvenue dans la <strong>Branche Urbanite</strong>. Ici, la ville est votre théâtre et chaque passant est un acteur qui s'ignore. 
          La Street Photography n'est pas une question de réglages, c'est une question de <strong>présence</strong>.
        </p>
        <p>
          L'instant décisif n'est pas un coup de chance. C'est le moment précis où la géométrie, la lumière et l'humain 
          s'alignent pour créer une image qui dépasse la simple capture de la réalité.
        </p>
      </Immersion>

      <KnowledgeNode title="I. L'Art de l'Invisibilité">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                    Pour capturer l'authenticité, vous devez vous fondre dans le décor. 
                    Un photographe de rue efficace est une ombre. Il ne perturbe pas la scène, il l'observe.
                </p>
                <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                    <p className="text-sm font-black text-yellow-500 uppercase tracking-widest italic leading-relaxed">
                        Habillez-vous sombre. Gardez votre appareil prêt. <br/>
                        Utilisez des focales fixes (35mm ou 50mm) pour "penser" avec votre corps.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Camera className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-yellow-500 bg-black rounded-[48px] relative overflow-hidden group shadow-[0_0_50px_rgba(234,179,8,0.1)]">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <Zap className="w-32 h-32 text-yellow-500" />
        </div>
        
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-8">
            L'Épreuve de l'Instant
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12">
            <p>
                Pour valider ce premier contact urbain, vous devez capturer une <strong>interaction spontanée</strong> :
            </p>
            <ul className="list-disc ml-6 space-y-2 text-sm text-white/60">
                <li>Un regard, un geste, ou une collision géométrique entre un humain et son environnement.</li>
                <li>L'image doit être prise sur le vif, sans mise en scène.</li>
                <li>Le sujet doit sembler ignorer votre présence.</li>
            </ul>
        </div>
        
        <UploadExercise moduleId="2.U.1" />
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole B2.U.1 | L'Arbre de la Photographie
      </footer>

    </LectureLayout>
  );
}
