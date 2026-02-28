import bcrypt from 'bcryptjs';
import { prisma } from './db/prisma';
import { isNumberRecord, isStringArray, parseJsonWithFallback } from './safe-json';
import { isLearningProfileData, LearningProfileData } from './types/profile';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  selectedSeed?: string | null;
  avatar?: string | null;
  os?: string | null;
  characterClass: string;
  xp: number;
  level: number;
  completedNodes: string[] | string;
  unlockedNodes: string[] | string;
  inventory?: any;
  software?: any;
  alignment?: number;
  profileData?: LearningProfileData;
}

/**
 * INSCRIPTION INTERNE (SQLite)
 */
export async function registerInternalUser(email: string, password: string, name: string) {
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "STUDENT",
        characterClass: "Graine",
        xp: 0,
        level: 0,
        unlockedNodes: "0.1"
      }
    });
    return !!newUser;
  } catch (error) {
    console.error("Erreur inscription locale:", error);
    return false;
  }
}

/**
 * CONNEXION INTERNE (SQLite)
 */
export async function loginInternalUser(email: string, password: string): Promise<User | null> {
  try {
    const userRecord = await prisma.user.findUnique({
      where: { email }
    });

    if (!userRecord) return null;

    const isValid = bcrypt.compareSync(password, userRecord.passwordHash);

    if (isValid) {
      return {
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
      };
    }
  } catch (error) {
    console.error("Erreur connexion locale:", error);
  }

  return null;
}
