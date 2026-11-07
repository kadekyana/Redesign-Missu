"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
];

export default function TicketModal({ isOpen, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nama: "I Gusti Agung Ayu Ananda Dewi",
    email: "agung.ayu.ananda@undiksha.ac.id",
    whatsapp: "",
    judul: "",
    kategori: "",
    deskripsi: "",
    unit: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validasi ketat berkas unggahan: wajib berformat PDF atau Gambar
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setFileError("Wajib melampirkan berkas bukti berupa PDF atau Gambar.");
      return;
    }

    const fileName = file.name.toLowerCase();
    const fileExt = "." + fileName.split(".").pop();
    const isPdf = file.type === "application/pdf" || fileName.endsWith(".pdf");
    const isImage =
      file.type.startsWith("image/") || ALLOWED_EXTENSIONS.includes(fileExt);

    if (!isPdf && !isImage) {
      setFileError(
        "Format file tidak didukung! Wajib berupa file PDF atau Gambar (JPG, PNG, WebP). Selain format tersebut tidak dapat diunggah."
      );
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Maksimal ukuran file 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setFileError("Ukuran file terlalu besar! Maksimal ukuran file adalah 10 MB.");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFileError("");
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Logika Simpan ke Local Storage (Fungsi CREATE)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi file lampiran wajib ada dan berformat PDF atau Gambar
    if (!selectedFile) {
      setFileError(
        "Wajib melampirkan file berkas pendukung dalam format PDF atau Gambar (JPG, PNG, WebP)."
      );
      return;
    }

    const fileName = selectedFile.name.toLowerCase();
    const isPdf =
      selectedFile.type === "application/pdf" || fileName.endsWith(".pdf");
    const isImage =
      selectedFile.type.startsWith("image/") ||
      ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

    if (!isPdf && !isImage) {
      setFileError(
        "Format file tidak didukung! Wajib berupa file PDF atau Gambar. Format lain tidak dapat diterima."
      );
      return;
    }

    // 1. Buat format data tiket baru dengan WAKTU DINAMIS & data Lampiran
    const now = new Date();
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      status: "Open", // Status default
      lampiran: {
        nama: selectedFile.name,
        ukuran: (selectedFile.size / 1024).toFixed(1) + " KB",
        tipe: isPdf ? "PDF" : "Gambar",
      },
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
      JSON.stringify([newTicket, ...existingTickets])
    );

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setSelectedFile(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
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
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4.5 max-h-[80vh] overflow-y-auto"
            >
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

              {/* Rujukan Otomatis Edit Data Diri jika ada data yang salah */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                <span>Data identitas otomatis tersinkron dari akun SSO Undiksha.</span>
                <Link
                  href="/faq?search=data+diri"
                  onClick={handleClose}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Ada salah nama/data diri? Panduan di FAQ</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
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
                    <option
                      value=""
                      disabled
                      className="text-slate-400 dark:bg-slate-800"
                    >
                      Pilih Kategori
                    </option>
                    <option
                      value="Akademik"
                      className="dark:bg-slate-800 dark:text-white"
                    >
                      Akademik
                    </option>
                    <option
                      value="Sistem Informasi"
                      className="dark:bg-slate-800 dark:text-white"
                    >
                      Sistem Informasi (SSO/SIAK)
                    </option>
                    <option
                      value="Jaringan / Internet"
                      className="dark:bg-slate-800 dark:text-white"
                    >
                      Jaringan / WiFi Undiksha
                    </option>
                    <option
                      value="Infrastruktur"
                      className="dark:bg-slate-800 dark:text-white"
                    >
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
                    <option
                      value=""
                      disabled
                      className="text-slate-400 dark:bg-slate-800"
                    >
                      Pilih Unit Tujuan
                    </option>
                    <option
                      value="UPA TIK"
                      className="dark:bg-slate-800 dark:text-white"
                    >
                      UPA TIK Undiksha
                    </option>
                    <option
                      value="FTEK"
                      className="dark:bg-slate-800 dark:text-white"
                    >
                      Fakultas Teknik dan Kejuruan
                    </option>
                    <option
                      value="FIP"
                      className="dark:bg-slate-800 dark:text-white"
                    >
                      Fakultas Ilmu Pendidikan
                    </option>
                    <option
                      value="Rektorat"
                      className="dark:bg-slate-800 dark:text-white"
                    >
                      Layanan Akademik Rektorat
                    </option>
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

              {/* Area Unggah Berkas: Wajib PDF atau Gambar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                    Lampiran Berkas / Screenshot Bukti{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/60">
                    Wajib PDF atau Gambar
                  </span>
                </div>

                {!selectedFile ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      required
                      accept=".pdf,application/pdf,image/png,image/jpeg,image/jpg,image/webp,image/*"
                      onChange={handleFileChange}
                      className="w-full border border-slate-300 dark:border-slate-700 rounded-xl text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 dark:file:bg-slate-800 file:text-slate-700 dark:file:text-slate-200 hover:file:bg-slate-200 dark:hover:file:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer bg-white dark:bg-slate-850"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      Hanya file berekstensi <strong>.pdf</strong> atau gambar (
                      <strong>.jpg</strong>, <strong>.jpeg</strong>,{" "}
                      <strong>.png</strong>, <strong>.webp</strong>). Selain format ini
                      sistem akan menolak.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-700/80 bg-emerald-50/70 dark:bg-emerald-950/30">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-extrabold text-xs shadow-xs ${
                          selectedFile.type.includes("pdf") ||
                          selectedFile.name.toLowerCase().endsWith(".pdf")
                            ? "bg-red-500 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {selectedFile.type.includes("pdf") ||
                        selectedFile.name.toLowerCase().endsWith(".pdf")
                          ? "PDF"
                          : "IMG"}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[260px] sm:max-w-[340px]">
                          {selectedFile.name}
                        </p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                          <svg
                            className="w-3.5 h-3.5 text-emerald-600"
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
                          <span>
                            {(selectedFile.size / 1024).toFixed(1)} KB • Format{" "}
                            {selectedFile.type.includes("pdf") ||
                            selectedFile.name.toLowerCase().endsWith(".pdf")
                              ? "PDF"
                              : "Gambar"}{" "}
                            Valid
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/60 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ml-2 border border-red-200 dark:border-red-800/60"
                    >
                      Ganti Berkas
                    </button>
                  </div>
                )}

                {/* Pesan Kesalahan Format Berkas */}
                {fileError && (
                  <div className="mt-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs flex items-start gap-2 animate-in fade-in duration-150">
                    <svg
                      className="w-4 h-4 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="font-medium leading-relaxed">
                      {fileError}
                    </span>
                  </div>
                )}
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
                      d="M12 4v16m8-8H4"
                    />
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
              Tiket pengaduan Anda beserta berkas lampiran berhasil dibuat dan
              disimpan.
              <br />
              Silakan periksa halaman Status Tiket atau tunggu konfirmasi via
              WhatsApp.
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
