"use client";

import { useState } from "react";

export default function HeroSection({ onOpenModal, onSearchSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    onSearchSubmit(searchQuery);
  };

  return (
    <section className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 relative z-10">
      <div className="bg-gradient-to-br from-[#0d1a63] via-[#1a1c7c] to-[#3b32c6] dark:from-[#080f33] dark:via-[#111652] dark:to-[#272186] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-14 text-white relative shadow-2xl border border-white/10 dark:border-slate-800/80 overflow-hidden transition-all duration-300">
        {/* Ambient Glow Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[28px] sm:rounded-[36px]"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full md:w-3/4 lg:w-2/3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 dark:bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20 dark:border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Layanan Resmi Undiksha
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 leading-tight tracking-tight">
            MANAJEMEN ISSUE UNDIKSHA
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 dark:text-blue-200/90 mb-10 font-normal">
            Providing The Best Service Professionally with Integrity
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-lg mb-8">
            <div className="flex items-center bg-white/15 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/25 dark:border-slate-700/80 focus-within:border-white/70 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-white/20 dark:focus-within:ring-blue-500/30 transition-all shadow-lg">
              <svg
                className="w-5 h-5 text-blue-200 dark:text-slate-300 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Ketik masalah atau kata kunci di sini..."
                className="bg-transparent border-none outline-none text-white w-full placeholder-blue-200/70 dark:placeholder-slate-400 text-sm sm:text-base font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 bg-white/20 hover:bg-white/30 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0"
              >
                Cari
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-white/15 dark:border-white/10">
            <span className="text-sm sm:text-base text-blue-100/90 dark:text-blue-200 font-medium">
              Tidak menemukan solusi? Buat Tiket Sekarang!
            </span>
            <button
              type="button"
              onClick={onOpenModal}
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-6 py-3 rounded-full font-bold transition-all flex items-center shadow-lg hover:shadow-blue-600/40 cursor-pointer text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Buat Tiket Pengaduan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
