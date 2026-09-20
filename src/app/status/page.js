"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StatusPage() {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const executeSearch = (query) => {
    if (!query) return;
    const tickets = JSON.parse(localStorage.getItem("missu_tickets")) || [];
    const foundTicket = tickets.find(
      (t) => t.id.toLowerCase() === query.trim().toLowerCase(),
    );

    if (foundTicket) {
      setResult(foundTicket);
      setIsNotFound(false);
    } else {
      setResult(null);
      setIsNotFound(true);
    }
  };

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 transition-colors">
          <div className="mb-8">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-1 block">
              Pelacakan
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Cek Status Tiket
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-1">
              Pantau status dan perkembangan penanganan tiket pengaduan Anda.
            </p>
          </div>

          {/* Card Ungu Cek Status */}
          <div className="bg-gradient-to-br from-[#4A3AFF] via-[#3724c9] to-[#20178c] dark:from-[#2e23a8] dark:via-[#221585] dark:to-[#120b57] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-xl sm:text-2xl font-black mb-2 uppercase tracking-wide">
              Pantau Status Tiket Anda
            </h2>
            <p className="text-sm sm:text-base text-blue-100 mb-8 max-w-md mx-auto">
              Masukkan Nomor ID Tiket (misal: <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">TKT-1234</code>) untuk melihat riwayat dan progress saat ini.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3.5 w-full max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none"
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
                  placeholder="Masukkan nomor ID tiket..."
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium text-sm sm:text-base shadow-sm border border-transparent dark:border-slate-700"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-blue-700 hover:bg-blue-50 active:scale-95 font-bold py-3.5 px-7 rounded-2xl flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer shadow-md text-sm sm:text-base shrink-0"
              >
                <span>Cek Status</span>
                <svg
                  className="w-4 h-4"
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
            <div className="mt-8 p-5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-2xl text-center font-medium border border-red-200 dark:border-red-900/60 animate-in fade-in">
              Tiket dengan ID &quot;<span className="font-mono font-bold">{ticketId}</span>&quot; tidak ditemukan pada riwayat lokal perangkat ini.
            </div>
          )}

          {/* Result State */}
          {result && (
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setTicketId("");
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors cursor-pointer"
                  title="Kembali ke pencarian"
                >
                  <svg
                    className="w-6 h-6"
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
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Detail Status Tiket
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Informasi progress dan tindak lanjut aduan Anda
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/80 rounded-2xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {result.judul}
                  </h3>
                  <span
                    className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                      result.status === "Done" || result.status === "Selesai"
                        ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                        : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                    }`}
                  >
                    {result.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-300 mb-4 font-medium">
                  <span>ID: <strong className="font-mono text-blue-600 dark:text-blue-400">{result.id}</strong></span>
                  <span>•</span>
                  <span>Kategori: <strong>{result.kategori || "Umum"}</strong></span>
                  <span>•</span>
                  <span>Unit: <strong>{result.unit || "Helpdesk"}</strong></span>
                  <span>•</span>
                  <span>{result.tanggal} {result.waktu ? `(${result.waktu})` : ""}</span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                  {result.deskripsi}
                </p>
              </div>

              {/* Timeline Status */}
              <div className="space-y-6 pl-2">
                <div className="flex items-start gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-emerald-500/20">
                    <svg
                      className="w-4 h-4"
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Pembuatan Tiket Pengaduan Berhasil
                      </h4>
                      <span className="text-slate-400 dark:text-slate-400 text-xs font-medium">
                        {result.tanggal}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Tiket telah diterima dan dialokasikan ke unit {result.unit || "terkait"}.
                    </p>
                  </div>
                </div>

                {result.status === "Done" && (
                  <div className="flex items-start gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20">
                      <svg
                        className="w-4 h-4"
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
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Penanganan Telah Selesai
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        Kendala telah diselesaikan oleh petugas teknis. Terima kasih atas kerja sama Anda.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
