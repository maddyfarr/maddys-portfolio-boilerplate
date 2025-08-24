"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type FeatureFlags = {
  showGermanHabit: boolean;
  showProjectHabit: boolean;
  enableTimers: boolean;
  enableRestDay: boolean;
  showQuotes: boolean;
  showBranding: boolean;
};

export type UserSettings = {
  email: string;
  logoUrl: string;
};

export type FeatureFlagsContextValue = {
  flags: FeatureFlags;
  settings: UserSettings;
  setFlags: (updater: (prev: FeatureFlags) => FeatureFlags) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  reset: () => void;
};

const DEFAULT_FLAGS: FeatureFlags = {
  showGermanHabit: true,
  showProjectHabit: true,
  enableTimers: true,
  enableRestDay: true,
  showQuotes: true,
  showBranding: true,
};

const DEFAULT_SETTINGS: UserSettings = {
  email: "",
  logoUrl: "",
};

const STORAGE_KEY = "feature-flags:v1";

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | null>(null);

function loadFromStorage(): { flags: FeatureFlags; settings: UserSettings } {
  if (typeof window === "undefined") return { flags: DEFAULT_FLAGS, settings: DEFAULT_SETTINGS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { flags: DEFAULT_FLAGS, settings: DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return {
      flags: { ...DEFAULT_FLAGS, ...(parsed.flags ?? {}) },
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
    };
  } catch {
    return { flags: DEFAULT_FLAGS, settings: DEFAULT_SETTINGS };
  }
}

function saveToStorage(flags: FeatureFlags, settings: UserSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ flags, settings })
  );
}

export function FeatureFlagsProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlagsState] = useState<FeatureFlags>(DEFAULT_FLAGS);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const { flags, settings } = loadFromStorage();
    setFlagsState(flags);
    setSettings(settings);
  }, []);

  useEffect(() => {
    saveToStorage(flags, settings);
  }, [flags, settings]);

  const value = useMemo<FeatureFlagsContextValue>(
    () => ({
      flags,
      settings,
      setFlags: (updater) => setFlagsState((prev) => updater(prev)),
      updateSettings: (updates) => setSettings((prev) => ({ ...prev, ...updates })),
      reset: () => {
        setFlagsState(DEFAULT_FLAGS);
        setSettings(DEFAULT_SETTINGS);
      },
    }),
    [flags, settings]
  );

  return (
    <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags(): FeatureFlagsContextValue {
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx) throw new Error("useFeatureFlags must be used within FeatureFlagsProvider");
  return ctx;
} 