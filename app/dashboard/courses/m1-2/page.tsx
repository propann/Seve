"use client";

import React from "react";
import { LectureLayout, Hook, Immersion, ScienceWell } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { CompositionAnalyzer } from "@/components/interactive/CompositionAnalyzer";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { motion } from "framer-motion";
import { Frame, Compass, Maximize, ShieldAlert } from "lucide-react";

/**
 * MODULE 1.2 : L'ORDRE DANS LE CHAOS
 * Le Tronc - Niveau 1.2
 */
export default function Module12() {
  return (
    <LectureLayout 
      title="M1.2 - L'Ordre dans le Chaos" 
      level="Tronc"
      prevSlug="m1-1"
      nextSlug="m1-3"
    >
      
      <Hook>
        "La composition est l'art de faire dire à une image ce que la réalité ne chuchote qu'à demi-mot."
      </Hook>

      <Immersion>
        <p>
          Le monde est un désordre permanent. Photographier, c'est l'acte de <strong>trancher</strong> dans ce chaos pour y imposer un sens. 
          Cadrer, c'est exclure. Ce que vous laissez en dehors de l'image est aussi vital que ce que vous y mettez.
        </p>
        <p>
          L'œil humain est paresseux. S'il n'est pas guidé par des lignes de force ou des points d'ancrage, il survole l'image sans s'arrêter. 
          Maîtriser la composition, c'est devenir le <strong>dictateur du regard</strong> de votre spectateur.
        </p>
      </Immersion>

      <KnowledgeNode title="I. La Géométrie Sacrée">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4 font-light">
                <p>
                    La <strong>Règle des Tiers</strong> est votre fondation, mais l'Architecte regarde plus loin. 
                    En utilisant la <strong>Spirale de Fibonacci</strong> (le Nombre d'Or), vous créez une dynamique organique qui semble ne jamais finir.
                </p>
                <div className="p-6 bg-amberGlow/5 border border-amberGlow/20 rounded-2xl">
                    <p className="text-sm font-black text-amberGlow uppercase tracking-widest italic">
                        "L'équilibre n'est pas la symétrie. Le vide a autant de poids que le plein."
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Frame className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="my-24 space-y-8">
        <header className="text-center space-y-2">
            <h3 className="text-xs font-black text-seve uppercase tracking-[0.5em]">Laboratoire d'Analyse Géométrique</h3>
            <p className="text-[10px] text-white/20 uppercase italic font-mono">Testez la structure sur vos propres archives</p>
        </header>
        <CompositionAnalyzer />
      </section>

      <KnowledgeNode title="II. Lignes et Tensions">
        <div className="flex flex-col md:flex-row-reverse gap-10">
            <div className="flex-1 space-y-4 font-light text-lg">
                <p>
                    Les <strong>diagonales</strong> apportent du dynamisme et de l'urgence. Les <strong>horizontales</strong> inspirent la sérénité. 
                    Mais le secret des Maîtres réside dans le <strong>Cadre dans le Cadre</strong>.
                </p>
                <p>
                    Utiliser une fenêtre, une arche ou des branches pour emprisonner votre sujet, c'est lui donner une importance immédiate et monumentale.
                </p>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Compass className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <ScienceWell title="Lexique du Regard">
        <ul className="space-y-4">
          <li><span className="text-seve">●</span> <strong>Ligne de Fuite :</strong> Ligne convergente qui guide l'œil vers l'infini (ou le sujet).</li>
          <li><span className="text-seve">●</span> <strong>Poids Visuel :</strong> Capacité d'un élément (par sa couleur, sa taille ou son contraste) à attirer l'attention.</li>
          <li><span className="text-seve">●</span> <strong>Espace Négatif :</strong> Zone vide autour du sujet qui lui permet de "respirer" et d'exister.</li>
        </ul>
      </ScienceWell>

      {/* LE DÉFI DU TRONC */}
      <section className="mt-32 p-12 border-2 border-seve bg-black rounded-[48px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <Maximize className="w-32 h-32 text-seve" />
        </div>
        
        <div className="absolute -top-4 -right-4 bg-seve text-background px-6 py-2 font-black rotate-3 text-xs tracking-widest uppercase shadow-xl">
          Examen de Passage
        </div>

        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-8">
            Défi : La Géométrie du Réel
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12">
            <p>
                Pour valider ce module, vous devez capturer une scène qui utilise <strong>trois règles de composition</strong> simultanément :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-seve font-black text-[10px] uppercase">Obligation A</span>
                    <p className="text-xs text-white/60">Un <strong>Cadre dans le Cadre</strong> (Fenêtre, porte, silhouette).</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-seve font-black text-[10px] uppercase">Obligation B</span>
                    <p className="text-xs text-white/60">Une <strong>Ligne de Fuite</strong> menant vers le sujet.</p>
                </div>
            </div>
        </div>
        
        <UploadExercise moduleId="1.2" />
        
        <div className="mt-8 flex items-center justify-center gap-3 text-[9px] font-black text-amberGlow/40 uppercase tracking-[0.4em] italic bg-amberGlow/5 p-4 rounded-xl border border-amberGlow/10">
            <ShieldAlert className="w-3 h-3" /> Analyse IA : Détection des lignes dominantes et des masses géométriques.
        </div>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole M1.2 | L'Arbre de la Photographie
      </footer>

    </LectureLayout>
  );
}
