"use client";

import React from "react";
import { LectureLayout, Hook, Immersion } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { Users, Zap } from "lucide-react";

/**
 * MODULE B2.U.2 : SOCIOLOGIE DU REGARD
 */
export default function ModuleB2U2() {
  return (
    <LectureLayout 
      title="B2.U.2 - Sociologie du Regard" 
      subtitle="Cadrage, Contexte et Portrait de Rue"
      level="Branche Urbanite"
      prevSlug="b2-u1"
      nextSlug="b2-u3"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-yellow-400 leading-relaxed border-l-4 border-yellow-500 pl-6 shadow-glow">
          "Si vos photos ne sont pas assez bonnes, c'est que vous n'êtes pas assez près." — Robert Capa
        </p>
      </section>

      <Hook>
        "Photographier un inconnu, c'est lui offrir une existence éternelle. C'est un acte de connexion intense et fugace."
      </Hook>

      <Immersion>
        <p>
          Après avoir appris l'invisibilité, nous apprenons la <strong>confrontation bienveillante</strong>. 
          Le portrait de rue est le sommet de la sociologie visuelle. C'est l'art de capturer une identité 
          à travers un décor, une posture, ou un détail vestimentaire.
        </p>
        <p>
          L'environnement n'est pas un fond, c'est un personnage. Un ouvrier sur un chantier ne raconte pas 
          la même histoire que le même homme dans le métro.
        </p>
      </Immersion>

      <KnowledgeNode title="I. L'Homme et son Décor">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-4">
                <p>
                    Le cadrage en photographie sociale doit inclure suffisamment de contexte pour raconter une vie, 
                    sans noyer le sujet dans le désordre. C'est une question d'équilibre entre le <strong>Portrait</strong> et le <strong>Paysage Urbain</strong>.
                </p>
                <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                    <p className="text-sm font-black text-yellow-500 uppercase tracking-widest italic leading-relaxed">
                        N'oubliez pas les mains. Souvent, elles en disent plus que le visage. <br/>
                        Utilisez les lignes de fuite pour diriger l'œil vers votre sujet humain.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-48 flex items-center justify-center">
                <Users className="w-32 h-32 text-white/5" />
            </div>
        </div>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-yellow-500 bg-black rounded-[48px] relative overflow-hidden group shadow-[0_0_50px_rgba(234,179,8,0.1)]">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <Zap className="w-32 h-32 text-yellow-500" />
        </div>
        
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-8">
            L'Épreuve Sociale
        </h3>
        
        <div className="space-y-8 text-textMain/80 font-light text-lg mb-12">
            <p>
                Pour valider cette immersion, vous devez soumettre un <strong>portrait environnemental</strong> :
            </p>
            <ul className="list-disc ml-6 space-y-2 text-sm text-white/60">
                <li>Le sujet doit être le point focal clair de l'image.</li>
                <li>L'arrière-plan doit apporter une information cruciale sur la situation du sujet.</li>
                <li>L'image doit dégager une émotion (solitude, fierté, fatigue, joie).</li>
            </ul>
        </div>
        
        <UploadExercise moduleId="2.U.2" />
      </section>

      <footer className="pt-20 text-[10px] font-mono text-white/20 uppercase tracking-widest text-center">
        Fin du Protocole B2.U.2 | L'Arbre de la Photographie
      </footer>

    </LectureLayout>
  );
}
