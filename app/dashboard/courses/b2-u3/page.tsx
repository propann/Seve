"use client";

import React from "react";
import { LectureLayout, Hook, Immersion } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { PerspectiveTool } from "@/components/interactive/PerspectiveTool";
import { NDFilterCalculator } from "@/components/interactive/NDFilterCalculator";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { Building2, Zap, Timer } from "lucide-react";

/**
 * MODULE B2.U.3 : LA VILLE FANTÔME
 * Sommet de la Branche Urbanite - Niveau 2
 */
export default function ModuleB2U3() {
  return (
    <LectureLayout 
      title="B2.U.3 - La Ville Fantôme" 
      subtitle="Architecture, Pose Longue et Esthétique du Vide"
      level="Sommet de la Branche Urbanite"
      prevSlug="b2-u2"
      nextSlug="b2-n1"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-yellow-400 leading-relaxed border-l-4 border-yellow-500 pl-6 shadow-glow">
          "L'architecture est une musique pétrifiée. La photographier, c'est apprendre à écouter le silence du béton."
        </p>
      </section>

      <Hook>
        "Le jour, la ville nous appartient. La nuit, ou par le prisme du temps long, elle redevient une structure minérale, indifférente à l'agitation humaine."
      </Hook>

      <Immersion>
        <p>
          Bienvenue au sommet de la <strong>Branche Urbanite</strong>. Ici, nous quittons le bruit social pour explorer l'ossuaire de béton. 
          La ville n'est plus un décor pour les humains, elle devient le sujet vivant. 
        </p>
        <p>
          La photographie d'architecture demande une rigueur mathématique. C'est un dialogue entre les lignes de fuite, 
          les masses de béton et la lumière froide de l'entre-deux-mondes.
        </p>
      </Immersion>

      <KnowledgeNode title="I. L'Élimination du Chaos">
        <p>
          La ville est un bruit permanent. En photographie d'architecture, notre rôle est de filtrer ce bruit. 
          En utilisant des **temps de pose de plusieurs secondes (voire minutes)** grâce aux filtres ND, l'humain devient transparent, 
          le mouvement s'efface, et seule reste la structure pure, l'intention de l'architecte.
        </p>
        <div className="mt-8 space-y-8">
            <h4 className="text-center font-mono text-[10px] uppercase text-yellow-500 mb-8 tracking-widest flex items-center justify-center gap-2">
                <Timer className="w-3 h-3" /> Simulateur de Pose Longue (Filtres ND)
            </h4>
            <NDFilterCalculator />
        </div>
      </KnowledgeNode>

      <section className="my-16 bg-zinc-950 p-10 border border-yellow-500/20 rounded-3xl group">
        <h4 className="text-center font-mono text-[10px] uppercase text-yellow-500 mb-12 tracking-[0.4em] font-black italic group-hover:text-glow transition-all">
            Correction de Perspective (Tilt-Shift Digital)
        </h4>
        <PerspectiveTool />
        <p className="text-center text-[10px] text-white/20 mt-8 font-mono tracking-widest italic leading-relaxed">
            Redressez les lignes verticales pour redonner à l'immeuble sa stature monumentale.
        </p>
      </section>

      <KnowledgeNode title="II. La Géométrie du Vide">
        <p>
          Le vide n'est pas une absence, c'est un poids. Apprenez à utiliser l'**espace négatif** pour donner de 
          l'importance à vos sujets urbains. Un ciel lourd, une place déserte ou un mur aveugle sont des 
          instruments de narration aussi puissants qu'un visage.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-yellow-600 bg-black rounded-[48px] relative overflow-hidden group shadow-[0_0_50px_rgba(234,179,8,0.15)]">
        <div className="absolute inset-0 bg-yellow-900/5 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none uppercase font-black text-[120px] tracking-tighter text-yellow-500 leading-none rotate-12">CITY</div>
        
        <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8 relative z-10">
            Le Silence Urbain : L'Espace entre les Atomes
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12 relative z-10">
            <p>
              Capturez la ville dans son état le plus pur. Votre image doit démontrer une maîtrise parfaite de la 
              géométrie (lignes droites) et du temps (pose longue ou abstraction).
            </p>
            <div className="p-8 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <p className="text-sm font-medium leading-relaxed">
                    <strong>Action :</strong> Photographiez un lieu habituellement bondé (une place, un carrefour, une gare) 
                    et le rendez totalement désert ou abstrait par l'utilisation de la pose longue (ou d'un cadrage géométrique pur).
                </p>
            </div>
        </div>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.U.3" 
                instruction="Le système validera la rigueur géométrique, la perfection des lignes verticales et la gestion des contrastes de luminance."
            />
        </div>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin de la Branche Urbanite | Sommet B2.U.3
      </footer>

    </LectureLayout>
  );
}
