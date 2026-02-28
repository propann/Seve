"use client";

import Link from "next/link";

export default function CinemaPresentationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">Azoth | Graine Cinema</p>
        <h1 className="mt-4 font-serif text-5xl text-white md:text-6xl">Presentation Cinema</h1>
        <p className="mt-6 text-slate-300 max-w-3xl">
          Cette graine est en cours de construction. Le parcours complet sera propose dans l outil de creation puis soumis au vote.
        </p>
        <Link href="/garden" className="mt-10 inline-flex rounded-full border border-amber-200/60 bg-amber-300/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 hover:bg-amber-100 hover:text-slate-950">
          Retour au Jardin
        </Link>
      </section>
    </main>
  );
}
