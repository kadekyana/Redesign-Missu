"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Knowledge base untuk respon chatbot statik MISSU Undiksha
const KNOWLEDGE_BASE = [
  {
    id: "tiket-buat",
    keywords: [
      "buat tiket",
      "buka tiket",
      "formulir tiket",
      "cara lapor",
      "pengaduan baru",
      "ajukan tiket",
      "kirim pengaduan",
      "buat aduan",
      "bikin tiket",
    ],
    answer:
      "Untuk membuat tiket pengaduan baru:\n\n1. Klik tombol **Buat Tiket Pengaduan** di halaman utama atau tombol di bawah ini.\n2. Lengkapi formulir (WhatsApp, Unit Tujuan, Kategori, Judul, dan Deskripsi Masalah).\n3. Klik tombol **Kirim Pengaduan**.\n4. Anda akan langsung menerima **ID Tiket** unik untuk memantau status pengaduan Anda.",
    actions: [
      { label: "Buka Form Tiket", type: "open_ticket" },
      { label: "Lihat Panduan FAQ", type: "link", url: "/faq" },
    ],
  },
  {
    id: "tiket-waktu",
    keywords: [
      "berapa lama",
      "lama proses",
      "kapan selesai",
      "estimasi waktu",
      "durasi pengerjaan",
      "waktu penanganan",
      "kapan diproses",
    ],
    answer:
      "Umumnya tiket pengaduan akan direspon dan diproses dalam waktu **1x24 jam hari kerja** oleh unit teknis terkait (Senin - Jumat, 08.00 - 16.00 WITA).\n\nUntuk kendala darurat, Anda juga dapat mengonfirmasi langsung ke kontak WhatsApp Helpdesk resmi.",
    actions: [
      { label: "Cek Status Tiket", type: "link", url: "/status" },
      {
        label: "Hubungi WhatsApp",
        type: "link",
        url: "https://wa.me/6287730060048",
        external: true,
      },
    ],
  },
  {
    id: "tiket-status",
    keywords: [
      "cek status",
      "status tiket",
      "lacak tiket",
      "tracking tiket",
      "cek tiket",
      "posisi tiket",
      "progres tiket",
      "lihat status",
    ],
    answer:
      "Anda dapat melacak status tiket pengaduan dengan dua cara:\n\n1. Buka menu **Cek Status Tiket** dan masukkan ID Tiket Anda (contoh: `TKT-1234`).\n2. Anda juga dapat langsung mengetikkan ID Tiket Anda di chat ini (misal: ketik `TKT-1234`), dan saya akan mengeceknya dari riwayat tiket perangkat ini!",
    actions: [
      { label: "Buka Halaman Status", type: "link", url: "/status" },
      { label: "Lihat Riwayat Tiket", type: "link", url: "/history" },
    ],
  },
  {
    id: "tiket-edit",
    keywords: [
      "edit tiket",
      "ubah tiket",
      "salah tulis",
      "salah ketik",
      "ganti data",
      "batal tiket",
      "hapus tiket",
      "koreksi tiket",
    ],
    answer:
      "Tiket yang sudah terkirim saat ini **tidak dapat diedit langsung** melalui sistem demi integritas data pengaduan.\n\nJika terdapat kesalahan informasi penting:\n• Silakan konfirmasi koreksi ke admin melalui **WhatsApp Helpdesk** dengan menyebutkan ID Tiket Anda, atau\n• Buat tiket pengaduan baru dengan mencantumkan catatan perbaikan.",
    actions: [
      {
        label: "Konfirmasi via WhatsApp",
        type: "link",
        url: "https://wa.me/6287730060048",
        external: true,
      },
      { label: "Buka Form Tiket Baru", type: "open_ticket" },
    ],
  },
  {
    id: "sso-password",
    keywords: [
      "sso",
      "lupa password",
      "reset password",
      "kata sandi",
      "lupa sandi",
      "ganti password",
      "tidak bisa login sso",
      "akun sso",
    ],
    answer:
      "Untuk mengatasi kendala akun SSO (Single Sign-On):\n\n1. Gunakan menu **'Lupa Password'** pada portal login SSO resmi Undiksha.\n2. Masukkan email atau NIM/NIP Anda untuk menerima tautan pemulihan.\n3. Jika akun terkunci atau email pemulihan tidak aktif, silakan buat tiket pengaduan di MISSU dengan kategori **Sistem Informasi** atau hubungi UPA TIK.",
    actions: [
      { label: "Buat Tiket SSO", type: "open_ticket" },
      { label: "Lihat FAQ Sistem Informasi", type: "link", url: "/faq" },
    ],
  },
  {
    id: "wifi-kampus",
    keywords: [
      "wifi",
      "internet",
      "undiksha-student",
      "undiksha-staff",
      "koneksi wifi",
      "hotspot",
      "jaringan kampus",
      "login wifi",
    ],
    answer:
      "Cara menghubungkan perangkat ke WiFi Kampus Undiksha:\n\n1. Sambungkan perangkat ke jaringan **Undiksha-Student** (untuk mahasiswa) atau **Undiksha-Staff** (untuk dosen/pegawai).\n2. Buka browser jika portal login captive tidak otomatis muncul.\n3. Masukkan **Username (NIM / NIP)** dan **Password SSO** Anda.\n4. Jika gagal terhubung, pastikan akun SSO Anda aktif dan tidak ada tunggakan masa studi.",
    actions: [
      { label: "Lihat Solusi FAQ Jaringan", type: "link", url: "/faq" },
      { label: "Lapor Gangguan WiFi", type: "open_ticket" },
    ],
  },
  {
    id: "email-undiksha",
    keywords: [
      "email",
      "undiksha.ac.id",
      "gmail",
      "google workspace",
      "office 365",
      "drive unlimited",
      "email mahasiswa",
    ],
    answer:
      "Email institusi Undiksha (`@undiksha.ac.id` / `@student.undiksha.ac.id`) memberikan banyak manfaat:\n\n• **Akses Google Workspace & Drive Edukasi**\n• **Lisensi Microsoft Office 365**\n• **Akses Jurnal Ilmiah Online & Pendaftaran Software Edukasi**\n\nUntuk login di smartphone: buka aplikasi Gmail, pilih Tambah Akun Google, lalu masukkan alamat email Undiksha dan kata sandi SSO Anda.",
    actions: [
      { label: "FAQ Email Kampus", type: "link", url: "/faq" },
    ],
  },
  {
    id: "verval-ijazah",
    keywords: [
      "ijazah",
      "verval",
      "verval ijazah",
      "legalisir",
      "validasi ijazah",
      "pddikti",
      "ijazah asli",
    ],
    answer:
      "Verval (Verifikasi & Validasi) Ijazah dilakukan secara mandiri melalui sistem akademik Undiksha dengan mengunggah hasil pindai (*scan*) dokumen ijazah asli dan transkrip nilai.\n\nPastikan nomor seri ijazah dan NIK sesuai dengan data Dukcapil dan PDDIKTI.",
    actions: [
      { label: "FAQ Akademik", type: "link", url: "/faq" },
      { label: "Ajukan Bantuan Akademik", type: "open_ticket" },
    ],
  },
  {
    id: "biodata-akademik",
    keywords: [
      "salah nama",
      "tempat lahir",
      "tanggal lahir",
      "nama ibu",
      "ubah data",
      "koreksi biodata",
      "ktp",
      "kk",
      "edit data diri",
      "data diri",
      "ubah data diri",
      "ganti nama",
      "biodata",
      "profil",
      "identitas",
    ],
    answer:
      "Untuk perbaikan atau koreksi **Data Diri Mahasiswa (Nama, Tempat/Tanggal Lahir, Nama Ibu Kandung)** pada pangkalan data PDDikti Kemdikbudristek:\n\n1. Siapkan dokumen scan PDF (maks. 200 KB per file): Surat Permohonan, Ijazah Asli, Transkrip/KHS, Akta Lahir, KK, dan KTP (sinkron Dukcapil).\n2. Isi permohonan online melalui formulir resmi Undiksha di bawah ini atau hubungi Layanan Akademik di Gedung Rektorat Undiksha.",
    actions: [
      {
        label: "Buka Form Edit Data Diri",
        type: "link",
        url: "https://go.undiksha.ac.id/Perubahan-Data-PDDikti",
        external: true,
      },
      { label: "Panduan Lengkap di FAQ", type: "link", url: "/faq?search=data+diri" },
    ],
  },
  {
    id: "akreditasi",
    keywords: [
      "akreditasi",
      "sertifikat akreditasi",
      "ban-pt",
      "akreditasi prodi",
      "akreditasi institusi",
      "lpmpp",
    ],
    answer:
      "Sertifikat akreditasi perguruan tinggi (Institusi) maupun program studi di lingkungan Undiksha dapat diunduh langsung secara resmi melalui website **Lembaga Penjaminan Mutu dan Pengembangan Pembelajaran (LPMPP) Undiksha**.",
    actions: [
      { label: "Lihat Menu FAQ", type: "link", url: "/faq" },
    ],
  },
  {
    id: "fasilitas-kampus",
    keywords: [
      "denpasar",
      "kampus denpasar",
      "upp denpasar",
      "sesetan",
      "asrama",
      "rusunawa",
      "jinengdalem",
      "lokasi kampus",
    ],
    answer:
      "Informasi Fasilitas & Kampus Undiksha:\n\n• **Kampus UPP Denpasar**: Berlokasi di Jl. Raya Sesetan No. 196, Denpasar Selatan.\n• **Asrama Mahasiswa (Rusunawa)**: Fasilitas hunian mahasiswa tersedia di Kampus Jinengdalem, Singaraja.\n• **Kampus Pusat**: Terletak di Jl. Udayana No. 11, Singaraja.",
    actions: [
      { label: "Lihat FAQ Infrastruktur", type: "link", url: "/faq" },
    ],
  },
  {
    id: "whistle-blower",
    keywords: [
      "whistle",
      "blower",
      "pelanggaran",
      "lapor curang",
      "aduan rahasia",
      "kecurangan",
      "pungli",
      "korupsi",
      "gratifikasi",
    ],
    answer:
      "Fitur **Whistle Blower System (WBS)** Undiksha disediakan untuk melaporkan dugaan pelanggaran hukum, etika, kecurangan, atau penyalahgunaan wewenang secara **rahasia dan terenkripsi** demi perlindungan identitas pelapor.",
    actions: [
      { label: "Kembali ke Menu Utama", type: "link", url: "/" },
    ],
  },
  {
    id: "kontak-helpdesk",
    keywords: [
      "kontak",
      "hubungi",
      "whatsapp",
      "nomor wa",
      "telepon",
      "call center",
      "jam kerja",
      "jam buka",
      "operasional",
      "layanan",
    ],
    answer:
      "Layanan Resmi UPA TIK Undiksha (MISSU):\n\n• **WhatsApp Helpdesk**: 0877-3006-0048\n• **Jam Operasional**: Senin – Jumat, 08.00 – 16.00 WITA\n• **Lokasi**: Gedung UPA TIK Undiksha, Kampus Tengah Singaraja\n• **Website**: missu.undiksha.ac.id",
    actions: [
      {
        label: "Chat WhatsApp (087730060048)",
        type: "link",
        url: "https://wa.me/6287730060048",
        external: true,
      },
      { label: "Buka Riwayat Tiket", type: "link", url: "/history" },
    ],
  },
];

// Quick suggestions awal
const DEFAULT_SUGGESTIONS = [
  "🎫 Cara Buat Tiket",
  "🔍 Cek Status Tiket",
  "🔑 Lupa Password SSO",
  "📶 Login WiFi Undiksha",
  "⏱️ Berapa lama tiket diproses?",
  "📞 Kontak Helpdesk WhatsApp",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messageIdRef = useRef(100);
  const router = useRouter();

  // Initial welcome message
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "bot",
      time: "Baru saja",
      text: "Halo! 👋 Selamat datang di **MISSU (Manajemen Issue Undiksha)**.\n\nSaya adalah **Asisten Virtual MISSU**. Ada yang bisa saya bantu terkait layanan akademik, akun SSO, WiFi kampus, atau pengaduan tiket hari ini?",
      actions: [
        { label: "Buat Tiket Pengaduan", type: "open_ticket" },
        { label: "Cek Status Tiket", type: "link", url: "/status" },
      ],
    },
  ]);

  // Auto scroll saat pesan bertambah atau saat mengetik
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNewMessage(false);
  };

  // Focus input saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key untuk menutup atau memperkecil modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        if (isEnlarged) {
          setIsEnlarged(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isEnlarged]);

  const getCurrentTime = () => {
    const now = new Date();
    return (
      now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }) + " WITA"
    );
  };

  // Mencari tiket lokal di LocalStorage jika input berupa ID tiket
  const searchLocalTicket = (query) => {
    try {
      const tickets = JSON.parse(localStorage.getItem("missu_tickets")) || [];
      const clean = query.trim().toUpperCase();
      const match = tickets.find(
        (t) =>
          t.id?.toUpperCase() === clean ||
          t.id?.toUpperCase().includes(clean) ||
          clean.includes(t.id?.toUpperCase())
      );
      return match || null;
    } catch {
      return null;
    }
  };

  // Algoritma pencocokan jawaban statik
  const findAnswer = (query) => {
    const lower = query.toLowerCase().trim();

    // 1. Cek apakah pengguna mengetik format ID Tiket (misal: TKT-1234 atau angka ID)
    const ticketIdMatch = lower.match(/(?:tkt-)?\d{3,6}/i);
    if (ticketIdMatch) {
      const matchedId = ticketIdMatch[0].toUpperCase().startsWith("TKT-")
        ? ticketIdMatch[0].toUpperCase()
        : `TKT-${ticketIdMatch[0]}`;
      const ticket = searchLocalTicket(matchedId);

      if (ticket) {
        return {
          text: `🎯 **Tiket Ditemukan di Perangkat Anda!**\n\n• **ID Tiket**: \`${ticket.id}\`\n• **Judul**: ${ticket.judul || "-"}\n• **Kategori**: ${ticket.kategori || "-"}\n• **Status**: **${ticket.status || "Open"}**\n• **Tanggal**: ${ticket.tanggal || "-"} (${ticket.waktu || ""})\n• **Unit Tujuan**: ${ticket.unit || "-"}`,
          actions: [
            {
              label: "Lihat Detail di Halaman Status",
              type: "link",
              url: `/status?id=${ticket.id}`,
            },
            {
              label: "Buka Semua Riwayat",
              type: "link",
              url: "/history",
            },
          ],
        };
      }
    }

    // 2. Cek sapaan sederhana
    if (
      /^(halo|hai|hi|hello|pagi|siang|sore|malam|selamat pagi|selamat siang|selamat sore|selamat malam)\b/.test(
        lower
      )
    ) {
      return {
        text: "Halo! Senang bisa menyapa Anda. 😊\n\nSaya Asisten Virtual MISSU. Silakan pilih topik bantuan di bawah ini atau ketikkan kendala yang sedang Anda hadapi.",
        actions: [
          { label: "Buat Tiket Baru", type: "open_ticket" },
          { label: "Cek Status Tiket", type: "link", url: "/status" },
          { label: "Buka Pusat Bantuan (FAQ)", type: "link", url: "/faq" },
        ],
      };
    }

    if (
      lower.includes("terima kasih") ||
      lower.includes("makasih") ||
      lower.includes("thanks") ||
      lower.includes("matur suksma")
    ) {
      return {
        text: "Sama-sama! Senang sekali bisa membantu Anda. 🙏\n\nJika ada hal lain seputar layanan Undiksha yang ingin ditanyakan, jangan ragu untuk bertanya kembali.",
        actions: [],
      };
    }

    // 3. Pencocokan dengan Knowledge Base berbasis skor kata kunci
    let bestMatch = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw)) {
          score += kw.length * 2; // Frase yang lebih panjang bernilai lebih tinggi
        } else {
          // Cek per kata individual
          const words = kw.split(" ");
          const matchedWords = words.filter(
            (w) => w.length > 3 && lower.includes(w)
          );
          score += matchedWords.length;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // Jika ditemukan kecocokan yang memadai
    if (bestMatch && highestScore >= 3) {
      return {
        text: bestMatch.answer,
        actions: bestMatch.actions || [],
      };
    }

    // 4. Jawaban cadangan (Fallback) jika pertanyaan belum dikenali
    return {
      text: "Maaf, saya belum menemukan jawaban yang tepat untuk pertanyaan tersebut. 🤔\n\nNamun Anda dapat:\n1. Memeriksa daftar pertanyaan umum di menu **FAQ**\n2. Melacak tiket di halaman **Cek Status**\n3. Membuat **Tiket Pengaduan** langsung ke unit terkait\n4. Menghubungi admin Helpdesk via WhatsApp",
      actions: [
        { label: "Buka Form Tiket", type: "open_ticket" },
        { label: "Lihat Menu FAQ", type: "link", url: "/faq" },
        {
          label: "Tanya via WhatsApp",
          type: "link",
          url: "https://wa.me/6287730060048",
          external: true,
        },
      ],
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = typeof textToSend === "string" ? textToSend : inputText;
    if (!text || text.trim() === "") return;

    const nextUserMsgId = `user-${messageIdRef.current++}`;
    const userMsg = {
      id: nextUserMsgId,
      sender: "user",
      time: getCurrentTime(),
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulasi delay mengetik 450ms agar interaksi terasa natural
    setTimeout(() => {
      const response = findAnswer(text);
      const nextBotMsgId = `bot-${messageIdRef.current++}`;
      const botMsg = {
        id: nextBotMsgId,
        sender: "bot",
        time: getCurrentTime(),
        text: response.text,
        actions: response.actions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action) => {
    if (action.type === "open_ticket") {
      // Buka modal tiket
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/") {
          window.dispatchEvent(new CustomEvent("missu:open-ticket"));
        } else {
          router.push("/?createTicket=true");
        }
      }
      // Jika di mobile, tutup chat modal agar form tiket terlihat nyaman
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (action.type === "link") {
      if (action.external) {
        window.open(action.url, "_blank", "noopener,noreferrer");
      } else {
        router.push(action.url);
      }
    }
  };

  const handleResetChat = () => {
    const resetId = `welcome-${messageIdRef.current++}`;
    setMessages([
      {
        id: resetId,
        sender: "bot",
        time: getCurrentTime(),
        text: "Percakapan telah direset. 👋\n\nAda hal lain yang dapat saya bantu seputar sistem dan layanan MISSU Undiksha?",
        actions: [
          { label: "Buat Tiket Pengaduan", type: "open_ticket" },
          { label: "Cek Status Tiket", type: "link", url: "/status" },
        ],
      },
    ]);
  };

  // Helper untuk format teks markdown tebal sederhana dan baris baru
  const renderFormattedText = (rawText) => {
    return rawText.split("\n").map((line, lineIdx) => {
      // Ganti **text** dengan strong
      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
      return (
        <span key={lineIdx} className="block min-h-[1.1rem]">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={pIdx}
                  className="bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* 1. FLOATING BUTTON DI POJOK KANAN BAWAH */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Tooltip Popup / Banner Cepat */}
          <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={`hidden sm:flex items-center bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs md:text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 transform ${
              showTooltip || hasNewMessage
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Butuh bantuan? Tanya Asisten MISSU</span>
          </div>

          {/* Tombol Utama Chatbot */}
          <button
            onClick={handleOpenChat}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Buka Chatbot Asisten MISSU"
            className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#0d1a63] via-[#1c40f2] to-[#523be2] text-white shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {/* Status Online Badge */}
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>

            {/* Icon Chat / Bot */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
      )}

      {/* 2. MODAL CHAT (Mendukung Tampilan Standar Pojok Kanan Bawah dan Tampilan Diperbesar / Maximize) */}
      {isOpen && (
        <div
          className={
            isEnlarged
              ? "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
              : "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[600px] max-h-[calc(100vh-80px)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          }
        >
          <div
            className={`bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden border border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${
              isEnlarged
                ? "w-full max-w-5xl h-[90vh] max-h-[850px] rounded-2xl sm:rounded-3xl"
                : "w-full h-full rounded-2xl sm:rounded-3xl"
            }`}
          >
            {/* Header Chat */}
            <div className="bg-gradient-to-r from-[#0d1a63] via-[#120F5B] to-[#201C99] dark:from-[#080d22] dark:via-[#0f143a] dark:to-[#1a205a] text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0 border-b border-transparent dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 p-1.5 shrink-0">
                  <Image
                    src="/undiksha-logo.svg"
                    alt="MISSU Bot"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0d1a63] rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base leading-tight">
                      Asisten MISSU
                    </h3>
                    <span className="bg-blue-500/30 text-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-400/20">
                      Virtual
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 font-light flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Online • Respon Cepat
                  </p>
                </div>
              </div>

              {/* Action Buttons: Reset, Perbesar/Perkecil, dan Tutup */}
              <div className="flex items-center gap-1">
                {/* Reset Chat */}
                <button
                  onClick={handleResetChat}
                  title="Mulai ulang percakapan"
                  className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
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
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>

                {/* Tombol Perbesar / Perkecil (Maximize/Restore) */}
                <button
                  onClick={() => setIsEnlarged(!isEnlarged)}
                  title={
                    isEnlarged
                      ? "Perkecil tampilan (Restore)"
                      : "Perbesar tampilan (Maximize)"
                  }
                  className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  {isEnlarged ? (
                    // Ikon Minimize / Perkecil
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
                        d="M9 9L4 4m0 0v4m0-4h4m6 6l5 5m0 0v-4m0 4h-4"
                      />
                    </svg>
                  ) : (
                    // Ikon Maximize / Perbesar
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
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  )}
                </button>

                {/* Tombol Tutup */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsEnlarged(false);
                  }}
                  title="Tutup percakapan"
                  className="p-2 text-blue-200 hover:text-red-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
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
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Konten Percakapan (Grid 2 Kolom Saat Diperbesar di Layar Luas) */}
            <div className="flex-1 flex overflow-hidden">
              {/* Kolom Kiri: Sidebar Bantuan Cepat (Hanya aktif saat diperbesar) */}
              {isEnlarged && (
                <div className="w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 hidden md:flex flex-col justify-between shrink-0 overflow-y-auto">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Topik Bantuan Populer
                    </h4>
                    <div className="flex flex-col gap-2">
                      {[
                        {
                          icon: "🎫",
                          title: "Buat Tiket Pengaduan",
                          query: "Bagaimana cara membuat tiket pengaduan?",
                        },
                        {
                          icon: "🔍",
                          title: "Cek Status Tiket",
                          query: "Bagaimana cara cek status tiket saya?",
                        },
                        {
                          icon: "⏱️",
                          title: "Waktu Pemrosesan",
                          query: "Berapa lama tiket diproses?",
                        },
                        {
                          icon: "🔑",
                          title: "Lupa Password SSO",
                          query: "Bagaimana cara reset kata sandi SSO?",
                        },
                        {
                          icon: "📶",
                          title: "Akses WiFi Kampus",
                          query: "Cara login ke WiFi Undiksha?",
                        },
                        {
                          icon: "🎓",
                          title: "Verval Ijazah",
                          query: "Bagaimana cara melakukan verval ijazah?",
                        },
                        {
                          icon: "📞",
                          title: "Kontak WhatsApp",
                          query: "Berapa nomor WhatsApp helpdesk Undiksha?",
                        },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(item.query)}
                          className="flex items-center gap-3 px-3.5 py-2.5 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer group"
                        >
                          <span className="text-base group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                          <span className="flex-1">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      MISSU Undiksha
                    </p>
                    Layanan resmi Manajemen Pengaduan & Informasi Sivitas
                    Akademika Universitas Pendidikan Ganesha.
                  </div>
                </div>
              )}

              {/* Area Utama Chat (Message Stream) */}
              <div className="flex-1 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/70 overflow-hidden">
                {/* Scrollable Message List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                          msg.sender === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        {msg.sender === "bot" && (
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center p-1 shrink-0 border border-blue-200 mt-0.5">
                            <Image
                              src="/undiksha-logo.svg"
                              alt="Bot"
                              width={22}
                              height={22}
                              className="object-contain"
                            />
                          </div>
                        )}

                        {/* Bubble Chat */}
                        <div>
                          <div
                            className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                              msg.sender === "user"
                                ? "bg-gradient-to-r from-[#0d1a63] to-[#201c99] dark:from-blue-700 dark:to-indigo-700 text-white rounded-tr-none"
                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none"
                            }`}
                          >
                            {msg.sender === "bot"
                              ? renderFormattedText(msg.text)
                              : msg.text}
                          </div>

                          {/* Tombol Action / Link Tambahan dari Bot */}
                          {msg.sender === "bot" &&
                            msg.actions &&
                            msg.actions.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2 pt-1">
                                {msg.actions.map((act, actIdx) => (
                                  <button
                                    key={actIdx}
                                    onClick={() => handleActionClick(act)}
                                    className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <span>{act.label}</span>
                                    <svg
                                      className="w-3.5 h-3.5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                      />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            )}

                          {/* Timestamp */}
                          <span
                            className={`block text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1 ${
                              msg.sender === "user" ? "text-right" : "text-left"
                            }`}
                          >
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Indikator Sedang Mengetik */}
                  {isTyping && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center p-1 shrink-0 border border-blue-200 dark:border-slate-700">
                        <Image
                          src="/undiksha-logo.svg"
                          alt="Bot"
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      </div>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 px-4 py-3 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
                        <span
                          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        ></span>
                        <span
                          className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        ></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Pilihan Cepat (Suggestion Chips) */}
                <div className="px-4 py-2.5 bg-white/90 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 backdrop-blur-sm flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">
                    Saran:
                  </span>
                  {DEFAULT_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug)}
                      className="shrink-0 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-500 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium"
                    >
                      {sug}
                    </button>
                  ))}
                </div>

                {/* Input Bar Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ketik pertanyaan atau ID Tiket..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-500/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-40 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:cursor-not-allowed"
                    title="Kirim pesan"
                  >
                    <span className="hidden sm:inline text-xs">Kirim</span>
                    <svg
                      className="w-4 h-4 transform rotate-90 sm:rotate-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
