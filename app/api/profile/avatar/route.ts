import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session-token";
import { createAvatarObjectKey, uploadBufferToS3 } from "@/lib/s3-upload";

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

function parseDataUrl(dataUrl: string): { mime: string; bytes: Buffer } | null {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const mime = match[1];
  const base64 = match[2];
  const bytes = Buffer.from(base64, "base64");
  if (!bytes.length) return null;
  return { mime, bytes };
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("arbre_session")?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ success: false, error: "Session invalide." }, { status: 401 });
    }

    const body = await request.json();
    const dataUrl = String(body?.dataUrl || "").trim();
    if (!dataUrl) {
      return NextResponse.json({ success: false, error: "Image requise." }, { status: 400 });
    }

    const parsed = parseDataUrl(dataUrl);
    if (!parsed) {
      return NextResponse.json(
        { success: false, error: "Format image non supporte. Utilisez JPG, PNG ou WEBP." },
        { status: 400 }
      );
    }

    if (parsed.bytes.byteLength > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { success: false, error: "Image trop lourde apres optimisation (max 3MB)." },
        { status: 413 }
      );
    }

    const extension = MIME_TO_EXT[parsed.mime] || "jpg";
    const key = createAvatarObjectKey(session.uid, extension);
    const uploaded = await uploadBufferToS3(key, parsed.mime, parsed.bytes);

    return NextResponse.json({
      success: true,
      key: uploaded.key,
      url: uploaded.url,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload avatar impossible.";
    console.error("api/profile/avatar error", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
