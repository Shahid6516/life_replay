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
          include: {
            media: true, 
          },
        },
      },
    });

    if (user?.memories) {
      initialMemories = user.memories.map((m: any) => {
        const formattedMood = m.mood
          ? m.mood.charAt(0).toUpperCase() + m.mood.slice(1).toLowerCase()
          : "Happy";

        return {
          id: m.id,
          title: m.title,
          body: m.description || "",
          date: new Date(m.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          tag: m.tags?.[0] || "Life",
          mood: formattedMood,
          location: m.location || "Recorded Moment",
          imageUrl: m.media?.[0]?.url || undefined,
          aiReflection: m.aiReflection || m.aiSummary || undefined,
          isArchived: false,
        };
      });
    }
  } catch (error) {
    console.error("Database fetch error on HomePage:", error);
  }

  return <AppDashboard initialMemories={initialMemories} />;
}