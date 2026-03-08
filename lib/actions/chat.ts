"use server";

import { prisma } from '../db/prisma';
import { revalidatePath } from 'next/cache';

const N8N_CHAT_WEBHOOK = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

/**
 * RÉCUPÉRER LES SALONS
 */
export async function getRoomsAction() {
  try {
    if (!prisma.room) {
      console.error("Prisma: Le modèle 'room' n'est pas encore généré.");
      return [];
    }
    return await prisma.room.findMany({
      orderBy: { createdAt: 'asc' }
    });
  } catch (error) {
    console.error("Erreur getRoomsAction:", error);
    return [];
  }
}

/**
 * RÉCUPÉRER LES MESSAGES D'UN SALON
 */
export async function getMessagesAction(roomSlug: string) {
  try {
    if (!prisma.message) {
      console.error("Prisma: Le modèle 'message' n'est pas encore généré.");
      return [];
    }
    return await prisma.message.findMany({
      where: { room: { slug: roomSlug } },
      include: { user: { select: { name: true, avatar: true, characterClass: true, role: true } } },
      orderBy: { createdAt: 'asc' },
      take: 50
    });
  } catch (error) {
    console.error("Erreur getMessagesAction:", error);
    return [];
  }
}

/**
 * ENVOYER UN MESSAGE
 */
export async function sendMessageAction(userId: string, roomSlug: string, text: string, imageUrl?: string) {
  try {
    if (!prisma.message || !prisma.room) throw new Error("Système de chat indisponible (Prisma sync)");

    const room = await prisma.room.findUnique({ where: { slug: roomSlug } });
    if (!room) throw new Error("Salon introuvable");

    const message = await prisma.message.create({
      data: {
        text,
        imageUrl,
        userId,
        roomId: room.id
      },
      include: { user: true }
    });

    if (N8N_CHAT_WEBHOOK) {
      fetch(N8N_CHAT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "chat_message",
          userName: message.user.name,
          userClass: message.user.characterClass,
          room: roomSlug,
          text: text,
          messageId: message.id
        })
      }).catch(err => console.error("Erreur Webhook Chat:", err));
    }

    revalidatePath(`/dashboard/mycelium`);
    return { success: true };
  } catch (error: unknown) {
    console.error("Erreur envoi message:", error);
    return { success: false, error: error instanceof Error ? error.message : "Erreur envoi message." };
  }
}
