"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, User as UserIcon, Bot, ImageIcon, Hash, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { sendMessageAction, getMessagesAction } from "@/lib/actions/chat";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  createdAt: Date;
  user: {
    name: string;
    characterClass: string;
    avatar?: string;
  };
}

export const MyceliumChat = ({ roomSlug, roomName }: { roomSlug: string, roomName: string }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Charger les messages initialement
  useEffect(() => {
    const loadMessages = async () => {
      const data: any = await getMessagesAction(roomSlug);
      setMessages(data);
    };
    loadMessages();
    // Système de rafraîchissement simple (polling) toutes les 5s pour la démo
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [roomSlug]);

  // Scroll auto en bas
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !user || isSending) return;

    const messageText = inputText;
    setInputText("");
    setIsSubmitting(true);

    // AFFICHAGE OPTIMISTE : On ajoute le message localement tout de suite
    const optimisticMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isAI: false,
      createdAt: new Date(),
      user: {
        name: user.name,
        characterClass: user.characterClass,
        avatar: user.avatar || undefined
      }
    };
    setMessages(prev => [...prev, optimisticMessage]);

    try {
      const result = await sendMessageAction(user.id, roomSlug, messageText);
      if (result && result.success) {
        // Rafraîchissement réel pour synchroniser avec l'ID de la DB
        const data: any = await getMessagesAction(roomSlug);
        setMessages(data);
      } else {
        alert("Erreur de transmission au Mycélium.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden font-mono shadow-2xl">
      {/* Header du Salon */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-seve/10 rounded-lg text-seve">
            <Hash className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">{roomName}</h3>
            <p className="text-[8px] text-white/20 uppercase font-bold italic">Réseau Synaptique Actif</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-seve rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-seve/60 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Zone des Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)]">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: msg.isAI ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex gap-4 ${msg.isAI ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${msg.isAI ? 'bg-seve/20 border-seve text-seve shadow-[0_0_10px_#2ECC7144]' : 'bg-white/5 border-white/10 text-white/40'}`}>
              {msg.isAI ? <Bot className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
            </div>
            
            <div className={`max-w-[80%] space-y-1 ${msg.isAI ? 'text-left' : 'text-right'}`}>
              <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                <span className="text-[10px] font-black text-white/60 uppercase">{msg.user?.name || (msg.isAI ? "Le Maître" : "Anonyme")}</span>
                <span className="text-[8px] font-bold text-white/20 uppercase italic">{msg.user?.characterClass}</span>
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.isAI ? 'bg-white/5 border border-seve/20 text-textMain rounded-tl-none italic' : 'bg-seve text-background font-bold rounded-tr-none shadow-lg shadow-seve/10'}`}>
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input de Message */}
      <form onSubmit={handleSend} className="p-6 bg-black/40 border-t border-white/5 flex gap-4">
        <button type="button" className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/20 hover:text-seve hover:bg-seve/5 transition-all">
          <ImageIcon className="w-5 h-5" />
        </button>
        <input 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Envoyez une vibration au Mycélium..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-bold focus:border-seve outline-none text-white transition-all"
        />
        <button 
          disabled={isSending}
          type="submit" 
          className="p-4 bg-seve text-background rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_#2ECC7144]"
        >
          {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};
