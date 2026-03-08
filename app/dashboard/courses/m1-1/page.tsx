"use client";

import React from "react";
import { LectureLayout, Hook, Immersion, ScienceWell } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { ExposureSim } from "@/components/interactive/ExposureSim";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { Aperture, Timer, Zap, ShieldCheck } from "lucide-react";

/**
 * MODULE 1.1 : LA TRINITÉ DE LA LUMIÈRE
 * Le Tronc - Niveau 1
 */
export default function Module11() {
  return (
    <LectureLayout 
      title="M1.1 - La Trinité de la Lumière" 
      level="Tronc"
      prevSlug="m0-3"
      nextSlug="m1-2"
    >
      
      <Hook>
        "Sortir du mode automatique, c'est cesser de laisser une machine décider de vos souvenirs."
      </Hook>

      <Immersion>
        <p>
          Bienvenue sur le <strong>Tronc</strong>. Ici, nous cessons de subir la lumière pour commencer à la diriger. 
          Le triangle de l'exposition est votre alphabet. Sans lui, vous ne pouvez pas écrire d'images ; vous ne faites que recopier ce que l'appareil voit.
        </p>
        <p>
          Chaque photographie est un équilibre entre trois forces : l'espace (Ouverture), le temps (Vitesse) et la soif (ISO). 
          Changer l'un, c'est forcément impacter les autres. C'est la loi de la <strong>réciprocité</strong>.
        </p>
      </Immersion>

      <KnowledgeNode title="I. L'Ouverture : La Fenêtre">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                    L'ouverture (notée <strong>f/</strong>) contrôle le diamètre de l'iris de votre objectif. 
                    C'est elle qui décide de ce qui est net et de ce qui se fond dans le <strong>Bokeh</strong>.
                </p>
                <div className="p-6 bg-seve/5 border border-seve/20 rounded-2xl">
                    <p className="text-sm font-black text-seve uppercase tracking-widest italic leading-relaxed">
                        Petit chiffre (f/1.8) = Grande ouverture = Fond flou. <br/>
                        Grand chiffre (f/16) = Petite ouverture = Tout est net.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Aperture className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="my-24 space-y-8">
        <header className="text-center space-y-2">
            <h3 className="text-xs font-black text-seve uppercase tracking-[0.5em]">Console de Pilotage v2.0</h3>
            <p className="text-[10px] text-white/20 uppercase italic">Expérimentez la loi de réciprocité en temps réel</p>
        </header>
        <ExposureSim />
      </section>

      <KnowledgeNode title="II. La Vitesse : Le Regard">
        <div className="flex flex-col md:flex-row-reverse gap-10">
            <div className="flex-1 space-y-4">
                <p>
                    La vitesse d'obturation détermine combien de temps le capteur "regarde" la scène. 
                    C'est l'outil de la dynamique. 
                </p>
                <p>
                    Voulez-vous figer une goutte d'eau (1/4000s) ou peindre le mouvement des étoiles (30s) ? 
                    La vitesse n'est pas qu'un réglage de luminosité, c'est votre rapport au <strong>mouvement du monde</strong>.
                </p>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Timer className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <KnowledgeNode title="III. L'ISO : La Soif">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                    L'ISO est la sensibilité de votre capteur. Plus il est haut, plus votre capteur "amplifie" le peu de lumière qu'il reçoit. 
                </p>
                <p>
                    Mais attention : cette amplification a un prix. Le <strong>bruit numérique</strong> (ou le grain) apparaît, dégradant la pureté de l'image. 
                    L'art du photographe est de rester à l'ISO le plus bas possible pour garantir la qualité.
                </p>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Zap className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <ScienceWell title="Loi de Réciprocité">
        <p className="leading-loose">
            Si vous divisez votre temps de pose par 2 (vitesse plus rapide), vous devez multiplier votre entrée de lumière par 2 (ouvrir le diaphragme d'un cran) pour garder la même exposition. 
            <strong> Exemple :</strong> f/8 à 1/125s donne la même luminosité que f/5.6 à 1/250s. Seul le flou d'arrière-plan change.
        </p>
      </ScienceWell>

      {/* LE DÉFI DU TRONC */}
      <section className="mt-32 p-12 border-2 border-seve bg-black rounded-[48px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <ShieldCheck className="w-32 h-32 text-seve" />
        </div>
        
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-8">
            L'Épreuve du Triangle
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12">
            <p>
                Pour prouver votre maîtrise du Tronc, vous devez soumettre <strong>trois visions</strong> d'un même sujet :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                    <span className="text-seve font-black text-xs uppercase tracking-widest">01. Le Bokeh</span>
                    <p className="text-xs text-white/40 italic">Ouverture maximale pour isoler le sujet.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                    <span className="text-seve font-black text-xs uppercase tracking-widest">02. Le Figé</span>
                    <p className="text-xs text-white/40 italic">Vitesse rapide pour stopper une action ou un souffle.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                    <span className="text-seve font-black text-xs uppercase tracking-widest">03. La Nuit</span>
                    <p className="text-xs text-white/40 italic">ISO élevé pour voir là où l'œil humain fatigue.</p>
                </div>
            </div>
        </div>
        
        <UploadExercise moduleId="1.1" />
        
        <p className="mt-8 text-center text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">
            Note : Le Maître extraira les données EXIF pour valider vos intentions techniques.
        </p>
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole M1.1 | L'Arbre de la Photographie
      </footer>

    </LectureLayout>
  );
}
