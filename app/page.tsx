"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import Clock from "@/components/Clock";
import Search from "@/components/Search";
import Shortcuts from "@/components/Shortcuts";
import Settings from "@/components/Settings";
import Weather from "@/components/Weather";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { userName, showGreeting } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col md:flex-row gap-6 max-w-[1600px] mx-auto">
      {/* Left Sidebar (Clock & Weather) */}
      <aside className="w-full md:w-80 flex flex-col gap-6 shrink-0">
        {/* Profile / Greeting Area */}
        {showGreeting && (
          <div className="bg-surface p-6 rounded-3xl border border-white/5">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-highlight mb-4"></div>
            <h2 className="text-2xl font-bold text-main">Welcome back,</h2>
            <p className="text-accent text-lg font-medium">{userName}</p>
          </div>
        )}

        <div className="h-64">
          <Clock />
        </div>

        <div className="h-40">
          <Weather />
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <section className="flex-1 flex flex-col gap-8">
        {/* Search Bar - Wide at top */}
        <div className="bg-surface p-1 rounded-3xl shadow-lg border border-white/5">
          <Search />
        </div>

        {/* Shortcuts / Bento Grid */}
        <div className="flex-1">
          <Shortcuts />
        </div>
      </section>

      {/* Global Settings Trigger */}
      <Settings />
    </main>
  );
}
