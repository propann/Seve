/**
 * mail-service.ts
 * "Le Courrier de l'Architecte" via Resend
 */

import { Resend } from 'resend';

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.warn("RESEND_API_KEY absent: email de bienvenue non envoyé.");
      return { success: false, error: "missing_resend_api_key" };
    }

    const data = await resend.emails.send({
      from: "L'Arbre de la Photographie <maitre@votre-domaine.com>",
      to: [email],
      subject: "Votre graine est plantée. L'Arbre attend votre éveil.",
      html: `
        <div style="background-color: #0B0B0B; color: #E0E0E0; font-family: sans-serif; padding: 40px; border-radius: 20px;">
          <h1 style="color: #2ECC71; font-style: italic;">Salutations, Explorateur ${name}.</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            Votre identité a été ancrée dans le Mycélium. 
            La lumière et l'ombre commencent à s'entrelacer autour de votre nom.
          </p>
          <div style="margin-top: 30px; padding: 20px; border: 1px solid #2ECC71; border-radius: 10px; background: rgba(46, 204, 113, 0.05);">
            <p style="margin: 0; font-weight: bold; color: #2ECC71;">PROCHAINE ÉTAPE : LE RITUEL D'ÉVEIL</p>
            <p style="font-size: 14px;">Connectez-vous pour définir votre classe et commencer votre ascension.</p>
          </div>
          <footer style="margin-top: 40px; font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 2px;">
            L'Arbre de la Photographie Universelle V7.0
          </footer>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Erreur d'envoi de mail:", error);
    return { success: false, error };
  }
}
