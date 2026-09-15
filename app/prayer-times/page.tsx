"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, Navigation, Bell, Volume2 } from "lucide-react";
import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes } from "adhan";
import { useSettings } from "@/providers/settings-provider";

export const CITIES = [
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, timezone: "Africa/Cairo" },
  { name: "Alexandria", country: "Egypt", lat: 31.2001, lng: 29.9187, timezone: "Africa/Cairo" },
  { name: "Makkah", country: "Saudi Arabia", lat: 21.3891, lng: 39.8579, timezone: "Asia/Riyadh" },
  { name: "Madinah", country: "Saudi Arabia", lat: 24.5247, lng: 39.5692, timezone: "Asia/Riyadh" },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, timezone: "Asia/Riyadh" },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" },
  { name: "Abu Dhabi", country: "UAE", lat: 24.4539, lng: 54.3773, timezone: "Asia/Dubai" },
  { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, timezone: "Europe/London" },
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.006, timezone: "America/New_York" },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, timezone: "Europe/Istanbul" },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, timezone: "Asia/Jakarta" },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.139, lng: 101.6869, timezone: "Asia/Kuala_Lumpur" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, timezone: "America/Toronto" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney" },
];

export default function PrayerTimesPage() {
  const { settings, updateSettings, t } = useSettings();

  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [coords, setCoords] = useState<Coordinates>(
    new Coordinates(CITIES[0].lat, CITIES[0].lng)
  );
  const [usingGeo, setUsingGeo] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
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
          alert("Unable to get current location. Please choose a city manually.");
        }
      );
    }
  };

  const toggleNotifications = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setNotificationEnabled(!notificationEnabled);
      } else {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") setNotificationEnabled(true);
        });
      }
    }
  };

  // Calculate prayer times
  const date = new Date();
  const params = CalculationMethod.MuslimWorldLeague();
  const prayerTimes = new PrayerTimes(coords, date, params);

  const nextPrayer = prayerTimes.nextPrayer();
  const nextPrayerTime = prayerTimes.timeForPrayer(nextPrayer);

  // Time remaining format
  const getTimeRemaining = () => {
    if (!nextPrayerTime) return "00:00:00";
    const diff = nextPrayerTime.getTime() - currentTime.getTime();
    if (diff <= 0) return "00:00:00";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const formatTime = (time: Date | null) => {
    if (!time) return "--:--";
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const prayerList = [
    { key: "fajr", name: "Fajr (الفجر)", time: prayerTimes.fajr },
    { key: "sunrise", name: "Sunrise (الشروق)", time: prayerTimes.sunrise },
    { key: "dhuhr", name: "Dhuhr (الظهر)", time: prayerTimes.dhuhr },
    { key: "asr", name: "Asr (العصر)", time: prayerTimes.asr },
    { key: "maghrib", name: "Maghrib (المغرب)", time: prayerTimes.maghrib },
    { key: "isha", name: "Isha (العشاء)", time: prayerTimes.isha },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-amber-300" />
            <h1 className="text-2xl font-serif font-bold text-white">{t.prayerTimes}</h1>
          </div>

          <button
            onClick={toggleNotifications}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 ${
              notificationEnabled
                ? "bg-amber-500/20 border-amber-400 text-amber-200"
                : "border-white/20 text-emerald-100 hover:bg-white/10"
            }`}
          >
            <Bell className="h-3.5 w-3.5" />
            <span>{notificationEnabled ? "Notifications On" : "Enable Notifications"}</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-emerald-200 font-semibold">
            Next Prayer: {nextPrayer ? nextPrayer.toUpperCase() : "FAJR"}
          </span>
          <div className="font-mono font-bold text-4xl md:text-6xl text-amber-300 tracking-wider">
            {getTimeRemaining()}
          </div>
          <p className="text-xs text-emerald-100">
            {selectedCity.name}, {selectedCity.country} ({currentTime.toLocaleDateString()})
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-300" />
            <select
              value={usingGeo ? "Current Location" : selectedCity.name}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-emerald-900/80 border border-emerald-700/50 text-white text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none"
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
            className="px-3 py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-xs font-semibold text-emerald-100 transition flex items-center gap-1.5"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Auto Detect Location</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {prayerList.map((p) => {
          const isNext = nextPrayer === p.key;

          return (
            <div
              key={p.key}
              className={`p-6 rounded-3xl border transition flex items-center justify-between ${
                isNext
                  ? "border-amber-500 bg-amber-500/10 text-foreground shadow-md"
                  : "border-emerald-900/10 bg-card hover:border-emerald-600/30"
              }`}
            >
              <div>
                <h3 className="font-serif font-bold text-base text-foreground">{p.name}</h3>
                {isNext && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                    Next Prayer
                  </span>
                )}
              </div>

              <span className="font-mono font-bold text-xl text-emerald-900 dark:text-emerald-200">
                {formatTime(p.time)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
