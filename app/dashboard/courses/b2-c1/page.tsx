"use client";

import { LectureLayout } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { CyberTransformer } from "@/components/interactive/CyberTransformer";
import { UploadExercise } from "@/components/ui/UploadExercise";

export default function ModuleB2C1() {
  return (
    <LectureLayout 
      title="B2.C.1 - La Mutation du Pixel" 
      subtitle="Photographie Computationnelle et IA Générative"
      level="Branche Cyber-Artiste"
      prevSlug="b2-a3"
      nextSlug="b2-c2"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-cyan-400 leading-relaxed border-l-4 border-cyan-600 pl-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          "L'IA ne remplace pas le photographe, elle remplace l'impossibilité."
        </p>
      </section>

      <KnowledgeNode title="I. Le Capteur n'est qu'une Antenne">
        <p>
          Dans la branche Cyber, nous considérons que le signal capté par votre appareil est une **matière première**. 
          Grâce aux réseaux de neurones, nous pouvons désormais "développer" une photo non plus avec de la chimie, 
          mais avec des probabilités. C'est l'extension du domaine de la vision.
        </p>
      </KnowledgeNode>

      <section className="my-16 p-8 bg-black border border-cyan-500/30 rounded-3xl overflow-hidden group">
        <h4 className="text-center font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400 mb-12 animate-pulse font-black">Explorateur d'Espace Latent</h4>
        <CyberTransformer />
        <p className="text-center text-[9px] text-white/20 mt-8 font-mono tracking-widest italic">
          Expérimentation : Le signal brut se transmute en fonction de la Guidance Scale.
        </p>
      </section>

      <KnowledgeNode title="II. L'Éthique du Nouveau Regard">
        <p>
          Si l'on peut tout modifier, que reste-t-il du photographe ? L'**Intention**. 
          Votre valeur ne réside plus dans la capacité technique à capturer (l'IA le fait), 
          mais dans votre capacité à imaginer et à diriger la machine pour qu'elle serve votre propos.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-cyan-500 bg-zinc-950 rounded-[40px] relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute bottom-[-20%] right-[-10%] opacity-5 pointer-events-none uppercase font-black text-[120px] tracking-tighter text-cyan-500 leading-none">CYBER</div>
        
        <h3 className="text-3xl font-bold mb-6 text-white uppercase italic tracking-widest relative z-10">Défi : La Chimère Réelle</h3>
        <p className="mb-8 text-gray-400 leading-relaxed relative z-10">
          Soumettez une photographie "augmentée". Partez d'un cliché réel et utilisez l'IA pour y 
          insérer un élément onirique ou impossible. Le défi est de rendre la fusion **indécelable** au niveau de la lumière.
        </p>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.C.1" 
                instruction="L'IA analysera la fusion des textures et la cohérence de l'éclairage global."
            />
        </div>
      </section>
    </LectureLayout>
  );
}
