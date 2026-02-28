/**
 * mycelium-ai.ts
 * Le cerveau de mise en relation du Mycélium.
 * Ce fichier sert à l'IA pour analyser les ressources de la communauté.
 */

import { prisma } from '../db/prisma';
import { parseJsonWithFallback } from '../safe-json';
import { isLearningProfileData, SeedKey, SeedEquipmentMap } from '../types/profile';

type ResourceUser = {
  id: string;
  name: string;
  inventory: string | null;
  software: string | null;
  profileData: string | null;
  email: string;
};

type CommunityResource = {
  name: string;
  id: string;
  has: {
    inventory: Record<string, number>;
    software: string[];
    seedEquipment: SeedEquipmentMap;
  };
};

function parseInventory(raw: string | null): Record<string, number> {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

function parseSoftware(raw: string | null): string[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function parseSeedEquipment(raw: string | null): SeedEquipmentMap {
  const profile = parseJsonWithFallback(raw, {}, isLearningProfileData);
  return profile.seedEquipment || {};
}

/**
 * RÉSUMÉ DES RESSOURCES : 
 * Permet à l'IA de voir ce que la communauté possède globalement.
 */
export async function getCommunityResources(): Promise<CommunityResource[]> {
  const users: ResourceUser[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      inventory: true,
      software: true,
      profileData: true,
      email: true
    }
  });

  return users.map((u) => ({
    name: u.name,
    id: u.id,
    has: {
      inventory: parseInventory(u.inventory),
      software: parseSoftware(u.software),
      seedEquipment: parseSeedEquipment(u.profileData),
    }
  }));
}

/**
 * TROUVER DE L'AIDE : 
 * Recherche qui possède un outil spécifique (ex: "scanner")
 */
export async function findAidForResource(resourceId: string) {
  const resources = await getCommunityResources();
  
  return resources.filter(r => {
    const inv = r.has.inventory;
    return inv[resourceId] && inv[resourceId] > 0;
  });
}

export async function findAidForSeedResource(seed: SeedKey, resourceId: string) {
  const resources = await getCommunityResources();
  return resources.filter((r) => {
    const seedInv = r.has.seedEquipment[seed] || {};
    return (seedInv[resourceId] || 0) > 0;
  });
}
