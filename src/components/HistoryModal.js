"use client";

import { useState, useEffect } from "react";

export default function HistoryModal({ isOpen, onClose, initialQuery = "" }) {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      const savedTickets =
        JSON.parse(localStorage.getItem("missu_tickets")) || [];
      setTickets(savedTickets);
      setSearchQuery(initialQuery);
    } else {
      setSearchQuery("");
    }
  }, [isOpen, initialQuery]);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.judul.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800 uppercase">
              Riwayat Tiket
            </h2>
            <p className="text-sm text-gray-500">
              Daftar pengaduan yang pernah Anda buat.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 bg-white border-b border-gray-100">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
              placeholder="Cari berdasarkan Judul Pengaduan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto bg-gray-50/50 flex-1">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 font-medium">
                {searchQuery
                  ? `Tidak ada tiket dengan judul yang mengandung "${searchQuery}".`
                  : "Belum ada riwayat tiket pengaduan."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredTickets.map((ticket, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-blue-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">
                        {ticket.id}
                      </span>
                      <span className="text-xs text-gray-500">
                        {ticket.tanggal}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-800 text-lg">
                      {ticket.judul}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                      {ticket.kategori} - {ticket.unit}
                    </p>
                  </div>
                  <div>
                    <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs uppercase">
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
