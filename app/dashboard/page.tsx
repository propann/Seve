"use client";

import React from "react";
import { PhotographyTree } from "@/components/tree/PhotographyTree";
import { useAuth } from "@/lib/auth/AuthContext";
import { DebugPanel } from "@/components/ui/DebugPanel";
import { cursus } from "@/lib/data/cursus";

export default function DashboardPage() {
  const { user } = useAuth();

  // On récupère tous les IDs de modules du cursus pour le test
  const allModules = cursus.flatMap(level => level.modules).map(m => m.id);

  // Conversion sécurisée des chaînes de progression en tableaux
  const userCompleted = typeof user?.completedNodes === "string"
    ? user.completedNodes.split(",").filter(id => id.trim() !== "")
    : user?.completedNodes || [];

  // Progression dashboard: temporairement tout déverrouillé.
  const currentProgression = {
    xp: user?.xp || 0,
    level: user?.level || 0,
    completedModules: userCompleted,
    unlockedModules: allModules // FORCE TOUT LE CURSUS ICI
  };

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">
            SYSTÈME <span className="text-seve italic">ORGANIQUE</span>
          </h1>
          <div className="flex gap-4">
            <p className="text-seve font-bold tracking-widest text-[10px] uppercase bg-seve/5 px-3 py-1 border border-seve/10 rounded-lg">
                Explorateur: {user?.name || "Anonyme"}
            </p>
            <p className="text-white/40 font-bold tracking-widest text-[10px] uppercase bg-white/5 px-3 py-1 border border-white/10 rounded-lg">
                Classe: {user?.characterClass || "Graine"}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-16 items-center justify-center">
        <section className="relative flex justify-center">
          <PhotographyTree 
            currentLevel={currentProgression.level}
            xp={currentProgression.xp}
            completedModules={currentProgression.completedModules}
            unlockedModules={currentProgression.unlockedModules}
          />
        </section>
      </div>

      {/* Console de Debug uniquement sur le dashboard */}
      <DebugPanel />
    </div>
  );
}
