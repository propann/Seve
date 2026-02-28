"use client";

import React, { ReactNode, useEffect } from "react";
import { SidebarNavigation } from "@/components/ui/SidebarNavigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { cursus } from "@/lib/data/cursus";

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * DASHBOARD LAYOUT : Le Système Organique
 * Connecté à la base de données interne SQLite via AuthContext.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (!user.selectedSeed) {
      router.replace("/garden");
    }
  }, [isLoading, user, router]);

  // On attend la fin de chargement et les redirections éventuelles.
  if (isLoading || !user || !user.selectedSeed) {
    return null;
  }

  const isAdmin = user?.role === "ADMIN" || user?.role === "TEACHER";
  
  // On récupère tous les IDs de modules du cursus
  const allModuleIds = cursus.flatMap(level => level.modules).map(m => m.id);

  const toList = (value: string[] | string | undefined, fallback: string[]) => {
    if (typeof value === "string") {
      return value.split(",").map(id => id.trim()).filter(Boolean);
    }
    return value || fallback;
  };

  // État de progression réel issu de la DB locale
  const progression = {
    xp: user?.xp || 0,
    level: user?.level || 0,
    completedModules: toList(user?.completedNodes, []),
    unlockedModules: isAdmin 
      ? allModuleIds 
      : toList(user?.unlockedNodes, ["0.1"])
  };

  return (
    <div className="flex bg-[#0B0B0B] min-h-screen text-textMain selection:bg-seve selection:text-background font-sans">
      {/* Sidebar Navigation connectée aux données réelles */}
      <SidebarNavigation 
        completedModules={progression.completedModules} 
        unlockedModules={progression.unlockedModules} 
        xp={progression.xp}
      />

      {/* Main Container */}
      <main className="flex-1 relative overflow-hidden flex flex-col pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1"
          >
            {/* On injecte la progression réelle dans les composants enfants */}
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, { progression });
              }
              return child;
            })}
          </motion.div>
        </AnimatePresence>

        {pathname === "/dashboard" && (
            <footer className="p-8 border-t border-white/5 text-center">
                <p className="text-[10px] font-black tracking-widest text-textMain/20 uppercase">
                    L'Arbre de la Photographie Universelle V7.1 | Base de Données Locale Active
                </p>
            </footer>
        )}
      </main>
    </div>
  );
}
