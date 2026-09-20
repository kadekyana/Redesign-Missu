"use client";

import { useState } from "react";

export default function WhistleBlowerModal({ isOpen, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ judul: "", deskripsi: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ judul: "", deskripsi: "" });
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      {isSuccess ? (
        /* TAMPILAN SUKSES */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl p-10 md:p-12 flex flex-col items-center justify-center shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
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
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 text-center">
            Pengaduan Berhasil Disampaikan
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-center text-sm md:text-base px-2 leading-relaxed">
            Terima kasih, laporan Anda telah kami terima secara rahasia dan identitas Anda dijamin aman.
          </p>
        </div>
      ) : (
        /* TAMPILAN FORM */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
          {/* Header */}
          <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                Form Pengaduan Whistle Blower
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup form"
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

          {/* Body Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 flex flex-col gap-5 max-h-[80vh] overflow-y-auto"
          >
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                Judul Pelanggaran / Perihal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Misal: Dugaan pungli / penyalahgunaan wewenang..."
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base transition-all"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                Kronologi & Deskripsi Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows="4"
                placeholder="Jelaskan fakta peristiwa, tempat, waktu kejadian, dan pihak yang terlibat secara rinci..."
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base resize-none transition-all"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                Lampirkan Bukti Foto / Dokumen / Screenshot{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                required
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 file:mr-4 file:py-3 file:px-4 file:border-0 file:border-r file:border-slate-300 dark:file:border-slate-700 file:text-sm file:font-semibold file:bg-slate-100 dark:file:bg-slate-800 file:text-slate-700 dark:file:text-slate-200 hover:file:bg-slate-200 dark:hover:file:bg-slate-700 cursor-pointer bg-white dark:bg-slate-850"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end items-center gap-3 mt-4 pt-5 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold px-6 sm:px-8 py-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold px-6 sm:px-8 py-2.5 rounded-full shadow-lg shadow-blue-600/30 transition-all cursor-pointer text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Ajukan Pengaduan</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
