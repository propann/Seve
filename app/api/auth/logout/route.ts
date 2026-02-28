import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, redirectTo: "/" });
  response.cookies.set("arbre_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
