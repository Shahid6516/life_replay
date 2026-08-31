"use client";

import React, { useState, useRef } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Camera,
  LineChart,
  Archive,
  Search,
  Plus,
  ArrowRight,
  Sparkles,
  Download,
  HelpCircle,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Clock,
  MapPin,
  X,
  UploadCloud,
  Lock,
  Smile,
  Leaf,
  Zap,
  Sun,
  Bot,
  Trash2,
  ArchiveRestore,
  Loader2,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { createMemoryAction } from "@/actions/memories";

export interface Memory {
  id: string;
  title: string;
  body: string;
  date: string;
  tag: string;
  mood: "Happy" | "Peaceful" | "Excited" | "Reflective";
  location: string;
  imageUrl?: string;
  aiReflection?: string;
  isArchived?: boolean;
}

interface AppDashboardProps {
  initialMemories?: Memory[];
}

function renderMoodBadge(mood: string) {
  switch (mood) {
    case "Peaceful":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
          <Leaf className="w-3 h-3" /> Peaceful
        </span>
      );
    case "Excited":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
          <Zap className="w-3 h-3" /> Excited
        </span>
      );
    case "Reflective":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-semibold">
          <Sun className="w-3 h-3" /> Reflective
        </span>
      );
    case "Happy":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-semibold">
          <Smile className="w-3 h-3" /> Happy
        </span>
      );
  }
}

export default function AppDashboard({ initialMemories = [] }: AppDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [memories, setMemories] = useState<Memory[]>(initialMemories);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tag: "Life",
    mood: "Happy" as Memory["mood"],
    location: "",
    imageUrl: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "timeline", label: "Timeline", icon: TrendingUp },
    { id: "snapshots", label: "Snapshots", icon: Camera },
    { id: "analytics", label: "Analytics", icon: LineChart },
    { id: "archives", label: "Archives", icon: Archive },
  ];

  const handleDeleteMemory = (id: string) => {
    if (confirm("Are you sure you want to delete this memory?")) {
      setMemories((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleToggleArchive = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isArchived: !m.isArchived } : m))
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) return;

    setIsSaving(true);

    try {
      const res = await createMemoryAction({
        title: formData.title,
        body: formData.body,
        tag: formData.tag,
        mood: formData.mood,
        location: formData.location,
        base64Image: formData.imageUrl || undefined,
      });

      if (res.success && res.memory) {
        setMemories((prev) => [res.memory!, ...prev]);
        setFormData({
          title: "",
          body: "",
          tag: "Life",
          mood: "Happy",
          location: "",
          imageUrl: "",
        });
        setIsModalOpen(false);
      } else {
        alert(res.error || "Failed to save memory.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while uploading to Cloudinary.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportChronicle = () => {
    if (memories.length === 0) {
      alert("No memories to export yet!");
      return;
    }

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(memories, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `life_replay_chronicle_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const activeMemories = memories.filter((m) => !m.isArchived);
  const archivedMemories = memories.filter((m) => m.isArchived);

  const filterList = (list: Memory[]) =>
    list.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#070709] text-white flex font-sans selection:bg-[#ff4500] selection:text-white">

      {/*  SIDEBAR */}

      <aside
        className={`h-screen sticky top-0 flex flex-col justify-between border-r border-[#1e1e24] bg-[#101014] transition-all duration-300 z-30 p-4 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-gradient-to-tr from-[#ff4500] to-amber-500 border border-orange-500/30 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              {isSidebarOpen && (
                <div className="flex flex-col truncate">
                  <span className="font-extrabold text-base tracking-tight text-white leading-tight">
                    Life Replay
                  </span>
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-500">
                    AI Chronicle
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
              title={isSidebarOpen ? "Collapse sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const badgeCount =
                item.id === "archives" ? archivedMemories.length : undefined;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold transition group relative cursor-pointer ${
                    isActive
                      ? "bg-[#18181f] text-white border border-[#ff4500]/60 shadow-inner"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-4 h-4 min-w-[1rem] transition-colors ${
                        isActive ? "text-[#ff4500]" : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    />
                    {isSidebarOpen && (
                      <span className="truncate tracking-tight whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {isSidebarOpen && badgeCount !== undefined && badgeCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400">
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
       
      </aside>

      {/* MAIN CONTENT  */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#070709]">
        {/* Top Navbar */}
        <header className="px-6 py-4 flex items-center justify-between gap-4 border-b border-zinc-900 sticky top-0 bg-[#070709]/80 backdrop-blur-md z-20">
          {/* Search Pill */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories..."
              className="w-full bg-[#121216] border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#ff4500] transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#ff4500] hover:bg-[#ff5714] text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg shadow-orange-600/20 transition transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">New Memory</span>
            </button>

            <UserButton />
          </div>
        </header>

        {/* Tab Router */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {currentTab === "dashboard" && (
            <DashboardView
              memories={filterList(activeMemories)}
              onNavigateTimeline={() => setCurrentTab("timeline")}
              onNewMemory={() => setIsModalOpen(true)}
              onDelete={handleDeleteMemory}
              onArchive={handleToggleArchive}
            />
          )}
          {currentTab === "timeline" && (
            <TimelineView
              memories={filterList(activeMemories)}
              onNewMemory={() => setIsModalOpen(true)}
              onDelete={handleDeleteMemory}
              onArchive={handleToggleArchive}
            />
          )}
          {currentTab === "snapshots" && (
            <SnapshotsView memories={filterList(activeMemories)} />
          )}
          {currentTab === "analytics" && (
            <AnalyticsView memories={activeMemories} />
          )}
          {currentTab === "archives" && (
            <ArchivesView
              memories={filterList(archivedMemories)}
              onDelete={handleDeleteMemory}
              onUnarchive={handleToggleArchive}
            />
          )}
        </main>
      </div>

      {/*  NEW MEMORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-[2rem] border border-zinc-800 bg-[#111116] p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff4500]" />
                <h3 className="text-lg font-bold text-white">Record New Memory</h3>
              </div>
              <button
                disabled={isSaving}
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMemory} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 font-semibold">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mountain Pass Hike..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#16161c] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff4500]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-semibold">Story / Notes</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Capture thoughts, feelings, and milestones..."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full bg-[#16161c] border border-zinc-800 rounded-xl p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff4500] leading-relaxed resize-none"
                />
              </div>

              {/* Photo Upload Box */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-semibold">Attach Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {formData.imageUrl ? (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-zinc-700 group">
                    <img
                      src={formData.imageUrl}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-6 rounded-2xl border-2 border-dashed border-zinc-800 hover:border-[#ff4500]/60 bg-[#16161c] flex flex-col items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition gap-2"
                  >
                    <UploadCloud className="w-6 h-6 text-orange-400" />
                    <span className="text-xs font-semibold">Click to upload image</span>
                    <span className="text-[10px] text-zinc-500">PNG, JPG, WebP up to 10MB</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-semibold">Mood</label>
                  <select
                    value={formData.mood}
                    onChange={(e) =>
                      setFormData({ ...formData, mood: e.target.value as Memory["mood"] })
                    }
                    className="w-full bg-[#16161c] border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#ff4500]"
                  >
                    <option value="Happy">Happy</option>
                    <option value="Peaceful">Peaceful</option>
                    <option value="Excited">Excited</option>
                    <option value="Reflective">Reflective</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-semibold">Tag / Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Travel, Projects"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full bg-[#16161c] border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff4500]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 font-semibold">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Manali, India"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#16161c] border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff4500]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-full bg-[#ff4500] hover:bg-[#ff5714] disabled:opacity-50 text-white font-bold transition shadow-lg shadow-orange-500/20 cursor-pointer flex items-center gap-2 text-xs"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading to Cloud...</span>
                    </>
                  ) : (
                    <span>Save to Chronicle</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// SECTION: DASHBOARD VIEW

function DashboardView({
  memories,
  onNavigateTimeline,
  onNewMemory,
  onDelete,
  onArchive,
}: {
  memories: Memory[];
  onNavigateTimeline: () => void;
  onNewMemory: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top 2 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Total Memories Hero */}
        <div className="md:col-span-6 rounded-[2rem] p-7 border border-zinc-800/80 bg-[#111116] shadow-xl flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-200">Active Memories</h3>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              +{memories.length} total
            </span>
          </div>

          <div className="my-3">
            <h2 className="text-5xl font-extrabold tracking-tight text-white">
              {memories.length}
            </h2>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-zinc-500 font-medium">
              {memories.length > 0 ? "Chronicle Active" : "No memories created yet"}
            </div>

            <button
              onClick={onNavigateTimeline}
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ff4500] hover:bg-[#ff4500] hover:text-white transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Recaps Generated */}

        <div className="md:col-span-6 rounded-[2rem] p-7 border border-zinc-800/80 bg-[#111116] shadow-xl flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-amber-300">
              AI Recaps Generated
            </h3>
          </div>

          <div className="my-3">
            <h2 className="text-5xl font-extrabold tracking-tight text-white">
              {memories.filter((m) => m.aiReflection).length}
            </h2>
          </div>

          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-[#ff4500] h-full rounded-full transition-all duration-500"
              style={{
                width: memories.length > 0 ? `${Math.min(100, memories.length * 20)}%` : "0%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Recent Timeline Moments</span>
          </h3>
          {memories.length > 0 && (
            <button
              onClick={onNavigateTimeline}
              className="text-xs text-orange-400 hover:text-orange-300 font-semibold transition cursor-pointer"
            >
              View all timeline →
            </button>
          )}
        </div>

        {memories.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-zinc-800 rounded-3xl bg-[#111116]/40 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-orange-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">No memories logged yet</h4>
            <p className="text-xs text-zinc-500 max-w-sm">
              Click "+ New Memory" above to add your first photo, milestone, or reflection.
            </p>
            <button
              onClick={onNewMemory}
              className="mt-2 bg-[#ff4500] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-orange-500/20"
            >
              Create Memory Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memories.slice(0, 4).map((m) => (
              <MemoryCardItem
                key={m.id}
                memory={m}
                onDelete={onDelete}
                onArchiveToggle={onArchive}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// SECTION: FULL TIMELINE VIEW

function TimelineView({
  memories,
  onNewMemory,
  onDelete,
  onArchive,
}: {
  memories: Memory[];
  onNewMemory: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}) {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
        <div>
          <h2 className="text-xl font-bold text-white">All Memories Timeline</h2>
          <p className="text-xs text-zinc-500">Your living chronological record</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400">
          {memories.length} Entries
        </span>
      </div>

      {memories.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-3xl bg-[#111116]/40 text-xs text-zinc-500 space-y-3">
          <p>No timeline entries found.</p>
          <button
            onClick={onNewMemory}
            className="bg-[#ff4500] text-white text-xs font-bold px-4 py-2 rounded-full"
          >
            Add Your First Memory
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {memories.map((m) => (
            <MemoryCardItem
              key={m.id}
              memory={m}
              onDelete={onDelete}
              onArchiveToggle={onArchive}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// SECTION: SNAPSHOTS GALLERY

function SnapshotsView({ memories }: { memories: Memory[] }) {
  const photoMemories = memories.filter((m) => m.imageUrl);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-white">Visual Snapshots</h2>
        <p className="text-xs text-zinc-500">Real photos attached to your memories</p>
      </div>

      {photoMemories.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-3xl bg-[#111116]/40 text-zinc-500 text-xs">
          No photos uploaded yet. Attach images when recording memories!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {photoMemories.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-3xl overflow-hidden border border-zinc-800 aspect-square bg-zinc-900 shadow-lg"
            >
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-orange-400">{p.date}</span>
                <h4 className="text-sm font-bold text-white truncate">{p.title}</h4>
                <p className="text-xs text-zinc-300 line-clamp-1">{p.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// SECTION: ANALYTICS VIEW

function AnalyticsView({ memories }: { memories: Memory[] }) {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white">Chronicle Analytics</h2>
        <p className="text-xs text-zinc-500">Reflection volume and mood breakdown</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl border border-zinc-800 bg-[#111116] space-y-2">
          <span className="text-xs text-zinc-500">Total Active Entries</span>
          <h3 className="text-3xl font-extrabold text-white">{memories.length}</h3>
          <p className="text-[11px] text-emerald-400">Chronicle Active</p>
        </div>
        <div className="p-6 rounded-3xl border border-zinc-800 bg-[#111116] space-y-2">
          <span className="text-xs text-zinc-500">Photos Uploaded</span>
          <h3 className="text-3xl font-extrabold text-amber-400">
            {memories.filter((m) => m.imageUrl).length}
          </h3>
          <p className="text-[11px] text-zinc-500">Visual moments captured</p>
        </div>
        <div className="p-6 rounded-3xl border border-zinc-800 bg-[#111116] space-y-2">
          <span className="text-xs text-zinc-500">AI Reflections</span>
          <h3 className="text-3xl font-extrabold text-cyan-400">
            {memories.filter((m) => m.aiReflection).length}
          </h3>
          <p className="text-[11px] text-zinc-500">Reflections synthesized</p>
        </div>
      </div>
    </div>
  );
}

// SECTION: ARCHIVES VIEW

function ArchivesView({
  memories,
  onDelete,
  onUnarchive,
}: {
  memories: Memory[];
  onDelete: (id: string) => void;
  onUnarchive: (id: string) => void;
}) {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white">Nostalgia Vault & Archives</h2>
        <p className="text-xs text-zinc-500">
          Archived entries are hidden from your main timeline but preserved securely.
        </p>
      </div>

      {memories.length === 0 ? (
        <div className="p-10 rounded-[2rem] border border-dashed border-zinc-800 bg-[#111116]/50 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-orange-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Vault is Empty</h3>
          <p className="text-xs text-zinc-500 max-w-sm">
            You haven't archived any memories yet. Click the archive box icon on any memory card to tuck it away safely here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {memories.map((m) => (
            <MemoryCardItem
              key={m.id}
              memory={m}
              onDelete={onDelete}
              onArchiveToggle={onUnarchive}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// REUSABLE MEMORY CARD ITEM

function MemoryCardItem({
  memory,
  onDelete,
  onArchiveToggle,
}: {
  memory: Memory;
  onDelete?: (id: string) => void;
  onArchiveToggle?: (id: string) => void;
}) {
  return (
    <div className="p-6 rounded-[2rem] border border-zinc-800/80 bg-[#111116] hover:border-zinc-700 transition shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{memory.date}</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {renderMoodBadge(memory.mood)}

          {/* Archive / Unarchive Trigger */}
          {onArchiveToggle && (
            <button
              onClick={() => onArchiveToggle(memory.id)}
              title={memory.isArchived ? "Restore to Timeline" : "Move to Archives"}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition cursor-pointer"
            >
              {memory.isArchived ? (
                <ArchiveRestore className="w-3.5 h-3.5 text-orange-400" />
              ) : (
                <Archive className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          {/* Delete Trigger */}
          {onDelete && (
            <button
              onClick={() => onDelete(memory.id)}
              title="Delete Memory"
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base font-bold text-white tracking-tight">{memory.title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">{memory.body}</p>
      </div>

      {memory.imageUrl && (
        <div className="w-full h-48 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
      )}

      {memory.aiReflection && (
        <div className="p-3.5 rounded-2xl border-l-2 border-[#ff4500] bg-orange-500/5 text-xs text-zinc-300 space-y-1">
          <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[11px]">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Biographer Reflection</span>
          </div>
          <p className="italic text-zinc-400">{memory.aiReflection}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        {memory.location && (
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
            <MapPin className="w-3 h-3" />
            <span>{memory.location}</span>
          </div>
        )}
        <span className="px-2.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-900 text-[10px] font-semibold text-zinc-400 ml-auto">
          {memory.tag}
        </span>
      </div>
    </div>
  );
}