"use client";

import React, { useState, useEffect } from "react";
import { Compass, Navigation, MapPin } from "lucide-react";
import { Qibla, Coordinates } from "adhan";
import { CITIES } from "@/app/prayer-times/page";
import { useSettings } from "@/providers/settings-provider";

export default function QiblaPage() {
  const { t } = useSettings();
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [coords, setCoords] = useState<Coordinates>(
    new Coordinates(CITIES[0].lat, CITIES[0].lng)
  );
  const [heading, setHeading] = useState<number | null>(null);
  const [usingGeo, setUsingGeo] = useState(false);

  // Kaaba bearing
  const qiblaBearing = Qibla(coords);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setHeading(e.alpha);
      }
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation, true);
      }
    };
  }, []);

  const handleCityChange = (cityName: string) => {
    const found = CITIES.find((c) => c.name === cityName);
    if (found) {
      setSelectedCity(found);
      setCoords(new Coordinates(found.lat, found.lng));
      setUsingGeo(false);
    }
  };

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords(new Coordinates(pos.coords.latitude, pos.coords.longitude));
          setUsingGeo(true);
          setSelectedCity({
            name: "Current Location",
            country: "Detected",
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
        },
        (err) => {
          console.error("Location error:", err);
          alert("Unable to detect location. Please pick a city manually.");
        }
      );
    }
  };

  // Compass rotation angle
  const compassRotation = heading !== null ? qiblaBearing - heading : qiblaBearing;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <Compass className="h-4 w-4" />
          <span>{t.qiblaDirection}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Find Qibla Direction
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Rotate your device or check the calculated degrees to point directly towards the Sacred Kaaba in Makkah.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-700" />
            <select
              value={usingGeo ? "Current Location" : selectedCity.name}
              onChange={(e) => handleCityChange(e.target.value)}
              className="p-2.5 rounded-2xl border border-emerald-900/20 bg-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAutoLocation}
            className="px-4 py-2.5 rounded-2xl bg-emerald-800 text-white hover:bg-emerald-700 transition font-semibold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Detect Location</span>
          </button>
        </div>
      </div>

      <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card flex flex-col items-center justify-center space-y-6 text-center shadow-xs">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-emerald-900/20 bg-emerald-950/5 dark:bg-emerald-950/40 flex items-center justify-center shadow-inner">
          <div
            className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
            style={{ transform: `rotate(${compassRotation}deg)` }}
          >
            <div className="w-1.5 h-32 bg-gradient-to-t from-transparent via-emerald-600 to-amber-500 rounded-full relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">🕋</span>
              </div>
            </div>
          </div>

          <div className="h-20 w-20 rounded-full bg-card border border-emerald-900/20 flex flex-col items-center justify-center shadow-md z-10">
            <span className="font-mono font-bold text-xl text-emerald-900 dark:text-emerald-200">
              {Math.round(qiblaBearing)}°
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              Qibla
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-serif font-bold text-base text-foreground">
            {selectedCity.name}, {selectedCity.country}
          </p>
          <p className="text-xs text-muted-foreground">
            Kaaba Bearing: <strong className="text-emerald-800 dark:text-emerald-300">{qiblaBearing.toFixed(2)}° N</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
