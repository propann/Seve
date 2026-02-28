import Link from "next/link";
import { Lightbulb, Vote, Wrench } from "lucide-react";

export default function CourseCreationToolPage() {
  return (
    <main className="min-h-screen bg-background text-textMain px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-seve text-[10px] tracking-[0.35em] uppercase font-black">Atelier en preparation</p>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            Outil de Creation de Cours
          </h1>
          <p className="text-white/70 max-w-3xl">
            Cet espace va accueillir la future fabrique de cours: structure pedagogique, objectifs, exercices et integration dans l&apos;Arbre.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Lightbulb className="w-5 h-5 text-amberGlow mb-3" />
            <h2 className="text-white font-black uppercase text-sm">Idee</h2>
            <p className="text-white/60 text-xs mt-2">Proposez un sujet depuis le Jardin.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Vote className="w-5 h-5 text-seve mb-3" />
            <h2 className="text-white font-black uppercase text-sm">Vote communautaire</h2>
            <p className="text-white/60 text-xs mt-2">La communaute valide les priorites.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Wrench className="w-5 h-5 text-white mb-3" />
            <h2 className="text-white font-black uppercase text-sm">Production</h2>
            <p className="text-white/60 text-xs mt-2">Creation assistee de module (a venir).</p>
          </article>
        </section>

        <div className="rounded-3xl border border-seve/20 bg-seve/10 p-6">
          <p className="text-sm text-white/85">
            En attendant la sortie de l&apos;outil complet, utilisez le bouton <strong>Proposer un cours</strong> dans le Jardin pour soumettre des sujets au vote.
          </p>
        </div>

        <Link
          href="/garden"
          className="inline-flex items-center rounded-full border border-seve/30 bg-seve/15 px-6 py-3 text-seve font-black uppercase text-xs tracking-widest hover:bg-seve/20 transition-all"
        >
          Retour au Jardin
        </Link>
      </div>
    </main>
  );
}
