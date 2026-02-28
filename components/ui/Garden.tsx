"use client";

import { useEffect, useMemo, useState } from "react";
import { parseJsonWithFallback } from "@/lib/safe-json";
import Link from "next/link";
import { Camera, Film, PenTool, Loader2, Terminal, TreePine, MessageCircle, BarChart3, ChevronRight, Lightbulb } from "lucide-react";
import { cursus } from "@/lib/data/cursus";
import { MyceliumChat } from "@/components/ui/MyceliumChat";

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
  {
    key: "linux",
    title: "Linux",
    description: "Systemes, shell et culture open source.",
    icon: Terminal,
    featured: false,
  },
];

interface GardenProps {
  selectedSeed?: string | null;
}

const VOTE_STORAGE_KEY = "arbre:garden:votes:v1";

interface CommunityProposal {
  id: string;
  title: string;
  objective: string;
  createdAt: string;
}

function isCommunityProposalArray(value: unknown): value is CommunityProposal[] {
  if (!Array.isArray(value)) return false;
  return value.every((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const proposal = entry as Record<string, unknown>;
    return (
      typeof proposal.id === "string" &&
      typeof proposal.title === "string" &&
      typeof proposal.objective === "string" &&
      typeof proposal.createdAt === "string"
    );
  });
}

export function Garden({ selectedSeed }: GardenProps) {
  const [pendingSeed, setPendingSeed] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [votedByUser, setVotedByUser] = useState<Record<string, boolean>>({});
  const [communityProposals, setCommunityProposals] = useState<CommunityProposal[]>([]);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalObjective, setProposalObjective] = useState("");
  const [proposalMessage, setProposalMessage] = useState("");

  const moduleOptions = useMemo(
    () =>
      cursus.flatMap((level) =>
        level.modules.map((module) => ({
          id: module.id,
          title: module.title,
          objective: module.objective,
          source: "official" as const,
        }))
      ),
    []
  );

  useEffect(() => {
    if (!selectedSeed) return;
    const raw = window.localStorage.getItem(VOTE_STORAGE_KEY);
    const parsed = parseJsonWithFallback<{
      votes?: Record<string, number>;
      votedByUser?: Record<string, boolean>;
      communityProposals?: CommunityProposal[];
    }>(raw, {});

    const safeVotes =
      parsed.votes && Object.values(parsed.votes).every((value) => typeof value === "number") ? parsed.votes : {};
    const safeVotedByUser =
      parsed.votedByUser && Object.values(parsed.votedByUser).every((value) => typeof value === "boolean")
        ? parsed.votedByUser
        : {};
    const safeCommunityProposals = isCommunityProposalArray(parsed.communityProposals)
      ? parsed.communityProposals
      : [];

    setVotes(safeVotes);
    setVotedByUser(safeVotedByUser);
    setCommunityProposals(safeCommunityProposals);
  }, [selectedSeed]);

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
      window.location.href = data.redirectTo || "/garden";
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Erreur de selection.");
      setPendingSeed(null);
    }
  };

  const voteForModule = (moduleId: string) => {
    const alreadyVoted = Boolean(votedByUser[moduleId]);
    const nextVotes = {
      ...votes,
      [moduleId]: Math.max(0, (votes[moduleId] || 0) + (alreadyVoted ? -1 : 1)),
    };
    const nextVotedByUser = {
      ...votedByUser,
      [moduleId]: !alreadyVoted,
    };

    setVotes(nextVotes);
    setVotedByUser(nextVotedByUser);

    window.localStorage.setItem(
      VOTE_STORAGE_KEY,
      JSON.stringify({ votes: nextVotes, votedByUser: nextVotedByUser, communityProposals })
    );
  };

  if (selectedSeed) {
    const communityModules = communityProposals.map((proposal) => ({
      id: proposal.id,
      title: proposal.title,
      objective: proposal.objective,
      source: "community" as const,
    }));

    const rankedModules = [...moduleOptions, ...communityModules]
      .sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0))
      .slice(0, 12);

    const submitProposal = () => {
      setProposalMessage("");
      const cleanTitle = proposalTitle.trim();
      const cleanObjective = proposalObjective.trim();

      if (cleanTitle.length < 6) {
        setProposalMessage("Titre trop court (6 caracteres minimum).");
        return;
      }
      if (cleanObjective.length < 12) {
        setProposalMessage("Description trop courte (12 caracteres minimum).");
        return;
      }

      const proposal: CommunityProposal = {
        id: `P.${Date.now()}`,
        title: cleanTitle,
        objective: cleanObjective,
        createdAt: new Date().toISOString(),
      };

      const nextCommunityProposals = [proposal, ...communityProposals].slice(0, 20);
      const nextVotes = { ...votes, [proposal.id]: 0 };
      const nextVotedByUser = { ...votedByUser, [proposal.id]: false };

      setCommunityProposals(nextCommunityProposals);
      setVotes(nextVotes);
      setVotedByUser(nextVotedByUser);
      setProposalTitle("");
      setProposalObjective("");
      setProposalMessage("Proposition ajoutee au vote communautaire.");

      window.localStorage.setItem(
        VOTE_STORAGE_KEY,
        JSON.stringify({
          votes: nextVotes,
          votedByUser: nextVotedByUser,
          communityProposals: nextCommunityProposals,
        })
      );
    };

    return (
      <div className="w-full max-w-6xl space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Jardin des <span className="text-seve">Graines</span>
          </h1>
          <p className="text-white/60 text-sm uppercase tracking-wider">
            Hub communautaire | Votes des modules | Chat mycelium
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard"
            className="rounded-2xl border border-seve/20 bg-seve/10 p-5 hover:bg-seve/15 transition-all"
          >
            <TreePine className="w-6 h-6 text-seve mb-3" />
            <h2 className="text-white font-black uppercase text-sm">Mon arbre</h2>
            <p className="text-white/60 text-xs mt-2">Revenir a la carte complete des modules</p>
          </Link>

          <Link
            href="/dashboard/mycelium"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition-all"
          >
            <MessageCircle className="w-6 h-6 text-white mb-3" />
            <h2 className="text-white font-black uppercase text-sm">Chat mycelium</h2>
            <p className="text-white/60 text-xs mt-2">Discuter, demander de l'aide, partager</p>
          </Link>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <BarChart3 className="w-6 h-6 text-white mb-3" />
            <h2 className="text-white font-black uppercase text-sm">Votes actifs</h2>
            <p className="text-white/60 text-xs mt-2">Priorisez les prochains modules a approfondir</p>
          </div>

          <Link
            href="/garden/outils/creation-cours"
            className="rounded-2xl border border-amberGlow/25 bg-amberGlow/5 p-5 hover:bg-amberGlow/10 transition-all"
          >
            <Lightbulb className="w-6 h-6 text-amberGlow mb-3" />
            <h2 className="text-white font-black uppercase text-sm">Outil creation</h2>
            <p className="text-white/60 text-xs mt-2">La fabrique de cours arrive bientot</p>
          </Link>
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <h3 className="text-white text-xl md:text-2xl font-black uppercase">Proposer un cours</h3>
            <p className="text-white/50 text-xs uppercase tracking-widest">
              Votre idee est publiee dans les votes de la communaute
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              placeholder="Titre du cours propose"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-seve"
            />
            <input
              value={proposalObjective}
              onChange={(e) => setProposalObjective(e.target.value)}
              placeholder="Objectif ou valeur pour la communaute"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-seve"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <button
              type="button"
              onClick={submitProposal}
              className="inline-flex items-center justify-center rounded-2xl border border-seve/30 bg-seve/15 px-5 py-3 text-seve font-black uppercase text-xs tracking-widest hover:bg-seve/20 transition-all"
            >
              Soumettre au vote
            </button>
            <Link
              href="/garden/outils/creation-cours"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-3 text-white/80 font-black uppercase text-xs tracking-widest hover:border-white/25"
            >
              Voir l'outil de creation (bientot)
            </Link>
          </div>

          <p className="text-[11px] text-white/45">
            L'outil complet de creation de cours arrive bientot. Pour l'instant, vous pouvez proposer un sujet puis mobiliser la communaute via les votes.
          </p>
          {proposalMessage && <p className="text-[11px] text-seve">{proposalMessage}</p>}
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-white text-xl md:text-2xl font-black uppercase">Vote des modules</h3>
              <p className="text-white/50 text-xs uppercase tracking-widest">
                Cliquez pour voter ou retirer votre vote
              </p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-seve">
              Graine: {selectedSeed}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rankedModules.map((module) => {
              const score = votes[module.id] || 0;
              const isVoted = Boolean(votedByUser[module.id]);

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => voteForModule(module.id)}
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    isVoted ? "border-seve/40 bg-seve/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/40">{module.id}</p>
                      <h4 className="text-sm font-black text-white uppercase mt-2">{module.title}</h4>
                      <p className="text-xs text-white/60 mt-2">{module.objective}</p>
                      {module.source === "community" && (
                        <p className="mt-2 text-[10px] uppercase tracking-widest text-amberGlow">Proposition communaute</p>
                      )}
                    </div>
                    <div className="text-right min-w-16">
                      <p className="text-seve text-2xl font-black leading-none">{score}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/40">votes</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8 space-y-5">
          <div>
            <h3 className="text-white text-xl md:text-2xl font-black uppercase">Chat du Jardin</h3>
            <p className="text-white/50 text-xs uppercase tracking-widest">
              Echanges en direct avec la communaute
            </p>
          </div>
          <MyceliumChat roomSlug="general" roomName="Le Mycelium (General)" />
        </section>

        <div className="flex justify-center">
          <Link
            href="/dashboard/courses/m0-1"
            className="inline-flex items-center gap-3 rounded-full border border-seve/30 bg-seve/15 px-6 py-3 text-seve font-black uppercase text-xs tracking-widest hover:bg-seve/20 transition-all"
          >
            Revenir au cours
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
          Le Jardin des <span className="text-seve">Graines</span>
        </h1>
        <p className="text-white/60 mt-3 text-sm uppercase tracking-wider">Choisissez votre premiere voie d'apprentissage</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
