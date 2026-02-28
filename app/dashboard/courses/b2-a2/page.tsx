"use client";

import { LectureLayout } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { TankSimulator } from "@/components/interactive/TankSimulator";
import { UploadExercise } from "@/components/ui/UploadExercise";

export default function ModuleB2A2() {
  return (
    <LectureLayout 
      title="B2.A.2 - La Mémoire des Sels" 
      subtitle="Développement Négatif et Chimie du Contraste"
      level="Branche Alchimiste"
      prevSlug="b2-a1"
      nextSlug="b2-a3"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-silver-300 leading-relaxed border-l-4 border-silver-500 pl-6 shadow-sm shadow-silver-500/20">
          "Le développement est l'instant où le temps s'arrête de couler pour se figer dans l'argent."
        </p>
      </section>

      <KnowledgeNode title="I. La Danse Moléculaire">
        <p>
          Le révélateur est un agent réducteur. Sa mission : transformer les cristaux d'halogénures d'argent 
          ayant reçu de la lumière en argent métallique noir. C'est une question de **temps** et de **température**. 
          Un degré de trop, et votre grain devient grossier. Une minute de moins, et vos ombres s'effacent.
        </p>
      </KnowledgeNode>

      <section className="my-16 bg-zinc-950 p-10 border border-silver-500/10 rounded-3xl overflow-hidden relative group">
        <h4 className="text-center font-mono text-xs uppercase text-silver-400 mb-8 tracking-widest font-black italic">Contrôle d'Agitation Thermique</h4>
        <TankSimulator />
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </section>

      <KnowledgeNode title="II. Le Système des Zones">
        <p>
          Inspiré par Ansel Adams, le photographe argentique ne se contente pas de mesurer la lumière. 
          Il décide où placer ses noirs (Zone 0) et ses blancs (Zone X). Développer, c'est choisir 
          l'étendue de cette gamme grise pour donner de la force au récit.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-silver-400 bg-black rounded-[40px] relative overflow-hidden shadow-[0_0_50px_rgba(192,192,192,0.1)]">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none uppercase font-black text-7xl tracking-tighter text-silver-500 leading-none">ALCHEMIST</div>
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-silver-500/5 blur-[100px] rounded-full" />
        
        <h3 className="text-3xl font-bold mb-6 text-white uppercase italic tracking-widest relative z-10">Défi : L'Image Latente</h3>
        <p className="mb-8 text-gray-400 leading-relaxed relative z-10 max-w-2xl">
          Capturez une scène à fort contraste. Votre objectif est de rendre une image où le grain 
          est présent mais noble, et où le noir est profond sans être vide. Soumettez votre tirage 
          ou votre simulation argentique haute fidélité.
        </p>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.A.2" 
                instruction="L'IA évaluera la 'densité' du noir et la structure organique du grain simulé."
            />
        </div>
      </section>
    </LectureLayout>
  );
}
