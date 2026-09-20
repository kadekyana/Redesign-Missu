"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("missu:theme-change", callback);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("missu:theme-change", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  try {
    const stored = localStorage.getItem("missu_theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function getServerSnapshot() {
  return "light";
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    try {
      localStorage.setItem("missu_theme", newTheme);
      window.dispatchEvent(new Event("missu:theme-change"));
    } catch {}
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
