"use client";

import { useEffect } from "react";
import { AuthForm } from "@/components/ui/AuthForm";

export default function HomePage() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (data?.authenticated && data?.user) {
          window.location.href = "/garden";
        }
      } catch {
        // Pas de session, on reste sur le portail.
      }
    };
    checkSession();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-textMain px-6 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(46,204,113,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <section className="space-y-7">
          <p className="text-seve text-[10px] tracking-[0.45em] uppercase font-black">Le Portail</p>
          <h1 className="text-5xl md:text-7xl leading-[0.9] text-white uppercase tracking-tight [font-family:Georgia,serif]">
            Entrez
            <br />
            dans votre
            <br />
            Savoir
          </h1>
          <p className="max-w-xl text-white/65 text-base md:text-lg [font-family:Georgia,serif]">
            Un tunnel immersif pour apprendre tout type de discipline. Connectez-vous, choisissez votre graine, puis entrez dans votre parcours.
          </p>
        </section>
        <div className="flex justify-center lg:justify-end">
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
