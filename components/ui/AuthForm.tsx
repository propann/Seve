"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Camera, Loader2, LogIn, UserPlus } from "lucide-react";

type AuthMode = "login" | "signup";

interface LoginFields {
  email: string;
  password: string;
}

interface SignupFields extends LoginFields {
  name: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const loginForm = useForm<LoginFields>({
    defaultValues: { email: "", password: "" },
  });
  const signupForm = useForm<SignupFields>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const callAuthApi = async (endpoint: string, payload: unknown) => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : { success: false, error: "Reponse serveur invalide." };

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Operation impossible.");
    }
    window.location.href = data.redirectTo || "/garden";
  };

  const handleLogin = async (values: LoginFields) => {
    setPending(true);
    setError("");
    try {
      await callAuthApi("/api/auth/login", values);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Connexion impossible.");
    } finally {
      setPending(false);
    }
  };

  const handleSignup = async (values: SignupFields) => {
    setPending(true);
    setError("");
    try {
      await callAuthApi("/api/auth/signup", values);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Creation de compte impossible.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="w-full rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(11,17,15,0.92),rgba(11,17,15,0.82))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#f6b66b]">Acces au Jardin</p>
          <h2 className="mt-3 text-3xl leading-none text-white [font-family:var(--font-display)]">Ouvrir le portail</h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d2ffb5]/20 bg-[#d2ffb5]/10 text-[#d2ffb5]">
          <Camera className="h-5 w-5" />
        </div>
      </div>

      <div className="mb-6 flex rounded-full border border-white/10 bg-white/[0.04] p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
          }}
          className={`flex-1 rounded-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.24em] transition-all ${
            mode === "login" ? "bg-[#d2ffb5] text-[#08110d]" : "text-white/60 hover:text-white"
          }`}
        >
          Connexion
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setError("");
          }}
          className={`flex-1 rounded-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.24em] transition-all ${
            mode === "signup" ? "bg-[#d2ffb5] text-[#08110d]" : "text-white/60 hover:text-white"
          }`}
        >
          Creer un compte
        </button>
      </div>

      <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#87b7ff]">Mission utilisateur</p>
        <p className="mt-3 text-sm leading-6 text-white/72 [font-family:var(--font-serif)]">
          Depuis le Jardin, vous suivez votre parcours, proposez des nouveaux cours et participez aux votes communautaires.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.form
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
            onSubmit={loginForm.handleSubmit(handleLogin)}
          >
            <div className="flex items-center gap-2 text-[#d2ffb5]">
              <LogIn className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.28em]">Entrer dans le Portail</span>
            </div>
            <input
              {...loginForm.register("email", {
                required: "Email requis.",
                pattern: { value: EMAIL_PATTERN, message: "Format email invalide." },
              })}
              type="email"
              placeholder="email@domaine.com"
              className="w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/28 focus:border-[#d2ffb5] focus:bg-white/[0.06]"
            />
            <input
              {...loginForm.register("password", {
                required: "Mot de passe requis.",
                minLength: { value: 10, message: "10 caracteres minimum." },
              })}
              type="password"
              placeholder="Mot de passe"
              minLength={10}
              className="w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/28 focus:border-[#d2ffb5] focus:bg-white/[0.06]"
            />
            {loginForm.formState.errors.email && (
              <p className="text-red-400 text-[10px] uppercase tracking-wider">{loginForm.formState.errors.email.message}</p>
            )}
            {loginForm.formState.errors.password && (
              <p className="text-red-400 text-[10px] uppercase tracking-wider">{loginForm.formState.errors.password.message}</p>
            )}
            <button
              disabled={pending}
              type="submit"
              className="w-full rounded-[1.25rem] bg-[#d2ffb5] py-3.5 text-[11px] font-black uppercase tracking-[0.24em] text-[#08110d] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Entrer"}
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="signup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
            onSubmit={signupForm.handleSubmit(handleSignup)}
          >
            <div className="flex items-center gap-2 text-[#d2ffb5]">
              <UserPlus className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.28em]">Planter une Graine</span>
            </div>
            <input
              {...signupForm.register("name", {
                required: "Nom requis.",
                minLength: { value: 2, message: "Nom trop court (2 caracteres min)." },
              })}
              type="text"
              placeholder="Votre nom"
              minLength={2}
              className="w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/28 focus:border-[#d2ffb5] focus:bg-white/[0.06]"
            />
            <input
              {...signupForm.register("email", {
                required: "Email requis.",
                pattern: { value: EMAIL_PATTERN, message: "Format email invalide." },
              })}
              type="email"
              placeholder="email@domaine.com"
              className="w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/28 focus:border-[#d2ffb5] focus:bg-white/[0.06]"
            />
            <input
              {...signupForm.register("password", {
                required: "Mot de passe requis.",
                minLength: { value: 10, message: "10 caracteres minimum." },
              })}
              type="password"
              placeholder="Mot de passe (10+)"
              minLength={10}
              className="w-full rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/28 focus:border-[#d2ffb5] focus:bg-white/[0.06]"
            />
            {signupForm.formState.errors.name && (
              <p className="text-red-400 text-[10px] uppercase tracking-wider">{signupForm.formState.errors.name.message}</p>
            )}
            {signupForm.formState.errors.email && (
              <p className="text-red-400 text-[10px] uppercase tracking-wider">{signupForm.formState.errors.email.message}</p>
            )}
            {signupForm.formState.errors.password && (
              <p className="text-red-400 text-[10px] uppercase tracking-wider">{signupForm.formState.errors.password.message}</p>
            )}
            <button
              disabled={pending}
              type="submit"
              className="w-full rounded-[1.25rem] bg-[#d2ffb5] py-3.5 text-[11px] font-black uppercase tracking-[0.24em] text-[#08110d] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Creer et entrer"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {error && <p className="mt-4 text-red-400 text-[10px] uppercase tracking-wider">{error}</p>}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.25em] text-white/38">
        <p className="flex items-center gap-2">
          <Camera className="h-3 w-3" /> Portail generaliste des graines de savoir
        </p>
        <p className="text-[#f6b66b]">Session ritualisee</p>
      </div>
    </section>
  );
}
