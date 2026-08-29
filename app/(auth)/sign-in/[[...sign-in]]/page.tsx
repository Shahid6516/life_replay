import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="relative z-10 space-y-6 text-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">
            Life Replay
          </h1>
          <p className="text-xs text-zinc-400">Sign in to continue your chronicle</p>
        </div>

        <SignIn />
      </div>
    </div>
  );
}