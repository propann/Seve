"use client";

import React from "react";
import { LectureLayout, Hook, Immersion, ScienceWell } from "@/components/layout/LectureLayout";
import { LightPathSchema } from "@/components/ui/LightPathSchema";
import { InteractiveComparison } from "@/components/ui/InteractiveComparison";
import { GlossaryTerm } from "@/components/ui/GlossaryTerm";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { motion } from "framer-motion";
import { BookOpen, Zap, AlertCircle, History } from "lucide-react";

/**
 * MODULE 0.1 : LA LUMIÈRE CAPTIVE (Version Diamant)
 */
export default function Module01() {
  return (
    <LectureLayout level="Racine 0.1" title="La Lumière Captive" nextSlug="m0-2">
      
      <Hook>
        "Avant d'être un objet, la photographie est un miracle physique qui se produit chaque jour sans que vous ne le sachiez."
      </Hook>

      {/* COUCHE PHILOSOPHIQUE */}
      <Immersion>
        <div className="flex items-center gap-3 mb-8 text-seve font-black tracking-widest uppercase text-xs">
            <BookOpen className="w-4 h-4" /> La Trace vs Le Dessin
        </div>
        <p>
          Pour le philosophe <strong>Charles Sanders Peirce</strong>, une photographie n'est pas une simple image. C'est un <GlossaryTerm term="Indice" definition="Un signe qui a une connexion physique réelle avec son objet, comme une fumée pour le feu." />. 
          Contrairement à un dessin qui est une interprétation, la photo est une <em>trace physique</em>.
        </p>
        <p>
          C'est la différence entre une empreinte de pas dans le sable et un croquis de cette empreinte. 
          La lumière a <strong>physiquement</strong> touché le sujet avant de frapper votre capteur. C'est ce lien organique qui donne à la photographie son pouvoir de vérité unique et mystérieux.
        </p>
      </Immersion>

      {/* COMPARISON SLIDER */}
      <InteractiveComparison />

      {/* COUCHE NARRATIVE */}
      <Immersion>
        <div className="flex items-center gap-3 mb-8 text-amberGlow font-black tracking-widest uppercase text-xs">
            <History className="w-4 h-4" /> L'Obstination de Niépce
        </div>
        <p>
          En 1826, <strong>Nicéphore Niépce</strong> est au bord de la faillite. Son invention, l'Héliographie, semble ne mener nulle part. 
          Il a déjà gâché des dizaines de plaques d'étain. Pourtant, ce jour-là, il étale son <GlossaryTerm term="Bitume de Judée" definition="Une résine naturelle qui durcit lorsqu'elle est exposée à la lumière ultraviolette." /> et laisse sa boîte ouverte pendant <strong>8 heures consécutives</strong>.
        </p>
        <p>
          Le soleil tourne dans le ciel, éclairant les deux côtés de la cour de sa maison (ce qui crée cet éclairage impossible sur la photo finale). 
          Niépce a failli abandonner à la 7ème heure. S'il l'avait fait, la photographie aurait attendu des décennies de plus.
        </p>
      </Immersion>

      <LightPathSchema />

      {/* COUCHE TECHNIQUE PRO */}
      <ScienceWell title="Le Puits de la Diffraction">
        <div className="space-y-6">
            <p>
                Pourquoi ne pas percer un trou infiniment petit pour avoir une image infiniment nette ? 
                C'est ici que la physique vous rattrape : la <strong>diffraction</strong>.
            </p>
            <div className="p-6 bg-black/40 rounded-2xl border-l-2 border-seve text-xs leading-relaxed italic">
                "Quand la lumière passe par un orifice trop étroit, les ondes se cognent aux bords et s'éparpillent (s'évasent). 
                Au lieu d'un point net, vous obtenez une tâche de diffusion (Disque d'Airy)."
            </div>
            <ul className="space-y-2">
                <li><span className="text-seve">●</span> <strong>Trou trop grand :</strong> Image floue (chevauchement des rayons).</li>
                <li><span className="text-seve">●</span> <strong>Trou idéal :</strong> Équilibre parfait entre géométrie et onde.</li>
                <li><span className="text-seve">●</span> <strong>Trou trop petit :</strong> Image floue par diffraction.</li>
            </ul>
            <p className="text-[10px] text-white/20 uppercase tracking-widest pt-4">
                Note : C'est pour cette même raison que vos objectifs pro sont moins nets à f/22 qu'à f/8.
            </p>
        </div>
      </ScienceWell>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-8"
      >
        <h3 className="text-seve font-mono text-[10px] tracking-[0.5em] uppercase flex items-center gap-2">
            <Zap className="w-4 h-4" /> La Résonance 2026
        </h3>
        <p className="text-textMain/60 italic font-light text-lg leading-relaxed">
          "Dans un monde saturé d'IA, le sténopé est un acte de résistance. Il nous rappelle que l'image est d'abord une rencontre physique entre la matière et le photon. 
          Maîtriser la <GlossaryTerm term="Réfraction" definition="La déviation de la lumière lorsqu'elle change de milieu." /> et la capture lente, c'est reprendre le contrôle sur le temps."
        </p>
      </motion.section>

      {/* LE DÉFI BÉTON */}
      <section className="pt-20 border-t border-white/5 space-y-12">
        <div className="space-y-6">
            <h2 className="text-4xl font-serif italic text-white uppercase tracking-tight">Le Défi : Le Rituel du Sténopé</h2>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <p className="text-textMain/80 leading-relaxed font-medium">
                    Pour valider ce module et débloquer le prochain niveau de l'Arbre, vous devez soumettre un <strong>Double-Flux</strong> :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-seve/20 flex items-center justify-center text-seve shrink-0">1</div>
                        <p className="text-xs text-white/40 italic"><strong>Le Dispositif :</strong> Photographiez votre boîte avec son trou d'épingle pour prouver votre installation physique.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-seve/20 flex items-center justify-center text-seve shrink-0">2</div>
                        <p className="text-xs text-white/40 italic"><strong>La Trace :</strong> Photographiez l'image projetée à l'intérieur (renversée et vaporeuse).</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 text-amberGlow text-[10px] font-black uppercase tracking-widest px-4">
                <AlertCircle className="w-3 h-3" /> L'IA vérifiera la présence d'une image inversée et la structure de votre boîte.
            </div>
        </div>

        <UploadExercise moduleId="0.1" maxFiles={2} />
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole M0.1 | L'Arbre de la Photographie
      </footer>

    </LectureLayout>
  );
}
