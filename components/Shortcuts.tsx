"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import {
  Plus,
  MoreHorizontal,
  Trash2,
  Edit2,
  ExternalLink,
} from "lucide-react";
import { Shortcut } from "@/lib/types";

export default function Shortcuts() {
  const { shortcuts, addShortcut, editShortcut, removeShortcut } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");

  const openModal = (shortcut?: Shortcut) => {
    if (shortcut) {
      setEditingId(shortcut.id);
      setTitle(shortcut.title);
      setUrl(shortcut.url);
      setIcon(shortcut.icon);
    } else {
      setEditingId(null);
      setTitle("");
      setUrl("");
      setIcon("");
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) editShortcut(editingId, { title, url, icon });
    else addShortcut({ title, url, icon });
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-lg font-bold text-muted">Apps</h2>
        <button
          onClick={() => openModal()}
          className="p-2 hover:bg-surface rounded-full text-muted hover:text-accent transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.id}
            className="group relative bg-surface hover:bg-highlight/20 border border-white/5 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              {/* Icon Container */}
              <div className="h-12 w-12 rounded-xl bg-base flex items-center justify-center text-2xl shadow-inner">
                {shortcut.icon || "🔗"}
              </div>
              {/* Context Menu Trigger */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openModal(shortcut);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-muted hover:text-main"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div>
              {/* 👇 UPDATED: Added target="_blank" and rel="noopener noreferrer" 👇 */}
              <a
                href={shortcut.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-bold text-main truncate hover:text-accent transition-colors stretched-link"
              >
                {shortcut.title}
              </a>
              <span className="text-xs text-muted truncate block opacity-50">
                {new URL(shortcut.url).hostname}
              </span>
            </div>

            {/* Fake Status Dot */}
            <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        ))}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-surface p-8 rounded-3xl w-96 shadow-2xl border border-white/10"
          >
            <h2 className="text-2xl font-bold text-main mb-6">
              {editingId ? "Edit App" : "Add App"}
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Name
                </label>
                <input
                  required
                  className="w-full bg-base text-main p-3 rounded-xl mt-2 outline-none focus:ring-2 focus:ring-accent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Netflix"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  URL
                </label>
                <input
                  required
                  type="url"
                  className="w-full bg-base text-main p-3 rounded-xl mt-2 outline-none focus:ring-2 focus:ring-accent"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider">
                  Icon
                </label>
                <input
                  className="w-full bg-base text-main p-3 rounded-xl mt-2 outline-none focus:ring-2 focus:ring-accent"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Emoji (🍿)"
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    removeShortcut(editingId);
                    setIsModalOpen(false);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-muted hover:text-main"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-accent text-base font-bold rounded-xl text-sm hover:brightness-110"
                >
                  Save App
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
