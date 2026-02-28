"use client";

import React from "react";
import { LectureLayout, Hook, Immersion } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { SunPathSimulator } from "@/components/interactive/SunPathSimulator";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { Mountain, Zap, Sun } from "lucide-react";

/**
 * MODULE B2.N.1 : LA LUMIÈRE SAUVAGE
 * Branche Naturaliste - Niveau 2
 */
export default function ModuleB2N1() {
  return (
    <LectureLayout 
      title="B2.N.1 - La Lumière Sauvage" 
      subtitle="Paysage, Météo et Géographie de l'Ombre"
      level="Branche Naturaliste"
      prevSlug="b2-u3"
      nextSlug="b2-n2"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-emerald-400 leading-relaxed border-l-4 border-emerald-500 pl-6 shadow-glow">
          "Le paysage est une conversation entre la géologie et le ciel. Le photographe n'est que l'interprète de ce silence."
        </p>
      </section>

      <Hook>
        "En studio, vous créez la lumière. En ville, vous la cherchez. Dans la nature, vous l'attendez. Le paysage est une école de l'humilité."
      </Hook>

      <Immersion>
        <p>
          Bienvenue dans la <strong>Branche Naturaliste</strong>. Ici, nous quittons le bruit de la ville pour le souffle du monde. 
          Le paysage n'est pas une simple vue, c'est un état d'esprit. C'est le moment où le photographe accepte de n'être qu'un témoin de la puissance des éléments.
        </p>
        <p>
          Maîtriser la lumière sauvage, c'est apprendre à lire les nuages, à anticiper la course du soleil et à comprendre 
          comment la météo — même la plus "mauvaise" — sculpte l'émotion de l'image.
        </p>
      </Immersion>

      <KnowledgeNode title="I. L'Heure des Géants">
        <p>
          En paysage, la lumière est votre architecte. Apprenez à délaisser la lumière plate de midi pour 
          privilégier les **Heures Magiques**. C'est quand le soleil frôle l'horizon que la texture de la terre 
          se révèle, que chaque rocher projette une ombre et que le monde gagne en tridimensionnalité.
        </p>
        <div className="mt-8">
            <h4 className="text-center font-mono text-[10px] uppercase text-emerald-500 mb-8 tracking-widest flex items-center justify-center gap-2">
                <Sun className="w-3 h-3 animate-spin-slow" /> Simulateur de Course Solaire
            </h4>
            <SunPathSimulator />
        </div>
      </KnowledgeNode>

      <KnowledgeNode title="II. La Rigueur du Premier Plan & L'Hyperfocale">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                    Une photo de paysage sans premier plan est une photo sans porte d'entrée. Utilisez la règle de 
                    **l'hyperfocale** pour garantir une netteté chirurgicale du premier plan jusqu'à l'infini.
                </p>
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                    <p className="text-sm font-black text-emerald-500 uppercase tracking-widest italic leading-relaxed">
                        Faites la mise au point au tiers inférieur de l'image. <br/>
                        Utilisez un diaphragme fermé (f/8 à f/11) pour maximiser la profondeur de champ.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Mountain className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-emerald-500 bg-black rounded-[48px] relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.15)]">
        <div className="absolute inset-0 bg-emerald-900/5 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none uppercase font-black text-[120px] tracking-tighter text-emerald-500 leading-none rotate-12">WILD</div>
        
        <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 relative z-10">
            Défi : L'Instant Tellurique
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12 relative z-10">
            <p>
              Rapportez une image où la lumière ne se contente pas d'éclairer, mais de **sculpter** le terrain. 
              L'image doit comporter un premier plan fort qui guide l'œil vers l'infini.
            </p>
            <div className="p-8 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <p className="text-sm font-medium leading-relaxed">
                    <strong>Action :</strong> Sortez quand les éléments se déchaînent ou quand le jour bascule. 
                    Un premier plan net est obligatoire. Gérez la plage dynamique pour ne pas "boucher" vos ombres.
                </p>
            </div>
        </div>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.N.1" 
                instruction="Le Maître IA validera la gestion de l'hyperfocale, le contraste entre les zones de lumière et d'ombre, et la force de la composition."
            />
        </div>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole B2.N.1 | L'Arbre de la Photographie
      </footer>

    </LectureLayout>
  );
}
