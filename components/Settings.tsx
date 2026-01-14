"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Settings as SettingsIcon, X } from "lucide-react";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const store = useStore();

  // Cmd/Ctrl+, to open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ",") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Escape to close
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Apply theme overrides
  useEffect(() => {
    const root = document.documentElement;
    if (store.theme.customColors.base)
      root.style.setProperty("--bg-base", store.theme.customColors.base);
    if (store.theme.customColors.accent)
      root.style.setProperty("--color-accent", store.theme.customColors.accent);
  }, [store.theme.customColors]);

  return (
    <>
      {/* Gear icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-2 text-muted hover:text-main transition-colors"
      >
        <SettingsIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-base w-[500px] max-h-[80vh] rounded-2xl border border-surface shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-surface flex justify-between items-center">
              <h2 className="text-xl font-bold text-main">
                Local Control Layer
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-muted hover:text-main" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-8">
              {/* Visibility Controls */}
              <section>
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">
                  Visibility
                </h3>
                <div className="space-y-3">
                  <Toggle label="Show Clock" checked={true} disabled />
                  <Toggle
                    label="Show Seconds"
                    checked={store.showSeconds}
                    onChange={(v) => store.setPreference("showSeconds", v)}
                  />
                  <Toggle
                    label="Show Weather"
                    checked={store.showWeather}
                    onChange={(v) => store.setPreference("showWeather", v)}
                  />
                  <Toggle
                    label="Show Greeting"
                    checked={store.showGreeting}
                    onChange={(v) => store.setPreference("showGreeting", v)}
                  />
                  <Toggle
                    label="24h Time Format"
                    checked={store.use24h}
                    onChange={(v) => store.setPreference("use24h", v)}
                  />
                </div>
              </section>

              {/* Theme System */}
              <section>
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">
                  Theme Overrides
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted block mb-2">
                      Background
                    </label>
                    <input
                      type="color"
                      className="w-full h-10 rounded cursor-pointer"
                      value={store.theme.customColors.base || "#232136"}
                      onChange={(e) =>
                        store.updateTheme({ base: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted block mb-2">
                      Accent
                    </label>
                    <input
                      type="color"
                      className="w-full h-10 rounded cursor-pointer"
                      value={store.theme.customColors.accent || "#c4a7e7"}
                      onChange={(e) =>
                        store.updateTheme({ accent: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() =>
                    store.updateTheme({ base: null, accent: null })
                  }
                  className="mt-4 text-xs text-muted hover:text-highlight underline"
                >
                  Reset to Rose Pine Moon
                </button>
              </section>

              {/* User Name */}
              <section>
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">
                  Profile
                </h3>
                <label className="text-xs text-muted block mb-2">Name</label>
                <input
                  type="text"
                  value={store.userName}
                  onChange={(e) =>
                    store.setPreference("userName", e.target.value)
                  }
                  className="w-full bg-surface text-main p-2 rounded outline-none focus:ring-1 focus:ring-accent"
                />
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-main">{label}</span>
      <button
        disabled={disabled}
        onClick={() => onChange && onChange(!checked)}
        className={`w-12 h-6 rounded-full relative transition-colors ${checked ? "bg-accent" : "bg-surface"}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-base transition-transform ${checked ? "left-7" : "left-1"}`}
        />
      </button>
    </div>
  );
}
