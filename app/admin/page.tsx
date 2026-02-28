import Link from "next/link";
import { Settings, ShieldCheck, Database, HardDrive, Workflow, Globe } from "lucide-react";

const configLinks = [
  { href: "/admin/config/security", label: "Securite & Acces", icon: ShieldCheck, hint: "roles, sessions, restrictions" },
  { href: "/admin/config/storage", label: "Stockage & S3", icon: HardDrive, hint: "minio, buckets, assets" },
  { href: "/admin/config/backups", label: "Backups", icon: Database, hint: "postgres, retention, restoration" },
  { href: "/admin/config/integrations", label: "Integrations", icon: Workflow, hint: "n8n, webhooks, api" },
  { href: "/admin/config/domain", label: "Domaine & SSL", icon: Globe, hint: "nginx, tls, routage" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-textMain p-8 md:p-16 font-mono selection:bg-seve selection:text-background">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="space-y-4 border-b border-white/5 pb-8">
          <div className="inline-flex items-center gap-2 bg-seve/10 border border-seve/20 px-4 py-2 rounded-full text-seve">
            <Settings className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Section Admin</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Centre de <span className="text-seve">Configuration</span>
          </h1>
          <p className="text-textMain/50 text-sm max-w-2xl">
            Toutes les pages de configuration infrastructure et exploitation sont centralisees ici.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {configLinks.map(({ href, label, icon: Icon, hint }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-seve/40 hover:bg-seve/5 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-seve/10 border border-seve/20 text-seve flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-white uppercase tracking-wide">{label}</h2>
              <p className="text-[11px] uppercase tracking-widest text-textMain/40 mt-2">{hint}</p>
            </Link>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-sm font-black uppercase tracking-widest text-seve">Configuration Avancee</h2>
          <p className="text-textMain/50 mt-2 text-sm">
            Les outils techniques detaillees restent accessibles dans la console de maintenance.
          </p>
          <Link
            href="/admin/debug"
            className="inline-flex items-center mt-4 px-4 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest hover:border-seve hover:text-seve transition-all"
          >
            Ouvrir Console Debug
          </Link>
        </section>
      </div>
    </div>
  );
}

