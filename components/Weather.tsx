"use client";
import { useEffect, useState } from "react";
import { Cloud, WifiOff, MapPin } from "lucide-react";

interface WeatherData {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
}

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // Default to Surabaya per PRD context
  const lat = -7.25;
  const long = 112.75;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!navigator.onLine) {
          setIsOffline(true);
          return;
        }
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`,
        );
        const json = await res.json();
        setData(json);
        setIsOffline(false);
      } catch (e) {
        setIsOffline(true);
      }
    };

    fetchWeather();
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
          LIVE
        </span>
      </div>

      <div>
        <div className="text-4xl font-bold text-main">
          {data ? Math.round(data.current_weather.temperature) : "--"}°
        </div>
        <div className="flex items-center text-muted text-xs mt-1">
          <MapPin className="h-3 w-3 mr-1" /> Surabaya
        </div>
      </div>
    </div>
  );
}
