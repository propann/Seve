"use client";

import { LectureLayout } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { PromptVisualizer } from "@/components/interactive/PromptVisualizer";
import { UploadExercise } from "@/components/ui/UploadExercise";

export default function ModuleB2C2() {
  return (
    <LectureLayout 
      title="B2.C.2 - Les Projecteurs du Code" 
      subtitle="Prompting Optique et Direction de Lumière Synthétique"
      level="Branche Cyber-Artiste"
      prevSlug="b2-c1"
      nextSlug="b2-c3"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-cyan-300 leading-relaxed border-l-4 border-cyan-500 pl-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          "En photographie traditionnelle, vous capturez ce qui est là. En photographie cyber, vous invoquez ce qui devrait être."
        </p>
      </section>

      <KnowledgeNode title="I. Diriger le Fantôme">
        <p>
          L'IA n'est pas un moteur de recherche, c'est un interprète. Pour obtenir un résultat professionnel, 
          vous devez utiliser le langage technique des photographes. Dire 'belle lumière' ne suffit pas. 
          Dites **'Golden hour, backlighting with volumetric fog'**. Dites **'85mm lens, shallow depth of field'**.
        </p>
      </KnowledgeNode>

      <section className="my-16 bg-zinc-950 p-10 border border-cyan-500/20 rounded-3xl overflow-hidden relative group">
        <h4 className="text-center font-mono text-xs uppercase text-cyan-500 mb-8 tracking-widest font-black italic">Console de Prompting Optique</h4>
        <PromptVisualizer />
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </section>

      <KnowledgeNode title="II. La Maîtrise de l'Espace Latent">
        <p>
          Chaque image générée existe déjà potentiellement dans l'espace latent de l'IA. Votre rôle est de 
          naviguer dans ce chaos pour extraire la forme parfaite. La maîtrise du **ControlNet** vous permet 
          désormais d'imposer votre propre géométrie à l'imagination de la machine.
        </p>
      </KnowledgeNode>

      <section className="mt-32 p-12 border-2 border-cyan-500 bg-black rounded-[40px] relative overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)]">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none uppercase font-black text-7xl tracking-tighter text-cyan-500">CYBER LAB</div>
        
        <h3 className="text-3xl font-bold mb-6 text-white uppercase italic tracking-widest relative z-10">Défi : L'Invention du Passé</h3>
        <p className="mb-8 text-gray-400 leading-relaxed relative z-10 max-w-2xl">
          Utilisez l'IA pour créer une image hybride. Elle doit posséder la texture d'un tirage argentique 
          du siècle dernier (1920), mais représenter une réalité impossible ou anachronique (ex: un smartphone dans un salon victorien). 
          Le but est de tromper l'œil sur l'origine temporelle de l'image.
        </p>
        
        <div className="relative z-10">
            <UploadExercise 
                moduleId="2.C.2" 
                instruction="Le Maître IA évaluera la qualité du grain simulé et la gestion des anachronismes."
            />
        </div>
      </section>
    </LectureLayout>
  );
}
