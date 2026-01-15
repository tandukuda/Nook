"use client";
import { useEffect, useState } from "react";
import { Cloud, WifiOff, MapPin } from "lucide-react";

interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

interface CachedWeather {
  data: WeatherData;
  timestamp: number;
}

const CACHE_KEY = "nook-weather-cache";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);

  // Default to Surabaya per PRD context
  const lat = -7.25;
  const long = 112.75;

  useEffect(() => {
    const fetchWeather = async () => {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data: cachedData, timestamp }: CachedWeather =
            JSON.parse(cached);
          const age = Date.now() - timestamp;

          if (age < CACHE_DURATION) {
            // Use cached data
            setData(cachedData);
            setLastUpdate(timestamp);
            setIsOffline(false);
            return;
          }
        }
      } catch (e) {
        console.error("Cache read error:", e);
      }

      // Fetch fresh data
      try {
        if (!navigator.onLine) {
          setIsOffline(true);
          return;
        }

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`,
        );

        if (!res.ok) throw new Error("Weather API failed");

        const json = await res.json();
        setData(json);
        setIsOffline(false);

        const now = Date.now();
        setLastUpdate(now);

        // Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: json, timestamp: now } as CachedWeather),
        );
      } catch (e) {
        console.error("Weather fetch error:", e);
        setIsOffline(true);
      }
    };

    fetchWeather();

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, CACHE_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface p-6 rounded-3xl h-full flex flex-col justify-between shadow-lg border border-white/5">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-base rounded-2xl">
          {isOffline ? (
            <WifiOff className="text-muted" />
          ) : (
            <Cloud className="text-accent" />
          )}
        </div>
        <span className="text-xs font-bold bg-base px-2 py-1 rounded-full text-muted">
          {isOffline ? "OFFLINE" : "LIVE"}
        </span>
      </div>

      <div>
        <div className="text-4xl font-bold text-main">
          {data ? Math.round(data.current_weather.temperature) : "--"}°
        </div>
        <div className="flex items-center text-muted text-xs mt-1">
          <MapPin className="h-3 w-3 mr-1" /> Surabaya
        </div>
        {isOffline && lastUpdate && (
          <div className="text-xs text-muted/50 mt-1">
            Last updated: {new Date(lastUpdate).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
