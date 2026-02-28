import Link from "next/link";
import { notFound } from "next/navigation";

const sections: Record<string, { title: string; summary: string; checks: string[] }> = {
  security: {
    title: "Securite & Acces",
    summary: "Controle des roles, session, routes protegees et hygiene des secrets.",
    checks: [
      "Roles ADMIN/TEACHER verifies sur /admin",
      "Session HttpOnly signee active",
      "Rotation de AUTH_SESSION_SECRET planifiee",
    ],
  },
  storage: {
    title: "Stockage & S3",
    summary: "Configuration MinIO/S3 pour les binaires n8n et les assets.",
    checks: [
      "Bucket principal valide",
      "Endpoint S3 resolu en HTTPS",
      "Ecriture/lecture testee depuis n8n",
    ],
  },
  backups: {
    title: "Backups",
    summary: "Surveillance des dumps journaliers PostgreSQL et retention.",
    checks: [
      "Cron quotidien actif",
      "Dump local present",
      "Copie MinIO effectuee",
    ],
  },
  integrations: {
    title: "Integrations",
    summary: "Consolidation des webhooks, n8n et services externes.",
    checks: [
      "Webhooks n8n documentes",
      "Secrets API centralises",
      "Retry/timeout definis",
    ],
  },
  domain: {
    title: "Domaine & SSL",
    summary: "Gestion Nginx, certificats et routage des sous-domaines.",
    checks: [
      "Vhosts synchronises",
      "Certificats valides et renouvelables",
      "Routage 80->443 confirme",
    ],
  },
};

interface ConfigPageProps {
  params: Promise<{ section: string }>;
}

export default async function ConfigSectionPage({ params }: ConfigPageProps) {
  const { section } = await params;
  const content = sections[section];

  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-textMain p-8 md:p-16 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/admin" className="text-[10px] uppercase tracking-widest text-seve hover:underline">
          ← Retour centre admin
        </Link>
        <header className="space-y-3 border-b border-white/5 pb-6">
          <p className="text-[10px] uppercase tracking-widest text-seve">Configuration</p>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">{content.title}</h1>
          <p className="text-textMain/50">{content.summary}</p>
        </header>
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
          <h2 className="text-sm uppercase tracking-widest font-black text-seve">Checklist</h2>
          <ul className="space-y-2">
            {content.checks.map((item) => (
              <li key={item} className="text-sm text-textMain/70">
                - {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

