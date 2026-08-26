"use client";

import { useState } from "react";
import { deleteMemory } from "@/actions/deleteMemory";

interface MediaItem {
  id: string;
  url: string;
}

interface MemoryProps {
  id: string;
  title: string;
  description?: string | null;
  eventDate: Date | string;
  location?: string | null;
  mood: string;
  tags: string[];
  aiReflection?: string | null;
  media: MediaItem[];
}

const moodConfig: Record<string, { label: string; badgeClass: string }> = {
  HAPPY: { label: "😄 Happy", badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  EXCITED: { label: "🔥 Excited", badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  PEACEFUL: { label: "🌿 Peaceful", badgeClass: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  GRATEFUL: { label: "🙏 Grateful", badgeClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  NOSTALGIC: { label: "⏳ Nostalgic", badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  REFLECTIVE: { label: "💭 Reflective", badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  SAD: { label: "🌧️ Melancholy", badgeClass: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

export default function ModernMemoryCard({
  memory,
  onTagClick,
  activeTag,
}: {
  memory: MemoryProps;
  onTagClick?: (tag: string) => void;
  activeTag?: string | null;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const moodInfo = moodConfig[memory.mood] || {
    label: memory.mood,
    badgeClass: "bg-zinc-800 text-zinc-300 border-zinc-700",
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this memory?")) {
      setIsDeleting(true);
      await deleteMemory(memory.id);
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(memory.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative group pl-8">
      {/* Glowing Timeline Dot */}
      <div className="absolute left-[3px] top-6 w-3 h-3 rounded-full bg-zinc-950 border-2 border-indigo-500 group-hover:scale-125 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300" />

      {/* Glassmorphic Memory Card */}
      <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 group-hover:-translate-y-0.5">
        
        {/* Card Header & Controls */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700/50">
              📅 {formattedDate}
            </span>
            {memory.location && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-800">
                📍 {memory.location}
              </span>
            )}
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${moodInfo.badgeClass}`}>
              {moodInfo.label}
            </span>
          </div>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 cursor-pointer disabled:opacity-50"
            title="Delete memory"
          >
            {isDeleting ? "..." : "✕"}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
          {memory.title}
        </h3>

        {/* Story */}
        {memory.description && (
          <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed">
            {memory.description}
          </p>
        )}

        {/* Media Frame */}
        {memory.media?.[0]?.url && (
          <div className="mt-4 rounded-xl overflow-hidden border border-zinc-800/80 max-h-96 relative group/img">
            <img
              src={memory.media[0].url}
              alt={memory.title}
              className="w-full h-full object-cover transition duration-500 group-hover/img:scale-102"
              loading="lazy"
            />
          </div>
        )}

        {/* Gemini AI Reflection Card */}
        {memory.aiReflection && (
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1.5 tracking-wide uppercase">
              <span>✨</span> Biographer's Reflection
            </div>
            <p className="text-xs text-amber-200/90 italic leading-relaxed font-serif">
              "{memory.aiReflection}"
            </p>
          </div>
        )}

        {/* Hashtags */}
        {memory.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-zinc-800/60">
            {memory.tags.map((tag: string, idx: number) => {
              const isSelected = activeTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={idx}
                  onClick={() => onTagClick && onTagClick(tag)}
                  className={`text-xs px-2.5 py-0.5 rounded-full border transition cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "text-zinc-400 bg-zinc-800/60 hover:bg-zinc-800 border-zinc-700/40 hover:text-zinc-200"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}