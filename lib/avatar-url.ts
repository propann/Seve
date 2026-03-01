export function resolveAvatarUrl(input?: string | null): string | null {
  const raw = String(input || "").trim();
  if (!raw) return null;

  if (raw.startsWith("data:image/")) return raw;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("/")) return raw;

  const base = String(process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_URL || "").trim();
  if (!base) return raw;

  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = raw.replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedPath}`;
}
