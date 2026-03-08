import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { verifySessionToken } from "@/lib/session-token";
import { parseJsonWithFallback } from "@/lib/safe-json";
import { createExerciseObjectKey, uploadBufferToS3 } from "@/lib/s3-upload";
import { ExerciseAsset, ExerciseReview, ExerciseSubmission, isLearningProfileData } from "@/lib/types/profile";
import { cursus } from "@/lib/data/cursus";
import { getExercisePromptConfig } from "@/lib/pedago/exercise-prompts";

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
const MAX_IMAGES_PER_SUBMISSION = 4;
const MAX_STORED_SUBMISSIONS = 40;
const MAX_STORED_REVIEWS = 80;
const MODULE_XP_REWARD = 25;

const MODULE_ORDER = cursus.flatMap((level) => level.modules.map((module) => module.id));

function parseDataUrl(dataUrl: string): { mime: string; bytes: Buffer } | null {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const mime = match[1];
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length) return null;
  return { mime, bytes };
}

function toNodeList(raw: string | null | undefined, fallback: string[]): string[] {
  if (!raw) return fallback;
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function normalizeId(id: string): string {
  return id.trim().toLowerCase();
}

function collectIncomingDataUrls(body: unknown): string[] {
  if (!body || typeof body !== "object") return [];
  const payload = body as Record<string, unknown>;
  const fromArray = Array.isArray(payload.dataUrls)
    ? payload.dataUrls.filter((entry): entry is string => typeof entry === "string").map((entry) => entry.trim()).filter(Boolean)
    : [];
  const fromSingle = typeof payload.dataUrl === "string" && payload.dataUrl.trim() ? [payload.dataUrl.trim()] : [];

  return [...fromArray, ...fromSingle].slice(0, MAX_IMAGES_PER_SUBMISSION);
}

function resolveReview(payload: unknown): {
  approved: boolean;
  status: ExerciseReview["status"];
  score: number | null;
  coachReply: string;
  provider: string;
  issues: string[];
  recommendations: string[];
} {
  const data = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const approved = data.approved === true;
  const rawStatus = String(data.status || "").trim().toLowerCase();
  const rawScore = data.score;
  const score = typeof rawScore === "number" && Number.isFinite(rawScore) ? rawScore : null;
  const coachReply = String(data.coachReply || data.feedback || "").trim();
  const issues = Array.isArray(data.issues) ? data.issues.filter((item): item is string => typeof item === "string") : [];
  const recommendations = Array.isArray(data.recommendations)
    ? data.recommendations.filter((item): item is string => typeof item === "string")
    : [];

  let status: ExerciseReview["status"] = "pending";
  if (approved) status = "approved";
  else if (rawStatus === "rejected") status = "rejected";
  else if (rawStatus === "needs_revision") status = "needs_revision";
  else if (rawStatus === "error") status = "error";

  return {
    approved,
    status,
    score,
    coachReply:
      coachReply ||
      (approved
        ? "Exercice valide. Le module suivant est debloque."
        : "Exercice recu. En attente de correction ou ajustements demandes."),
    provider: String(data.provider || "n8n"),
    issues,
    recommendations,
  };
}

async function requestN8nCorrection(payload: Record<string, unknown>) {
  const url = String(process.env.N8N_PEDAGO_EXERCISE_WEBHOOK_URL || "").trim();
  const secret = String(process.env.N8N_PEDAGO_WEBHOOK_SECRET || "").trim();

  if (!url) {
    return {
      approved: false,
      status: "pending" as const,
      score: null,
      coachReply: "Correction IA indisponible: webhook n8n non configure.",
      provider: "local",
      issues: ["Webhook n8n non configure."],
      recommendations: ["Configurer N8N_PEDAGO_EXERCISE_WEBHOOK_URL dans l'environnement."],
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { "x-seve-webhook-secret": secret } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    const json = (await response.json().catch(() => ({}))) as unknown;
    if (!response.ok) {
      return {
        approved: false,
        status: "error" as const,
        score: null,
        coachReply: `Erreur correction IA (${response.status}).`,
        provider: "n8n",
        issues: [`Webhook a repondu ${response.status}.`],
        recommendations: ["Verifier logs n8n et format JSON de reponse."],
      };
    }

    return resolveReview(json);
  } catch {
    return {
      approved: false,
      status: "error" as const,
      score: null,
      coachReply: "Timeout ou erreur reseau pendant la correction IA.",
      provider: "n8n",
      issues: ["Timeout ou erreur reseau vers n8n."],
      recommendations: ["Verifier connectivite, URL webhook et timeout workflow."],
    };
  } finally {
    clearTimeout(timeout);
  }
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
    const dataUrls = collectIncomingDataUrls(body);

    if (!moduleId) {
      return NextResponse.json({ success: false, error: "Module manquant." }, { status: 400 });
    }
    if (dataUrls.length === 0) {
      return NextResponse.json({ success: false, error: "Au moins une image est requise." }, { status: 400 });
    }

    const parsedImages = dataUrls.map((dataUrl) => parseDataUrl(dataUrl));
    if (parsedImages.some((entry) => !entry)) {
      return NextResponse.json(
        { success: false, error: "Format image non supporte. Utilisez JPG, PNG ou WEBP." },
        { status: 400 }
      );
    }

    const normalizedImages = parsedImages as { mime: string; bytes: Buffer }[];
    if (normalizedImages.some((entry) => entry.bytes.byteLength > MAX_IMAGE_BYTES)) {
      return NextResponse.json(
        { success: false, error: "Image trop lourde apres optimisation (max 6MB par image)." },
        { status: 413 }
      );
    }

    const uploadedAssets = await Promise.all(
      normalizedImages.map(async (image) => {
        const extension = MIME_TO_EXT[image.mime] || "jpg";
        const key = createExerciseObjectKey(session.uid, moduleId, extension);
        const uploaded = await uploadBufferToS3(key, image.mime, image.bytes);

        const asset: ExerciseAsset = {
          id: randomUUID(),
          url: uploaded.url,
          storageKey: uploaded.key,
          mimeType: image.mime,
          size: image.bytes.byteLength,
        };

        return asset;
      })
    );

    const userRecord = await prisma.user.findUnique({
      where: { id: session.uid },
      select: {
        id: true,
        email: true,
        name: true,
        selectedSeed: true,
        xp: true,
        level: true,
        completedNodes: true,
        unlockedNodes: true,
        profileData: true,
      },
    });
    if (!userRecord) {
      return NextResponse.json({ success: false, error: "Utilisateur introuvable." }, { status: 404 });
    }

    const currentProfile = parseJsonWithFallback(userRecord?.profileData, {}, isLearningProfileData);
    const currentSubmissions = Array.isArray(currentProfile.exerciseSubmissions)
      ? currentProfile.exerciseSubmissions
      : [];
    const currentReviews = Array.isArray(currentProfile.exerciseReviews) ? currentProfile.exerciseReviews : [];

    const primaryAsset = uploadedAssets[0];
    if (!primaryAsset) {
      return NextResponse.json({ success: false, error: "Aucun asset exercice n'a pu etre stocke." }, { status: 500 });
    }
    const submission: ExerciseSubmission = {
      id: randomUUID(),
      moduleId,
      imageUrl: primaryAsset.url,
      storageKey: primaryAsset.storageKey,
      mimeType: primaryAsset.mimeType,
      size: uploadedAssets.reduce((total, asset) => total + asset.size, 0),
      assets: uploadedAssets,
      submittedAt: new Date().toISOString(),
    };
    const promptConfig = getExercisePromptConfig(moduleId);

    const completedList = toNodeList(userRecord.completedNodes, []);
    const unlockedList = toNodeList(userRecord.unlockedNodes, ["0.1"]);
    const correction = await requestN8nCorrection({
      type: "exercise_submission",
      userId: userRecord.id,
      userName: userRecord.name,
      userEmail: userRecord.email,
      selectedSeed: userRecord.selectedSeed,
      moduleId,
      assetUrl: submission.imageUrl,
      assetKey: submission.storageKey,
      assetUrls: uploadedAssets.map((asset) => asset.url),
      assets: uploadedAssets,
      mimeType: submission.mimeType,
      size: submission.size,
      assetCount: uploadedAssets.length,
      submittedAt: submission.submittedAt,
      evaluationPrompt: promptConfig.prompt,
      evaluationObjective: promptConfig.objective,
      evaluationChecklist: promptConfig.checklist,
      rejectionHints: promptConfig.rejectionHints,
      expectedAssetCount: promptConfig.minAssets,
      xp: userRecord.xp,
      level: userRecord.level,
      completedNodes: completedList,
      unlockedNodes: unlockedList,
      profileData: currentProfile,
    });

    const review: ExerciseReview = {
      id: randomUUID(),
      submissionId: submission.id,
      moduleId,
      approved: correction.approved,
      status: correction.status,
      score: correction.score,
      coachReply: correction.coachReply,
      provider: correction.provider,
      issues: correction.issues,
      recommendations: correction.recommendations,
      reviewedAt: new Date().toISOString(),
    };

    const canonicalModule = MODULE_ORDER.find((id) => normalizeId(id) === normalizeId(moduleId));
    const orderedCompleted = [...completedList];
    const orderedUnlocked = [...unlockedList];
    let nextUnlockedModule: string | null = null;
    let nextXp = userRecord.xp;
    let nextLevel = userRecord.level;

    if (correction.approved && canonicalModule) {
      if (!orderedCompleted.includes(canonicalModule)) {
        orderedCompleted.push(canonicalModule);
        nextXp += MODULE_XP_REWARD;
        nextLevel = Math.max(nextLevel, Math.floor(nextXp / 100));
      }

      const currentIndex = MODULE_ORDER.findIndex((id) => id === canonicalModule);
      const nextModule = currentIndex >= 0 ? MODULE_ORDER[currentIndex + 1] : null;
      if (nextModule && !orderedUnlocked.includes(nextModule)) {
        orderedUnlocked.push(nextModule);
        nextUnlockedModule = nextModule;
      }
    }

    const exerciseSubmissions = [submission, ...currentSubmissions].slice(0, MAX_STORED_SUBMISSIONS);
    const exerciseReviews = [review, ...currentReviews].slice(0, MAX_STORED_REVIEWS);
    const nextProfile = {
      ...currentProfile,
      exerciseSubmissions,
      exerciseReviews,
    };

    await prisma.user.update({
      where: { id: session.uid },
      data: {
        profileData: JSON.stringify(nextProfile),
        completedNodes: orderedCompleted.join(","),
        unlockedNodes: orderedUnlocked.join(","),
        xp: nextXp,
        level: nextLevel,
      },
    });

    return NextResponse.json({
      success: true,
      submission,
      review,
      total: exerciseSubmissions.length,
      progression: {
        approved: correction.approved,
        nextUnlockedModule,
        xp: nextXp,
        level: nextLevel,
        completedNodes: orderedCompleted,
        unlockedNodes: orderedUnlocked,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload examen impossible.";
    console.error("api/profile/exercise error", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
