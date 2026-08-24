import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { getDbUser } from "@/lib/currentUser";

export default async function HomePage() {
  const { userId } = await auth();

  // If user is logged in with Clerk, sync & retrieve their Neon DB record
  let dbUser = null;
  if (userId) {
    dbUser = await getDbUser();
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <nav className="flex justify-between items-center pb-6 border-b">
        <h1 className="text-2xl font-bold tracking-tight">Life Replay 📖</h1>

        <div>
          {!userId ? (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-100 transition">
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
              <span className="text-sm text-gray-600">
                Welcome, {dbUser?.name ?? "Explorer"}!
              </span>
              <UserButton />
            </div>
          )}
        </div>
      </nav>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Welcome to your Life Replay timeline!</h2>
        <p className="text-gray-600">
         
        </p>
      </section>
    </main>
  );
}