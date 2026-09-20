"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TicketDetailPage() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get("id");

    setTimeout(() => {
      if (idParam) {
        const tickets = JSON.parse(localStorage.getItem("missu_tickets")) || [];
        const foundTicket = tickets.find((t) => t.id === idParam);
        setTicket(foundTicket);
      }
      setLoading(false);
    }, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium">
        Memuat data tiket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col items-center justify-center text-slate-800 dark:text-slate-100 p-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-500 flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Tiket Tidak Ditemukan</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Nomor tiket yang Anda minta tidak terdaftar pada perangkat ini.
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer"
        >
          Kembali ke Riwayat
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 w-full max-w-3xl min-h-[500px] shadow-xl p-6 sm:p-12 relative overflow-hidden rounded-3xl transition-colors">
          {/* Header dengan Tombol Back */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-5">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors cursor-pointer"
              title="Kembali"
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
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-wide">
              Detail Status Tiket
            </h1>
            <div className="w-8"></div>
          </div>

          {/* Informasi Utama Tiket */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
              {ticket.judul}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
              ID: <strong className="font-mono text-blue-600 dark:text-blue-400">{ticket.id}</strong>
              <span className="mx-2.5">•</span>
              {ticket.tanggal} {ticket.waktu ? `(${ticket.waktu})` : ""}
            </p>
          </div>

          {/* Timeline Status */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/80 mb-6">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20">
              <svg
                className="w-5 h-5"
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                  Pembuatan Tiket Baru Berhasil
                </h3>
                <span className="text-slate-400 text-xs font-medium">
                  {ticket.waktu || "Tercatat"}
                </span>
              </div>

              <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full inline-block border border-amber-300 dark:border-amber-800">
                {ticket.status}
              </span>
            </div>
          </div>

          {/* Area Detail Tambahan */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-2">
              Deskripsi Keluhan:
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              {ticket.deskripsi}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
