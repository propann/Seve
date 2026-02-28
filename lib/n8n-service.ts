/**
 * n8n-service.ts
 * Communication avec le "Cerveau" n8n
 */

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

export async function triggerMasterGreeting(profileData: any) {
  if (!N8N_WEBHOOK_URL) {
    console.warn("n8n URL missing. Simulating Master Greeting...");
    return {
      message: `Bienvenue, ${profileData.characterClass}. Votre regard est désormais lié à l'Arbre. Le nœud R0.1 vous attend.`
    };
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });

    return await response.json();
  } catch (error) {
    return { error: "Silence du Maître... Vérifiez la connexion n8n." };
  }
}
