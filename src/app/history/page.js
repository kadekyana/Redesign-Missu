"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const RatingScale = ({ questionIndex, value, onSelect }) => {
  return (
    <div className="relative flex justify-between items-center w-full px-1 py-4 mb-2">
      <div className="absolute left-2 right-2 h-[2px] bg-black z-0"></div>
      {[1, 2, 3, 4, 5].map((val) => {
        const isSelected = value === val;
        return (
          <button
            key={val}
            type="button"
            onClick={() => onSelect(questionIndex, val)}
            className={`relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 
              ${
                isSelected
                  ? "bg-[#62d26f] border-[#62d26f] text-gray-900 scale-110"
                  : "bg-white border-[#c0cae3] text-gray-800 hover:border-gray-400"
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

  // LOGIKA UPDATE DINAMIS (Saat survey disubmit)
  const handleSubmitSurvey = (e) => {
    e.preventDefault();

    // 1. Cari tiket yang dinilai, lalu ubah statusnya menjadi Done
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedSurveyId) {
        return {
          ...ticket,
          status: "Done", // Ubah status secara dinamis
          isRated: true, // Tandai bahwa sudah dinilai
          surveyData: surveyAnswers, // Simpan nilai jika nanti dibutuhkan
        };
      }
      return ticket;
    });

    // 2. Simpan kembali ke LocalStorage
    localStorage.setItem("missu_tickets", JSON.stringify(updatedTickets));

    // 3. Update state agar UI langsung berubah tanpa perlu refresh page
    setTickets(updatedTickets);

    setIsSurveyOpen(false);
    setIsSuccessOpen(true);
    setTimeout(() => {
      setIsSuccessOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-[#0d1a63] w-full px-6 md:px-12 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/undiksha-logo.svg"
            alt="Logo Undiksha"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="text-white font-bold text-xl tracking-widest">
            MISSU
          </span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-10 min-h-[70vh]">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 uppercase">
            Riwayat Tiket
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-10">
            Lihat riwayat tiket dan detail pengaduan Anda.
          </p>

          {tickets.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">
                Belum ada riwayat tiket pengaduan.
              </p>
              <Link
                href="/"
                className="text-blue-600 hover:underline mt-2 inline-block text-sm"
              >
                Kembali ke Beranda
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {tickets.map((ticket, index) => {
                const isDone =
                  ticket.status.toLowerCase() === "done" ||
                  ticket.status.toLowerCase() === "selesai";
                const badgeClass = isDone
                  ? "bg-[#bbf7d0] text-[#166534]"
                  : "bg-[#fef3c7] text-[#92400e]";

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl text-gray-900 pr-4">
                        {ticket.judul}
                      </h3>
                      <span
                        className={`px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${badgeClass}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm font-semibold mb-6">
                      ID: <span className="text-blue-600">{ticket.id}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      {ticket.tanggal}
                    </p>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-gray-100 pt-5">
                      <p className="text-gray-600 text-sm font-bold flex-1 max-w-lg leading-relaxed">
                        {ticket.deskripsi}
                      </p>
                      <div className="flex flex-row gap-3 w-full md:w-auto">
                        <button
                          onClick={() => handleOpenDetail(ticket)}
                          className="flex-1 md:flex-none text-center bg-[#295ce8] border border-[#295ce8] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          Cek Detail
                        </button>

                        {/* Jika sudah dinilai, ubah tombolnya. Jika belum, tampilkan tombol Beri Penilaian */}
                        {ticket.isRated ? (
                          <button
                            disabled
                            className="flex-1 md:flex-none font-bold text-sm px-6 py-2.5 rounded-full border bg-gray-100 text-gray-400 cursor-not-allowed whitespace-nowrap"
                          >
                            Sudah Dinilai
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenSurvey(ticket.id)}
                            className="flex-1 md:flex-none font-bold text-sm px-6 py-2.5 rounded-full border transition-colors whitespace-nowrap bg-[#fcd34d] border-[#fcd34d] text-gray-900 hover:bg-[#fbbf24]"
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
      </div>

      {/* ========================================= */}
      {/* MODAL 0: DETAIL TIKET (Dinamis) */}
      {/* ========================================= */}
      {isDetailOpen && detailTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#222222]/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl min-h-[500px] shadow-2xl p-6 md:p-12 relative overflow-hidden rounded-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center relative mb-12 border-b border-gray-100 pb-6">
              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute left-0 text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
              >
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

            <div className="mb-12">
              <h2 className="text-2xl md:text-[28px] font-extrabold text-gray-900 mb-3">
                {detailTicket.judul}
              </h2>
              <p className="text-gray-400 text-base font-bold">
                ID: <span className="text-blue-600">{detailTicket.id}</span>
                <span className="mx-3 text-gray-300">•</span>
                {detailTicket.tanggal}
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${detailTicket.status === "Done" ? "bg-green-500" : "bg-[#3b5998]"}`}
              >
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
                    {detailTicket.status === "Done"
                      ? "Tiket Telah Selesai Ditangani"
                      : "Pembuatan Tiket Baru Berhasil"}
                  </h3>
                  {/* WAKTU DINAMIS DARI LOCAL STORAGE */}
                  <span className="text-gray-400 text-sm font-medium mt-1 sm:mt-0">
                    {detailTicket.waktu || "Baru saja"}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-4 py-1.5 rounded-full inline-block border ${detailTicket.status === "Done" ? "bg-[#bbf7d0] text-[#166534] border-[#86efac]" : "bg-[#fcf3d9] text-[#b88c1f] border-[#fde68a]"}`}
                >
                  {detailTicket.status}
                </span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="text-gray-900 font-bold mb-2">
                Deskripsi Keluhan:
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {detailTicket.deskripsi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 1: FORM SURVEY KEPUASAN */}
      {/* ========================================= */}
      {isSurveyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 uppercase">
                FORM SURVEY KEPUASAN
              </h2>
              <button
                onClick={() => setIsSurveyOpen(false)}
                className="text-gray-400 hover:text-red-500"
              >
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
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              <form
                onSubmit={handleSubmitSurvey}
                className="flex flex-col gap-6"
              >
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2">
                    Bagaimana pengalaman Anda saat menggunakan layanan kami?
                  </h3>
                  <RatingScale
                    questionIndex="q1"
                    value={surveyAnswers.q1}
                    onSelect={handleSelectRating}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2">
                    Apakah Anda merasa mudah dalam mengakses layanan kami?
                  </h3>
                  <RatingScale
                    questionIndex="q2"
                    value={surveyAnswers.q2}
                    onSelect={handleSelectRating}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2">
                    Apakah informasi di platform ini mudah dimengerti?
                  </h3>
                  <RatingScale
                    questionIndex="q3"
                    value={surveyAnswers.q3}
                    onSelect={handleSelectRating}
                  />
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-3 border-b border-gray-200 pb-2">
                    Kritik dan Saran
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
                    className="w-full bg-[#eeeeee] border-none rounded-sm p-4 outline-none focus:ring-2 focus:ring-[#295ce8] text-gray-800 text-sm resize-none"
                    placeholder="Tingkatkan kembali! Terimakasih atas bantuannya."
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-[#295ce8] text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Kirim Survey
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 2: NOTIFIKASI SUKSES SURVEY */}
      {/* ========================================= */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-xl p-10 md:p-14 flex flex-col items-center justify-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-28 h-28 bg-[#62d26f] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/20">
              <svg
                className="w-16 h-16 text-white"
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 uppercase text-center">
              TERIMAKASIH!
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 uppercase text-center">
              ANDA TELAH MENGISI SURVEY.
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
