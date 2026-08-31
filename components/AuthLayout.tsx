"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#09090b] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans selection:bg-orange-500 selection:text-white">
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl rounded-[2.5rem] border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl flex flex-col lg:flex-row gap-8 items-center min-h-[680px]">
        
        <div className="relative w-full lg:w-1/2 h-[280px] lg:h-[620px] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-950 flex flex-col justify-between p-8 group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-lg">
                <Sparkles className="w-5 h-5" />
              
            </div>
            <span className="px-3.5 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] font-medium tracking-wide text-zinc-300">
              Life Replay AI
            </span>
          </div>

          <div className="relative z-10 space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
              Preserve every chapter of your journey.
            </h2>
            <p className="text-xs lg:text-sm text-zinc-300 line-clamp-2">
              Turn fleeting memories into a living, AI-reflected digital biography.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-2 sm:px-6 lg:px-8 py-4 flex flex-col justify-center relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition mb-6 w-fit group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>

          <div className="w-full flex justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}