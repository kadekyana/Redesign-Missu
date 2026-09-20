"use client";

import { useState } from "react";

export default function TicketModal({ isOpen, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nama: "I Gusti Agung Ayu Ananda Dewi",
    email: "agung.ayu.ananda@undiksha.ac.id",
    whatsapp: "",
    judul: "",
    kategori: "",
    deskripsi: "",
    unit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logika Simpan ke Local Storage (Fungsi CREATE)
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Buat format data tiket baru dengan WAKTU DINAMIS
    const now = new Date();
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      status: "Open", // Status default
      tanggal: now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      waktu:
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " WITA",
    };

    // 2. Ambil data lama dari LocalStorage
    const existingTickets =
      JSON.parse(localStorage.getItem("missu_tickets")) || [];

    // 3. Gabungkan dan simpan kembali
    localStorage.setItem(
      "missu_tickets",
      JSON.stringify([newTicket, ...existingTickets]),
    );

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({
      ...formData,
      whatsapp: "",
      judul: "",
      kategori: "",
      deskripsi: "",
      unit: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
        {!isSuccess ? (
          <>
            {/* Header Modal */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Form Buka Tiket Pengaduan
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Tutup form"
                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

            {/* Form Input Fields */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4.5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Nama Pemohon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    readOnly
                    className="w-full bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm outline-none cursor-not-allowed font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Email Institusi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm outline-none cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="Contoh: 081234567890"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Judul Pengaduan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="judul"
                  placeholder="Ringkasan singkat kendala yang dihadapi..."
                  value={formData.judul}
                  onChange={handleChange}
                  required
                  className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Kategori Masalah <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    required
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-400 dark:bg-slate-800">
                      Pilih Kategori
                    </option>
                    <option value="Akademik" className="dark:bg-slate-800 dark:text-white">Akademik</option>
                    <option value="Sistem Informasi" className="dark:bg-slate-800 dark:text-white">Sistem Informasi (SSO/SIAK)</option>
                    <option value="Jaringan / Internet" className="dark:bg-slate-800 dark:text-white">Jaringan / WiFi Undiksha</option>
                    <option value="Infrastruktur" className="dark:bg-slate-800 dark:text-white">
                      Infrastruktur / Fasilitas
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                    Unit Tujuan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-400 dark:bg-slate-800">
                      Pilih Unit Tujuan
                    </option>
                    <option value="UPA TIK" className="dark:bg-slate-800 dark:text-white">UPA TIK Undiksha</option>
                    <option value="FTEK" className="dark:bg-slate-800 dark:text-white">Fakultas Teknik dan Kejuruan</option>
                    <option value="FIP" className="dark:bg-slate-800 dark:text-white">Fakultas Ilmu Pendidikan</option>
                    <option value="Rektorat" className="dark:bg-slate-800 dark:text-white">Layanan Akademik Rektorat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Deskripsi Masalah <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Jelaskan kronologi, detail kendala, atau pesan error yang muncul..."
                  className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none resize-none transition-all"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Lampiran Foto / Screenshot (Opsional)
                </label>
                <input
                  type="file"
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-xl text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 dark:file:bg-slate-800 file:text-slate-700 dark:file:text-slate-200 hover:file:bg-slate-200 dark:hover:file:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer bg-white dark:bg-slate-850"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Buka Tiket</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          /* TAMPILAN 2: NOTIFIKASI BERHASIL */
          <div className="flex flex-col items-center justify-center p-10 py-16 text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30 animate-bounce">
              <svg
                className="w-10 h-10 text-white"
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
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              PENGAJUAN BERHASIL!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-sm leading-relaxed text-sm sm:text-base">
              Tiket pengaduan Anda berhasil dibuat dan disimpan.
              <br />
              Silakan periksa halaman Status Tiket atau tunggu konfirmasi via WhatsApp.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              OK, Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
