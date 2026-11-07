"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#523be2] opacity-[0.04] dark:opacity-[0.10] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1c40f2] opacity-[0.04] dark:opacity-[0.10] rounded-full blur-[150px]"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8 py-8 sm:py-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 w-full max-w-3xl min-h-[500px] shadow-xl p-6 sm:p-12 relative overflow-hidden rounded-3xl transition-colors">
          {/* Card Top Action Bar: Tombol Kembali & Theme Toggle */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 transition-all duration-200 group border border-slate-200/80 dark:border-slate-700 cursor-pointer shadow-xs hover:shadow-sm"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
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
                <span>Kembali</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
              >
                Ke Dashboard
              </Link>
            </div>

            <ThemeToggle variant="default" />
          </div>

          <div className="mb-6">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-1 block">
              Detail Tiket
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Detail Status Tiket
            </h1>
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

            {/* Lampiran Berkas (PDF / Gambar) */}
            {ticket.lampiran && (
              <div className="mt-4">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-2">
                  Lampiran Berkas Pendukung:
                </h4>
                <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 w-fit max-w-full">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-extrabold text-xs text-white ${
                      ticket.lampiran.tipe === "PDF"
                        ? "bg-red-500"
                        : "bg-blue-600"
                    }`}
                  >
                    {ticket.lampiran.tipe === "PDF" ? "PDF" : "IMG"}
                  </div>
                  <div className="truncate">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {ticket.lampiran.nama}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Format: {ticket.lampiran.tipe} • Ukuran: {ticket.lampiran.ukuran}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
