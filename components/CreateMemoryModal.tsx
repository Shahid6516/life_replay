"use client";

import { useState } from "react";
import { createMemoryWithImage } from "@/actions/memories";

export default function CreateMemoryModel() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("HAPPY");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEventDate(new Date().toISOString().split("T")[0]);
    setLocation("");
    setMood("HAPPY");
    setTags("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      setIsOpen(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("eventDate", eventDate);
    formData.append("location", location);
    formData.append("mood", mood);
    formData.append("tags", tags);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const res = await createMemoryWithImage(formData);
    setLoading(false);

    if (res.success) {
      handleClose();
    } else {
      setError(res.error || "Failed to upload and save memory.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 bg-white text-zinc-950 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-zinc-200 transition shadow-sm cursor-pointer"
      >
        <span className="text-sm font-bold">+</span> Add Memory
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-serif">
                  Capture a Life Moment 📸
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Save your memories, stories, and reflections.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Manali Road Trip, Graduation Day"
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Date of Event *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition [color-scheme:dark]"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Mood
                  </label>
                  <select
                    className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="HAPPY">😄 Happy</option>
                    <option value="EXCITED">🔥 Excited</option>
                    <option value="PEACEFUL">🌿 Peaceful</option>
                    <option value="GRATEFUL">🙏 Grateful</option>
                    <option value="NOSTALGIC">⏳ Nostalgic</option>
                    <option value="REFLECTIVE">💭 Reflective</option>
                    <option value="SAD">🌧️ Melancholy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kasol, Greater Noida, Mumbai"
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
                />

                {previewUrl && (
                  <div className="mt-3 relative rounded-xl overflow-hidden border border-zinc-800 max-h-48">
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Story / Thoughts
                </label>
                <textarea
                  rows={3}
                  placeholder="What made this moment unforgettable?"
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="college, trip, coding, celebration"
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-800/60 hover:bg-zinc-800 rounded-xl transition cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 text-xs font-semibold rounded-xl disabled:opacity-50 transition cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  {loading ? "Preserving Memory..." : "Save Memory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}