import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session-token";
import { prisma } from "@/lib/db/prisma";

const ALLOWED_SEEDS = ["photographie", "cinema", "design"];

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("arbre_session")?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ success: false, error: "Session invalide." }, { status: 401 });
    }

    const body = await request.json();
    const seed = String(body?.seed || "").trim().toLowerCase();
    if (!ALLOWED_SEEDS.includes(seed)) {
      return NextResponse.json({ success: false, error: "Graine invalide." }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.uid },
      data: { selectedSeed: seed },
    });

    return NextResponse.json({ success: true, redirectTo: "/dashboard/courses/m0-1" });
  } catch (error) {
    console.error("api/auth/seed error", error);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
