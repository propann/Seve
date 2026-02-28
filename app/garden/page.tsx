import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/session-token";
import { prisma } from "@/lib/db/prisma";
import { Garden } from "@/components/ui/Garden";

export default async function GardenPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("arbre_session")?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({ where: { id: session.uid } });
  if (!user) {
    redirect("/");
  }

  if (user.selectedSeed) {
    redirect("/dashboard/courses/m0-1");
  }

  return (
    <div className="min-h-screen bg-background text-textMain flex items-center justify-center px-6 py-16">
      <Garden />
    </div>
  );
}

