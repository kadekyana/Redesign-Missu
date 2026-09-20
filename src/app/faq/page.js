"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqData = [
  {
    id: 1,
    category: "General",
    q: "Saya ada Kesalahan Nama/Tempat/Tanggal Lahir dan Nama Ibu Kandung, bagaimana caranya merubah?",
    a: "Silakan menghubungi bagian layanan akademik Rektorat Undiksha dengan membawa dokumen pendukung fisik dan salinan (KTP, Kartu Keluarga, dan Akta Kelahiran).",
  },
  {
    id: 2,
    category: "General",
    q: "Berapa Biaya Kuliah (UKT) di Undiksha?",
    a: "Biaya kuliah (UKT) bervariasi tergantung pada program studi dan jalur masuk Anda. Informasi lengkap dapat diakses melalui website resmi penerimaan mahasiswa baru Undiksha.",
  },
  {
    id: 3,
    category: "General",
    q: "Bagaimana cara mengirim/menerima email institusi melalui Smartphone Android saya?",
    a: "Anda dapat login menggunakan aplikasi Gmail di HP Anda dengan memilih 'Tambah Akun Google', lalu memasukkan alamat email @undiksha.ac.id beserta kata sandi SSO Anda.",
  },
  {
    id: 4,
    category: "General",
    q: "Selain untuk akses jurnal online, apa saja manfaat email Undiksha?",
    a: "Email Undiksha dapat digunakan untuk mengakses Google Workspace (Drive Edukasi), lisensi Microsoft Office 365 gratis, dan verifikasi akun berbagai software edukasi seperti GitHub Student Pack, Notion, dan Canva Pro.",
  },
  {
    id: 5,
    category: "Sistem Informasi",
    q: "Bagaimana cara mereset sandi SSO saya?",
    a: "Gunakan fitur 'Lupa Password' pada halaman login SSO resmi Undiksha atau ajukan tiket pengaduan dengan kategori 'Sistem Informasi' pada sistem MISSU ini.",
  },
  {
    id: 6,
    category: "Jaringan",
    q: "Bagaimana cara login ke WiFi Undiksha-Student / Undiksha-Staff?",
    a: "Sambungkan perangkat ke jaringan SSID terkait, buka browser jika portal login belum muncul, lalu masukkan username NIM/NIP Anda dan kata sandi akun SSO.",
  },
  {
    id: 7,
    category: "Akademik",
    q: "Bagaimana cara melakukan Verval Ijazah?",
    a: "Verval ijazah dilakukan mandiri melalui portal sistem akademik Undiksha dengan mengunggah hasil scan ijazah asli dan transkrip nilai Anda.",
  },
  {
    id: 8,
    category: "Akademik",
    q: "Di mana saya bisa mengunduh sertifikat akreditasi Lembaga dan Fakultas?",
    a: "Sertifikat akreditasi institusi maupun program studi dapat diunduh langsung melalui website resmi Lembaga Penjaminan Mutu dan Pengembangan Pembelajaran (LPMPP) Undiksha.",
  },
  {
    id: 9,
    category: "Infrastruktur",
    q: "Apakah Undiksha memiliki kampus di Denpasar?",
    a: "Ya, Undiksha memiliki kampus UPP Denpasar yang berlokasi strategis di Jl. Raya Sesetan No. 196, Denpasar Selatan.",
  },
  {
    id: 10,
    category: "Infrastruktur",
    q: "Apakah Undiksha menyediakan fasilitas Asrama Mahasiswa?",
    a: "Ya, Undiksha menyediakan fasilitas Asrama Mahasiswa (Rusunawa) yang berlokasi di kampus Jinengdalem, Singaraja.",
  },
];

export default function FAQPage() {
  const tabs = [
    "General",
    "Sistem Informasi",
    "Jaringan",
    "Akademik",
    "Infrastruktur",
  ];

  const [activeTab, setActiveTab] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("search");
    if (query) {
      setTimeout(() => {
        setSearchQuery(query);
        setActiveTab("All");
        setExpandedId(null);
      }, 0);
    }
  }, []);

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val !== "") {
      setActiveTab("All");
    } else {
      setActiveTab("General");
    }
  };

  const filteredFaqs = faqData.filter((faq) => {
    if (searchQuery) {
      return (
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return faq.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <Navbar />

      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-14 flex-grow">
        <div className="mb-8">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-1 block">
            Pusat Bantuan
          </span>
          <h1 className="text-2xl md:text-[32px] font-black text-slate-900 dark:text-white uppercase tracking-tight">
            PUSAT BANTUAN / FAQ
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-1">
            Punya pertanyaan seputar layanan kampus? Temukan jawabannya di sini.
          </p>
        </div>

        {/* Input Pencarian FAQ Internal */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Ketik topik atau pertanyaan..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Kategori / Tabs */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2.5 mb-10 border-b border-slate-200/80 dark:border-slate-800 pb-5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchQuery("");
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#eef2f6] dark:bg-blue-600/20 border-slate-400 dark:border-blue-500 text-slate-900 dark:text-blue-300 shadow-xs"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:dark:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}

        {/* Daftar FAQ (Accordion Style) */}
        <div className="flex flex-col gap-4 min-h-[300px]">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8">
              <p className="font-medium text-base mb-1">Pertanyaan tidak ditemukan</p>
              <p className="text-xs sm:text-sm text-slate-400">Silakan buat tiket pengaduan jika Anda membutuhkan bantuan lebih lanjut.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:border-blue-300 dark:hover:border-blue-500/40 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex items-start gap-3.5 w-full text-left focus:outline-none group cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center text-sm font-bold shrink-0 rounded-md mt-0.5 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors">
                      {isExpanded ? "−" : "+"}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
                      {faq.q}
                    </h3>
                  </button>

                  {isExpanded && (
                    <div className="ml-9.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
