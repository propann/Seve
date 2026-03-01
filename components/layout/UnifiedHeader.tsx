"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { resolveAvatarUrl } from "@/lib/avatar-url";
import { TreePine, User as UserIcon, LogOut, ChevronRight, ArrowRight } from "lucide-react";

/**
 * HEADER UNIFIÉ : L'Interface de Navigation Centrale
 * S'adapte selon le contexte (Public, Dashboard, Cours)
 */
export const UnifiedHeader = () => {
  const pathname = usePathname() ?? "";
  const { user, logout } = useAuth();
  const [avatarFailedSrc, setAvatarFailedSrc] = useState<string | null>(null);
  const avatarSrc = resolveAvatarUrl(user?.avatar);

  const isCourse = pathname.includes("/courses/");
  const isDashboard = pathname === "/dashboard";
  const isLanding = pathname === "/";
  const isGarden = pathname === "/garden";
  const isPhotographyPresentation = pathname === "/dashboard/courses/photographie";

  if (isLanding || isGarden || isPhotographyPresentation) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-background/40 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* GAUCHE : Logo & Fil d'Ariane */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-seve/10 border border-seve/20 rounded-xl flex items-center justify-center text-seve group-hover:bg-seve group-hover:text-background transition-all shadow-[0_0_15px_rgba(46,204,113,0.1)]">
              <TreePine className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-[10px] font-black text-seve uppercase tracking-[0.3em] leading-none mb-1">L'Arbre de la</span>
              <span className="block text-sm font-black text-white uppercase italic tracking-tighter leading-none">Photographie</span>
            </div>
          </Link>

          {/* Breadcrumbs dynamiques */}
          {(isDashboard || isCourse) && (
            <div className="hidden md:flex items-center gap-3 text-white/20 ml-4 border-l border-white/10 pl-6 font-mono text-[10px] uppercase font-black tracking-widest">
              <ChevronRight className="w-3 h-3" />
              <Link href="/dashboard" className={`hover:text-seve transition-colors ${isDashboard ? 'text-seve' : ''}`}>Dashboard</Link>
              {isCourse && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-white/60 italic">Module en cours</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* DROITE : Actions & Profil */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link href="/" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Connexion
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              {/* Accès rapide Dashboard si on est sur la Landing */}
              {isLanding && (
                <Link href="/dashboard" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-seve/10 border border-seve/20 text-seve rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-seve/20 transition-all">
                  Continuer <ArrowRight className="w-3 h-3" />
                </Link>
              )}

              {/* Mini Profil Cliquable */}
              <Link 
                href="/rituel" 
                className="flex items-center gap-3 pl-4 border-l border-white/10 group hover:bg-white/5 p-2 rounded-xl transition-all"
              >
                <div className="text-right hidden sm:block">
                  <span className="block text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1 group-hover:text-seve transition-colors">{user.name}</span>
                  <span className="block text-[8px] font-bold text-seve uppercase italic opacity-60 leading-none">{user.characterClass}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-seve/10 border border-seve/20 flex items-center justify-center text-seve group-hover:shadow-[0_0_15px_#2ECC7144] transition-all">
                  {avatarSrc && avatarSrc !== avatarFailedSrc ? (
                    <img
                      src={avatarSrc}
                      alt={`Avatar de ${user.name}`}
                      className="w-full h-full rounded-full object-cover"
                      onError={() => setAvatarFailedSrc(avatarSrc)}
                    />
                  ) : (
                    <UserIcon className="w-5 h-5" />
                  )}
                </div>
              </Link>

              <button onClick={logout} className="p-2 text-white/20 hover:text-red-400 transition-colors ml-2">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
