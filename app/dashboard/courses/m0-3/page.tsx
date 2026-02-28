"use client";

import React from "react";
import { LectureLayout, Hook, Immersion, ScienceWell } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { VanishingText } from "@/components/ui/VanishingText";
import { TimeSlicer } from "@/components/ui/TimeSlicer";
import { GlossaryTerm } from "@/components/ui/GlossaryTerm";
import { motion } from "framer-motion";
import { Ghost, Clock, ShieldCheck, Camera, Heart } from "lucide-react";

/**
 * MODULE 0.3 : LE POIDS DE L'INSTANT (Version Diamant)
 */
export default function Module03() {
  return (
    <LectureLayout 
      level="Racine 0.3" 
      title="Le Poids de l'Instant"
      prevSlug="m0-2"
      nextSlug="m1-1"
    >
      
      <Hook>
        "Toute photographie est un memento mori. Elle atteste que ce que vous voyez a été, et ne sera plus jamais."
      </Hook>

      <Immersion>
        <div className="flex items-center gap-3 text-seve font-black tracking-widest uppercase text-xs mb-8">
            <Ghost className="w-4 h-4" /> La Mort au Travail
        </div>
        <p>
          Roland Barthes, dans son œuvre fondamentale <em>La Chambre Claire</em>, définit l'essence de la photographie par une expression latine : <GlossaryTerm term="Interfuit" definition="Terme latin signifiant 'Il a été là'. La certitude absolue que le sujet a existé devant l'objectif." />.
        </p>
        <p>
          Chaque fois que vous appuyez sur le déclencheur, vous créez une petite victoire sur l'oubli, mais vous signez aussi l'acte de décès de l'instant. 
          L'image est immobile, alors que la vie continue. C'est ce poids, cette <strong>mélancolie de la lumière</strong>, qui fait la force d'une grande photo.
        </p>
      </Immersion>

      <KnowledgeNode title="I. Le Studium et le Punctum">
        <p>
          Barthes divise notre regard en deux forces :
        </p>
        <ul className="mt-6 space-y-6">
            <li className="flex gap-4">
                <div className="w-1 h-12 bg-white/10 shrink-0" />
                <p className="text-sm italic"><strong className="text-white">Le Studium :</strong> C'est l'intérêt poli que l'on porte à une photo. On comprend le contexte, la technique, l'histoire. C'est une lecture intellectuelle.</p>
            </li>
            <li className="flex gap-4">
                <div className="w-1 h-12 bg-seve shrink-0 shadow-[0_0_10px_#2ECC71]" />
                <p className="text-sm italic"><strong className="text-seve">Le Punctum :</strong> C'est la flèche qui vous traverse. Un détail imprévu, une émotion brute qui vous "poigne". Le Punctum ne s'explique pas, il se ressent.</p>
            </li>
        </ul>
      </KnowledgeNode>

      <Immersion>
        <p>
          Le photographe n'est pas un chasseur de Punctum (il est souvent accidentel), mais il doit créer le silence nécessaire pour qu'il puisse apparaître. 
          Cela commence par l'acte de <strong>trancher</strong> dans le flux du temps.
        </p>
      </Immersion>

      {/* Time Slicer Interaction */}
      <TimeSlicer />

      <KnowledgeNode title="II. La Mémoire Prothétique">
        <p>
          À force de photographier nos vies, nous remplaçons nos souvenirs organiques par des pixels. 
          L'image devient une prothèse de notre mémoire. 
        </p>
        <VanishingText>
          "Le souvenir est une trace qui s'efface. La photographie, elle, est une trace qui refuse de mourir. 
          Mais attention : une image trop parfaite finit par tuer l'imaginaire du souvenir."
        </VanishingText>
      </KnowledgeNode>

      <ScienceWell title="Mémento de l'Instant">
        <ul className="space-y-4">
          <li><span className="text-seve">●</span> <strong>Ça-a-été :</strong> Le noème (l'essence) de la photographie selon Barthes.</li>
          <li><span className="text-seve">●</span> <strong>Trace Indicielle :</strong> La preuve physique que la lumière a touché la matière.</li>
          <li><span className="text-seve">●</span> <strong>Obscurité :</strong> Sans elle, la lumière ne peut pas imprimer sa marque.</li>
        </ul>
      </ScienceWell>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-8 border-l-2 border-seve/20 pl-8"
      >
        <h3 className="text-seve font-mono text-[10px] tracking-[0.5em] uppercase flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" /> La Résonance Humaine
        </h3>
        <p className="text-textMain/60 italic font-light text-xl leading-relaxed">
          "L'IA peut générer des millions d'images 'parfaites'. Mais elle ne peut pas générer de Punctum, car elle n'a jamais <strong>été là</strong>. 
          Votre photo a de la valeur parce qu'elle est le témoignage de votre présence physique dans le monde. Ne l'oubliez jamais."
        </p>
      </motion.section>

      {/* EXAMEN FINAL DES RACINES */}
      <section className="mt-32 p-12 border border-seve/30 bg-gradient-to-b from-black/40 to-seve/[0.05] rounded-[48px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <ShieldCheck className="w-32 h-32 text-seve" />
        </div>
        
        <div className="absolute -top-4 -right-4 bg-seve text-background px-6 py-2 font-black rotate-3 text-xs tracking-widest uppercase shadow-xl">
          Certification Racines
        </div>

        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-8">
            Examen Final : Le Silence des Choses
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12">
            <p>
                Pour clore votre initiation aux Racines, vous ne devez pas montrer votre technique, mais votre <strong>âme</strong>.
            </p>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-4">
                <p className="text-sm italic leading-relaxed">
                    "Choisissez un objet personnel chargé d'histoire (une vieille montre, une lettre, un jouet d'enfance). 
                    Photographiez-le seul, sans artifice. Faites en sorte que l'on ressente le <strong>Ça-a-été</strong>. 
                    L'observateur doit sentir le poids de l'instant derrière l'image."
                </p>
            </div>
        </div>
        
        <UploadExercise moduleId="0.3" />
        
        <div className="mt-8 flex items-center justify-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">
            <Camera className="w-3 h-3" /> Analyse IA : Focus sur sujet unique + gestion de la pénombre (Atmosphère intime).
        </div>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center italic">
        "Les Racines sont ancrées. Le Tronc vous appelle."
      </footer>

    </LectureLayout>
  );
}
