"use client";

import React, { useState } from "react";
import { Shield, Eye, Zap, Database, ArrowRight } from "lucide-react";
import { EvolutionaryAvatar } from "@/components/ui/EvolutionaryAvatar";

export default function DebugPage() {
  const [testLevel, setTestLevel] = useState(0);
  const [testXP, setTestXP] = useState(0);
  
  const mockLastJSON = {
    "status": "success",
    "ai_vision": {
      "model": "llava-1.5-7b",
      "analysis": "Exposition équilibrée, règle des tiers respectée sur le sujet principal. Contraste élevé suggérant une intention dramatique.",
      "score": 85
    },
    "llm_feedback": {
      "master": "L'Alchimiste",
      "text": "Votre capture capture l'essence de l'ombre. Les sels d'argent de votre regard sont bien dosés. Le nœud R0.1 vous attend."
    }
  };

  return (
    <div className="min-h-screen bg-background text-textMain p-8 md:p-16 font-mono selection:bg-seve selection:text-background">
      <header className="max-w-7xl mx-auto mb-16 border-b border-white/5 pb-10 flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
            Console de <span className="text-seve italic">Maintenance</span> IA
          </h1>
          <p className="text-textMain/40 font-bold tracking-widest text-[10px] uppercase">
            Accès Niveau 5 | Diagnostic Système Organique
          </p>
        </div>
        <div className="flex items-center gap-3 bg-seve/10 border border-seve/20 px-4 py-2 rounded-xl">
          <div className="w-2 h-2 bg-seve rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-seve uppercase tracking-widest">Système Nominal</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Colonne 1 : Test d'Évolution Visuelle */}
        <section className="space-y-8 bg-white/5 p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-seve/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
          
          <h2 className="text-xs font-black text-seve uppercase tracking-[0.4em] flex items-center gap-2">
            <Zap className="w-4 h-4" /> Simulateur de Croissance
          </h2>

          <div className="flex flex-col items-center gap-6 py-10">
            <EvolutionaryAvatar level={testLevel} xp={testXP} />
            <div className="text-center">
              <p className="text-xl font-black text-white uppercase italic">Niveau {testLevel}</p>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">XP Actuelle : {testXP}/100</p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <button 
              onClick={() => { setTestLevel(1); setTestXP(25); }}
              className="w-full py-4 border border-seve/30 text-seve font-black rounded-2xl hover:bg-seve hover:text-background transition-all uppercase tracking-widest text-[10px]"
            >
              Forcer Stade "Germe"
            </button>
            <button 
              onClick={() => { setTestLevel(4); setTestXP(80); }}
              className="w-full py-4 border border-amberGlow/30 text-amberGlow font-black rounded-2xl hover:bg-amberGlow hover:text-background transition-all uppercase tracking-widest text-[10px]"
            >
              Forcer Stade "Arbre Maître"
            </button>
            <button 
              onClick={() => { setTestLevel(0); setTestXP(0); }}
              className="w-full py-4 border border-white/10 text-white/20 font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-[10px]"
            >
              Réinitialiser à "Graine"
            </button>
          </div>
        </section>

        {/* Colonne 2 : Logs IA Vision (Hugging Face) */}
        <section className="space-y-8 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* JSON Viewer */}
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 space-y-6">
              <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
                <Shield className="w-4 h-4" /> Dernier JSON n8n
              </h3>
              <pre className="text-[10px] text-seve bg-black/40 p-6 rounded-2xl overflow-x-auto border border-white/5 custom-scrollbar leading-relaxed">
                {JSON.stringify(mockLastJSON, null, 2)}
              </pre>
            </div>

            {/* AI Vision Log */}
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 space-y-6">
              <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
                <Eye className="w-4 h-4" /> Analyse Vision Brute
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-black/20 rounded-xl border-l-4 border-seve">
                  <p className="text-[10px] text-textMain leading-relaxed italic">
                    "Detection: sujet identifié aux coordonnées (0.33, 0.66). Alignement tiers : OK. 
                    Exposition : Moyenne 128. Contraste : Peak détecté à 210."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <span className="block text-[8px] text-white/20 uppercase mb-1">Confiance</span>
                    <span className="text-xs font-black text-seve">94.2%</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <span className="block text-[8px] text-white/20 uppercase mb-1">Latency</span>
                    <span className="text-xs font-black text-seve">842ms</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* System Status */}
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-seve/10 flex items-center justify-center text-seve border border-seve/20">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-white uppercase text-xs tracking-widest mb-1">Airtable Sync Engine</h4>
                <p className="text-textMain/20 text-[10px] font-bold uppercase italic">Dernière mise à jour : Il y a 2 min</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.3em] uppercase hover:bg-white/10 transition-all flex items-center gap-2 group">
              Forcer Sync Mycélium <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </section>

      </div>

      <footer className="mt-20 text-center opacity-20">
        <p className="text-[9px] font-black tracking-[0.5em] uppercase">
          L'Arbre de la Photographie | Debug Interface v1.0
        </p>
      </footer>
    </div>
  );
}
