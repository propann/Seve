"use client";

import { LectureLayout } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { ExposureTimer } from "@/components/interactive/ExposureTimer";
import { UploadExercise } from "@/components/ui/UploadExercise";

export default function ModuleB2A3() {
  return (
    <LectureLayout 
      title="B2.A.3 - L'Empreinte Matérielle" 
      subtitle="Tirage Argentique et Procédés Alternatifs"
      level="Sommet de la Branche Alchimiste"
      prevSlug="b2-a2"
      nextSlug="b2-c1"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-blue-300 leading-relaxed border-l-4 border-blue-500 pl-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          "Une image sur un écran est une information. Une image sur papier est une présence."
        </p>
      </section>

      <KnowledgeNode title="I. Sculpter sous l'Agrandisseur">
        <p>
          Le tirage est l'étape où le photographe devient peintre. Grâce au **Masquage** (retenir la lumière 
          sur les zones trop sombres) et au **Brûlage** (ajouter de la lumière sur les zones trop claires), 
          vous dirigez l'œil du spectateur vers le cœur émotionnel de votre œuvre.
        </p>
      </KnowledgeNode>

      <section className="my-16 bg-zinc-950 p-10 border border-blue-500/20 rounded-3xl overflow-hidden relative group">
        <h4 className="text-center font-mono text-[10px] uppercase text-blue-400 mb-12 tracking-[0.3em] font-black italic animate-pulse">Simulateur de Temps de Pose</h4>
        <ExposureTimer />
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </section>

      <KnowledgeNode title="II. L'Alchimie Solaire : Le Cyanotype">
        <p>
          Inventé en 1842, le cyanotype utilise la lumière UV pour transformer des sels de fer en bleu de Prusse. 
          C'est un procédé sans appareil photo (photogramme) ou avec négatif grand format qui redonne 
          à la photographie son caractère artisanal et imprévisible.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-blue-600 bg-black rounded-[40px] relative overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)]">
        <div className="absolute inset-0 bg-blue-900/5 pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none uppercase font-black text-8xl tracking-tighter text-blue-500 rotate-12 leading-none">OBJECT SACRÉ</div>
        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-blue-500/5 blur-[100px] rounded-full" />
        
        <h3 className="text-3xl font-bold mb-6 text-white uppercase italic tracking-widest relative z-10">Défi Ultime : L'Objet Sacré</h3>
        <p className="mb-8 text-gray-400 leading-relaxed max-w-2xl relative z-10">
          Réalisez une œuvre au rendu "Procédé Ancien". Qu'il s'agisse d'un vrai tirage ou d'une hybridation 
          numérique poussée, l'image doit transpirer la matière. Les accidents, les traces de pinceau et 
          les textures de papier sont ici vos alliés.
        </p>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.A.3" 
                instruction="Le système évaluera l'authenticité de la texture et la gestion de la gamme tonale spécifique aux procédés anciens."
            />
        </div>
      </section>
    </LectureLayout>
  );
}
