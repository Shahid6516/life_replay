"use client";

import { useState } from "react";
import { createMemoryWithImage } from "@/actions/memories";

export default function CreateMemoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("HAPPY");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setEventDate(new Date().toISOString().split("T")[0]);
      setLocation("");
      setMood("HAPPY");
      setTags("");
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      setError(res.error || "Failed to upload and save memory.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-neutral-800 transition"
      >
        + Add Memory
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-neutral-900">Capture a Life Moment 📸</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 ">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graduation Day, Manali Road Trip"
                  className="w-full border rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Date of Event *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full border rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Mood
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="HAPPY">Happy</option>
                    <option value="EXCITED"> Excited</option>
                    <option value="PEACEFUL"> Peaceful</option>
                    <option value="GRATEFUL"> Grateful</option>
                    <option value="NOSTALGIC"> Nostalgic</option>
                    <option value="REFLECTIVE"> Reflective</option>
                    <option value="SAD">Sad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Greater Noida, Kasol, Mumbai"
                  className="w-full border rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 cursor-pointer"
                />

                {previewUrl && (
                  <div className="mt-3 relative rounded-lg overflow-hidden border max-h-48">
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Story / Thoughts
                </label>
                <textarea
                  rows={3}
                  placeholder="What made this moment unforgettable?"
                  className="w-full border rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="college, trip, coding, celebration"
                  className="w-full border rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm rounded-lg border hover:bg-neutral-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-5 py-2 text-sm font-medium rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition"
                >
                  {loading ? "Uploading & Saving..." : "Save Memory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}