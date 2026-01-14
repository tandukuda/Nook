export interface Shortcut {
  id: string;
  title: string;
  url: string;
  icon: string;
}

export interface SearchEngine {
  id: string;
  label: string;
  url: string; // e.g. "https://google.com/search?q="
  isDefault: boolean;
  bang?: string; // e.g. "gh"
}

export interface ThemeColors {
  base: string | null;
  accent: string | null;
}

export interface AppState {
  // Preferences
  use24h: boolean;
  showWeather: boolean;
  showSeconds: boolean;
  showGreeting: boolean;
  userName: string;

  // Data
  shortcuts: Shortcut[];
  searchEngines: SearchEngine[];

  // Theme
  theme: {
    customColors: ThemeColors;
  };

  // Onboarding
  onboarding: {
    hasSeenBangHint: boolean;
  };

  // Actions
  setPreference: (key: keyof AppState, value: any) => void;
  updateTheme: (colors: Partial<ThemeColors>) => void;
  addShortcut: (shortcut: Omit<Shortcut, "id">) => void;
  editShortcut: (id: string, data: Partial<Shortcut>) => void;
  removeShortcut: (id: string) => void;
  setHasSeenBangHint: () => void;
}
