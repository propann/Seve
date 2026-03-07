import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { verifySessionToken } from "@/lib/session-token";
import { parseJsonWithFallback } from "@/lib/safe-json";
import { createExerciseObjectKey, uploadBufferToS3 } from "@/lib/s3-upload";
import { ExerciseSubmission, isLearningProfileData } from "@/lib/types/profile";

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
const MAX_STORED_SUBMISSIONS = 40;

function parseDataUrl(dataUrl: string): { mime: string; bytes: Buffer } | null {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const mime = match[1];
  const bytes = Buffer.from(match[2], "base64");
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
    const moduleId = String(body?.moduleId || "").trim();
    const dataUrl = String(body?.dataUrl || "").trim();

    if (!moduleId) {
      return NextResponse.json({ success: false, error: "Module manquant." }, { status: 400 });
    }
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
        { success: false, error: "Image trop lourde apres optimisation (max 6MB)." },
        { status: 413 }
      );
    }

    const extension = MIME_TO_EXT[parsed.mime] || "jpg";
    const key = createExerciseObjectKey(session.uid, moduleId, extension);
    const uploaded = await uploadBufferToS3(key, parsed.mime, parsed.bytes);

    const userRecord = await prisma.user.findUnique({
      where: { id: session.uid },
      select: { profileData: true },
    });

    const currentProfile = parseJsonWithFallback(userRecord?.profileData, {}, isLearningProfileData);
    const currentSubmissions = Array.isArray(currentProfile.exerciseSubmissions)
      ? currentProfile.exerciseSubmissions
      : [];

    const submission: ExerciseSubmission = {
      id: randomUUID(),
      moduleId,
      imageUrl: uploaded.url,
      storageKey: uploaded.key,
      mimeType: parsed.mime,
      size: parsed.bytes.byteLength,
      submittedAt: new Date().toISOString(),
    };

    const exerciseSubmissions = [submission, ...currentSubmissions].slice(0, MAX_STORED_SUBMISSIONS);
    const nextProfile = {
      ...currentProfile,
      exerciseSubmissions,
    };

    await prisma.user.update({
      where: { id: session.uid },
      data: {
        profileData: JSON.stringify(nextProfile),
      },
    });

    return NextResponse.json({
      success: true,
      submission,
      total: exerciseSubmissions.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload examen impossible.";
    console.error("api/profile/exercise error", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
