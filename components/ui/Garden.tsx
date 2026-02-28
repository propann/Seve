"use client";

import { useState } from "react";
import { Camera, Film, PenTool, Loader2 } from "lucide-react";

const seeds = [
  {
    key: "photographie",
    title: "Photographie",
    description: "Maitrisez la lumiere et le temps.",
    icon: Camera,
    featured: true,
  },
  {
    key: "cinema",
    title: "Cinema",
    description: "Narration visuelle et mouvement.",
    icon: Film,
    featured: false,
  },
  {
    key: "design",
    title: "Design",
    description: "Composition et langage graphique.",
    icon: PenTool,
    featured: false,
  },
];

export function Garden() {
  const [pendingSeed, setPendingSeed] = useState<string | null>(null);
  const [error, setError] = useState("");

  const selectSeed = async (seed: string) => {
    setPendingSeed(seed);
    setError("");
    try {
      const response = await fetch("/api/auth/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ seed }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Impossible de choisir cette graine.");
      }
      window.location.href = data.redirectTo || "/dashboard/courses/m0-1";
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Erreur de selection.");
      setPendingSeed(null);
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
          Le Jardin des <span className="text-seve">Graines</span>
        </h1>
        <p className="text-white/60 mt-3 text-sm uppercase tracking-wider">Choisissez votre premiere voie d'apprentissage</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {seeds.map((seed) => {
          const Icon = seed.icon;
          const isPending = pendingSeed === seed.key;
          const disabled = !!pendingSeed;
          return (
            <button
              key={seed.key}
              disabled={disabled}
              onClick={() => selectSeed(seed.key)}
              className={`text-left rounded-3xl border p-6 transition-all ${
                seed.featured
                  ? "border-seve/40 bg-seve/10 shadow-[0_0_35px_rgba(46,204,113,0.15)] hover:scale-105 hover:shadow-[0_0_45px_rgba(46,204,113,0.30)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              } ${disabled ? "opacity-80" : ""}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${seed.featured ? "bg-seve/20 text-seve" : "bg-white/10 text-white/70"}`}>
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon className="w-5 h-5" />}
              </div>
              <h2 className="mt-5 text-2xl font-black uppercase text-white">{seed.title}</h2>
              <p className="mt-3 text-sm text-white/60">{seed.description}</p>
            </button>
          );
        })}
      </div>

      {error && <p className="mt-5 text-red-400 text-xs uppercase tracking-widest text-center">{error}</p>}
    </div>
  );
}
