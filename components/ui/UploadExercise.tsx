"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, Loader2, Camera, ShieldAlert } from "lucide-react";

interface UploadExerciseProps {
  moduleId: string;
  instruction?: string;
}

/**
 * UPLOAD EXERCISE : La Porte vers l'Analyse IA
 * Gère l'envoi de l'image au Webhook n8n.
 */
export const UploadExercise: React.FC<UploadExerciseProps> = ({ moduleId, instruction }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    // Simulation de l'appel au Webhook n8n
    setTimeout(() => {
      setStatus("analyzing");
      
      setTimeout(() => {
        setStatus("success");
        setFeedback("L'Alchimiste a parlé : 'Votre sténopé a capturé l'âme de la lumière. Le nœud R0.1 est validé.'");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 my-20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-seve/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Upload Zone */}
        <div className="w-full md:w-1/2">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:border-seve/50 hover:bg-seve/5 transition-all relative overflow-hidden group">
                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div 
                            key="placeholder"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center pt-5 pb-6"
                        >
                            <Upload className="w-12 h-12 text-white/20 mb-4 group-hover:text-seve transition-colors" />
                            <p className="text-xs font-black tracking-widest text-white/40 uppercase">DÉPOSER VOTRE TRACE</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="preview"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 p-4"
                        >
                             <div className="w-full h-full bg-black/40 rounded-2xl flex items-center justify-center overflow-hidden">
                                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover opacity-50" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                     <Camera className="w-12 h-12 text-seve" />
                                </div>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept="image/*"
                />
            </label>
        </div>

        {/* Action & Feedback */}
        <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-2">
                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Soumettre le Défi</h3>
                {instruction && (
                  <p className="text-xs text-white/50 leading-relaxed">
                    {instruction}
                  </p>
                )}
                <p className="text-xs text-white/40 font-bold tracking-widest uppercase">Module {moduleId} | Analyse Vision IA</p>
            </div>

            <button
                disabled={!file || status !== "idle"}
                onClick={handleUpload}
                className="w-full py-5 bg-seve text-background font-black rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(46,204,113,0.3)]"
            >
                {status === "idle" && "ENVOYER AU MAÎTRE"}
                {status === "uploading" && <><Loader2 className="animate-spin" /> TRANSFERT...</>}
                {status === "analyzing" && <><Loader2 className="animate-spin" /> ANALYSE IA EN COURS...</>}
                {status === "success" && <><Check /> VALIDÉ</>}
            </button>

            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-seve/10 border border-seve/20 rounded-2xl text-seve italic text-sm font-medium"
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
