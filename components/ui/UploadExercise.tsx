"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, Loader2, ShieldAlert } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { ExerciseReview, ExerciseSubmission } from "@/lib/types/profile";

interface UploadExerciseProps {
  moduleId: string;
  instruction?: string;
  maxFiles?: number;
}

async function optimizeExerciseImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture image impossible."));
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const node = new Image();
    node.onerror = () => reject(new Error("Format image invalide."));
    node.onload = () => resolve(node);
    node.src = dataUrl;
  });

  const MAX_DIMENSION = 1920;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas non disponible.");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.86);
}

/**
 * UPLOAD EXERCISE : La Porte vers l'Analyse IA
 * Upload réel de l'image + sauvegarde dans la fiche élève.
 */
export const UploadExercise: React.FC<UploadExerciseProps> = ({ moduleId, instruction, maxFiles = 1 }) => {
  const { user, updateUser } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const previewUrls = useMemo(
    () => files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
    [files]
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((entry) => URL.revokeObjectURL(entry.url));
    };
  }, [previewUrls]);

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setStatus("uploading");
      setFeedback(null);

      const dataUrls = await Promise.all(files.map((file) => optimizeExerciseImage(file)));
      setStatus("analyzing");

      const response = await fetch("/api/profile/exercise", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          moduleId,
          dataUrls,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        submission?: ExerciseSubmission;
        review?: ExerciseReview;
        progression?: {
          xp: number;
          level: number;
          completedNodes: string[];
          unlockedNodes: string[];
        };
      };

      if (!response.ok || !payload?.success || !payload.submission) {
        throw new Error(payload?.error || "Envoi de l'epreuve impossible.");
      }

      if (user) {
        const currentSubmissions = Array.isArray(user.profileData?.exerciseSubmissions)
          ? user.profileData.exerciseSubmissions
          : [];
        const currentReviews = Array.isArray(user.profileData?.exerciseReviews)
          ? user.profileData.exerciseReviews
          : [];
        updateUser({
          xp: payload.progression?.xp ?? user.xp,
          level: payload.progression?.level ?? user.level,
          completedNodes: payload.progression?.completedNodes ?? user.completedNodes,
          unlockedNodes: payload.progression?.unlockedNodes ?? user.unlockedNodes,
          profileData: {
            ...(user.profileData || {}),
            exerciseSubmissions: [payload.submission, ...currentSubmissions].slice(0, 40),
            exerciseReviews: payload.review ? [payload.review, ...currentReviews].slice(0, 80) : currentReviews,
          },
        });
      }

      setStatus("success");
      const coachReply = payload.review?.coachReply || "Epreuve enregistree. Correction IA en cours.";
      const firstRecommendation = payload.review?.recommendations?.[0];
      setFeedback(firstRecommendation ? `${coachReply} Conseil: ${firstRecommendation}` : coachReply);
      setFiles([]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload image impossible.";
      setStatus("error");
      setFeedback(message);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 my-20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-seve/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:border-seve/50 hover:bg-seve/5 transition-all relative overflow-hidden group">
            <AnimatePresence mode="wait">
              {previewUrls.length === 0 ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <Upload className="w-12 h-12 text-white/20 mb-4 group-hover:text-seve transition-colors" />
                  <p className="text-xs font-black tracking-widest text-white/40 uppercase">DEPOSER VOTRE TRACE</p>
                  <p className="mt-2 text-[10px] text-white/35 uppercase tracking-[0.3em]">
                    {maxFiles > 1 ? `${maxFiles} IMAGES MAX` : "1 IMAGE"}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 p-4"
                >
                  <div className={`grid h-full gap-3 ${previewUrls.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {previewUrls.slice(0, maxFiles).map((preview, index) => (
                      <div key={preview.name} className="relative overflow-hidden rounded-2xl bg-black/40">
                        <Image
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full bg-black/45 px-3 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-seve">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const nextFiles = Array.from(e.target.files || []).slice(0, maxFiles);
                setFiles(nextFiles);
                setStatus("idle");
                setFeedback(null);
              }}
              multiple={maxFiles > 1}
              accept="image/*"
            />
          </label>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Soumettre le Defi</h3>
            {instruction && <p className="text-xs text-white/50 leading-relaxed">{instruction}</p>}
            {maxFiles > 1 ? (
              <p className="text-xs text-white/45 leading-relaxed">
                Cette epreuve attend plusieurs preuves visuelles. Selectionnez jusqu&apos;a {maxFiles} images avant l&apos;envoi.
              </p>
            ) : null}
            <p className="text-xs text-white/40 font-bold tracking-widest uppercase">Module {moduleId} | Analyse Vision IA</p>
          </div>

          <button
            disabled={files.length === 0 || status === "uploading" || status === "analyzing"}
            onClick={handleUpload}
            className="w-full py-5 bg-seve text-background font-black rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(46,204,113,0.3)]"
          >
            {status === "idle" && "ENVOYER AU MAITRE"}
            {status === "uploading" && (
              <>
                <Loader2 className="animate-spin" /> TRANSFERT...
              </>
            )}
            {status === "analyzing" && (
              <>
                <Loader2 className="animate-spin" /> ENREGISTREMENT...
              </>
            )}
            {status === "success" && (
              <>
                <Check /> VALIDE
              </>
            )}
            {status === "error" && "REESSAYER"}
          </button>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 border rounded-2xl italic text-sm font-medium ${
                  status === "error" ? "bg-red-500/10 border-red-500/20 text-red-200" : "bg-seve/10 border-seve/20 text-seve"
                }`}
              >
                <ShieldAlert className="w-4 h-4 mb-2" />
                "{feedback}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
