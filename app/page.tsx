// app/page.tsx

import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getDbUser } from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import CreateMemoryModal from "@/components/CreateMemoryModal";
import AiRecapModal from "@/components/AiRecapModal";
import TimelineFeed from "@/components/TimelineFeed";
import OnThisDayBanner from "@/components/OnThisDayBanner";
import { findOnThisDayMemories } from "@/lib/flashback";

export default async function HomePage() {
  const { userId } = await auth();

  let dbUser = null;
  let memories: any[] = [];
  let flashbackMemories: any[] = [];

  if (userId) {
    dbUser = await getDbUser();
    if (dbUser) {
      memories = await prisma.memory.findMany({
        where: { userId: dbUser.id },
        orderBy: { eventDate: "desc" },
        include: { media: true },
      });

      flashbackMemories = findOnThisDayMemories(memories);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">
        
        {/* Sticky Header */}
        <nav className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌌</span>
              <h1 className="text-2xl font-bold tracking-tight text-white font-serif">
                Life Replay
              </h1>
            </div>
            <p className="text-xs text-zinc-500">Your living chronicle & AI biographer</p>
          </div>

          <div>
            {!userId ? (
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-xs font-medium border border-zinc-800 bg-zinc-900 text-zinc-300 rounded-xl hover:bg-zinc-800 transition cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 text-xs font-semibold bg-white text-black rounded-xl hover:bg-zinc-200 transition cursor-pointer">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <AiRecapModal />
                <CreateMemoryModal />
                <UserButton />
              </div>
            )}
          </div>
        </nav>

        {/* Nostalgia Flashback Spotlight */}
        {userId && flashbackMemories.length > 0 && (
          <OnThisDayBanner memories={flashbackMemories} />
        )}

        {/* Feed or Empty State */}
        {!userId ? (
          <div className="text-center py-28 px-4 bg-zinc-900/30 rounded-3xl border border-zinc-800/60 backdrop-blur-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-xl">
              📖
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-serif">
              Every chapter of your life, immortalized.
            </h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
              Capture your moments, photos, and thoughts. Let your personal AI biographer uncover emotional patterns and weave your memories into an interactive timeline.
            </p>
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/20 border border-dashed border-zinc-800/80 rounded-3xl space-y-3">
            <p className="text-lg font-medium text-zinc-300">Your chronicle is waiting for its first page</p>
            <p className="text-xs text-zinc-500">Click "+ Add Memory" above to preserve your first milestone.</p>
          </div>
        ) : (
          <TimelineFeed initialMemories={memories} />
        )}
      </main>
    </div>
  );
}