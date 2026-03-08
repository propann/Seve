"use client";

import React, { useState } from "react";
import { MyceliumChat } from "@/components/ui/MyceliumChat";
import { Users, Sparkles, MessageSquare } from "lucide-react";

const ROOMS = [
  { slug: "general", name: "Le Mycélium (Général)", icon: Users, desc: "Échanges libres entre explorateurs" },
  { slug: "aide-technique", name: "Aide Technique", icon: MessageSquare, desc: "Matos, Logicielles et Bugs" },
  { slug: "critique", name: "Critique d'Image", icon: Sparkles, desc: "Soumettez vos photos à l'IA" }
];

export default function MyceliumPage() {
  const [activeRoom, setActiveRoom] = useState(ROOMS[0]);

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-12 font-mono text-textMain">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">
            HUB <span className="text-seve italic">MYCÉLIUM</span>
          </h1>
          <p className="text-textMain/40 font-bold tracking-widest text-[10px] uppercase">
            Réseau de communication synaptique | Partage de ressources
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar des Salons */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6">Salons Actifs</h3>
          {ROOMS.map(room => (
            <button 
              key={room.slug}
              onClick={() => setActiveRoom(room)}
              className={`w-full p-6 rounded-2xl border transition-all text-left flex flex-col gap-2 ${activeRoom.slug === room.slug ? "bg-seve/10 border-seve text-seve shadow-[0_0_20px_#2ECC7122]" : "bg-white/2 border-white/5 text-white/40 hover:bg-white/5 hover:border-white/10"}`}
            >
              <div className="flex items-center gap-3">
                <room.icon className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">{room.name}</span>
              </div>
              <p className="text-[8px] font-bold uppercase opacity-60 italic">{room.desc}</p>
            </button>
          ))}
        </div>

        {/* Zone de Chat */}
        <div className="lg:col-span-3">
          <MyceliumChat roomSlug={activeRoom.slug} roomName={activeRoom.name} />
        </div>
      </div>
    </div>
  );
}
