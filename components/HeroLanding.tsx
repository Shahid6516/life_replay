"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Camera,
  Bot,
  Lock,
  Compass,
  Smile,
  Leaf,
  Zap,
  Clock,
  MapPin,
  CheckCircle2,
  Share2,
  Calendar,
} from "lucide-react";

export default function HeroLanding() {
  const [activeDemoTab, setActiveDemoTab] = useState<"raw" | "ai">("ai");

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-start overflow-x-hidden selection:bg-[#ff4500] selection:text-white font-sans">

      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <header className="w-full max-w-6xl px-4 pt-6 flex items-center justify-between z-30 sticky top-0 bg-[#070709]/80 backdrop-blur-md pb-4 border-b border-zinc-900/60">

        <Link
          href="/"
          className="px-4 py-2 rounded-full border border-zinc-800/80 bg-[#121216]/90 backdrop-blur-md flex items-center gap-2 shadow-sm hover:border-zinc-700 transition"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#ff4500] to-amber-500 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-white">
            LifeReplay
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full bg-[#121216]/90 border border-zinc-800/80 backdrop-blur-md shadow-lg">
          <a
            href="#features"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition"
          >
            Features
          </a>
        
          <a
            href="#biographer"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition"
          >
            AI Biographer
          </a>
          <a
            href="#how-it-works"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition"
          >
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="bg-[#ff4500] hover:bg-[#ff5714] text-white font-bold text-xs px-5 py-2 rounded-full shadow-lg shadow-orange-600/20 transition transform active:scale-95"
          >
            Start Free
          </Link>
        </div>
      </header>


      <section className="relative max-w-4xl mx-auto text-center mt-16 md:mt-24 px-4 flex flex-col items-center z-10 space-y-6">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-[#141419]/90 backdrop-blur-sm shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#ff4500] animate-pulse" />
          <span className="text-xs font-semibold text-orange-300/90 tracking-wide">
            AI-Powered Personal Memory Biographer
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.08]">
          Relive Your Life 3× Deeper With AI-Chronicle Reflections
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Stop letting unforgettable moments fade into camera rolls. Automatically
          weave photos, thoughts, and milestones into a living personal timeline
          with Gemini AI.
        </p>

        <div className="relative pt-2 flex flex-col items-center">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 bg-[#ff4500] hover:bg-[#ff5714] text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-full shadow-xl shadow-orange-500/25 transition transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="px-4 py-1 rounded-full border border-zinc-800 bg-[#121216]/90 text-[11px] font-semibold text-zinc-400 shadow-md mt-4">
            No credit card required • Instant setup
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl px-4 mt-16 z-10">
        <div className="relative rounded-[2.5rem] border border-zinc-800/80 bg-[#111116]/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">

          <div className="absolute -top-1 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff4500]/60 to-transparent" />

          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-800" />
              <span className="w-3 h-3 rounded-full bg-zinc-800" />
              <span className="w-3 h-3 rounded-full bg-zinc-800" />
            </div>
            <span className="text-[11px] font-mono text-zinc-500">
              lifereplay.app/dashboard
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-bold border border-orange-500/20">
              LIVE PREVIEW
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-6">
            <div className="md:col-span-4 rounded-3xl p-5 border border-zinc-800/80 bg-[#16161c] space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-bold">
                <span>Active Memories</span>
                <span className="text-emerald-400">+12 this month</span>
              </div>
              <h3 className="text-4xl font-extrabold text-white">148</h3>
              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-semibold">
                  <Smile className="w-3 h-3" /> Happy (42%)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                  <Leaf className="w-3 h-3" /> Peaceful
                </span>
              </div>
            </div>

            <div className="md:col-span-8 rounded-3xl p-5 border border-zinc-800/80 bg-[#16161c] space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs">
                <span className="text-orange-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> August 28, 2026
                </span>
                <span className="px-2.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 font-semibold text-[10px]">
                  Travel
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Trip to Manali Pass
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                  Walked along the pine trails under misty morning skies. The
                  silence of the peaks felt completely grounding.
                </p>
              </div>

              <div className="p-3 rounded-2xl border-l-2 border-[#ff4500] bg-orange-500/5 text-[11px] text-zinc-300">
                <div className="flex items-center gap-1 text-orange-400 font-bold">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Biographer Note</span>
                </div>
                <p className="italic text-zinc-400 pt-0.5">
                  This stillness reminded you how vital nature is for resetting
                  your creative rhythm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full max-w-6xl px-4 mt-28 z-10 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How LifeReplay Chronicles Your Journey
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            From raw thoughts and snapshots to a deeply reflected life story in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl p-7 border border-zinc-800/80 bg-[#111116] space-y-4 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Capture In Seconds</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Snap a photo, write a raw note, or log quick thoughts on the go. Tag
              places, people, and moods without friction.
            </p>
          </div>

          <div className="rounded-3xl p-7 border border-zinc-800/80 bg-[#111116] space-y-4 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-white">AI Biographer Weaves</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Gemini AI synthesizes your notes, highlighting recurring emotional
              patterns, personal growth, and reflective quotes.
            </p>
          </div>

          <div className="rounded-3xl p-7 border border-zinc-800/80 bg-[#111116] space-y-4 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Relive & Flashback</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Explore your memory feed, nostalgic annual flashbacks ("1 Year Ago
              Today"), and full-resolution visual snapshots.
            </p>
          </div>
        </div>
      </section>

      <section id="biographer" className="w-full max-w-5xl px-4 mt-28 z-10 space-y-8">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
            Intelligent Reflection
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            See the AI Biographer in Action
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Switch between raw quick logs and how LifeReplay elevates them into a lasting narrative.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-zinc-800/80 bg-[#111116] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-center gap-2 p-1.5 bg-[#17171e] rounded-full w-fit mx-auto border border-zinc-800">
            <button
              onClick={() => setActiveDemoTab("raw")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                activeDemoTab === "raw"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Raw Quick Note
            </button>
            <button
              onClick={() => setActiveDemoTab("ai")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeDemoTab === "ai"
                  ? "bg-[#ff4500] text-white shadow-lg shadow-orange-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>LifeReplay Chronicle</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl border border-zinc-800 bg-[#141419] transition min-h-[160px] flex flex-col justify-center">
            {activeDemoTab === "raw" ? (
              <div className="space-y-2 animate-fade-in">
                <span className="text-[10px] font-mono uppercase text-zinc-500">
                  User Typed (2:15 PM):
                </span>
                <p className="text-sm font-medium text-zinc-300">
                  "Hiking with friends in Himachal. Weather was cloudy. Quiet
                  pine forest. Felt really calm after months of intense work."
                </p>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-400">
                    <Sparkles className="w-3 h-3" /> Synthesized Chronicle
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Mood: 🌿 Peaceful
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Pine Trails of Solitude
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  "As morning mist enveloped the high ridges of Himachal, you
                  rediscovered stillness beneath towering pine canopies—a vital
                  restoration of mind after months of constant motion."
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="features" className="w-full max-w-6xl px-4 mt-28 z-10 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
            Engineered For Depth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Everything You Need to Preserve Your Story
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            A comprehensive suite designed for effortless journaling, reflection, and secure ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[2rem] p-7 border border-zinc-800/80 bg-[#111116] space-y-4 hover:border-zinc-700 transition shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Living Timeline Feed</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Seamlessly browse your past months and years through a unified,
              filterable memory feed with tags, locations, and timestamps.
            </p>
          </div>

          <div className="rounded-[2rem] p-7 border border-zinc-800/80 bg-[#111116] space-y-4 hover:border-zinc-700 transition shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Visual Snapshots Gallery</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Attach high-resolution photos to every milestone. Relive memories
              through an aesthetic grid curated by time and topic.
            </p>
          </div>

          <div className="rounded-[2rem] p-7 border border-zinc-800/80 bg-[#111116] space-y-4 hover:border-zinc-700 transition shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Nostalgia Vault & Privacy</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tuck sensitive or older milestones away into encrypted archives. Keep
              your daily timeline clean while never losing a single memory.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-5xl px-4 mt-28 mb-20 z-10">
        <div className="relative rounded-[2.5rem] border border-orange-500/30 bg-gradient-to-br from-[#ff4500]/20 via-[#121216] to-[#0a0a0d] p-8 sm:p-14 text-center space-y-6 shadow-2xl overflow-hidden">
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your story deserves to be remembered.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              Start building your living AI biography today in under 60 seconds.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              href="/sign-up"
              className="flex items-center gap-2 bg-[#ff4500] hover:bg-[#ff5714] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-xl shadow-orange-500/30 transition transform hover:scale-105 active:scale-95"
            >
              <span>Start Free Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full max-w-6xl px-4 pb-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-300">LifeReplay</span>
          <span>• © 2026 AI Chronicle</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-zinc-300 transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-zinc-300 transition">
            How It Works
          </a>
          <Link href="/sign-in" className="hover:text-zinc-300 transition">
            Sign In
          </Link>
          <Link href="/sign-up" className="hover:text-zinc-300 transition">
            Create Account
          </Link>
        </div>
      </footer>
    </div>
  );
}