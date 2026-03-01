"use client";

import { useEffect, useMemo, useState } from "react";
import { parseJsonWithFallback } from "@/lib/safe-json";
import Link from "next/link";
import { Camera, Film, PenTool, Loader2, Terminal, ChevronRight, User as UserIcon, LogOut } from "lucide-react";
import { MyceliumChat } from "@/components/ui/MyceliumChat";
import { useAuth } from "@/lib/auth/AuthContext";

const seeds = [
  {
    key: "photographie",
    title: "Photographie",
    description: "Maitrisez la lumiere et le temps.",
    icon: Camera,
    featured: true,
    isReady: true,
    presentationHref: "/dashboard/courses/photographie",
  },
  {
    key: "cinema",
    title: "Cinema",
    description: "Narration visuelle et mouvement.",
    icon: Film,
    featured: false,
    isReady: false,
    presentationHref: "/dashboard/courses/cinema",
  },
  {
    key: "design",
    title: "Dessin",
    description: "Composition et langage graphique.",
    icon: PenTool,
    featured: false,
    isReady: false,
    presentationHref: "/dashboard/courses/dessin",
  },
  {
    key: "linux",
    title: "Linux",
    description: "Systemes, shell et culture open source.",
    icon: Terminal,
    featured: false,
    isReady: false,
    presentationHref: "/dashboard/courses/linux",
  },
];

interface GardenProps {
  selectedSeed?: string | null;
}

const VOTE_STORAGE_KEY = "arbre:garden:seed-votes:v2";

export function Garden({ selectedSeed }: GardenProps) {
  const { user, logout } = useAuth();
  const [pendingSeed, setPendingSeed] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [votedByUser, setVotedByUser] = useState<Record<string, boolean>>({});
  const votableSeeds = useMemo(() => seeds.filter((seed) => !seed.isReady), []);
  const readySeeds = useMemo(() => seeds.filter((seed) => seed.isReady), []);

  useEffect(() => {
    const raw = window.localStorage.getItem(VOTE_STORAGE_KEY);
    const parsed = parseJsonWithFallback<{
      votes?: Record<string, number>;
      votedByUser?: Record<string, boolean>;
    }>(raw, {});

    const safeVotes =
      parsed.votes && Object.values(parsed.votes).every((value) => typeof value === "number") ? parsed.votes : {};
    const safeVotedByUser =
      parsed.votedByUser && Object.values(parsed.votedByUser).every((value) => typeof value === "boolean")
        ? parsed.votedByUser
        : {};
    const allowedIds = new Set(votableSeeds.map((seed) => seed.key));
    const filteredVotes = Object.fromEntries(Object.entries(safeVotes).filter(([seedId]) => allowedIds.has(seedId)));
    const filteredVotedByUser = Object.fromEntries(
      Object.entries(safeVotedByUser).filter(([seedId]) => allowedIds.has(seedId))
    );

    setVotes(filteredVotes);
    setVotedByUser(filteredVotedByUser);
  }, [votableSeeds]);

  const selectSeed = async (seed: string, nextHref?: string) => {
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
      window.location.href = nextHref || data.redirectTo || "/garden";
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Erreur de selection.");
      setPendingSeed(null);
    }
  };

  const voteForSeed = (seedId: string) => {
    const alreadyVoted = Boolean(votedByUser[seedId]);
    const nextVotes = {
      ...votes,
      [seedId]: Math.max(0, (votes[seedId] || 0) + (alreadyVoted ? -1 : 1)),
    };
    const nextVotedByUser = {
      ...votedByUser,
      [seedId]: !alreadyVoted,
    };

    setVotes(nextVotes);
    setVotedByUser(nextVotedByUser);

    window.localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify({ votes: nextVotes, votedByUser: nextVotedByUser }));
  };

  const rankedSeeds = [...votableSeeds].sort((a, b) => (votes[b.key] || 0) - (votes[a.key] || 0));

  return (
    <div className="w-full max-w-6xl space-y-10">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Jardin des <span className="text-seve">Graines</span>
          </h1>
          <p className="text-white/60 text-xs uppercase tracking-wider">
            Graines en haut | Cours valides | Votes communautaires | Chat
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <Link
              href="/rituel"
              className="inline-flex items-center gap-2 rounded-full border border-seve/25 bg-seve/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-seve hover:bg-seve/15 transition-all"
            >
              <UserIcon className="w-3 h-3" />
              Compte
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] p-2 text-white/70 hover:text-red-300 hover:border-red-300/30 transition-all"
              aria-label="Se deconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {seeds.map((seed) => {
          const Icon = seed.icon;
          const isPending = pendingSeed === seed.key;
          const isSelected = selectedSeed === seed.key;
          const disabled = !!pendingSeed || (!!selectedSeed && !isSelected);

          const cardClass = seed.featured
            ? "border-seve/40 bg-seve/10 shadow-[0_0_35px_rgba(46,204,113,0.15)]"
            : "border-white/10 bg-white/[0.03]";

          const stateText = seed.isReady
            ? "Cours pret"
            : isSelected
              ? "Graine active"
              : selectedSeed
                ? "Vote ouvert"
                : "Selection";

          return (
            <div
              key={seed.key}
              className={`text-left rounded-3xl border p-6 transition-all ${
                cardClass
              } ${isSelected ? "ring-1 ring-seve/50" : ""} ${disabled ? "opacity-70" : "hover:border-white/20 hover:scale-[1.01]"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${seed.featured ? "bg-seve/20 text-seve" : "bg-white/10 text-white/70"}`}>
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon className="w-5 h-5" />}
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-white/45">{stateText}</p>
              <h2 className="mt-5 text-2xl font-black uppercase text-white">{seed.title}</h2>
              <p className="mt-3 text-sm text-white/60">{seed.description}</p>
              {!selectedSeed && (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => selectSeed(seed.key)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/80 hover:border-white/30 transition-all disabled:opacity-60"
                >
                  Choisir cette graine
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
              {seed.presentationHref && (
                <Link
                  href={seed.presentationHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-seve/30 bg-seve/15 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-seve hover:bg-seve/20 transition-all"
                >
                  Voir la presentation
                  <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          );
        })}
      </section>

      {error && <p className="mt-5 text-red-400 text-xs uppercase tracking-widest text-center">{error}</p>}

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8 space-y-4">
        <h3 className="text-white text-xl md:text-2xl font-black uppercase">Cours valides</h3>
        <p className="text-white/50 text-xs uppercase tracking-widest">
          Les cours ayant passe la procedure sont accessibles directement
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readySeeds.map((seed) => (
            <article key={seed.key} className="rounded-2xl border border-seve/30 bg-seve/10 p-4">
              <p className="text-[10px] uppercase tracking-widest text-seve">Pret</p>
              <h4 className="text-lg font-black text-white uppercase mt-2">{seed.title}</h4>
              <p className="text-sm text-white/60 mt-2">Version actuelle exploitable pour la navigation et le test.</p>
              <button
                type="button"
                disabled={!!pendingSeed}
                onClick={() => selectSeed(seed.key, seed.presentationHref)}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-seve/30 bg-seve/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-seve hover:bg-seve/25 transition-all disabled:opacity-60"
              >
                Planter la graine
                <ChevronRight className="w-3 h-3" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-white text-xl md:text-2xl font-black uppercase">Vote des graines</h3>
            <p className="text-white/50 text-xs uppercase tracking-widest">
              Propositions avant creation: le vote sert a decider quoi construire en premier
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rankedSeeds.map((seed) => {
            const score = votes[seed.key] || 0;
            const isVoted = Boolean(votedByUser[seed.key]);
            return (
              <div
                key={seed.key}
                className={`text-left rounded-2xl border p-4 transition-all ${
                  isVoted ? "border-seve/40 bg-seve/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">{seed.key}</p>
                    <h4 className="text-sm font-black text-white uppercase mt-2">{seed.title}</h4>
                    <p className="text-xs text-white/60 mt-2">{seed.description}</p>
                  </div>
                  <div className="text-right min-w-16">
                    <p className="text-seve text-2xl font-black leading-none">{score}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">votes</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => voteForSeed(seed.key)}
                    className="inline-flex items-center gap-2 rounded-full border border-seve/30 bg-seve/15 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-seve hover:bg-seve/20 transition-all"
                  >
                    {isVoted ? "Retirer mon vote" : "Voter cette proposition"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <Link
            href="/garden/outils/creation-cours"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white/80 hover:border-white/30 transition-all"
          >
            La proposition des cours se fait dans l'outil de creation
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8 space-y-5">
        <div>
          <h3 className="text-white text-xl md:text-2xl font-black uppercase">Chat du Jardin</h3>
          <p className="text-white/50 text-xs uppercase tracking-widest">
            Chat integre sous les graines et les votes
          </p>
        </div>
        <MyceliumChat roomSlug="general" roomName="Le Mycelium (General)" />
      </section>
    </div>
  );
}
