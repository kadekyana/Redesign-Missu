"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroSection({ onOpenModal, onSearchSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    onSearchSubmit(searchQuery);
  };

  return (
    <div className="w-full">
      {/* 1. Header Full Width (Dikeluarkan dari section pembungkus konten) */}
      <header className="bg-[#0d1a63] w-full px-6 md:px-12 py-4 flex items-center gap-3">
        <Image
          src="/undiksha-logo.svg"
          alt="Logo Undiksha"
          width={36}
          height={36}
          className="object-contain"
        />
        <span className="text-white font-bold text-xl tracking-widest">
          MISSU
        </span>
      </header>

      {/* 2. Hero Card Container (Dibatasi lebarnya agar proporsional di layar besar) */}
      <section className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative z-10">
        <div className="bg-gradient-to-br from-hero-grad-start via-hero-grad-via to-hero-grad-end rounded-[30px] p-8 md:p-12 text-white relative shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-[30px] pointer-events-none"></div>

          <div className="relative z-10 w-full md:w-3/4 lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight">
              MANAJEMEN ISSUE UNDIKSHA
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-12 font-light">
              Providing The Best Service Professionally with Integrity
            </p>

            <form onSubmit={handleSearch} className="w-full max-w-lg mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20 focus-within:border-white/50 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-300 mr-3"
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
                  placeholder="Ketik masalah Anda di sini..."
                  className="bg-transparent border-none outline-none text-white w-full placeholder-gray-300 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-white/10">
              <span className="text-base text-gray-200">
                Tidak menemukan solusi? Buat Tiket Sekarang!
              </span>
              <button
                onClick={onOpenModal}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center shadow-lg hover:shadow-blue-600/30"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Buat Tiket Pengaduan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
