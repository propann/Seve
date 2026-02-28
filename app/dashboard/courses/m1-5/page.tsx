"use client";

import { LectureLayout } from "@/components/layout/LectureLayout";
import { KnowledgeNode } from "@/components/ui/KnowledgeNode";
import { BeforeAfterSlider } from "@/components/interactive/BeforeAfterSlider";
import { UploadExercise } from "@/components/ui/UploadExercise";
import { HistogramVisualizer } from "@/components/interactive/HistogramVisualizer";

export default function Module15() {
  return (
    <LectureLayout 
      title="M1.5 - L'Alchimie du Pixel" 
      subtitle="Développement RAW et Color Grading"
      level="Sommet du Tronc"
      prevSlug="m1-4"
      nextSlug="b2-a1"
    >
      <section className="mb-20">
        <p className="text-2xl font-serif text-purple-400 leading-relaxed border-l-4 border-purple-500 pl-6 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
          "Photographier, c’est s’approprier l’objet de son regard. Développer, c’est lui donner son âme."
        </p>
      </section>

      <KnowledgeNode title="I. La Matière Brute (RAW)">
        <p>
          Le format RAW est le négatif du 21ème siècle. Il contient 100% des données captées par votre capteur, 
          sans aucune interprétation logicielle. Contrairement au JPEG, le RAW vous permet de modifier la 
          **Balance des Blancs** et l'**Exposition** sans dégrader la qualité de l'image.
        </p>
      </KnowledgeNode>

      <section className="my-16 p-8 bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden group">
        <h4 className="text-center font-mono text-[10px] uppercase text-purple-400 mb-8 tracking-[0.3em] font-black">Démonstration : Le Pouvoir du RAW</h4>
        <BeforeAfterSlider 
          before="/assets/courses/m15/m15_raw_flat.jpg" 
          after="/assets/courses/m15/m15_post_prod_studio.jpg" 
        />
        <p className="text-center text-[10px] text-gray-500 mt-6 italic font-mono tracking-widest">
          Glissez pour voir comment le post-traitement révèle les détails cachés.
        </p>
      </section>

      <KnowledgeNode title="II. Le Color Grading : Créer une atmosphère">
        <p>
          Le Color Grading n'est pas une correction, c'est une narration. En injectant du bleu dans les ombres 
          ou de l'ambre dans les hautes lumières, vous ne changez pas seulement les couleurs, 
          vous changez l'histoire que raconte votre image.
        </p>
      </KnowledgeNode>

      <div className="my-16 p-8 bg-black/40 rounded-3xl border border-white/5 overflow-hidden">
        <h4 className="text-center font-mono text-[10px] uppercase text-purple-400 mb-8 tracking-[0.3em] font-black italic animate-pulse">Histogram Master Visualizer</h4>
        <HistogramVisualizer />
      </div>

      <section className="mt-32 p-12 border-2 border-purple-500 bg-black rounded-[40px] shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute bottom-[-10%] right-[-5%] opacity-5 pointer-events-none uppercase font-black text-[120px] tracking-tighter text-purple-500 leading-none">SIGNATURE</div>
        
        <h3 className="text-3xl font-bold mb-6 text-white uppercase italic tracking-widest relative z-10">Défi : L'Éveil du Négatif</h3>
        <p className="mb-8 text-gray-300 leading-relaxed max-w-2xl relative z-10">
          Choisissez une de vos photos précédentes. Développez-la pour lui donner une ambiance 
          radicalement différente (ex: passer d'une scène joyeuse à une scène mélancolique via la colorimétrie). 
          Expliquez votre intention artistique.
        </p>
        
        <div className="relative z-10">
            <UploadExercise 
                                moduleId="1.5"
                 
                instruction="L'IA analysera l'histogramme et le décalage chromatique pour valider votre intention artistique."
            />
        </div>
      </section>
    </LectureLayout>
  );
}
