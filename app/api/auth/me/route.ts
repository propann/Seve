import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session-token";
import { prisma } from "@/lib/db/prisma";
import { isNumberRecord, isStringArray, parseJsonWithFallback } from "@/lib/safe-json";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("arbre_session")?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const userRecord = await prisma.user.findUnique({
    where: { id: session.uid },
  });

  if (!userRecord) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: userRecord.id,
      email: userRecord.email,
      name: userRecord.name,
      role: userRecord.role,
      selectedSeed: userRecord.selectedSeed,
      avatar: userRecord.avatar,
      os: userRecord.os,
      characterClass: userRecord.characterClass,
      xp: userRecord.xp,
      level: userRecord.level,
      completedNodes: userRecord.completedNodes ? userRecord.completedNodes.split(",") : [],
      unlockedNodes: userRecord.unlockedNodes ? userRecord.unlockedNodes.split(",") : ["0.1"],
      inventory: parseJsonWithFallback(userRecord.inventory, {}, isNumberRecord),
      software: parseJsonWithFallback(userRecord.software, [], isStringArray),
    },
  });
}
