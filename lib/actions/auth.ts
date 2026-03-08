"use server";

import bcrypt from 'bcryptjs';
import { prisma } from '../db/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createSessionToken } from '../session-token';
import { isNumberRecord, isStringArray, parseJsonWithFallback } from '../safe-json';
import { isLearningProfileData } from '../types/profile';

/**
 * ACTION SERVEUR : Inscription
 */
export async function registerUserAction(email: string, passwordRaw: string, name: string) {
  try {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedName = String(name || "").trim();
    if (!normalizedEmail || !normalizedName || passwordRaw.length < 10) {
      return { success: false, error: "Nom, email et mot de passe (10+ caracteres) requis." };
    }

    const passwordHash = bcrypt.hashSync(passwordRaw, 10);
    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: normalizedName,
        role: "STUDENT",
        selectedSeed: null,
        characterClass: "Graine",
        xp: 0,
        level: 0,
        unlockedNodes: "0.1"
      }
    });
    return { success: !!newUser };
  } catch (error) {
    console.error("Erreur serveur inscription:", error);
    return { success: false, error: "Email déjà utilisé." };
  }
}

/**
 * ACTION SERVEUR : Connexion
 */
export async function loginUserAction(email: string, passwordRaw: string) {
  try {
    const userRecord = await prisma.user.findUnique({
      where: { email }
    });

    if (!userRecord) return { success: false, error: "Identité introuvable." };

    const isValid = bcrypt.compareSync(passwordRaw, userRecord.passwordHash);

    if (isValid) {
      const sessionToken = await createSessionToken(userRecord.id, userRecord.role);
      const cookieStore = await cookies();
      cookieStore.set("arbre_session", sessionToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        success: true,
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
          completedNodes: userRecord.completedNodes ? userRecord.completedNodes.split(',') : [],
          unlockedNodes: userRecord.unlockedNodes ? userRecord.unlockedNodes.split(',') : ["0.1"],
          inventory: parseJsonWithFallback(userRecord.inventory, {}, isNumberRecord),
          software: parseJsonWithFallback(userRecord.software, [], isStringArray),
          profileData: parseJsonWithFallback(userRecord.profileData, {}, isLearningProfileData)
        }
      };
    }
    return { success: false, error: "Mot de passe incorrect." };
  } catch {
    return { success: false, error: "Erreur de base locale." };
  }
}

export async function logoutUserAction() {
  const cookieStore = await cookies();
  cookieStore.set("arbre_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return { success: true };
}

/**
 * ACTION SERVEUR : Mise à jour du Profil riche (IA-Ready)
 */
type UserProfileUpdateInput = {
  name?: string;
  avatar?: string | null;
  os?: string | null;
  characterClass?: string;
  alignment?: number;
  inventory?: Record<string, number>;
  software?: string[];
  profileData?: unknown;
};

export async function updateUserProfileAction(userId: string, data: UserProfileUpdateInput) {
  try {
    if (!userId) return { success: false, error: "ID Utilisateur manquant." };

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        avatar: data.avatar,
        os: data.os,
        characterClass: data.characterClass,
        alignment: data.alignment,
        inventory: JSON.stringify(data.inventory),
        software: JSON.stringify(data.software),
        profileData: JSON.stringify(data.profileData || {}),
      }
    });
    
    // FORCE LE RAFRAICHISSEMENT DES DONNÉES CÔTÉ SERVEUR
    revalidatePath('/');
    revalidatePath('/dashboard');
    revalidatePath('/rituel');
    
    return { success: true };
  } catch (error) {
    console.error("Erreur mise à jour profil:", error);
    return { success: false, error: "Échec de l'écriture en base de données." };
  }
}
