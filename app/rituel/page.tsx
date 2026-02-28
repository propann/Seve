"use client";

import React from "react";
import { PlayerProfile } from "@/components/ui/PlayerProfile";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";

/**
 * PAGE RITUEL : L'espace de gestion de la fiche personnage
 */
export default function RituelPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const handleComplete = (profileData: any) => {
    // Mise à jour de la session locale
    updateUser({
        name: profileData.name,
        characterClass: profileData.characterClass
    });
    // Redirection vers le dashboard après sauvegarde
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
                ÉVOLUTION DE <span className="text-seve italic">L'IDENTITÉ</span>
            </h1>
            <p className="text-textMain/40 font-bold tracking-widest text-[10px] uppercase">
                Ajustez votre ancrage et votre équipement dans le Mycélium
            </p>
        </header>

        <PlayerProfile onComplete={handleComplete} />
      </div>
    </div>
  );
}
