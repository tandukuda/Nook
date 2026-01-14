import { SearchEngine, Shortcut } from "./types";

export const DEFAULT_ENGINES: SearchEngine[] = [
  {
    id: "google",
    label: "Google",
    url: "https://www.google.com/search?q=",
    isDefault: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/results?search_query=",
    isDefault: false,
    bang: "yt",
  },
  {
    id: "ddg",
    label: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    isDefault: false,
  },
  {
    id: "brave",
    label: "Brave",
    url: "https://search.brave.com/search?q=",
    isDefault: false,
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/search?q=",
    isDefault: false,
    bang: "gh",
  },
  {
    id: "reddit",
    label: "Reddit",
    url: "https://www.reddit.com/search/?q=",
    isDefault: false,
    bang: "r",
  },
  {
    id: "wiki",
    label: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Special:Search?search=",
    isDefault: false,
    bang: "w",
  },
];

export const DEFAULT_SHORTCUTS: Shortcut[] = [
  { id: "1", title: "GitHub", url: "https://github.com", icon: "🐙" },
  { id: "2", title: "YouTube", url: "https://youtube.com", icon: "📺" },
  { id: "3", title: "Reddit", url: "https://reddit.com", icon: "👽" },
  { id: "4", title: "Twitter", url: "https://twitter.com", icon: "🐦" },
];
