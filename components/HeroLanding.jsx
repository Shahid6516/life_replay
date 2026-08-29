"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function HeroLanding() {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-start overflow-hidden px-4 pt-6 pb-20">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Navbar matching the layout */}
      <header className="w-full max-w-5xl flex items-center justify-between z-20">
        {/* Brand Pill Logo */}
        <div className="px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-md shadow-sm">
          <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
            🌌 <span className="font-bold">LifeReplay</span>
          </span>
        </div>

      

        {/* Right CTA / Sign In */}
        <div className="flex items-center gap-2.5">
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white transition cursor-pointer">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg shadow-orange-600/20 transition transform active:scale-95 cursor-pointer">
              Start for free
            </button>
          </SignUpButton>
        </div>
      </header>

      {/* Hero Section Container */}
      <main className="relative max-w-4xl mx-auto text-center mt-20 md:mt-18 flex flex-col items-center z-10 space-y-6">
        
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-sm animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-300">
            AI-Powered Memory Biographer
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.12]">
          Relive Your Life 3× Deeper With AI-Chronicle Reflections
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Stop letting unforgettable moments fade into camera rolls. Automatically weave photos, thoughts, and milestones into a living personal timeline with Gemini AI.
        </p>

        {/* Hero CTA Block */}
        <div className="relative pt-4 flex flex-col items-center">
          <SignUpButton mode="modal">
            <button className="flex items-center gap-2 bg-[#ff4500] hover:bg-[#ff5714] text-white text-base font-bold px-8 py-3.5 rounded-full shadow-xl shadow-orange-500/25 transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer">
              <span>Start Free</span>
              <span className="text-lg">↗</span>
            </button>
          </SignUpButton>

          {/* Micro Hand-drawn Pill & Arrow */}
          <div className="relative mt-5 md:ml-48">
            {/* SVG Curved Arrow */}
            <svg
              className="absolute -top-6 -left-12 w-12 h-6 text-zinc-500 hidden sm:block pointer-events-none"
              viewBox="0 0 50 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M 5 22 Q 25 2 45 10" />
              <path d="M 38 7 L 45 10 L 41 16" />
            </svg>

            {/* "No credit card required" Pill */}
            <div className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-[11px] font-medium text-zinc-300 shadow-md">
              No credit card required
            </div>
          </div>
        </div>

        
      </main>
    </div>
  );
}