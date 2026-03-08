/**
 * sync-airtable.ts
 * Intégration entre le PlayerProfile et Airtable
 */

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

export interface ProfileData {
  name: string;
  inventory: Record<string, number>;
  skills: string[];
  alignment: number;
  characterClass: string;
  orientation: string;
}

export async function syncStudentProfile(profileData: ProfileData) {
  if (!AIRTABLE_API_KEY || !BASE_ID) {
    console.warn("Airtable config missing. Simulating sync...");
    return { success: true, message: "Mode Démo : Profil simulé." };
  }

  const payload = {
    records: [
      {
        fields: {
          "Nom_Explorateur": profileData.name,
          "Classe": profileData.characterClass,
          "Equipement": JSON.stringify(profileData.inventory),
          "Competences_Logiciels": profileData.skills.join(', '),
          "Alignement_Curseur": profileData.alignment,
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

    if (response.ok) {
      return { success: true, message: "Profil synchronisé avec l'Arbre." };
    } else {
      const err = await response.json();
      return { success: false, message: "Erreur de racines : " + err.error.message };
    }
  } catch {
    return { success: false, message: "Échec de connexion au Mycélium." };
  }
}
