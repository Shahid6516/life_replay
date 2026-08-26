"use client";

import { useState } from "react";
import { MemoryWithMedia } from "@/lib/flashback";

export default function OnThisDayBanner({ memories }: { memories: MemoryWithMedia[] }) {
  const [dismissed, setDismissed] = useState(false);

  if (memories.length === 0 || dismissed) return null;

  const memory = memories[0];
  const memoryYear = new Date(memory.eventDate).getFullYear();
  const yearsAgo = new Date().getFullYear() - memoryYear;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-indigo-500/15 border border-amber-500/30 p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all animate-in fade-in slide-in-from-top duration-500">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5">
              <span>⏳</span> On This Day Flashback
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {yearsAgo > 0 ? `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago today` : "Earlier this year"}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white font-serif tracking-tight">
            {memory.title}
          </h3>

          {memory.description && (
            <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2">
              "{memory.description}"
            </p>
          )}

          {memory.location && (
            <div className="text-xs text-amber-300/80 font-medium">
              📍 Captured in {memory.location}
            </div>
          )}
        </div>

        {/* Thumbnail preview if media exists */}
        {memory.media?.[0]?.url && (
          <div className="w-full md:w-32 h-28 rounded-2xl overflow-hidden border border-amber-500/30 shrink-0 shadow-lg">
            <img
              src={memory.media[0].url}
              alt={memory.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-900/40 hover:bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700/50 transition cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}