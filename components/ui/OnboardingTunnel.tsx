"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberPasswordStrength } from "./CyberPasswordStrength";
import { Loader2, ShieldCheck, Mail, Lock, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { registerUserAction, loginUserAction } from "@/lib/actions/auth";

interface OnboardingProps {
  onComplete: (data: { email: string }) => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ONBOARDING : Utilise les Server Actions pour la DB locale
 */
export const OnboardingTunnel: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { login } = useAuth();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [strength, setStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let s = 0;
    if (password.length > 5) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) s++;
    setStrength(s);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const trimmedName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();

      if (mode === "register") {
        if (trimmedName.length < 2) throw new Error("Nom trop court (2 caracteres minimum).");
        if (!EMAIL_PATTERN.test(normalizedEmail)) throw new Error("Format email invalide.");
        if (password.length < 10) throw new Error("Mot de passe trop court (10 caracteres minimum).");

        const result = await registerUserAction(normalizedEmail, password, trimmedName || "Explorateur");
        if (!result.success) throw new Error(result.error);
      }

      // Appel de l'Action Serveur de connexion
      const loginResult = await loginUserAction(normalizedEmail, password);
      
      if (loginResult.success && loginResult.user) {
        login(loginResult.user);
        setIsCreated(true);
        setTimeout(() => onComplete({ email: normalizedEmail }), 1500);
      } else {
        throw new Error(loginResult.error || "Erreur d'accès.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="onboarding" className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden font-mono">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-seve/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!isCreated ? (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-10"
            >
              <header className="space-y-4 text-center">
                <div className="inline-flex items-center gap-2 bg-seve/10 border border-seve/20 px-4 py-2 rounded-full mb-4">
                  <ShieldCheck className="w-4 h-4 text-seve" />
                  <span className="text-[10px] font-black text-seve uppercase tracking-[0.2em]">Serveur Local Sécurisé</span>
                </div>
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">
                   {mode === "register" ? "PLANTER SA" : "RÉACTIVER SA"} <br/> 
                   <span className="text-seve italic">GRAINE</span>
                </h2>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {mode === "register" && (
                    <div className="relative group">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-seve transition-colors" />
                        <input 
                        type="text" 
                        placeholder="VOTRE NOM" 
                        required
                        className="w-full bg-white/5 border border-white/10 p-5 pl-14 text-lg font-bold rounded-2xl focus:border-seve transition-all outline-none text-white focus:bg-white/10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                  )}

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-seve transition-colors" />
                    <input 
                      type="email" 
                      placeholder="VOTRE@EMAIL.COM" 
                      required
                      className="w-full bg-white/5 border border-white/10 p-5 pl-14 text-lg font-bold rounded-2xl focus:border-seve transition-all outline-none text-white focus:bg-white/10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-seve transition-colors" />
                    <input 
                      type="password" 
                      placeholder="MOT DE PASSE" 
                      required
                      className="w-full bg-white/5 border border-white/10 p-5 pl-14 text-lg font-bold rounded-2xl focus:border-seve transition-all outline-none text-white focus:bg-white/10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  
                  {mode === "register" && <CyberPasswordStrength strength={strength} length={password.length} />}
                </div>

                {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center italic">{error}</p>}

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-6 bg-seve text-background font-black rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all tracking-[0.6em] text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(46,204,113,0.3)]"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : mode === "register" ? "INITIALISER" : "SE CONNECTER"}
                </button>

                <div className="text-center">
                    <button 
                        type="button"
                        onClick={() => setMode(mode === "register" ? "login" : "register")}
                        className="text-[10px] text-white/40 uppercase tracking-widest hover:text-seve transition-colors"
                    >
                        {mode === "register" ? "Déjà un ancrage ? Se connecter" : "Pas encore de graine ? S'inscrire"}
                    </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-ritual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
               <div className="relative inline-block">
                <div className="w-32 h-32 bg-seve/20 rounded-full blur-3xl absolute inset-0 animate-pulse" />
                <div className="w-20 h-20 bg-seve rounded-full flex items-center justify-center shadow-[0_0_40px_#2ECC71] mx-auto">
                   <ShieldCheck className="w-10 h-10 text-background" />
                </div>
              </div>
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">ACCÈS VALIDE</h2>
              <p className="text-seve font-black tracking-widest text-xs uppercase animate-pulse">SYNCHRONISATION AVEC L&apos;ARBRE...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
