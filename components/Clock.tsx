"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Calendar } from "lucide-react";

export default function Clock() {
  const { use24h, showSeconds } = useStore();
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time)
    return (
      <div className="h-full w-full bg-surface rounded-3xl animate-pulse" />
    );

  const format = (num: number) => num.toString().padStart(2, "0");
  let hours = time.getHours();
  const minutes = format(time.getMinutes());
  const seconds = format(time.getSeconds());

  if (!use24h) hours = hours % 12 || 12;

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-surface p-6 rounded-3xl h-full flex flex-col justify-between shadow-lg border border-white/5">
      <div>
        <h1 className="text-5xl font-bold text-main tracking-tight mb-2">
          {format(hours)}:{minutes}
          {showSeconds && (
            <span className="text-3xl text-muted/60">:{seconds}</span>
          )}
        </h1>
        <p className="text-muted font-medium">{dateStr}</p>
      </div>
      <div className="flex items-center text-accent/80 text-sm mt-4">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Today</span>
      </div>
    </div>
  );
}
