"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  delay?: number;
}

export function ModuleCard({ icon: Icon, title, description, href, delay = 0 }: ModuleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl border border-amber-200/20 bg-slate-900/70 p-6 backdrop-blur-sm"
    >
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200/35 bg-amber-300/10 text-amber-200">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex text-xs font-semibold uppercase tracking-widest text-amber-200 transition-colors hover:text-white"
      >
        Explorer le module
      </Link>
    </motion.article>
  );
}
