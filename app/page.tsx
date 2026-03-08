"use client";

import { useEffect } from "react";
import { ArrowUpRight, Orbit, Sparkles, Trees, Waves } from "lucide-react";
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
    <main className="relative min-h-screen overflow-hidden bg-background text-textMain">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,255,181,0.17),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,181,71,0.16),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(82,146,255,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(5,9,8,0.1),rgba(5,9,8,0))]" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full border border-white/10 bg-white/[0.03] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-80 h-96 w-96 rounded-full bg-[#f6b66b]/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-20 px-6 py-12 md:px-10 md:py-16">
        <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-seve shadow-[0_0_14px_rgba(196,255,154,0.9)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.38em] text-white/70">Portail vivant</span>
            </div>

            <div className="space-y-6">
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#f6b66b]">Le Jardin des parcours</p>
              <h1 className="max-w-4xl text-5xl leading-[0.9] text-white sm:text-6xl lg:text-8xl [font-family:var(--font-display)]">
                Apprendre
                <br />
                dans une
                <br />
                atmosphere
                <span className="ml-3 text-[#d2ffb5]">rituelle.</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/68 md:text-lg [font-family:var(--font-serif)]">
                S&egrave;ve transforme l&apos;entr&eacute;e en formation en un espace plus incarn&eacute;: une porte d&apos;entr&eacute;e claire,
                un imaginaire fort, et un parcours qui ressemble moins &agrave; un dashboard qu&apos;&agrave; un lieu.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f6b66b]">Immersion</p>
                <p className="mt-3 text-3xl text-white [font-family:var(--font-display)]">01</p>
                <p className="mt-2 text-sm leading-6 text-white/62">Entrer dans un portail pens&eacute; comme un seuil, pas comme un simple formulaire.</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-[#d2ffb5]/[0.08] p-5 backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d2ffb5]">Progression</p>
                <p className="mt-3 text-3xl text-white [font-family:var(--font-display)]">02</p>
                <p className="mt-2 text-sm leading-6 text-white/62">Choisir une graine, suivre les modules, faire grandir son axe d&apos;&eacute;tude.</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-[#87b7ff]/[0.08] p-5 backdrop-blur-xl">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#87b7ff]">Communaute</p>
                <p className="mt-3 text-3xl text-white [font-family:var(--font-display)]">03</p>
                <p className="mt-2 text-sm leading-6 text-white/62">Participer &agrave; la fabrique des cours et orienter les prochaines pousses.</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="pointer-events-none absolute inset-x-8 inset-y-12 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(210,255,181,0.14),rgba(255,255,255,0.02))] blur-2xl" />
            <div className="relative w-full max-w-xl">
              <div className="mb-5 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/55">Seuil actif</p>
                  <p className="mt-1 text-sm text-white/78">Connexion, inscription et premi&egrave;re orientation au m&ecirc;me endroit.</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d2ffb5]/30 bg-[#d2ffb5]/10 text-[#d2ffb5]">
                  <Orbit className="h-5 w-5" />
                </div>
              </div>
              <AuthForm />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f6b66b]">Direction artistique</p>
                <h2 className="mt-3 text-3xl text-white [font-family:var(--font-display)]">Un portail qui a enfin du relief</h2>
              </div>
              <Sparkles className="mt-1 h-5 w-5 text-[#f6b66b]" />
            </div>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/64">
              Le ton visuel s&apos;&eacute;loigne du dashboard par d&eacute;faut: lumi&egrave;res diffuses, grands titres s&eacute;rifs, textures de verre
              sombre et codes chromatiques par intention.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <article className="rounded-[2rem] border border-white/10 bg-[#111816]/85 p-6">
              <Trees className="h-5 w-5 text-[#d2ffb5]" />
              <h3 className="mt-5 text-xl text-white [font-family:var(--font-display)]">Parcours organique</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">La plateforme se pr&eacute;sente comme un espace &agrave; cultiver, pas une suite de menus.</p>
            </article>
            <article className="rounded-[2rem] border border-white/10 bg-[#17130f]/85 p-6">
              <Waves className="h-5 w-5 text-[#f6b66b]" />
              <h3 className="mt-5 text-xl text-white [font-family:var(--font-display)]">Rythme visuel</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">Des blocs contrast&eacute;s, des vides assum&eacute;s et des sections qui respirent.</p>
            </article>
            <article className="rounded-[2rem] border border-white/10 bg-[#101522]/85 p-6">
              <ArrowUpRight className="h-5 w-5 text-[#87b7ff]" />
              <h3 className="mt-5 text-xl text-white [font-family:var(--font-display)]">Entr&eacute;e claire</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">Les actions principales restent lisibles tout en s&apos;int&eacute;grant au d&eacute;cor.</p>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#87b7ff]">Votre role</p>
            <p className="mt-4 text-2xl text-white [font-family:var(--font-display)]">Eleve, contributeur, eclaireur.</p>
            <p className="mt-4 text-sm leading-7 text-white/62">
              Vous suivez un parcours, mais vous pouvez aussi proposer de nouveaux cours, enrichir les pistes existantes et peser
              dans l&apos;&eacute;volution du Jardin.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Semer", "Creer un compte et choisir votre premiere graine."],
              ["Traverser", "Acceder aux modules, outils et experiences interactives."],
              ["Influencer", "Participer aux votes et nourrir les futures branches."],
            ].map(([title, text], index) => (
              <div
                key={title}
                className="group rounded-[2rem] border border-white/10 bg-black/25 p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/35">Phase 0{index + 1}</span>
                  <span className="text-lg text-white/25 [font-family:var(--font-display)]">{index + 1}</span>
                </div>
                <h3 className="mt-8 text-2xl text-white [font-family:var(--font-display)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(5,9,8,0),rgba(5,9,8,0.82))]" />
    </main>
  );
}
