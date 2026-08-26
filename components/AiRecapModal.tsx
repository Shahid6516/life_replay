"use client";

import { useState } from "react";
import { generateLifeRecap } from "@/actions/ai";

export default function AiRecapModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recap, setRecap] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsOpen(true);
    if (!recap) {
      setLoading(true);
      setError(null);
      const res = await generateLifeRecap();
      setLoading(false);
      if (res.success && res.recap) {
        setRecap(res.recap);
      } else {
        setError(res.error || "Failed to generate recap.");
      }
    }
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:opacity-95 shadow-md shadow-indigo-500/20 transition cursor-pointer"
      >
        <span>✨</span> AI Recap
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="text-lg font-bold text-white font-serif">
                  Your AI Life Story
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            {loading ? (
              <div className="py-14 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-zinc-400 font-medium">
                  Gemini is analyzing your memories and weaving your story...
                </p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                {error}
              </div>
            ) : (
              <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80 font-serif">
                {recap}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}