import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getDbUser } from "@/lib/currentUser";
import prisma from "@/lib/prisma";
import CreateMemoryModal from "@/components/CreateMemoryModal";

export default async function HomePage() {
  const { userId } = await auth();

  let dbUser = null;
  let memories: any[] = [];

  if (userId) {
    dbUser = await getDbUser();
    if (dbUser) {
      memories = await prisma.memory.findMany({
        where: { userId: dbUser.id },
        orderBy: { eventDate: "desc" },
        include: { media: true },
      });
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10">
      <nav className="flex justify-between items-center pb-6 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Life Replay 📖</h1>
          <p className="text-xs text-neutral-500">
            Your personal chronicle & timeline
          </p>
        </div>

        <div>
          {!userId ? (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-neutral-50 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-neutral-800 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <CreateMemoryModal />
              <UserButton />
            </div>
          )}
        </div>
      </nav>

      <section className="mt-8">
        {!userId ? (
          <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed">
            <h2 className="text-xl font-semibold text-neutral-800">
              Your memories deserve a home
            </h2>
            <p className="text-neutral-500 text-sm mt-1 max-w-sm mx-auto">
              Sign in to start creating your interactive life replay timeline.
            </p>
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed">
            <h2 className="text-lg font-semibold text-neutral-800">
              No memories recorded yet
            </h2>
            <p className="text-neutral-500 text-sm mt-1 mb-4">
              Click the "+ Add Memory" button above to capture your first
              moment.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-800">
              Timeline ({memories.length}{" "}
              {memories.length === 1 ? "Memory" : "Memories"})
            </h2>

            <div className="relative border-l-2 border-neutral-200 ml-4 pl-6 space-y-8">
              {memories.map((mem) => (
                <div key={mem.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-black rounded-full border-4 border-white" />

                  <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 rounded text-neutral-700 mr-2">
                          {new Date(mem.eventDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {mem.location && (
                          <span className="text-xs text-neutral-500">
                            📍 {mem.location}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                        {mem.mood}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900">
                      {mem.title}
                    </h3>
                    {mem.description && (
                      <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
                        {mem.description}
                      </p>
                    )}

                    {mem.media?.[0]?.url && (
                      <div className="mt-4 overflow-hidden rounded-lg border max-h-72">
                        <img
                          src={mem.media[0].url}
                          alt={mem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {mem.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t">
                        {mem.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* AI Reflection Card */}
                    {mem.aiReflection && (
                      <div className="mt-4 p-3.5 bg-gradient from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-1">
                          <span>✨</span> AI Reflection
                        </div>
                        <p className="text-xs text-amber-950 italic leading-relaxed">
                          "{mem.aiReflection}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
