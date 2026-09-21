"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({ showLabel = false, className = "", variant = "navbar" }) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Mencegah hydration mismatch sebelum mounted di client
  const isDark = mounted ? theme === "dark" : false;

  const baseThemeStyles =
    variant === "default"
      ? isDark
        ? "bg-slate-800 text-amber-300 hover:bg-slate-700/90 border border-slate-700 shadow-xs"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80 shadow-xs"
      : isDark
        ? "bg-slate-800/90 text-amber-300 hover:bg-slate-700/90 border border-slate-700 shadow-sm hover:shadow-amber-500/10"
        : "bg-white/20 text-white hover:bg-white/30 border border-white/25 shadow-sm hover:shadow-blue-500/10";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
      title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Night Mode)"}
      className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 select-none ${baseThemeStyles} ${className}`}
    >
      {/* Container Icon dengan animasi rotasi */}
      <span className="relative w-5 h-5 flex items-center justify-center shrink-0">
        {/* Sun Icon (Mode Terang) */}
        <svg
          className={`w-5 h-5 transition-all duration-300 transform ${
            isDark
              ? "opacity-100 rotate-0 text-amber-400 scale-100"
              : "opacity-0 -rotate-90 scale-50 absolute"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon (Mode Gelap) */}
        <svg
          className={`w-4.5 h-4.5 transition-all duration-300 transform ${
            !isDark
              ? variant === "default"
                ? "opacity-100 rotate-0 text-slate-700 scale-100"
                : "opacity-100 rotate-0 text-blue-100 scale-100"
              : "opacity-0 rotate-90 scale-50 absolute"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>

      {showLabel && (
        <span className="hidden sm:inline-block whitespace-nowrap">
          {isDark ? "Mode Terang" : "Mode Gelap"}
        </span>
      )}
    </button>
  );
}
