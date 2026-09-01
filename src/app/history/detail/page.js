"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TicketDetail() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Ambil ID dari URL
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
      <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center text-white">
        Memuat data...
      </div>
    );
  }

  // Jika tiket tidak ditemukan
  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Tiket Tidak Ditemukan</h1>
        <button
          onClick={() => router.back()}
          className="text-blue-400 hover:underline"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    // Background gelap menyesuaikan tema Figma (abu-abu sangat gelap)
    <div className="min-h-screen bg-[#222222] font-sans flex items-center justify-center p-4 md:p-8">
      {/* Container Putih Utama */}
      <div className="bg-white w-full max-w-3xl min-h-[500px] shadow-2xl p-6 md:p-12 relative overflow-hidden">
        {/* Header dengan Tombol Back */}
        <div className="flex items-center justify-center relative mb-12 border-b border-gray-100 pb-6">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
          >
            {/* Ikon Panah Kiri Besar */}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
            Status Tiket
          </h1>
        </div>

        {/* Informasi Utama Tiket */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-[28px] font-extrabold text-gray-900 mb-3">
            {ticket.judul}
          </h2>
          <p className="text-gray-400 text-base font-bold">
            ID: <span className="text-blue-600">{ticket.id}</span>
            <span className="mx-3 text-gray-300">•</span>
            {ticket.tanggal}
          </p>
        </div>

        {/* Timeline Status */}
        <div className="flex items-start gap-4">
          {/* Ikon Ceklis Biru */}
          <div className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center shrink-0 mt-1">
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-[19px]">
                Pembuatan Tiket Baru Berhasil
              </h3>
              {/* Waktu (Contoh Statis) */}
              <span className="text-gray-400 text-sm font-medium mt-1 sm:mt-0">
                30 Menit lalu
              </span>
            </div>

            {/* Badge Status */}
            <span className="bg-[#fcf3d9] text-[#b88c1f] text-xs font-bold px-4 py-1.5 rounded-full inline-block border border-[#fde68a]">
              {ticket.status}
            </span>
          </div>
        </div>

        {/* Area Detail Tambahan (Opsional) */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h4 className="text-gray-900 font-bold mb-2">Deskripsi Keluhan:</h4>
          <p className="text-gray-600 leading-relaxed text-sm">
            {ticket.deskripsi}
          </p>
        </div>
      </div>
    </div>
  );
}
