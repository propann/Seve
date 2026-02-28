"use client";

import React from "react";
import { LectureLayout, Hook, Immersion } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { DOFVisualizer } from "@/components/interactive/DOFVisualizer";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { Microscope, Zap, Droplets } from "lucide-react";

/**
 * MODULE B2.N.2 : LE MONDE MINIATURE
 * Branche Naturaliste - Niveau 2
 */
export default function ModuleB2N2() {
  return (
    <LectureLayout 
      title="B2.N.2 - Le Monde Miniature" 
      subtitle="Macrophotographie et Géométrie de l'Infiniment Petit"
      level="Branche Naturaliste"
      prevSlug="b2-n1"
      nextSlug="b2-n3"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-lime-400 leading-relaxed border-l-4 border-lime-500 pl-6 shadow-glow">
          "À l'échelle du millimètre, une goutte d'eau devient une lentille, une fourmi devient un monstre, et le pollen devient une architecture complexe. La macro n'est pas un zoom, c'est un voyage spatial."
        </p>
      </section>

      <Hook>
        "Le plus petit détail du monde contient la structure du monde entier."
      </Hook>

      <Immersion>
        <p>
          Bienvenue au cœur du <strong>Micro-Monde</strong>. Ici, nous quittons notre échelle humaine pour explorer des dimensions où les lois de la physique semblent s'inverser. 
          En macrophotographie, vous ne photographiez plus des objets, vous capturez des textures, des reflets et des structures invisibles à l'œil nu.
        </p>
        <p>
          Maîtriser le monde miniature demande une patience infinie et une précision chirurgicale. Chaque millimètre de déplacement change radicalement votre image.
        </p>
      </Immersion>

      <KnowledgeNode title="I. La Profondeur de Champ Millimétrique">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                  En macro, vous vous battez contre les lois de la physique. À un rapport de 1:1, même avec une 
                  ouverture de f/11, votre zone de netteté est aussi fine qu'un cheveu.
                </p>
                <div className="p-6 bg-lime-500/5 border border-lime-500/20 rounded-2xl">
                    <p className="text-sm font-black text-lime-500 uppercase tracking-widest italic leading-relaxed">
                        Plus vous êtes proche, plus la zone de netteté s'amincit. <br/>
                        La mise au point ne se fait plus avec la bague de l'objectif, mais en déplaçant physiquement votre boîtier.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Microscope className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="my-16 bg-zinc-950 p-10 border border-lime-500/20 rounded-3xl group">
        <h4 className="text-center font-mono text-[10px] uppercase text-lime-500 mb-12 tracking-[0.4em] font-black italic group-hover:text-glow transition-all">
            Simulateur de Tranche de Netteté (Depth of Field)
        </h4>
        <DOFVisualizer />
        <p className="text-center text-[10px] text-white/20 mt-8 font-mono tracking-widest italic leading-relaxed">
            Observez la disparition du décor à mesure que vous approchez du sujet ou que vous ouvrez le diaphragme.
        </p>
      </section>

      <KnowledgeNode title="II. La Lumière et le Contraste Miniature">
        <p>
          Plus vous grossissez le sujet, plus vous perdez de lumière. Utiliser un réflecteur miniature ou un flash 
          déporté est souvent indispensable pour redonner du volume à des textures qui, à l'œil nu, semblent 
          plates et insignifiantes.
        </p>
        <p>
            Attention également à l'ombre de votre propre objectif : à 10cm du sujet, vous êtes votre propre ennemi.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-lime-500 bg-black rounded-[48px] relative overflow-hidden group shadow-[0_0_50px_rgba(132,204,22,0.15)]">
        <div className="absolute inset-0 bg-lime-900/5 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none uppercase font-black text-[120px] tracking-tighter text-lime-500 leading-none rotate-12">MICRO</div>
        
        <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 relative z-10">
            Le Regard de l'Insecte : L'Architecte du Minuscule
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12 relative z-10">
            <p>
              Isolez un fragment du vivant. Votre photo doit transformer une texture banale en un paysage 
              abstrait et fascinant.
            </p>
            <div className="p-8 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <p className="text-sm font-medium leading-relaxed">
                    <strong>Action :</strong> Photographiez un détail organique (texture de feuille, œil d'insecte, givre, pétale) 
                    avec un rapport de grandissement tel que l'objet devient une structure abstraite. 
                    La mise au point doit être d'une précision absolue.
                </p>
            </div>
        </div>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.N.2" 
                instruction="Le Maître IA validera la précision de la mise au point (point de focus) et la richesse texturale du sujet. Évaluation du bokeh et du micro-contraste."
            />
        </div>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin de la Branche Naturaliste | Sommet B2.N.2
      </footer>

    </LectureLayout>
  );
}
