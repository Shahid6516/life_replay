"use client";

import { useState, useMemo } from "react";
import ModernMemoryCard from "@/components/ModernMemoryCard";

const MOODS = [
  { key: "ALL", label: "✨ All Moments" },
  { key: "HAPPY", label: "😄 Happy" },
  { key: "EXCITED", label: "🔥 Excited" },
  { key: "PEACEFUL", label: "🌿 Peaceful" },
  { key: "GRATEFUL", label: "🙏 Grateful" },
  { key: "NOSTALGIC", label: "⏳ Nostalgic" },
  { key: "REFLECTIVE", label: "💭 Reflective" },
  { key: "SAD", label: "🌧️ Melancholy" },
];

export default function TimelineFeed({ initialMemories }: { initialMemories: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags across all memories with counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialMemories.forEach((mem) => {
      mem.tags?.forEach((t: string) => {
        const clean = t.trim().toLowerCase();
        if (clean) counts[clean] = (counts[clean] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [initialMemories]);

  // Handle Tag click
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  // Filter logic
  const filteredMemories = useMemo(() => {
    return initialMemories.filter((mem) => {
      const matchesMood = selectedMood === "ALL" || mem.mood === selectedMood;

      const matchesTag =
        !selectedTag ||
        mem.tags?.some((t: string) => t.toLowerCase() === selectedTag.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        mem.title.toLowerCase().includes(q) ||
        mem.description?.toLowerCase().includes(q) ||
        mem.location?.toLowerCase().includes(q) ||
        mem.tags?.some((t: string) => t.toLowerCase().includes(q));

      return matchesMood && matchesTag && matchesSearch;
    });
  }, [initialMemories, selectedMood, selectedTag, searchQuery]);

  const hasActiveFilters = searchQuery !== "" || selectedMood !== "ALL" || selectedTag !== null;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedMood("ALL");
    setSelectedTag(null);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-md space-y-3.5 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-2.5 text-zinc-500 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search memories, locations, stories, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-zinc-950/70 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-zinc-500 hover:text-zinc-300 text-sm cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-xl border border-zinc-700/60 transition cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Mood Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {MOODS.map(({ key, label }) => {
            const count =
              key === "ALL"
                ? initialMemories.length
                : initialMemories.filter((m) => m.mood === key).length;

            if (count === 0 && key !== "ALL") return null;

            return (
              <button
                key={key}
                onClick={() => setSelectedMood(key)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  selectedMood === key
                    ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                    : "bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                }`}
              >
                <span>{label}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Tag Cloud */}
        {tagCounts.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-zinc-800/60">
            <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mr-1">
              Tags:
            </span>
            {tagCounts.slice(0, 8).map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-xs px-2.5 py-0.5 rounded-full border transition cursor-pointer flex items-center gap-1 ${
                  selectedTag === tag
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-zinc-800/40 text-zinc-400 border-zinc-700/40 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                <span>#{tag}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Counter Header */}
      <div className="flex justify-between items-center px-1 text-xs text-zinc-400">
        <span>
          Showing {filteredMemories.length} of {initialMemories.length} moments
        </span>
        {selectedTag && (
          <button
            onClick={() => setSelectedTag(null)}
            className="text-indigo-400 font-medium hover:underline cursor-pointer"
          >
            Filtered by #{selectedTag} ✕
          </button>
        )}
      </div>

      {/* Memory Feed */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800/80 rounded-2xl space-y-2">
          <p className="text-sm font-medium text-zinc-300">No matching memories found</p>
          <button
            onClick={clearAllFilters}
            className="text-xs text-indigo-400 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="relative border-l-2 border-zinc-800/80 ml-3 md:ml-4 space-y-10">
          {filteredMemories.map((mem) => (
            <ModernMemoryCard
              key={mem.id}
              memory={mem}
              onTagClick={handleTagClick}
              activeTag={selectedTag}
            />
          ))}
        </div>
      )}
    </div>
  );
}