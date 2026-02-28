"use client";

import { LectureLayout } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { FocalSimulator } from "@/components/interactive/FocalSimulator";
import { UploadExercise } from "@/components/ui/UploadExercise";

export default function Module14() {
  return (
    <LectureLayout 
      title="M1.4 - L'Œil de Verre" 
      subtitle="Focales, Perspectives et Compression de l'Espace"
      level="Tronc"
      prevSlug="m1-3"
      nextSlug="m1-5"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-sky-400 leading-relaxed border-l-4 border-sky-500 pl-6">
          "Si vos photos ne sont pas assez bonnes, c'est que vous n'êtes pas assez près." — Robert Capa. Mais parfois, être loin permet de voir l'invisible.
        </p>
      </section>

      <KnowledgeNode title="I. La Focale : Choisir sa Distance">
        <p>
          La focale (exprimée en mm) définit votre champ de vision. Mais elle définit surtout votre 
          **rapport au sujet**. Un 24mm vous force à toucher le monde, un 200mm vous en extrait pour devenir un pur observateur.
        </p>
      </KnowledgeNode>

      <section className="my-16 p-8 bg-zinc-900/50 border border-sky-500/20 rounded-2xl">
        <h4 className="text-center font-mono text-xs uppercase text-sky-400 mb-8 tracking-widest">Simulateur de Compression de Champ</h4>
        <FocalSimulator />
        <p className="text-center text-xs text-gray-500 mt-6 italic">
          Observez comment l'arrière-plan semble se rapprocher du sujet à mesure que la focale augmente.
        </p>
      </section>

      <KnowledgeNode title="II. Le Verre et le Capteur">
        <p>
          Un objectif de 50mm ne "voit" pas la même chose sur un capteur Full Frame que sur un APS-C. 
          C'est le **Crop Factor**. Comprendre ce rapport est essentiel pour maîtriser votre parc d'objectifs 
          et savoir ce que vous allez réellement obtenir au déclenchement.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-sky-500 bg-black rounded-xl shadow-[0_0_30px_rgba(14,165,233,0.1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none uppercase font-black text-6xl tracking-tighter">OPTIQUE LAB</div>
        <h3 className="text-3xl font-bold mb-6 text-white uppercase tracking-tighter">Défi : L'Échelle des Perspectives</h3>
        <p className="mb-8 text-gray-300 leading-relaxed">
          Capturez deux fois le même portrait ou objet. La première à **0.5m** de distance (Grand angle), 
          la seconde à **5m** de distance (Téléobjectif ou zoom maximum). Notez la différence de 
          morphologie du sujet. Envoyez les deux pour analyse.
        </p>
        
        <UploadExercise 
          moduleId="1.4" 
          instruction="L'IA analysera la perspective et la distorsion pour valider la compréhension des focales."
        />
      </section>
    </LectureLayout>
  );
}
