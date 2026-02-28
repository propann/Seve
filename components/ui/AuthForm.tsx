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
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 md:p-8">
      <div className="flex rounded-full bg-white/5 p-1 mb-6">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
          }}
          className={`flex-1 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
            mode === "login" ? "bg-seve text-background" : "text-white/60 hover:text-white"
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
          className={`flex-1 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
            mode === "signup" ? "bg-seve text-background" : "text-white/60 hover:text-white"
          }`}
        >
          Creer un compte
        </button>
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
            <div className="flex items-center gap-2 text-seve">
              <LogIn className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Entrer dans le Portail</span>
            </div>
            <input
              {...loginForm.register("email", {
                required: "Email requis.",
                pattern: { value: EMAIL_PATTERN, message: "Format email invalide." },
              })}
              type="email"
              placeholder="email@domaine.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-seve"
            />
            <input
              {...loginForm.register("password", {
                required: "Mot de passe requis.",
                minLength: { value: 10, message: "10 caracteres minimum." },
              })}
              type="password"
              placeholder="Mot de passe"
              minLength={10}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-seve"
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
              className="w-full rounded-2xl bg-seve py-3 text-[11px] font-black uppercase tracking-[0.2em] text-background disabled:opacity-70"
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
            <div className="flex items-center gap-2 text-seve">
              <UserPlus className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Planter une Graine</span>
            </div>
            <input
              {...signupForm.register("name", {
                required: "Nom requis.",
                minLength: { value: 2, message: "Nom trop court (2 caracteres min)." },
              })}
              type="text"
              placeholder="Votre nom"
              minLength={2}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-seve"
            />
            <input
              {...signupForm.register("email", {
                required: "Email requis.",
                pattern: { value: EMAIL_PATTERN, message: "Format email invalide." },
              })}
              type="email"
              placeholder="email@domaine.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-seve"
            />
            <input
              {...signupForm.register("password", {
                required: "Mot de passe requis.",
                minLength: { value: 10, message: "10 caracteres minimum." },
              })}
              type="password"
              placeholder="Mot de passe (10+)"
              minLength={10}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-seve"
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
              className="w-full rounded-2xl bg-seve py-3 text-[11px] font-black uppercase tracking-[0.2em] text-background disabled:opacity-70"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Creer et entrer"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {error && <p className="mt-4 text-red-400 text-[10px] uppercase tracking-wider">{error}</p>}
      <p className="mt-6 text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-2">
        <Camera className="w-3 h-3" /> Portail generaliste des graines de savoir
      </p>
    </section>
  );
}
