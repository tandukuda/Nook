import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AppState } from "@/lib/types";
import { DEFAULT_ENGINES, DEFAULT_SHORTCUTS } from "@/lib/constants";

// State & Persistence
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      use24h: true,
      showWeather: false, // Default off per De-prioritized note, but implemented
      showSeconds: false,
      showGreeting: true,
      userName: "Traveler",
      shortcuts: DEFAULT_SHORTCUTS,
      searchEngines: DEFAULT_ENGINES,
      theme: {
        customColors: { base: null, accent: null },
      },
      onboarding: {
        hasSeenBangHint: false,
      },

      setPreference: (key, value) =>
        set((state) => ({ ...state, [key]: value })),

      updateTheme: (colors) =>
        set((state) => ({
          theme: { customColors: { ...state.theme.customColors, ...colors } },
        })),

      addShortcut: (data) =>
        set((state) => ({
          shortcuts: [...state.shortcuts, { ...data, id: crypto.randomUUID() }],
        })),

      editShortcut: (id, data) =>
        set((state) => ({
          shortcuts: state.shortcuts.map((s) =>
            s.id === id ? { ...s, ...data } : s,
          ),
        })),

      removeShortcut: (id) =>
        set((state) => ({
          shortcuts: state.shortcuts.filter((s) => s.id !== id),
        })),

      setHasSeenBangHint: () =>
        set((state) => ({
          onboarding: { ...state.onboarding, hasSeenBangHint: true },
        })),
    }),
    {
      name: "nook-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
