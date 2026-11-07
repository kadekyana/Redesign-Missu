"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

const RatingScale = ({ questionIndex, value, onSelect }) => {
  return (
    <div className="relative flex justify-between items-center w-full px-1 py-4 mb-2">
      <div className="absolute left-2 right-2 h-[2px] bg-slate-200 dark:bg-slate-700 z-0"></div>
      {[1, 2, 3, 4, 5].map((val) => {
        const isSelected = value === val;
        return (
          <button
            key={val}
            type="button"
            onClick={() => onSelect(questionIndex, val)}
            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 cursor-pointer ${
              isSelected
                ? "bg-emerald-500 border-emerald-500 text-white scale-110 shadow-md"
                : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:dark:border-blue-400"
            }`}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
};

export default function HistoryPage() {
  const [tickets, setTickets] = useState([]);

  // State untuk Modal Detail
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailTicket, setDetailTicket] = useState(null);

  // State untuk Modal Survey & Notifikasi
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [surveyAnswers, setSurveyAnswers] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    saran: "",
  });

  useEffect(() => {
    setTimeout(() => {
      const savedTickets =
        JSON.parse(localStorage.getItem("missu_tickets")) || [];
      setTickets(savedTickets);
    }, 0);
  }, []);

  const handleOpenDetail = (ticket) => {
    setDetailTicket(ticket);
    setIsDetailOpen(true);
  };

  const handleOpenSurvey = (ticketId) => {
    setSelectedSurveyId(ticketId);
    setSurveyAnswers({ q1: 0, q2: 0, q3: 0, saran: "" });
    setIsSurveyOpen(true);
  };

  const handleSelectRating = (questionIndex, val) => {
    setSurveyAnswers((prev) => ({ ...prev, [questionIndex]: val }));
  };

  const handleSubmitSurvey = (e) => {
    e.preventDefault();

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedSurveyId) {
        return {
          ...ticket,
          status: "Done",
          isRated: true,
          surveyData: surveyAnswers,
        };
      }
      return ticket;
    });

    localStorage.setItem("missu_tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);

    setIsSurveyOpen(false);
    setIsSuccessOpen(true);
    setTimeout(() => {
      setIsSuccessOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#523be2] opacity-[0.04] dark:opacity-[0.10] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1c40f2] opacity-[0.04] dark:opacity-[0.10] rounded-full blur-[150px]"></div>
      </div>

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 min-h-[70vh] transition-colors">
          {/* Card Top Action Bar: Tombol Kembali & Theme Toggle */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100 dark:border-slate-800">
            <Link
              href="/"
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
              <span>Kembali ke Dashboard</span>
            </Link>

            <ThemeToggle variant="default" />
          </div>

          <div className="mb-8">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-1 block">
              Pengaduan Anda
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Riwayat Tiket
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-1">
              Lihat riwayat tiket dan status penanganan pengaduan yang pernah Anda ajukan.
            </p>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700/80">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium text-base mb-1">
                Belum ada riwayat tiket pengaduan.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm mb-4">
                Ada kendala layanan? Buat tiket baru untuk mendapatkan bantuan.
              </p>
              <Link
                href="/?createTicket=true"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                Buat Tiket Baru
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {tickets.map((ticket, index) => {
                const isDone =
                  ticket.status.toLowerCase() === "done" ||
                  ticket.status.toLowerCase() === "selesai";
                const badgeClass = isDone
                  ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                  : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800";

                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                      <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white pr-4">
                        {ticket.judul}
                      </h3>
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap self-start sm:self-auto ${badgeClass}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-4">
                      <span>ID: <strong className="font-mono text-blue-600 dark:text-blue-400">{ticket.id}</strong></span>
                      <span>•</span>
                      <span>{ticket.tanggal}</span>
                      {ticket.kategori && (
                        <>
                          <span>•</span>
                          <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded text-[11px] font-semibold">{ticket.kategori}</span>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 border-t border-slate-100 dark:border-slate-700/60 pt-4">
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 max-w-lg font-normal line-clamp-2">
                        {ticket.deskripsi}
                      </p>
                      <div className="flex flex-row gap-2.5 w-full md:w-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(ticket)}
                          className="flex-1 md:flex-none text-center bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all whitespace-nowrap cursor-pointer shadow-xs"
                        >
                          Cek Detail
                        </button>

                        {ticket.isRated ? (
                          <button
                            type="button"
                            disabled
                            className="flex-1 md:flex-none font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed whitespace-nowrap"
                          >
                            Sudah Dinilai
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenSurvey(ticket.id)}
                            className="flex-1 md:flex-none font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border transition-all whitespace-nowrap bg-amber-400 border-amber-400 text-slate-950 hover:bg-amber-300 active:scale-95 cursor-pointer shadow-xs"
                          >
                            Beri Penilaian
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* MODAL 0: DETAIL TIKET */}
      {isDetailOpen && detailTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[85vh] shadow-2xl p-6 sm:p-10 relative overflow-y-auto rounded-3xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 p-2 rounded-full transition-colors cursor-pointer"
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-wide">
                Detail Tiket Pengaduan
              </h2>
              <div className="w-8"></div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                {detailTicket.judul}
              </h3>
              <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">
                ID: <strong className="font-mono text-blue-600 dark:text-blue-400">{detailTicket.id}</strong>
                <span className="mx-2">•</span>
                {detailTicket.tanggal} {detailTicket.waktu ? `(${detailTicket.waktu})` : ""}
              </p>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/80 mb-6">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white ${
                  detailTicket.status === "Done" ? "bg-emerald-500" : "bg-blue-600"
                }`}
              >
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
                  <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    {detailTicket.status === "Done"
                      ? "Tiket Telah Selesai Ditangani"
                      : "Pembuatan Tiket Baru Berhasil"}
                  </h4>
                  <span className="text-slate-400 text-xs font-medium">
                    {detailTicket.waktu || "Tercatat"}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-3.5 py-1 rounded-full inline-block border ${
                    detailTicket.status === "Done"
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                      : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                  }`}
                >
                  Status: {detailTicket.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5 font-bold uppercase">Kategori</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{detailTicket.kategori || "Umum"}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5 font-bold uppercase">Unit Tujuan</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{detailTicket.unit || "UPA TIK"}</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1.5">
                  Deskripsi Keluhan:
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {detailTicket.deskripsi}
                </p>

                {detailTicket.lampiran && (
                  <div className="mt-3">
                    <h5 className="text-slate-900 dark:text-white font-bold text-xs mb-1.5">
                      Lampiran Berkas:
                    </h5>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 w-fit max-w-full">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-extrabold text-[11px] text-white ${
                          detailTicket.lampiran.tipe === "PDF"
                            ? "bg-red-500"
                            : "bg-blue-600"
                        }`}
                      >
                        {detailTicket.lampiran.tipe === "PDF" ? "PDF" : "IMG"}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {detailTicket.lampiran.nama}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          {detailTicket.lampiran.tipe} • {detailTicket.lampiran.ukuran}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: FORM SURVEY KEPUASAN */}
      {isSurveyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
            <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                FORM SURVEY KEPUASAN
              </h2>
              <button
                type="button"
                onClick={() => setIsSurveyOpen(false)}
                aria-label="Tutup survey"
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
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <form
                onSubmit={handleSubmitSurvey}
                className="flex flex-col gap-6"
              >
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">
                    1. Bagaimana pengalaman Anda saat menggunakan layanan kami?
                  </h3>
                  <RatingScale
                    questionIndex="q1"
                    value={surveyAnswers.q1}
                    onSelect={handleSelectRating}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">
                    2. Apakah Anda merasa mudah dalam mengakses layanan pengaduan?
                  </h3>
                  <RatingScale
                    questionIndex="q2"
                    value={surveyAnswers.q2}
                    onSelect={handleSelectRating}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">
                    3. Apakah informasi dan solusi yang diberikan memuaskan?
                  </h3>
                  <RatingScale
                    questionIndex="q3"
                    value={surveyAnswers.q3}
                    onSelect={handleSelectRating}
                  />
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-2">
                    Kritik dan Saran:
                  </h3>
                  <textarea
                    value={surveyAnswers.saran}
                    onChange={(e) =>
                      setSurveyAnswers({
                        ...surveyAnswers,
                        saran: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white text-sm resize-none placeholder-slate-400"
                    placeholder="Tuliskan masukan atau saran Anda di sini..."
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold px-8 py-3 rounded-full transition-all cursor-pointer shadow-lg shadow-blue-600/30 text-sm"
                  >
                    Kirim Survey
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: NOTIFIKASI SUKSES SURVEY */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
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
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase text-center">
              TERIMA KASIH!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-medium text-center text-sm sm:text-base">
              Survei kepuasan Anda telah berhasil kami simpan dan status tiket diperbarui.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
