"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function StatusModal({ isOpen, onClose, initialQuery = "" }) {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setTicketId(initialQuery);
        executeSearch(initialQuery);
      } else {
        setTicketId("");
        setResult(null);
      }
    }
  }, [isOpen, initialQuery]);

  const executeSearch = (query) => {
    if (!query) return;
    const tickets = JSON.parse(localStorage.getItem("missu_tickets")) || [];
    const foundTicket = tickets.find(
      (t) => t.id.toLowerCase() === query.toLowerCase(),
    );

    if (foundTicket) {
      setResult(foundTicket);
    } else {
      setResult("not-found");
    }
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-5xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header Biru Gelap */}
        <div className="bg-[#0d1a63] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/undiksha-logo.svg"
              alt="Logo Undiksha"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-white font-bold text-xl tracking-widest">
              MISSU
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors"
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

        <div className="p-6 md:p-10">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1 uppercase">
            Cek Status Tiket
          </h2>
          <p className="text-gray-500 mb-8">
            Pantau status dan perkembangan tiket Anda.
          </p>

          {/* Box Gradasi Pencarian */}
          <div className="bg-gradient-to-r from-[#120F5B] to-[#4534E6] rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2 uppercase">
              Pantau Status Tiket Anda
            </h3>
            <p className="text-gray-200 text-sm md:text-base mb-8">
              Masukkan Nomor ID Tiket (misal: TKT-001) untuk melihat status
              perbaikan saat ini.
            </p>

            {/* Form sekarang menggunakan w-full agar merentang rapi */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 w-full mt-4"
            >
              <input
                type="text"
                placeholder="Nomor ID Tiket..."
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="flex-1 bg-white rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-colors whitespace-nowrap"
              >
                Cek Status
              </button>
            </form>
          </div>

          {/* Area Hasil Pencarian */}
          {result === "not-found" && (
            <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-lg text-center font-medium border border-red-100">
              Tiket dengan ID "{ticketId}" tidak ditemukan.
            </div>
          )}

          {result && result !== "not-found" && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    {result.judul}
                  </h4>
                  <p className="text-sm text-gray-500">
                    ID:{" "}
                    <span className="font-mono font-bold text-blue-600">
                      {result.id}
                    </span>{" "}
                    • {result.tanggal}
                  </p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs uppercase">
                  {result.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{result.deskripsi}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
