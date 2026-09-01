"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function StatusPage() {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const executeSearch = (query) => {
    if (!query) return;
    const tickets = JSON.parse(localStorage.getItem("missu_tickets")) || [];
    const foundTicket = tickets.find(
      (t) => t.id.toLowerCase() === query.toLowerCase(),
    );

    if (foundTicket) {
      setResult(foundTicket);
      setIsNotFound(false);
    } else {
      setResult(null);
      setIsNotFound(true);
    }
  };

  // Mengecek apakah ada ID yang dikirim dari halaman Riwayat
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get("id");
    if (idParam) {
      setTimeout(() => {
        setTicketId(idParam);
        executeSearch(idParam);
      }, 0);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch(ticketId);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar Simple */}
      <div className="bg-[#0d1a63] w-full px-6 md:px-12 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
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
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 uppercase">
            Cek Status Tiket
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-8">
            Pantau status dan perkembangan tiket Anda.
          </p>

          {/* Card Ungu Cek Status */}
          <div className="bg-gradient-to-br from-[#4A3AFF] to-[#3421C0] rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase">
              Pantau Status Tiket Anda
            </h2>
            <p className="text-sm md:text-base text-blue-100 mb-8 max-w-md mx-auto">
              Masukkan Nomor ID Tiket (misal: TKT-001) untuk melihat status
              perbaikan saat ini.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                {/* Ikon Kaca Pembesar */}
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6"
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
                  placeholder="Masukkan nomor tiket..."
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-[#4A3AFF] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cek Status
                {/* Ikon Panah Kanan */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Not Found State */}
          {isNotFound && (
            <div className="mt-8 p-6 bg-red-50 text-red-600 rounded-xl text-center font-medium border border-red-100">
              Tiket dengan ID &quot;{ticketId}&quot; tidak ditemukan.
            </div>
          )}

          {/* Result State (Mirip Figma Cek Status Tiket/Clicked) */}
          {result && (
            <div className="mt-12 bg-white">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => {
                    setResult(null);
                    setTicketId("");
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  Status Tiket
                </h2>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {result.judul}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  ID: <span className="text-blue-600">{result.id}</span>{" "}
                  <span className="mx-2 text-gray-300">•</span> {result.tanggal}
                </p>
              </div>

              {/* Timeline Status */}
              <div className="flex items-start gap-5">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-blue-500/30">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">
                      Pembuatan Tiket Baru Berhasil
                    </h4>
                    <span className="text-gray-400 text-xs font-medium mt-1">
                      Sesaat yang lalu
                    </span>
                  </div>
                  <span className="bg-[#fcf3d9] text-[#b88c1f] text-xs font-bold px-4 py-1.5 rounded-full inline-block mt-1">
                    {result.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
