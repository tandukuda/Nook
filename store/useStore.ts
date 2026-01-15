import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AppState } from "@/lib/types";
import { DEFAULT_ENGINES, DEFAULT_SHORTCUTS } from "@/lib/constants";

// State & Persistence
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      use24h: true,
      showWeather: false,
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

      // 👇 NEW ACTION 👇
      reorderShortcuts: (fromIndex: number, toIndex: number) =>
        set((state) => {
          const newList = [...state.shortcuts];
          const [movedItem] = newList.splice(fromIndex, 1);
          newList.splice(toIndex, 0, movedItem);
          return { shortcuts: newList };
        }),
      // 👆 END NEW ACTION 👆

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
