"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cursus } from "@/lib/data/cursus";
import { CheckCircle2, Circle, Lock, Zap, TreePine, LogOut, ShieldAlert, MessageCircle } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

interface SidebarProps {
  completedModules: string[];
  unlockedModules: string[];
  xp: number;
}

export const SidebarNavigation: React.FC<SidebarProps> = ({ 
  completedModules, 
  unlockedModules,
  xp
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN" || user?.role === "TEACHER";

  return (
    <aside className="w-80 h-screen sticky top-0 bg-background/50 backdrop-blur-3xl border-r border-white/5 p-8 flex flex-col z-[80] font-mono">
      
      {/* BOUTON RETOUR ARBRE (Centre de Commande) */}
      <div className="mb-10 space-y-4">
        <Link 
            href="/dashboard"
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                pathname === "/dashboard" 
                ? "bg-seve/20 border-seve text-seve shadow-[0_0_20px_rgba(46,204,113,0.2)]" 
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
        >
            <TreePine className="w-6 h-6" />
            <span className="font-black text-xs uppercase tracking-[0.2em]">Mon Arbre</span>
        </Link>

        {/* HUB MYCELIUM (Chat & IA) */}
        <Link 
            href="/dashboard/mycelium"
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                pathname.startsWith("/dashboard/mycelium") 
                ? "bg-seve/20 border-seve text-seve" 
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
        >
            <MessageCircle className="w-6 h-6" />
            <span className="font-black text-xs uppercase tracking-[0.2em]">Mycélium Chat</span>
        </Link>

        {/* SECTION ADMIN CONDITIONNELLE */}
        {isAdmin && (
          <Link 
              href="/admin"
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  pathname.startsWith("/admin") 
                  ? "bg-amberGlow/20 border-amberGlow text-amberGlow" 
                  : "bg-white/2 border-white/5 text-white/40 hover:bg-amberGlow/10 hover:text-amberGlow"
              }`}
          >
              <ShieldAlert className="w-5 h-5" />
              <span className="font-black text-[10px] uppercase tracking-[0.2em]">Gestion Master</span>
          </Link>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-white/5" />
        <div className="space-y-10 relative z-10">
          {cursus.map((level) => (
            <div key={level.id} className="space-y-4">
              <h4 className="text-[9px] font-black text-white/40 uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white/10" />
                Niv.{level.id}
              </h4>
              
              <div className="space-y-2 ml-2">
                {level.modules.map((module) => {
                  const isCompleted = completedModules.includes(module.id);
                  const isUnlocked = unlockedModules.includes(module.id) || isCompleted;
                  
                  // Construction du slug identique à PhotographyTree
                  const finalSlug = /^\d/.test(module.slug) ? `m${module.slug}` : module.slug;
                  const isActive = pathname.includes(`/courses/${finalSlug}`);

                  return (
                    <Link 
                      key={module.id} 
                      href={isUnlocked ? `/dashboard/courses/${finalSlug}` : "#"}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${
                        isActive ? "bg-white/5 border border-white/10" : "hover:bg-white/5"
                      } ${!isUnlocked ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="relative">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-seve" />
                        ) : isUnlocked ? (
                          <Circle className="w-4 h-4 text-seve animate-pulse" />
                        ) : (
                          <Lock className="w-4 h-4 text-white/40" />
                        )}
                      </div>
                      <span className={`text-[10px] font-black uppercase ${isActive ? "text-seve" : "text-textMain/60 group-hover:text-white"}`}>
                        {module.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER SIDEBAR : XP & DECONNEXION */}
      <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-4 p-4 bg-white/2 rounded-2xl border border-white/5">
            <Zap className="w-4 h-4 text-amberGlow" />
            <div>
                <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest">XP</span>
                <span className="text-xs font-black text-white">{xp}</span>
            </div>
        </div>
        
        <button
            onClick={() => router.push("/garden")}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-seve/70 hover:text-seve hover:bg-seve/5 transition-all text-[10px] font-black uppercase tracking-widest"
        >
            <TreePine className="w-4 h-4" />
            Retour au Jardin
        </button>

        <button
            onClick={() => void logout()}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all text-[10px] font-black uppercase tracking-widest"
        >
            <LogOut className="w-4 h-4" />
            Deconnexion
        </button>
      </div>
    </aside>
  );
};
