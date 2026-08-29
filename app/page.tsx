import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { getDbUser } from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import CreateMemoryModal from "@/components/CreateMemoryModal";
import AiRecapModal from "@/components/AiRecapModal";
import TimelineFeed from "@/components/TimelineFeed";
import OnThisDayBanner from "@/components/OnThisDayBanner";
import HeroLanding from "@/components/HeroLanding";
import { findOnThisDayMemories } from "@/lib/flashback";

export default async function HomePage() {
  const { userId } = await auth();

  if (!userId) {
    return <HeroLanding />;
  }

  const dbUser = await getDbUser();
  let memories: any[] = [];
  let flashbackMemories: any[] = [];

  if (dbUser) {
    memories = await prisma.memory.findMany({
      where: { userId: dbUser.id },
      orderBy: { eventDate: "desc" },
      include: { media: true },
    });

    flashbackMemories = findOnThisDayMemories(memories);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500 selection:text-white">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌌</span>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Life Replay
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <AiRecapModal />
            <CreateMemoryModal />
            <UserButton />
          </div>
        </nav>

        {/* Nostalgia Flashback Banner */}
        {flashbackMemories.length > 0 && (
          <OnThisDayBanner memories={flashbackMemories} />
        )}

        {/* Main Feed */}
        {memories.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl space-y-3">
            <p className="text-lg font-medium text-zinc-300">Your chronicle is empty</p>
            <p className="text-xs text-zinc-500">Click "+ Add Memory" to preserve your first milestone.</p>
          </div>
        ) : (
          <TimelineFeed initialMemories={memories} />
        )}
      </main>
    </div>
  );
}