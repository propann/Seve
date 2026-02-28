/**
 * mycelium-ai.ts
 * Le cerveau de mise en relation du Mycélium.
 * Ce fichier sert à l'IA pour analyser les ressources de la communauté.
 */

import { prisma } from '../db/prisma';

/**
 * RÉSUMÉ DES RESSOURCES : 
 * Permet à l'IA de voir ce que la communauté possède globalement.
 */
export async function getCommunityResources() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      inventory: true,
      software: true,
      email: true
    }
  });

  return users.map(u => ({
    name: u.name,
    id: u.id,
    has: {
      inventory: u.inventory ? JSON.parse(u.inventory) : {},
      software: u.software ? JSON.parse(u.software) : []
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
