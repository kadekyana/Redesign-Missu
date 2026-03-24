"use client";

import { useState } from "react";

export default function WhistleBlowerModal({ isOpen, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ judul: "", deskripsi: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tampilkan modal sukses
    setIsSuccess(true);

    // Auto-close setelah 3 detik lalu reset form
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ judul: "", deskripsi: "" });
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#222222]/80 backdrop-blur-sm">
      {isSuccess ? (
        // =========================================
        // TAMPILAN SUKSES
        // =========================================
        <div className="bg-white w-full max-w-md rounded-xl p-10 md:p-12 flex flex-col items-center justify-center shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="w-20 h-20 bg-[#62d26f] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 text-center">
            Pengaduan berhasil disampaikan.
          </h2>
          <p className="text-gray-500 text-center text-sm md:text-base px-2">
            Terima kasih, laporan Anda akan diproses dan dijaga kerahasiaannya.
          </p>
        </div>
      ) : (
        // =========================================
        // TAMPILAN FORM
        // =========================================
        <div className="bg-white w-full max-w-2xl rounded-xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
              Form Pengaduan Whistle Blower
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              {/* Ikon (X) Merah Bergaris Tepi */}
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Body Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 flex flex-col gap-6"
          >
            <div>
              <label className="block font-medium text-gray-900 mb-2 text-sm md:text-base">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2 text-sm md:text-base">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows="4"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2 text-sm md:text-base">
                Lampirkan Foto / Screenshot{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                required
                className="w-full border border-gray-300 rounded-lg text-gray-500 file:mr-4 file:py-3 file:px-4 file:border-0 file:border-r file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100 transition-colors"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end items-center gap-4 mt-2 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="border-2 border-gray-800 text-gray-900 font-bold px-8 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                Tutup
              </button>
              <button
                type="submit"
                className="bg-[#295ce8] border border-[#295ce8] text-white font-bold px-8 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                Ajukan Pengaduan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
