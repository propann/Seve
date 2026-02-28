"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Network, Shield, Flame, Trophy, Server } from "lucide-react";
import { ModuleCard } from "@/components/course/ModuleCard";

const linuxTree = [
  {
    icon: Terminal,
    eyebrow: "Palier 1",
    title: "Germination",
    description: "Terminal, manipulation et flux: les fondamentaux pour prendre la main sur la machine.",
    bullets: ["Terminal", "Manipulation", "Flux"],
    href: "/garden/outils/creation-cours",
  },
  {
    icon: Network,
    eyebrow: "Palier 2",
    title: "Croissance",
    description: "Services, systeme et reseau: orchestrer un environnement stable et observable.",
    bullets: ["Services", "Systeme", "Reseau"],
    href: "/garden/outils/creation-cours",
  },
  {
    icon: Shield,
    eyebrow: "Palier 3",
    title: "Floraison",
    description: "Bash avance, securite, Docker: automatiser et securiser les deployments.",
    bullets: ["Bash avance", "Securite", "Docker"],
    href: "/garden/outils/creation-cours",
  },
  {
    icon: Flame,
    eyebrow: "Palier 4",
    title: "Transmutation",
    description: "Debug profond, kernel tuning et haute disponibilite: la canopee niveau Dieu.",
    bullets: ["Debug", "Kernel Tuning", "Haute Disponibilite"],
    href: "/garden/outils/creation-cours",
  },
] as const;

export default function LinuxPresentationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/courses/b2c/b2c1_ai_mutation.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-slate-950/85 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.32em] text-amber-300/80"
          >
            Azoth | La Voie Linux
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-white md:text-7xl"
          >
            La Voie de l&apos;Alchimiste
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-3xl text-lg text-slate-200"
          >
            Dominez la machine du noyau jusqu&apos;au cluster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/garden/outils/creation-cours"
              className="inline-flex rounded-full border border-amber-300/80 bg-amber-300/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 transition hover:bg-amber-100 hover:text-slate-950"
            >
              Entamer l&apos;Ascension
            </Link>
            <Link
              href="/garden"
              className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:bg-white/10"
            >
              Retour au Jardin
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-18">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-amber-300/20 bg-slate-900/70 p-8 md:p-11"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/85">Pourquoi Linux ?</p>
          <p className="mt-4 font-serif text-2xl leading-relaxed text-slate-100 md:text-3xl">
            Linux n&apos;est pas un systeme d&apos;exploitation, c&apos;est le langage secret des serveurs. Le maitriser,
            c&apos;est avoir les cles de tout l&apos;internet.
          </p>
        </motion.article>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-serif text-3xl text-white md:text-4xl">L&apos;Arbre Linux</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">4 paliers d&apos;evolution</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {linuxTree.map((module, index) => (
            <ModuleCard
              key={module.title}
              icon={module.icon}
              eyebrow={module.eyebrow}
              title={module.title}
              description={module.description}
              bullets={module.bullets as string[]}
              href={module.href}
              ctaLabel="Voir la feuille de route"
              delay={index * 0.09}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-amber-300/25 bg-gradient-to-br from-slate-900 to-black p-8 md:p-10"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/85">Preuve de Maitrise</p>
              <h3 className="mt-3 font-serif text-3xl text-white">Projet Final</h3>
              <p className="mt-4 text-slate-300">
                Deploiement d&apos;une stack haute disponibilite sur serveur nu.
              </p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-amber-200">
              <Trophy className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Server className="h-4 w-4 text-amber-200" />
              Target: uptime robuste, observabilite, rollback et tolerance de panne.
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
