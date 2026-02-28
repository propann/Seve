const encoder = new TextEncoder();
const decoder = new TextDecoder();

export interface SessionPayload {
  uid: string;
  role: string;
  exp: number;
}

function toBase64Url(input: Uint8Array): string {
  let binary = "";
  for (let index = 0; index < input.length; index++) {
    binary += String.fromCharCode(input[index]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const output = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    output[index] = binary.charCodeAt(index);
  }
  return output;
}

function getSessionSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SESSION_SECRET must be set and at least 32 chars.");
  }
  return secret;
}

async function sign(message: string): Promise<Uint8Array> {
  const secret = getSessionSecret();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return new Uint8Array(signature);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index++) {
    diff |= a[index] ^ b[index];
  }
  return diff === 0;
}

export async function createSessionToken(uid: string, role: string, maxAgeSeconds = 60 * 60 * 24 * 7): Promise<string> {
  const payload: SessionPayload = {
    uid,
    role,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  };
  const payloadPart = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await sign(payloadPart);
  return `${payloadPart}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  try {
    const expected = await sign(payloadPart);
    const received = fromBase64Url(signaturePart);
    if (!timingSafeEqual(expected, received)) return null;

    const payload = JSON.parse(decoder.decode(fromBase64Url(payloadPart))) as SessionPayload;
    if (!payload.uid || !payload.role || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
