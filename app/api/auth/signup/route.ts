import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { createSessionToken } from "@/lib/session-token";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!name || !email || password.length < 10) {
      return NextResponse.json(
        { success: false, error: "Nom, email et mot de passe (10+ caracteres) requis." },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ success: false, error: "Email deja utilise." }, { status: 409 });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "STUDENT",
        selectedSeed: null,
        characterClass: "Graine",
        xp: 0,
        level: 0,
        unlockedNodes: "0.1",
      },
    });

    const sessionToken = await createSessionToken(user.id, user.role);
    const response = NextResponse.json({
      success: true,
      needsSeed: true,
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
    console.error("api/auth/signup error", error);
    return NextResponse.json({ success: false, error: "Erreur interne." }, { status: 500 });
  }
}
