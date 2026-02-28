"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Aperture, Grid3X3, Sparkles, BookImage } from "lucide-react";
import { ModuleCard } from "@/components/course/ModuleCard";

const modules = [
  {
    icon: Aperture,
    title: "Module 1: Comprendre l'exposition",
    description: "Maitrisez ouverture, vitesse et ISO pour controler la lumiere.",
    href: "/dashboard/courses/m0-1",
  },
  {
    icon: Grid3X3,
    title: "Module 2: Composition",
    description: "Construisez des images fortes avec lignes, rythme et tension visuelle.",
    href: "/dashboard/courses/m0-2",
  },
  {
    icon: Sparkles,
    title: "Module 3: Post-traitement",
    description: "Developpez un rendu coherent sans perdre la verite de l'image.",
    href: "/dashboard/courses/m0-3",
  },
  {
    icon: BookImage,
    title: "Module 4: Storytelling",
    description: "Donnez une narration claire a vos series pour marquer durablement.",
    href: "/dashboard/courses/m1-1",
  },
] as const;

const gallery = [
  "/assets/courses/m03/m03_memento_mori.jpg",
  "/assets/courses/m02/m02_photon_wave.jpg",
  "/assets/courses/m11/m11_iris_blades.jpg",
  "/assets/courses/m14/m14_focal_distortion.jpg",
  "/assets/courses/b2u/b2u2_street_portrait.jpg",
  "/assets/courses/b2n/b2n1_wild_light.jpg",
];

export default function PhotographyCoursePresentationPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/courses/m03/m03_memento_mori.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/80 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-xs uppercase tracking-[0.3em] text-amber-200/80"
          >
            Azoth | Cursus Photographie
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-white md:text-7xl"
          >
            Dominez la Lumiere
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-slate-200"
          >
            Apprenez a voir le monde differemment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="/dashboard/courses/m0-1"
              className="inline-flex rounded-full border border-amber-200/70 bg-amber-200/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 transition hover:bg-amber-100 hover:text-slate-950"
            >
              Commencer l'immersion
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-amber-200/20 bg-slate-900/60 p-8 md:p-12"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">Pourquoi ce cours</p>
          <p className="mt-4 font-serif text-2xl leading-relaxed text-slate-100 md:text-3xl">
            La photographie n'est pas un bouton. C'est un regard. Vous allez apprendre a traduire une intention en image
            claire, precise et vivante.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <h2 className="font-serif text-3xl text-white md:text-4xl">Curriculum</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">4 modules essentiels</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.title}
              icon={module.icon}
              title={module.title}
              description={module.description}
              href={module.href}
              delay={index * 0.08}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <h2 className="font-serif text-3xl text-white md:text-4xl">Gallery</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">Inspiration visuelle</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`overflow-hidden rounded-2xl border border-white/10 bg-slate-900 ${index % 3 === 0 ? "md:col-span-2" : ""}`}
            >
              <img src={src} alt="Inspiration photographie" className="h-48 w-full object-cover md:h-56" />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
