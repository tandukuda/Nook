"use client";
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { Search as SearchIcon, HelpCircle } from "lucide-react";

export default function Search() {
  const { searchEngines, setHasSeenBangHint, onboarding } = useStore();
  const [query, setQuery] = useState("");
  const [currentEngineIndex, setCurrentEngineIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showBangToast, setShowBangToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on page load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Global keyboard handler - restore focus when typing
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If not focused on input and user types a letter/number
      if (
        document.activeElement !== inputRef.current &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Find configured default
  useEffect(() => {
    const defaultIdx = searchEngines.findIndex((e) => e.isDefault);
    if (defaultIdx !== -1) setCurrentEngineIndex(defaultIdx);
  }, [searchEngines]);

  const activeEngine = searchEngines[currentEngineIndex];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab: Cycle engines
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab: Go backwards
        setCurrentEngineIndex(
          (prev) => (prev - 1 + searchEngines.length) % searchEngines.length,
        );
      } else {
        // Tab: Go forwards
        setCurrentEngineIndex((prev) => (prev + 1) % searchEngines.length);
      }
    }

    // Escape: Clear or Blur
    if (e.key === "Escape") {
      if (query) {
        setQuery("");
      } else {
        inputRef.current?.blur();
      }
    }

    // Enter: Submit
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const performSearch = () => {
    if (!query.trim()) return;

    // Bang Redirects logic
    const parts = query.trim().split(" ");
    const potentialBang = parts[0].startsWith("!")
      ? parts[0].substring(1)
      : null;

    const bangEngine = searchEngines.find((e) => e.bang === potentialBang);

    if (bangEngine) {
      // Show celebration toast on first bang usage
      if (!onboarding.hasSeenBangHint) {
        setShowBangToast(true);
        setTimeout(() => setShowBangToast(false), 3000);
        setHasSeenBangHint();
      }

      const searchTerms = parts.slice(1).join(" ");
      // Prefix-based instant redirect
      if (!searchTerms) {
        // Direct visit (e.g., "!yt" -> youtube.com)
        const baseUrl = new URL(bangEngine.url).origin;
        window.location.href = baseUrl;
      } else {
        // Query search (e.g., "!yt cat" -> youtube.com/results?q=cat)
        window.location.href = `${bangEngine.url}${encodeURIComponent(searchTerms)}`;
      }
    } else {
      // Standard search
      window.location.href = `${activeEngine.url}${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8 z-10">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-muted group-focus-within:text-accent transition-colors" />
        </div>

        {/* Central minimalist search input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${activeEngine.label}...`}
          className="w-full bg-surface text-main placeholder-muted rounded-xl py-4 pl-12 pr-12 outline-none border-2 border-transparent focus:border-accent transition-all shadow-lg"
        />

        {/* Help icon at right edge */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-muted hover:text-main"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Empty state hint */}
      {!query && (
        <div className="absolute -bottom-8 left-0 w-full text-center text-xs text-muted/50">
          Try: !yt, !gh, !r — Tab to cycle engines
        </div>
      )}

      {/* Popover for bangs */}
      {showHelp && (
        <div className="absolute top-16 right-0 bg-surface border border-muted/20 p-4 rounded-lg shadow-xl w-64 animate-in fade-in slide-in-from-top-2 z-50">
          <h3 className="text-sm font-bold text-accent mb-2">
            Available Bangs
          </h3>
          <ul className="space-y-1">
            {searchEngines
              .filter((e) => e.bang)
              .map((e) => (
                <li key={e.id} className="text-sm flex justify-between">
                  <span className="text-main">{e.label}</span>
                  <code className="bg-base px-1 rounded text-accent">
                    !{e.bang}
                  </code>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* First-time bang usage toast */}
      {showBangToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent text-base px-6 py-3 rounded-xl shadow-2xl font-bold animate-in slide-in-from-bottom-4 z-50">
          🎉 Nice! You discovered bangs
        </div>
      )}
    </div>
  );
}
