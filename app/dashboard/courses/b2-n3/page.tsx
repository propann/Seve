"use client";

import React from "react";
import { LectureLayout, Hook, Immersion } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { ShutterSim } from "@/components/interactive/ShutterSim";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { Bird, ShieldCheck } from "lucide-react";

/**
 * MODULE B2.N.3 : L'ÉTHIQUE DU VIVANT
 * Sommet de la Branche Naturaliste - Niveau 2
 */
export default function ModuleB2N3() {
  return (
    <LectureLayout 
      title="B2.N.3 - L'Éthique du Vivant" 
      subtitle="Photographie Animalière, Affût et Biologie du Regard"
      level="Sommet de l'Arbre"
      prevSlug="b2-n2"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-emerald-300 leading-relaxed border-l-4 border-emerald-600 pl-6 shadow-glow">
          "Photographier un animal, c'est lui demander de nous raconter une histoire dont nous ne sommes pas les héros."
        </p>
      </section>

      <Hook>
        "Le bon photographe animalier n'est pas celui qui ramène la plus belle image, c'est celui dont le sujet n'a jamais soupçonné la présence."
      </Hook>

      <Immersion>
        <p>
          Bienvenue au sommet de la <strong>Branche Naturaliste</strong> et, par extension, au sommet de l'Arbre. Ici, nous touchons à la quintessence de la pratique photographique : le respect absolu de l'autre. 
          La photographie animalière n'est pas une chasse aux trophées visuels, c'est un témoignage humble de la beauté du vivant.
        </p>
        <p>
          Maîtriser l'animalier, c'est savoir disparaître pour laisser la place à l'instinct. C'est comprendre le vent, le biotope et l'ombre, tout en étant prêt à déclencher à une fraction de seconde lorsque la vie s'anime.
        </p>
      </Immersion>

      <KnowledgeNode title="I. L'Art de Disparaître (L'Affût)">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                  La photographie animalière est 90% de préparation et 10% de déclenchement. 
                  Comprendre la distance de fuite et les habitudes de votre sujet est ce qui différencie 
                  le touriste du naturaliste.
                </p>
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                    <p className="text-sm font-black text-emerald-400 uppercase tracking-widest italic leading-relaxed">
                        Le silence n'est pas suffisant. Surveillez votre silhouette et votre odeur. <br/>
                        Votre succès se mesure à l'absence totale de réaction du sujet face à votre présence.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Bird className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="my-16 bg-zinc-950 p-10 border border-emerald-500/20 rounded-3xl group">
        <h4 className="text-center font-mono text-[10px] uppercase text-emerald-400 mb-12 tracking-[0.4em] font-black italic group-hover:text-glow transition-all">
            Simulateur d'Obturation Haute Vitesse (Action Freeze)
        </h4>
        <ShutterSim />
        <p className="text-center text-[10px] text-white/20 mt-8 font-mono tracking-widest italic leading-relaxed">
            Observez comment la vitesse d'obturation (1/4000s) fige le battement d'ailes, révélant la structure physique du mouvement.
        </p>
      </section>

      <KnowledgeNode title="II. La Rigueur Technique en Suivi AF-C">
        <p>
          Face à un sujet imprévisible, votre boîtier doit être une extension de vos réflexes. 
          L'utilisation de l'**AF-C (Autofocus Continu)** avec suivi des yeux est votre meilleur allié. 
          En animalier, le focus sur l'œil est non négociable : c'est le point d'ancrage de l'âme et de l'émotion.
        </p>
        <p>
            Poussez vos ISO s'il le faut pour garantir une vitesse suffisante (1/2000s pour les oiseaux). 
            Un grain de bruit est préférable à un flou de bougé qui détruirait la vie du regard.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-emerald-500 bg-black rounded-[48px] relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none" />
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-32 h-32 text-emerald-500" />
        </div>
        
        <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 relative z-10">
            Défi Final : L'Invisibilité Sacrée
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12 relative z-10">
            <p>
              Rapportez une image d'une rencontre sauvage où l'animal est le protagoniste d'une scène 
              de vie pure. Le focus sur l'œil doit être impitoyable.
            </p>
            <div className="p-8 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <p className="text-sm font-medium leading-relaxed">
                    <strong>Action :</strong> Photographiez un animal sauvage (ou un oiseau) dans son habitat naturel. 
                    L'image doit prouver que l'animal n'est pas dérangé. Capturez son regard comme preuve de connexion.
                </p>
            </div>
        </div>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.N.3" 
                instruction="Le Maître IA validera la précision du focus sur l'œil, la gestion de la vitesse et la qualité éthique du cadrage (non-dérangement)."
            />
        </div>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Cycle Naturel | Sommet de l'Arbre B2.N.3
      </footer>

    </LectureLayout>
  );
}
