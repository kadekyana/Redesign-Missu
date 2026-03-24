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
      id: `TKT-${Math.floor(Math.random() * 10000)}`,
      ...formData,
      status: "Open", // Status default
      tanggal: now.toLocaleDateString("id-ID"),
      // Tambahan: Catat jam pembuatan
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {!isSuccess ? (
          <>
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                Form Buka Tiket Pengaduan
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-red-500 transition-colors"
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

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    readOnly
                    className="w-full bg-gray-100 text-gray-500 rounded-lg px-3 py-2 text-sm outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full bg-gray-100 text-gray-500 rounded-lg px-3 py-2 text-sm outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Judul Pengaduan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Kategori Masalah <span className="text-red-500">*</span>
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white"
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="Akademik">Akademik</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Jaringan / Internet">
                    Jaringan / Internet
                  </option>
                  <option value="Infrastruktur">
                    Infrastruktur / Fasilitas
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Deskripsi Masalah <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Jelaskan kronologi, pesan error yang muncul..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Lampiran Foto / Screenshot
                  </label>
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Unit Tujuan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="" disabled>
                      Pilih Unit Tujuan
                    </option>
                    <option value="FTEK">Fakultas Teknik dan Kejuruan</option>
                    <option value="FIP">Fakultas Ilmu Pendidikan</option>
                    <option value="UPA TIK">UPA TIK</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Buka Tiket
                </button>
              </div>
            </form>
          </>
        ) : (
          /* TAMPILAN 2: NOTIFIKASI BERHASIL */
          <div className="flex flex-col items-center justify-center p-10 py-16 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 animate-bounce">
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
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              BERHASIL!
            </h2>
            <p className="text-gray-600 mb-8 max-w-sm">
              Tiket berhasil diajukan.
              <br />
              Silahkan tunggu notifikasi kami via WhatsApp!
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5 rounded-lg font-bold transition-colors"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
