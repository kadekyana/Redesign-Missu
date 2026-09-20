"use client";

import { useState, useEffect } from "react";

export default function HistoryModal({ isOpen, onClose, initialQuery = "" }) {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const savedTickets =
          JSON.parse(localStorage.getItem("missu_tickets")) || [];
        setTickets(savedTickets);
        setSearchQuery(initialQuery);
      }, 0);
    } else {
      setTimeout(() => {
        setSearchQuery("");
      }, 0);
    }
  }, [isOpen, initialQuery]);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.judul.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Riwayat Tiket Pengaduan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Daftar seluruh aduan yang tersimpan di perangkat ini.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg
                className="w-4.5 h-4.5 text-slate-400"
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
            </div>
            <input
              type="text"
              placeholder="Cari berdasarkan judul pengaduan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-white placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40 flex-1">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">
                {searchQuery
                  ? `Tidak ada tiket dengan judul "${searchQuery}".`
                  : "Belum ada riwayat tiket pengaduan."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {filteredTickets.map((ticket, index) => {
                const isDone =
                  ticket.status.toLowerCase() === "done" ||
                  ticket.status.toLowerCase() === "selesai";
                const badgeClass = isDone
                  ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                  : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800";

                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:border-blue-400 dark:hover:border-blue-500/60 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 px-2 py-0.5 rounded-md text-xs">
                          {ticket.id}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {ticket.tanggal}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                        {ticket.judul}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 line-clamp-1 mt-0.5">
                        {ticket.kategori} • {ticket.unit}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider ${badgeClass}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
