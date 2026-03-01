"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  FlaskConical as Flask, 
  Camera, 
  Smartphone, 
  Film,
  PenTool,
  Layers, 
  Cpu, 
  Wind,
  Shield,
  Loader2,
  Box,
  Upload,
  Monitor,
  Layout,
  Terminal as LinuxIcon,
  MousePointer2,
  Sun,
  Lightbulb,
  Combine,
  Plus,
  Minus,
  Printer,
  Focus,
  Gem,
  Server,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { updateUserProfileAction } from "@/lib/actions/auth";
import { CognitiveProfile, ExperienceLevel, LearningProfileData, SeedEquipmentMap, SeedKey } from "@/lib/types/profile";

interface PlayerProfileProps {
  onComplete: (data: {
    name: string;
    characterClass: string;
    avatar: string | null;
    profileData: LearningProfileData;
  }) => void;
}

type OS = "mac" | "win" | "linux";

const SOFTWARE_DATABASE = {
  mac: [
    { id: "photos_mac", label: "Photos", icon: Layout },
    { id: "final_cut", label: "Final Cut", icon: Zap },
    { id: "capture_one_mac", label: "Capture One", icon: MousePointer2 },
    { id: "lightroom_mac", label: "Lightroom", icon: Zap },
    { id: "photoshop_mac", label: "Photoshop", icon: Cpu },
  ],
  win: [
    { id: "lightroom_win", label: "Lightroom", icon: Zap },
    { id: "photoshop_win", label: "Photoshop", icon: Cpu },
    { id: "capture_one_win", label: "Capture One", icon: MousePointer2 },
    { id: "affinity", label: "Affinity Photo", icon: Box },
    { id: "luminar", label: "Luminar Neo", icon: Zap },
  ],
  linux: [
    { id: "darktable", label: "Darktable", icon: Box },
    { id: "gimp", label: "GIMP", icon: Layout },
    { id: "digikam", label: "DigiKam", icon: LinuxIcon },
    { id: "rawtherapee", label: "RawTherapee", icon: Zap },
    { id: "entangle", label: "Entangle", icon: Camera },
  ]
};

const SEED_LABELS: Record<SeedKey, string> = {
  photographie: "Photographie",
  cinema: "Cinema",
  design: "Dessin",
  linux: "Linux",
};

const SEED_EQUIPMENT_CATALOG: Record<SeedKey, Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }>> = {
  photographie: [
    { id: "mirrorless", label: "Hybride", icon: Camera },
    { id: "dslr", label: "Reflex", icon: Camera },
    { id: "smartphone_pro", label: "Smartphone Pro", icon: Smartphone },
    { id: "analog_35", label: "Format 35mm", icon: Flask },
    { id: "tripod", label: "Trepied", icon: Box },
    { id: "filters", label: "Filtres", icon: Sun },
    { id: "flash_cobra", label: "Flash Cobra", icon: Zap },
    { id: "studio_light", label: "Eclairage Studio", icon: Lightbulb },
    { id: "scanner", label: "Scanner Negatifs", icon: Monitor },
    { id: "printer", label: "Imprimante Photo", icon: Printer },
  ],
  cinema: [
    { id: "cinema_camera", label: "Camera Cinema", icon: Film },
    { id: "camera_rig", label: "Rig Camera", icon: Camera },
    { id: "gimbal", label: "Gimbal", icon: Wind },
    { id: "shotgun_mic", label: "Micro Shotgun", icon: Monitor },
    { id: "audio_recorder", label: "Enregistreur Audio", icon: Box },
    { id: "led_panel", label: "Panneau LED", icon: Lightbulb },
    { id: "video_tripod", label: "Trepied Video", icon: Focus },
    { id: "clap", label: "Clap", icon: Film },
  ],
  design: [
    { id: "graphic_tablet", label: "Tablette Graphique", icon: PenTool },
    { id: "stylus_pro", label: "Stylet Pro", icon: MousePointer2 },
    { id: "color_calibration", label: "Sonde Colorimetrique", icon: Sun },
    { id: "drawing_screen", label: "Ecran de Dessin", icon: Monitor },
    { id: "scanner_a3", label: "Scanner A3", icon: Box },
    { id: "printer_art", label: "Imprimante Art", icon: Printer },
    { id: "light_table", label: "Table Lumineuse", icon: Lightbulb },
    { id: "cutting_tools", label: "Outils de Coupe", icon: Combine },
  ],
  linux: [
    { id: "linux_laptop", label: "Laptop Linux", icon: LinuxIcon },
    { id: "home_server", label: "Serveur Maison", icon: Server },
    { id: "raspberry_pi", label: "Raspberry Pi", icon: Box },
    { id: "network_switch", label: "Switch Reseau", icon: Combine },
    { id: "external_ssd", label: "SSD Externe", icon: Layout },
    { id: "second_monitor", label: "Second Ecran", icon: Monitor },
    { id: "backup_nas", label: "NAS", icon: Box },
    { id: "lab_keyboard", label: "Clavier labo", icon: MousePointer2 },
  ],
};

function buildInitialSeedEquipment(userInventory: Record<string, number>, fromProfile?: SeedEquipmentMap): SeedEquipmentMap {
  const seedEquipment: SeedEquipmentMap = {
    photographie: {},
    cinema: {},
    design: {},
    linux: {},
  };

  if (fromProfile) {
    (Object.keys(SEED_EQUIPMENT_CATALOG) as SeedKey[]).forEach((seed) => {
      seedEquipment[seed] = { ...(fromProfile[seed] || {}) };
    });
    return seedEquipment;
  }

  // Migration douce des anciens profils: l'ancien inventaire etait orienté photo.
  SEED_EQUIPMENT_CATALOG.photographie.forEach((item) => {
    const qty = userInventory[item.id] || 0;
    if (qty > 0) {
      seedEquipment.photographie = { ...seedEquipment.photographie, [item.id]: qty };
    }
  });

  return seedEquipment;
}

function aggregateSeedInventory(seedEquipment: SeedEquipmentMap): Record<string, number> {
  const merged: Record<string, number> = {};
  (Object.keys(SEED_EQUIPMENT_CATALOG) as SeedKey[]).forEach((seed) => {
    const inv = seedEquipment[seed] || {};
    Object.entries(inv).forEach(([id, qty]) => {
      merged[id] = (merged[id] || 0) + Math.max(0, qty || 0);
    });
  });
  return merged;
}

export const PlayerProfile: React.FC<PlayerProfileProps> = ({ onComplete }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "Explorateur");
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [selectedOS, setSelectedOS] = useState<OS>((user?.os as OS) || "mac");
  const [activeSeedTab, setActiveSeedTab] = useState<SeedKey>((user?.selectedSeed as SeedKey) || "photographie");
  const [seedEquipment, setSeedEquipment] = useState<SeedEquipmentMap>(
    buildInitialSeedEquipment(user?.inventory || {}, user?.profileData?.seedEquipment)
  );
  const [grimoire, setGrimoire] = useState<Record<string, boolean>>(
    user?.software ? user.software.reduce((acc: any, cur: string) => ({ ...acc, [cur]: true }), {}) : {}
  );
  const [alignment, setAlignment] = useState(user?.alignment || 50);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error" | "info">("info");

  const [characterClass, setCharacterClass] = useState(user?.characterClass || "Novice");
  const [age, setAge] = useState<number | "">(user?.profileData?.age ?? "");
  const [cognitiveProfile, setCognitiveProfile] = useState<CognitiveProfile>(
    user?.profileData?.cognitiveProfile || "operatoire"
  );
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    user?.profileData?.experienceLevel || "debutant"
  );
  const [weeklyHours, setWeeklyHours] = useState<number | "">(user?.profileData?.weeklyHours ?? "");
  const [primaryGoal, setPrimaryGoal] = useState(user?.profileData?.primaryGoal || "");
  const [notes, setNotes] = useState(user?.profileData?.notes || "");
  const inventory = aggregateSeedInventory(seedEquipment);

  const relics = (Object.keys(SEED_EQUIPMENT_CATALOG) as SeedKey[]).flatMap((seed) =>
    SEED_EQUIPMENT_CATALOG[seed]
      .filter((item) => (seedEquipment[seed]?.[item.id] || 0) > 0)
      .map((item) => ({ ...item, seed }))
  );

  useEffect(() => {
    const hasAnalog = (inventory.analog_35 || 0) + (inventory.analog_mf || 0) + (inventory.chambre || 0) > 0;
    const hasDigital = (inventory.mirrorless || 0) + (inventory.dslr || 0) > 0;

    if ((inventory.chambre || 0) > 0) setCharacterClass("Le Grand Alchimiste");
    else if (hasAnalog && !hasDigital) setCharacterClass("L'Artisan Argentique");
    else if (grimoire.ia && hasDigital) setCharacterClass("Le Cyber-Artiste");
    else if (inventory.smartphone_pro > 0) setCharacterClass("Le Nomade Digital");
    else setCharacterClass("Le Gardien du Tronc");
  }, [inventory, grimoire]);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const showStatus = (message: string, tone: "success" | "error" | "info" = "info") => {
    setStatusMessage(message);
    setStatusTone(tone);
    window.setTimeout(() => setStatusMessage(""), 3000);
  };

  const optimizeAvatar = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Lecture image impossible."));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Format image invalide."));
        img.onload = () => {
          const MAX_SIZE = 768;
          const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
          const width = Math.max(1, Math.round(img.width * scale));
          const height = Math.max(1, Math.round(img.height * scale));

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas non disponible."));
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.src = String(reader.result || "");
      };
      reader.readAsDataURL(file);
    });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const optimized = await optimizeAvatar(file);
        setAvatar(optimized);
        showStatus("Photo de profil prete a etre enregistree.", "info");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Upload image impossible.";
        showStatus(message, "error");
      } finally {
        e.target.value = "";
      }
    }
  };

  const adjustSeedQuantity = (seed: SeedKey, id: string, delta: number) => {
    setSeedEquipment((prev) => {
      const seedInv = prev[seed] || {};
      return {
        ...prev,
        [seed]: {
          ...seedInv,
          [id]: Math.max(0, (seedInv[id] || 0) + delta),
        },
      };
    });
  };

  const toggleSoftware = (id: string) => {
    setGrimoire(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSync = async () => {
    if (!user) return;
    setLoading(true);
    
    const profileData: LearningProfileData = {
      age: age === "" ? null : age,
      cognitiveProfile,
      experienceLevel,
      weeklyHours: weeklyHours === "" ? null : weeklyHours,
      primaryGoal: primaryGoal.trim(),
      notes: notes.trim(),
      seedEquipment,
    };

    const payload = {
      name, avatar, os: selectedOS,
      inventory,
      software: Object.keys(grimoire).filter(k => grimoire[k]),
      alignment, characterClass,
      profileData
    };

    try {
      const result = await updateUserProfileAction(user.id, payload);
      if (result && result.success) {
        updateUser(payload);
        showStatus("Identite scellee et enregistree.", "success");
        onComplete({
          name,
          characterClass,
          avatar,
          profileData,
        });
      } else {
        showStatus("Erreur de transmission.", "error");
      }
    } catch (err: any) {
      showStatus(`Erreur : ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-mono text-textMain space-y-12">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="relative z-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 md:p-20 rounded-[60px] shadow-2xl shadow-seve/5 w-full"
      >
        {/* SCAN EFFECT */}
        <AnimatePresence>
          {isScanning && (
            <motion.div initial={{ top: "0%" }} animate={{ top: "100%" }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "linear" }} className="absolute left-0 w-full h-1 bg-seve shadow-[0_0_30px_#2ECC71] z-50 pointer-events-none" />
          )}
        </AnimatePresence>

        {/* HEADER : IDENTITÉ LARGE */}
        <div className="flex flex-col md:flex-row gap-12 items-center border-b border-white/5 pb-12 mb-12">
          <div className="relative group">
            <div className="w-48 h-48 rounded-full bg-seve/5 border border-seve/30 flex items-center justify-center overflow-hidden cursor-pointer relative shadow-2xl shadow-seve/10">
              {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : <Flask className="w-16 h-16 text-seve opacity-40" />}
              <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="w-8 h-8 text-seve" />
                <span className="text-[10px] font-black uppercase mt-2">Uploader</span>
                <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
              </label>
            </div>
          </div>
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-xs font-black text-seve tracking-[0.5em] uppercase opacity-60">Signature de l'Explorateur</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent text-5xl md:text-7xl font-black text-white uppercase italic outline-none border-b-4 border-white/5 focus:border-seve w-full transition-all" />
            </div>
            <div className="flex items-center gap-4 bg-seve/10 border border-seve/20 px-6 py-3 rounded-2xl w-fit mx-auto md:mx-0">
              <Shield className="w-6 h-6 text-seve" />
              <span className="text-sm font-black uppercase tracking-widest">{characterClass}</span>
            </div>
          </div>
        </div>

        {/* SECTION RELIQUES LARGE */}
        {relics.length > 0 && (
          <div className="mb-16 p-10 bg-seve/[0.03] border border-seve/10 rounded-[40px] space-y-6 shadow-inner">
            <h3 className="text-xs font-black text-seve uppercase tracking-[0.5em] flex items-center gap-3">
              <Gem className="w-4 h-4" /> Reliques de votre Arsenal
            </h3>
            <div className="flex flex-wrap gap-4">
              {relics.map(relic => (
                <motion.div 
                  key={`${relic.seed}-${relic.id}`} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="flex items-center gap-3 px-5 py-3 bg-black/40 border border-seve/20 rounded-2xl shadow-xl"
                >
                  <relic.icon className="w-4 h-4 text-seve" />
                  <span className="text-xs font-bold uppercase text-white/90">{relic.label}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/45">{SEED_LABELS[relic.seed]}</span>
                  <span className="text-sm font-black text-seve ml-2 bg-seve/10 px-2 rounded-lg">x{seedEquipment[relic.seed]?.[relic.id] || 0}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* ARSENAL */}
          <div className="space-y-16">
            <div className="space-y-4">
                <h3 className="text-lg font-black text-white uppercase tracking-[0.5em] flex items-center gap-4">
                    <Combine className="w-6 h-6 text-seve" /> Materiel par Graine
                </h3>
                <p className="text-xs text-textMain/40 uppercase italic">Un onglet par graine pour mapper le materiel aux cours</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(SEED_LABELS) as SeedKey[]).map((seed) => (
                <button
                  key={seed}
                  type="button"
                  onClick={() => setActiveSeedTab(seed)}
                  className={`rounded-2xl border px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeSeedTab === seed
                      ? "bg-seve/20 border-seve text-seve"
                      : "bg-white/[0.03] border-white/10 text-white/60 hover:border-white/20"
                  }`}
                >
                  {SEED_LABELS[seed]}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
              <h4 className="text-xs font-black text-white/70 uppercase tracking-widest mb-4">
                Inventaire: {SEED_LABELS[activeSeedTab]}
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {SEED_EQUIPMENT_CATALOG[activeSeedTab].map((item) => {
                  const quantity = seedEquipment[activeSeedTab]?.[item.id] || 0;
                  return (
                    <div
                      key={`${activeSeedTab}:${item.id}`}
                      className={`flex items-center justify-between p-6 rounded-[32px] border transition-all ${quantity > 0 ? "bg-seve/10 border-seve/40 text-white" : "bg-white/5 border-white/5 text-white/20"}`}
                    >
                      <div className="flex items-center gap-6">
                        <item.icon className={`w-6 h-6 ${quantity > 0 ? "text-seve" : "opacity-40"}`} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-6 bg-black/60 rounded-2xl p-2 border border-white/5">
                        <button onClick={() => adjustSeedQuantity(activeSeedTab, item.id, -1)} className="p-2 hover:text-seve transition-colors"><Minus className="w-4 h-4"/></button>
                        <span className="text-lg font-black min-w-[30px] text-center text-seve">{quantity}</span>
                        <button onClick={() => adjustSeedQuantity(activeSeedTab, item.id, 1)} className="p-2 hover:text-seve transition-colors"><Plus className="w-4 h-4"/></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* GRIMOIRE & SAUVEGARDE */}
          <div className="space-y-16">
            <section className="space-y-8">
              <h3 className="text-lg font-black text-white uppercase tracking-[0.5em] flex items-center gap-4">
                <Cpu className="w-6 h-6 text-seve" /> Profil d&apos;Apprentissage
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="p-5 rounded-3xl border border-white/10 bg-white/[0.03] space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">Age</span>
                  <input
                    type="number"
                    min={7}
                    max={99}
                    value={age}
                    onChange={(e) => {
                      const value = e.target.value;
                      setAge(value === "" ? "" : Number(value));
                    }}
                    className="w-full bg-transparent border-b border-white/20 focus:border-seve outline-none py-2 text-white font-black"
                    placeholder="ex: 24"
                  />
                </label>

                <label className="p-5 rounded-3xl border border-white/10 bg-white/[0.03] space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">Heures / semaine</span>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={weeklyHours}
                    onChange={(e) => {
                      const value = e.target.value;
                      setWeeklyHours(value === "" ? "" : Number(value));
                    }}
                    className="w-full bg-transparent border-b border-white/20 focus:border-seve outline-none py-2 text-white font-black"
                    placeholder="ex: 6"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: "intuitif", label: "Cerveau Intuitif" },
                  { id: "analytique", label: "Cerveau Analytique" },
                  { id: "operatoire", label: "Cerveau Operatoire" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setCognitiveProfile(mode.id as CognitiveProfile)}
                    className={`rounded-2xl border px-4 py-4 text-xs font-black uppercase tracking-widest transition-all ${
                      cognitiveProfile === mode.id
                        ? "bg-seve/20 border-seve text-seve"
                        : "bg-white/[0.03] border-white/10 text-white/60 hover:border-white/20"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: "debutant", label: "Debutant" },
                  { id: "intermediaire", label: "Intermediaire" },
                  { id: "avance", label: "Avance" },
                ].map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setExperienceLevel(level.id as ExperienceLevel)}
                    className={`rounded-2xl border px-4 py-4 text-xs font-black uppercase tracking-widest transition-all ${
                      experienceLevel === level.id
                        ? "bg-seve/20 border-seve text-seve"
                        : "bg-white/[0.03] border-white/10 text-white/60 hover:border-white/20"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>

              <label className="block p-5 rounded-3xl border border-white/10 bg-white/[0.03] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">Objectif principal</span>
                <input
                  type="text"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 focus:border-seve outline-none py-2 text-white font-black"
                  placeholder="ex: Maitriser le portrait documentaire"
                />
              </label>

              <label className="block p-5 rounded-3xl border border-white/10 bg-white/[0.03] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">Contexte personnel (optionnel)</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full min-h-24 bg-transparent border border-white/10 rounded-2xl px-3 py-2 focus:border-seve outline-none text-white/90 text-sm"
                  placeholder="contraintes, disponibilite, style prefere..."
                />
              </label>
            </section>

            <section className="space-y-8">
              <h3 className="text-lg font-black text-white uppercase tracking-[0.5em] flex items-center gap-4">
                <Layers className="w-6 h-6 text-seve" /> Grimoire Logiciel
              </h3>
              <div className="flex gap-3 p-2 bg-white/5 rounded-3xl border border-white/10">
                {["mac", "win", "linux"].map(os => (
                  <button key={os} onClick={() => setSelectedOS(os as OS)} className={`flex-1 py-4 rounded-2xl transition-all text-xs font-black uppercase tracking-widest ${selectedOS === os ? "bg-seve text-background" : "text-white/20 hover:text-white"}`}>
                    {os}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {SOFTWARE_DATABASE[selectedOS].map(tool => (
                  <button key={tool.id} onClick={() => toggleSoftware(tool.id)} className={`p-6 rounded-3xl border flex items-center gap-4 transition-all ${grimoire[tool.id] ? "bg-seve/20 border-seve text-seve" : "bg-white/5 border-white/5 text-white/20 hover:border-white/20"}`}>
                    <tool.icon className="w-5 h-5" />
                    <span className="text-xs font-black tracking-widest uppercase">{tool.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h3 className="text-lg font-black text-white uppercase tracking-[0.5em] flex items-center gap-4">
                <Wind className="w-6 h-6 text-seve" /> Alignement Artistique
              </h3>
              <div className="bg-white/5 p-12 rounded-[48px] border border-white/5 space-y-10 relative overflow-hidden">
                <input type="range" min="0" max="100" value={alignment} onChange={(e) => setAlignment(parseInt(e.target.value))} className="w-full h-2 bg-white/10 rounded-full appearance-none accent-seve cursor-pointer" />
                <div className="flex justify-between text-xs font-black uppercase tracking-[0.3em] opacity-60 italic">
                  <span className={alignment < 40 ? "text-seve" : ""}>Documentaire</span>
                  <span className={alignment > 60 ? "text-seve" : ""}>Pictorialisme</span>
                </div>
              </div>
            </section>

            <button disabled={loading} onClick={handleSync} className="w-full py-10 bg-seve text-background font-black rounded-[40px] shadow-[0_0_50px_rgba(46,204,113,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.8em] text-sm flex items-center justify-center gap-4">
              {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck className="w-6 h-6" /> SCELLER L'IDENTITÉ</>}
            </button>
            {statusMessage && (
              <p
                className={`text-center text-[11px] font-bold tracking-wide ${
                  statusTone === "success"
                    ? "text-seve/90"
                    : statusTone === "error"
                      ? "text-red-400/90"
                      : "text-white/60"
                }`}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
