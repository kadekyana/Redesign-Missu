"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const faqData = [
  {
    id: 1,
    category: "General",
    q: "Saya ada Kesalahan Nama/Tempat/ Tanggal Lahir dan Nama Ibu Kandung bagaimana caranya merubah?",
    a: "Silakan menghubungi bagian layanan akademik rektorat dengan membawa dokumen pendukung (KTP/KK).",
  },
  {
    id: 2,
    category: "General",
    q: "Berapa Biaya Kuliah di Undiksha?",
    a: "Biaya kuliah (UKT) bervariasi tergantung pada program studi dan jalur masuk Anda. Informasi lengkap dapat diakses melalui website resmi penerimaan Undiksha.",
  },
  {
    id: 3,
    category: "General",
    q: "Bagaimana cara mengirim/menerima email melalui Smartphone Android Saya?",
    a: "Anda dapat login menggunakan aplikasi Gmail di HP Anda dengan memasukkan akun email @undiksha.ac.id beserta password SSO Anda.",
  },
  {
    id: 4,
    category: "General",
    q: "Selain untuk akses jurnal online, apa yang dapat saya gunakan dengan email undiksha ?",
    a: "Email Undiksha dapat digunakan untuk mengakses Google Workspace (Drive Unlimited), Office 365, dan pendaftaran berbagai *software* edukasi.",
  },
  {
    id: 5,
    category: "Sistem Informasi",
    q: "Bagaimana cara mereset sandi SSO saya?",
    a: "Gunakan fitur 'Lupa Password' pada halaman login SSO atau silakan buat tiket pengaduan di sistem ini.",
  },
  {
    id: 6,
    category: "Jaringan",
    q: "Cara login WiFi Undiksha-Student?",
    a: "Gunakan username NIM Anda dan password akun SSO pada portal login yang muncul saat terkoneksi ke WiFi.",
  },
  {
    id: 7,
    category: "Akademik",
    q: "Bagaimana Cara melakukan Verval Ijasah?",
    a: "Verval ijazah dilakukan melalui sistem akademik dengan mengunggah hasil *scan* ijazah asli Anda.",
  },
  {
    id: 8,
    category: "Akademik",
    q: "Dimana saya bisa dapatkan sertifikat dan akreditasi Lembaga dan Fakultas?",
    a: "Sertifikat akreditasi dapat diunduh melalui website resmi penjaminan mutu Undiksha.",
  },
  {
    id: 9,
    category: "Infrastruktur",
    q: "Apakah di Undiksha memiliki kampus di denpasar?",
    a: "Ya, Undiksha memiliki kampus UPP Denpasar yang berlokasi di wilayah Sesetan.",
  },
  {
    id: 10,
    category: "Infrastruktur",
    q: "Apakah Undiksha memiliki Asrama?",
    a: "Ya, Undiksha menyediakan fasilitas asrama mahasiswa (Rusunawa) yang berlokasi di kampus Jinengdalem.",
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
      setSearchQuery(query);
      setActiveTab("All");
      setExpandedId(null);
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
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Navbar Simple */}
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

      {/* Main Content Area */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 flex-grow">
        <h1 className="text-2xl md:text-[32px] font-extrabold text-gray-900 mb-2 uppercase tracking-wide">
          PUSAT BANTUAN / FAQ
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-10">
          Punya pertanyaan? Temukan jawabannya di sini.
        </p>

        {/* Input Pencarian FAQ Internal */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 transition-shadow"
            />
          </div>
        </div>

        {/* Kategori / Tabs (Sesuai desain Figma) */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-100 pb-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchQuery("");
                  }}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#eef2f6] border-gray-400 text-gray-900"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}

        {/* Daftar FAQ (Accordion Style) */}
        <div className="flex flex-col gap-5 min-h-[300px]">
          {filteredFaqs.length === 0 ? (
            <div className="py-10 text-gray-500">
              Pertanyaan yang Anda cari tidak ditemukan.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div key={faq.id} className="border-b border-gray-100 pb-5">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex items-start gap-4 w-full text-left focus:outline-none group"
                  >
                    {/* Ikon Plus/Minus kotak hitam */}
                    <div className="w-5 h-5 bg-gray-800 text-white flex items-center justify-center text-sm font-bold shrink-0 rounded-[2px] mt-0.5 group-hover:bg-blue-600 transition-colors">
                      {isExpanded ? "-" : "+"}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base md:text-[17px] leading-snug group-hover:text-blue-600 transition-colors">
                      {faq.q}
                    </h3>
                  </button>

                  {/* Jawaban yang muncul saat di-klik */}
                  {isExpanded && (
                    <div className="ml-9 mt-3 text-gray-600 text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer terintegrasi di bawah */}
      <Footer />
    </div>
  );
}
