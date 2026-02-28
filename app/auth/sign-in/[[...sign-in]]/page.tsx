"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/AuthContext";
import { loginUserAction } from "@/lib/actions/auth";
import { Mail, Lock, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await loginUserAction(email, password);
      if (result.success && result.user) {
        login(result.user);
        window.location.href = "/dashboard";
      } else {
        throw new Error(result.error || "Identifiants invalides.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-6 relative overflow-hidden font-mono text-textMain">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-seve/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full max-w-md space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-seve/10 border border-seve/20 px-4 py-2 rounded-full mb-4 text-seve">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Accès Mycélium</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">RÉACTIVER <br/> <span className="text-seve italic">SA SÈVE</span></h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-seve transition-colors" />
              <input 
                type="email" placeholder="VOTRE@EMAIL.COM" required
                className="w-full bg-white/5 border border-white/10 p-5 pl-14 text-lg font-bold rounded-2xl focus:border-seve transition-all outline-none text-white focus:bg-white/10"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-seve transition-colors" />
              <input 
                type="password" placeholder="MOT DE PASSE" required
                className="w-full bg-white/5 border border-white/10 p-5 pl-14 text-lg font-bold rounded-2xl focus:border-seve transition-all outline-none text-white focus:bg-white/10"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center italic">{error}</p>}

          <button 
            disabled={isSubmitting} type="submit"
            className="w-full py-6 bg-seve text-background font-black rounded-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all tracking-[0.6em] text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(46,204,113,0.3)]"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "SE CONNECTER"}
          </button>

          <div className="text-center pt-4">
            <Link href="/" className="text-[10px] text-white/40 uppercase tracking-widest hover:text-seve transition-colors">
              Retour à l'Arbre (Accueil)
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
