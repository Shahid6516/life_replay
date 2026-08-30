import { auth } from "@clerk/nextjs/server";
import HeroLanding from "@/components/HeroLanding";
import AppDashboard from "@/components/AppDashboard";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { userId } = await auth();

  if (!userId) {
    return <HeroLanding />;
  }

  let initialMemories: any[] = [];
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        memories: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (user?.memories) {
      initialMemories = user.memories.map((m: any) => ({
        id: m.id,
        title: m.title,
        body: m.body || m.description || "",
        date: new Date(m.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        tag: m.tag || "Life",
        mood: m.mood || "Happy",
        location: m.location || "Recorded Moment",
        imageUrl: m.imageUrl || undefined,
        aiReflection: m.aiReflection || undefined,
        isArchived: false,
      }));
    }
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  return <AppDashboard initialMemories={initialMemories} />;
}