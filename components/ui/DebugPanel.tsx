"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Activity, Database, Check, AlertTriangle } from "lucide-react";

/**
 * DASHBOARD DE DEBUG "CYBER-ORGANIC"
 * Permet de voir en temps réel l'analyse de l'IA (Hugging Face / Groq)
 */
export const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logs = [
    { id: 1, type: "system", msg: "Initialisation Node R0.1...", time: "11:42:01" },
    { id: 2, type: "ai_vision", msg: "Scan Hugging Face : Détection règle des tiers [85%]", time: "11:42:05" },
    { id: 3, type: "ai_llm", msg: "Groq (Llama 3) : Génération feedback 'Alchimiste'...", time: "11:42:07" },
    { id: 4, type: "db", msg: "Airtable Sync : XP +25 enregistrés.", time: "11:42:08" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-96 bg-[#0B0B0B]/90 backdrop-blur-2xl border border-seve/20 rounded-3xl p-6 shadow-2xl shadow-seve/20 mb-4 overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-seve/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-seve" />
                <span className="text-[10px] font-black tracking-widest text-seve uppercase italic">Console d'Éveil IA</span>
              </div>
              <div className="w-2 h-2 bg-seve rounded-full animate-pulse shadow-[0_0_8px_#2ECC71]" />
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.map((log) => (
                <div key={log.id} className="space-y-1">
                  <div className="flex justify-between items-center text-[8px] font-bold text-white/20 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      {log.type === "system" && <Activity className="w-2 h-2" />}
                      {log.type === "ai_vision" && <Shield className="w-2 h-2" />}
                      {log.type === "db" && <Database className="w-2 h-2" />}
                      {log.type}
                    </span>
                    <span>{log.time}</span>
                  </div>
                  <p className={`text-[10px] font-medium leading-relaxed ${
                    log.type.startsWith('ai') ? 'text-seve italic' : 'text-textMain/70'
                  }`}>
                    {log.msg}
                  </p>
                </div>
              ))}
            </div>

            {/* AI Technical Metadata (Simulated) */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <h4 className="text-[9px] font-black text-white/30 tracking-[0.3em] uppercase mb-4">Meta-Analyse Image</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="block text-[8px] text-white/20 mb-1">EXPOSITION</span>
                  <div className="flex items-center gap-2 text-seve">
                    <Check className="w-3 h-3" />
                    <span className="text-[10px] font-black tracking-widest uppercase">Optimale</span>
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="block text-[8px] text-white/20 mb-1">TIERS</span>
                  <div className="flex items-center gap-2 text-amberGlow">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-[10px] font-black tracking-widest uppercase">À Décaler</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
          isOpen ? "bg-seve text-background rotate-180" : "bg-white/5 text-seve border border-seve/30"
        } shadow-2xl hover:scale-110 active:scale-95`}
      >
        <Activity className="w-6 h-6" />
      </button>
    </div>
  );
};
