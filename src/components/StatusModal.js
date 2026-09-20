"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function StatusModal({ isOpen, onClose, initialQuery = "" }) {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState(null);

  const executeSearch = (query) => {
    if (!query) return;
    const tickets = JSON.parse(localStorage.getItem("missu_tickets")) || [];
    const foundTicket = tickets.find(
      (t) => t.id.toLowerCase() === query.trim().toLowerCase(),
    );

    if (foundTicket) {
      setResult(foundTicket);
    } else {
      setResult("not-found");
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setTimeout(() => {
          setTicketId(initialQuery);
          executeSearch(initialQuery);
        }, 0);
      } else {
        setTimeout(() => {
          setTicketId("");
          setResult(null);
        }, 0);
      }
    }
  }, [isOpen, initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch(ticketId);
  };

  const handleClose = () => {
    setTicketId("");
    setResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
        {/* Header Biru */}
        <div className="bg-[#0d1a63] dark:bg-[#070b16] px-6 py-4 flex items-center justify-between border-b border-white/10 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Image
              src="/undiksha-logo.svg"
              alt="Logo Undiksha"
              width={38}
              height={38}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl tracking-widest leading-none">
                MISSU
              </span>
              <span className="text-[10px] text-blue-200 dark:text-slate-400 font-medium">
                Cek Status Tiket
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Tutup modal"
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Cek Status Tiket
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Pantau status dan perkembangan penanganan tiket pengaduan Anda.
            </p>
          </div>

          {/* Box Gradasi Pencarian */}
          <div className="bg-gradient-to-br from-[#120F5B] via-[#201C99] to-[#4534E6] dark:from-[#0d154a] dark:via-[#19206b] dark:to-[#2b2796] rounded-2xl p-6 sm:p-10 text-center text-white shadow-xl relative overflow-hidden">
            <h3 className="text-lg sm:text-2xl font-black mb-2 uppercase tracking-wide">
              Pantau Status Tiket Anda
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm mb-6 max-w-md mx-auto">
              Masukkan Nomor ID Tiket (misal: <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono">TKT-1234</code>) untuk melihat status saat ini.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Nomor ID Tiket..."
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium text-sm shadow-sm border border-transparent dark:border-slate-700"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-md text-sm shrink-0"
              >
                Cek Status
              </button>
            </form>
          </div>

          {/* Area Hasil Pencarian */}
          {result === "not-found" && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 rounded-xl text-center font-medium border border-red-200 dark:border-red-900/60 animate-in fade-in text-sm">
              Tiket dengan ID &quot;<span className="font-mono font-bold">{ticketId}</span>&quot; tidak ditemukan.
            </div>
          )}

          {result && result !== "not-found" && (
            <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 animate-in fade-in">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                    {result.judul}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                    ID:{" "}
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {result.id}
                    </span>{" "}
                    • {result.tanggal} {result.waktu ? `(${result.waktu})` : ""}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                    result.status === "Done" || result.status === "Selesai"
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                      : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                  }`}
                >
                  {result.status}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 mt-3">
                {result.deskripsi}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
