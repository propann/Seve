import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { createSessionToken } from "@/lib/session-token";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email et mot de passe requis." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, error: "Identifiants invalides." }, { status: 401 });
    }

    const valid = bcrypt.compareSync(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ success: false, error: "Identifiants invalides." }, { status: 401 });
    }

    const sessionToken = await createSessionToken(user.id, user.role);
    const needsSeed = !user.selectedSeed;
    const response = NextResponse.json({
      success: true,
      needsSeed,
      redirectTo: "/garden",
    });

    response.cookies.set("arbre_session", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("api/auth/login error", error);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
