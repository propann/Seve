/**
 * auth-sync.ts
 * "L'Ancrage des Âmes" : Synchronisation Clerk <-> Airtable
 */

import { syncStudentProfile } from "./sync-airtable";

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

/**
 * Vérifie si un élève existe déjà dans Airtable via son ID Clerk.
 * Si non, il faudra l'initialiser.
 */
export async function checkAirtableUser(clerkUserId: string) {
  if (!AIRTABLE_API_KEY || !BASE_ID) return null;

  const url = `https://api.airtable.com/v0/${BASE_ID}/Eleves?filterByFormula={Clerk_ID}='${clerkUserId}'`;
  
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
    });
    const data = await response.json();
    return data.records.length > 0 ? data.records[0] : null;
  } catch (error) {
    console.error("Erreur de recherche Mycélium:", error);
    return null;
  }
}

/**
 * Initialise un nouvel élève "Graine" après son inscription Clerk.
 */
export async function initializeAirtableUser(clerkUser: { id: string; email: string; name: string }) {
  const profileData = {
    name: clerkUser.name || "Nouvel Explorateur",
    inventory: {},
    skills: [],
    alignment: 50,
    characterClass: "Graine",
    orientation: "R0.1"
  };

  // On ajoute le Clerk_ID aux champs envoyés
  const payload = {
    records: [
      {
        fields: {
          "Clerk_ID": clerkUser.id,
          "Email": clerkUser.email,
          "Nom_Explorateur": profileData.name,
          "Classe": "Graine",
          "Niveau_Actuel": "R0.1",
          "Statut_Arbre": "Graine",
          "Derniere_Sync": new Date().toISOString()
        }
      }
    ]
  };

  try {
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Eleves`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (error) {
    console.error("Échec de l'ancrage initial:", error);
    return false;
  }
}
