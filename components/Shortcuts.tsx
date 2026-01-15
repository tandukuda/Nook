"use client";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Plus, MoreHorizontal, Trash2, GripHorizontal } from "lucide-react";
import { Shortcut } from "@/lib/types";

export default function Shortcuts() {
  const {
    shortcuts,
    addShortcut,
    editShortcut,
    removeShortcut,
    reorderShortcuts,
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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

  // --- Drag and Drop Logic (Attached to Handle) ---
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";

    // Create custom drag image
    const target = e.currentTarget as HTMLElement;
    const clone = target.cloneNode(true) as HTMLElement;
    clone.style.opacity = "0.5";
    clone.style.position = "absolute";
    clone.style.top = "-1000px";
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, 0, 0);
    setTimeout(() => document.body.removeChild(clone), 0);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    reorderShortcuts(draggedIndex, targetIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-lg font-bold text-muted">Apps</h2>
        <button
          onClick={() => openModal()}
          className="p-2 hover:bg-surface rounded-full text-muted hover:text-accent transition-colors"
          aria-label="Add new app"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Empty State */}
      {shortcuts.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted/50 max-w-sm">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-lg mb-2">No apps yet</p>
            <p className="text-sm">
              Click the + button to add your first shortcut
            </p>
          </div>
        </div>
      )}

      {/* Shortcuts Grid */}
      {shortcuts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={shortcut.id}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`
                group relative bg-surface border rounded-2xl p-4 transition-all duration-200 flex flex-col gap-3
                ${
                  draggedIndex === index
                    ? "opacity-30 scale-95"
                    : "hover:bg-highlight/20 hover:-translate-y-1 hover:shadow-xl"
                }
                ${
                  dragOverIndex === index && draggedIndex !== index
                    ? "ring-2 ring-accent border-transparent scale-105"
                    : "border-white/5"
                }
              `}
            >
              <div className="flex justify-between items-start z-20 relative">
                {/* Icon Container */}
                <div className="h-12 w-12 rounded-xl bg-base flex items-center justify-center text-2xl shadow-inner pointer-events-none select-none">
                  {shortcut.icon || "🔗"}
                </div>

                <div className="flex gap-1">
                  {/* DRAG HANDLE - Only this is draggable */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    className="opacity-0 group-hover:opacity-100 p-1 text-muted hover:text-accent cursor-grab active:cursor-grabbing transition-opacity"
                    title="Drag to reorder"
                  >
                    <GripHorizontal className="h-4 w-4" />
                  </div>

                  {/* Edit Menu */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openModal(shortcut);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-muted hover:text-main cursor-pointer transition-opacity"
                    aria-label="Edit app"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="z-10 relative">
                <a
                  href={shortcut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-bold text-main truncate hover:text-accent transition-colors stretched-link"
                >
                  {shortcut.title}
                </a>
                <span className="text-xs text-muted truncate block opacity-50 select-none">
                  {new URL(shortcut.url).hostname}
                </span>
              </div>

              {/* Status Dot */}
              <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}

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
