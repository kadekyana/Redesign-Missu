"use client";

import { useState, useEffect, useMemo, useTransition, useCallback, memo } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

// Data mentah FAQ MISSU Undiksha dengan rujukan resmi
const FAQ_ITEMS = [
  {
    id: 1,
    category: "General",
    q: "Saya ada Kesalahan Nama/Tempat/Tanggal Lahir dan Nama Ibu Kandung, bagaimana cara ubah / edit data diri?",
    a: "Perubahan atau perbaikan data diri dasar mahasiswa (Nama, Tempat/Tanggal Lahir, dan Nama Ibu Kandung) pada pangkalan data PDDikti Kemdikbudristek dilakukan melalui Bagian Akademik Undiksha.\n\nPersyaratan dokumen pendukung (masing-masing dipindai/scan format PDF terpisah maksimal 200 KB per file):\n1. Surat Permohonan Perubahan Data\n2. Ijazah Asli\n3. Transkrip Akademik / KHS\n4. Akta Kelahiran\n5. Kartu Keluarga (KK)\n6. KTP (Pastikan data kependudukan telah sinkron di Disdukcapil)\n\nSetelah seluruh berkas siap, Anda dapat langsung mengajukan permohonan melalui formulir pengajuan perubahan data diri resmi Undiksha di bawah ini:",
    actionUrl: "https://go.undiksha.ac.id/Perubahan-Data-PDDikti",
    actionLabel: "Buka Formulir Edit Data Diri PDDikti",
    actionDesc: "go.undiksha.ac.id/Perubahan-Data-PDDikti (Layanan Resmi Akademik Undiksha)",
    keywords: [
      "edit data diri",
      "data diri",
      "ubah data diri",
      "koreksi data diri",
      "biodata",
      "nama",
      "salah nama",
      "tempat tanggal lahir",
      "nama ibu kandung",
      "pddikti",
      "ktp",
      "kk",
      "ijazah",
      "disdukcapil",
      "profil",
      "identitas",
    ],
  },
  {
    id: 2,
    category: "General",
    q: "Berapa Biaya Kuliah (UKT) di Undiksha?",
    a: "Biaya kuliah (UKT) bervariasi tergantung pada program studi dan kelompok UKT yang ditetapkan saat verifikasi jalur masuk Anda. Informasi lengkap tarif dan kelompok UKT dapat diakses melalui portal resmi penerimaan mahasiswa baru Undiksha.",
    actionUrl: "https://penerimaan.undiksha.ac.id",
    actionLabel: "Portal Penerimaan Mahasiswa Baru",
    actionDesc: "penerimaan.undiksha.ac.id",
    keywords: ["ukt", "biaya kuliah", "biaya", "bayar", "spp", "keuangan", "penerimaan"],
  },
  {
    id: 3,
    category: "General",
    q: "Bagaimana cara mengirim/menerima email institusi melalui Smartphone Android saya?",
    a: "Anda dapat login menggunakan aplikasi Gmail di HP Anda dengan membuka menu 'Setelan' > 'Tambah Akun' > pilih 'Google', lalu memasukkan alamat email resmi @undiksha.ac.id beserta kata sandi SSO Anda.",
    keywords: ["email", "android", "hp", "smartphone", "gmail", "mail", "institusi"],
  },
  {
    id: 4,
    category: "General",
    q: "Selain untuk akses jurnal online, apa saja manfaat email Undiksha?",
    a: "Email Undiksha dapat digunakan untuk mengakses Google Workspace for Education (Drive Penyimpanan Edukasi), lisensi Microsoft Office 365 gratis, verifikasi akun GitHub Student Developer Pack, Notion for Education, Canva Pro Pendidikan, dan diskon perangkat lunak akademik lainnya.",
    keywords: ["manfaat email", "office 365", "canva", "github", "google drive", "fasilitas"],
  },
  {
    id: 5,
    category: "Sistem Informasi",
    q: "Bagaimana cara mereset sandi SSO saya?",
    a: "Gunakan fitur 'Lupa Password' pada portal login SSO resmi Undiksha. Jika akun terkunci atau nomor/email pemulihan tidak aktif, silakan ajukan tiket pengaduan dengan memilih kategori 'Sistem Informasi' pada sistem MISSU ini agar admin UPA TIK dapat melakukan verifikasi dan reset kata sandi.",
    actionUrl: "https://sso.undiksha.ac.id",
    actionLabel: "Buka Portal SSO Undiksha",
    actionDesc: "sso.undiksha.ac.id",
    keywords: ["sso", "reset sandi", "password", "lupa password", "login", "siak", "upa tik"],
  },
  {
    id: 6,
    category: "Jaringan",
    q: "Bagaimana cara login ke WiFi Undiksha-Student / Undiksha-Staff?",
    a: "Sambungkan perangkat ke jaringan SSID 'Undiksha-Student' atau 'Undiksha-Staff'. Buka browser jika laman login (captive portal) belum terbuka otomatis, lalu masukkan NIM/NIP Anda sebagai username dan kata sandi akun SSO Undiksha Anda.",
    keywords: ["wifi", "internet", "jaringan", "hotspot", "student", "staff", "login wifi", "koneksi"],
  },
  {
    id: 7,
    category: "Akademik",
    q: "Bagaimana cara melakukan Verval Ijazah?",
    a: "Verval (Verifikasi dan Validasi) ijazah dilakukan mandiri melalui portal sistem akademik Undiksha (SIAK) dengan mengunggah hasil scan dokumen ijazah asli dan transkrip nilai. Pastikan NIK dan nomor seri ijazah telah sesuai dengan data PDDikti Kemdikbudristek.",
    keywords: ["verval", "ijazah", "transkrip", "akademik", "validasi", "siak"],
  },
  {
    id: 8,
    category: "Akademik",
    q: "Di mana saya bisa mengunduh sertifikat akreditasi Lembaga dan Fakultas?",
    a: "Sertifikat akreditasi institusi maupun program studi dapat diunduh langsung secara resmi melalui website Lembaga Penjaminan Mutu dan Pengembangan Pembelajaran (LPMPP) Undiksha.",
    actionUrl: "https://lpmpp.undiksha.ac.id",
    actionLabel: "Website LPMPP Undiksha",
    actionDesc: "lpmpp.undiksha.ac.id",
    keywords: ["akreditasi", "sertifikat akreditasi", "lpmpp", "prodi", "fakultas", "jurusan"],
  },
  {
    id: 11,
    category: "Akademik",
    q: "Bagaimana prosedur perbaikan data diri mahasiswa di pangkalan data PDDikti?",
    a: "Untuk perbaikan biodata mahasiswa (Nama, Tempat/Tanggal Lahir, Nama Ibu Kandung) pada sistem PDDikti, siapkan berkas scan PDF (maksimal 200 KB per file): Surat Permohonan, Ijazah Asli, Transkrip/KHS, Akta Lahir, KK, dan KTP. Berkas diunggah melalui formulir permohonan perubahan data diri akademik Undiksha.",
    actionUrl: "https://go.undiksha.ac.id/Perubahan-Data-PDDikti",
    actionLabel: "Buka Formulir Edit Data Diri PDDikti",
    actionDesc: "go.undiksha.ac.id/Perubahan-Data-PDDikti",
    keywords: ["edit data diri", "data diri", "biodata", "pddikti", "nama", "tanggal lahir", "ibu kandung", "ktp", "kk"],
  },
  {
    id: 9,
    category: "Infrastruktur",
    q: "Apakah Undiksha memiliki kampus di Denpasar?",
    a: "Ya, Undiksha memiliki kampus UPP Denpasar yang berlokasi strategis di Jl. Raya Sesetan No. 196, Denpasar Selatan, yang melayani perkuliahan beberapa program studi sarjana dan pascasarjana.",
    keywords: ["denpasar", "kampus denpasar", "sesetan", "lokasi", "upp", "alamat"],
  },
  {
    id: 10,
    category: "Infrastruktur",
    q: "Apakah Undiksha menyediakan fasilitas Asrama Mahasiswa?",
    a: "Ya, Undiksha menyediakan fasilitas Asrama Mahasiswa (Rusunawa) yang berlokasi di kampus Jinengdalem, Singaraja, dengan biaya terjangkau dan fasilitas penunjang lengkap.",
    keywords: ["asrama", "rusunawa", "jinengdalem", "tempat tinggal", "kost", "fasilitas"],
  },
];

// Kategori yang tersedia
const CATEGORIES = [
  "Semua",
  "General",
  "Sistem Informasi",
  "Jaringan",
  "Akademik",
  "Infrastruktur",
];

// Pre-index data satu kali di luar komponen untuk mencegah komputasi ulang saat re-render
const ENRICHED_FAQ_DATA = FAQ_ITEMS.map((item) => ({
  ...item,
  _searchIndex: `${item.q} ${item.a} ${item.category} ${(item.keywords || []).join(" ")}`.toLowerCase(),
}));

// Pre-grouping data per kategori: akses O(1) saat perpindahan tab (menghilangkan lag)
const FAQS_BY_CATEGORY = {
  Semua: ENRICHED_FAQ_DATA,
};

CATEGORIES.forEach((cat) => {
  if (cat !== "Semua") {
    FAQS_BY_CATEGORY[cat] = ENRICHED_FAQ_DATA.filter(
      (item) => item.category === cat
    );
  }
});

// Hitung jumlah item per kategori satu kali
const CATEGORY_COUNTS = CATEGORIES.reduce((acc, cat) => {
  acc[cat] = FAQS_BY_CATEGORY[cat]?.length || 0;
  return acc;
}, {});

// Komponen kartu FAQ individual (di-memoize agar hanya kartu yang diklik yang me-render ulang)
const FAQCard = memo(function FAQCard({ faq, isExpanded, onToggle }) {
  return (
    <div
      id={faq.id === 1 ? "edit-data-diri" : undefined}
      className={`border rounded-2xl p-5 shadow-2xs transition-colors duration-150 ${
        isExpanded
          ? "bg-white dark:bg-slate-800/90 border-blue-400/80 dark:border-blue-500/60 shadow-sm"
          : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/70 hover:border-blue-300 dark:hover:border-blue-500/40"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(faq.id)}
        aria-expanded={isExpanded}
        className="flex items-start gap-3.5 w-full text-left focus:outline-none group cursor-pointer"
      >
        <div
          className={`w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0 rounded-md mt-0.5 transition-colors duration-150 ${
            isExpanded
              ? "bg-blue-600 text-white"
              : "bg-slate-800 dark:bg-slate-700 text-white group-hover:bg-blue-600 dark:group-hover:bg-blue-500"
          }`}
        >
          {isExpanded ? "−" : "+"}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-2 py-0.5 rounded-md border border-blue-200/50 dark:border-blue-800/50">
              {faq.category}
            </span>
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
            {faq.q}
          </h3>
        </div>
      </button>

      {isExpanded && (
        <div className="ml-9.5 mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <div className="whitespace-pre-line mb-3">{faq.a}</div>

          {/* Rujukan Tautan / Tombol Aksi Langsung (Contoh: Edit Data Diri PDDikti) */}
          {faq.actionUrl && (
            <div className="mt-4 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {faq.actionLabel}
                  </h4>
                  {faq.actionDesc && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {faq.actionDesc}
                    </p>
                  )}
                </div>
              </div>

              <a
                href={faq.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 active:scale-95 text-white transition-all shadow-md shadow-blue-600/20 cursor-pointer shrink-0"
              >
                <span>Buka Tautan</span>
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [, startTransition] = useTransition();

  // Handle URL query parameters dan hash routing untuk auto-expand
  useEffect(() => {
    setTimeout(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get("search");
      if (query) {
        setSearchQuery(query);
        setActiveTab("Semua");
        const qLower = query.toLowerCase();
        if (
          qLower.includes("data diri") ||
          qLower.includes("diri") ||
          qLower.includes("nama") ||
          qLower.includes("biodata")
        ) {
          setExpandedId(1);
        }
      }

      const hash = window.location.hash;
      if (hash === "#data-diri" || hash === "#edit-data-diri") {
        setActiveTab("Semua");
        setExpandedId(1);
        setTimeout(() => {
          const el = document.getElementById("edit-data-diri");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }, 0);
  }, []);

  // Callback stabil untuk toggle expand item individual
  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  // Pergantian tab instan & non-blocking menggunakan useTransition (efisien & bebas lag)
  const handleTabChange = useCallback(
    (tab) => {
      startTransition(() => {
        setActiveTab(tab);
        setExpandedId(null);
        if (searchQuery) {
          setSearchQuery("");
        }
      });
    },
    [searchQuery]
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() !== "") {
      setActiveTab("Semua");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveTab("Semua");
  };

  // Komputasi hasil filter yang dioptimalkan dengan useMemo & O(1) category lookup
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      return ENRICHED_FAQ_DATA.filter((item) =>
        item._searchIndex.includes(query)
      );
    }
    return FAQS_BY_CATEGORY[activeTab] || [];
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting dengan akselerasi GPU agar tidak menyebabkan lag render */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none transform-gpu will-change-transform contain-strict">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#523be2] opacity-[0.04] dark:opacity-[0.10] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1c40f2] opacity-[0.04] dark:opacity-[0.10] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 transition-colors">
          {/* Card Top Action Bar: Tombol Kembali & Theme Toggle */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100 dark:border-slate-800">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 transition-colors duration-150 group border border-slate-200/80 dark:border-slate-700 cursor-pointer shadow-xs hover:shadow-sm"
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
              Pusat Bantuan
            </span>
            <h1 className="text-2xl md:text-[32px] font-black text-slate-900 dark:text-white uppercase tracking-tight">
              PUSAT BANTUAN / FAQ
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-1">
              Punya pertanyaan seputar layanan kampus atau perubahan data diri? Temukan jawabannya di sini.
            </p>
          </div>

          {/* Input Pencarian FAQ Internal */}
          <div className="mb-6 max-w-lg">
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
                placeholder="Ketik topik, kata kunci, atau 'edit data diri'..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900 dark:text-white placeholder-slate-400 transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Hapus pencarian"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <span>
                  Hasil pencarian untuk: &ldquo;<strong>{searchQuery}</strong>&rdquo; ({filteredFaqs.length} ditemukan)
                </span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>

          {/* Kategori / Tabs Cepat (Efisien & Responsif) */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200/80 dark:border-slate-800 pb-5">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat && !searchQuery;
              const count = CATEGORY_COUNTS[cat] || 0;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white shadow-xs font-bold"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:dark:text-white"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/70 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Daftar FAQ (Accordion Style) */}
          <div className="flex flex-col gap-3.5 min-h-[300px]">
            {filteredFaqs.length === 0 ? (
              <div className="py-12 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-bold text-base text-slate-800 dark:text-slate-200 mb-1">
                  Pertanyaan tidak ditemukan
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mb-5 max-w-sm mx-auto">
                  Topik yang Anda cari belum tersedia di FAQ. Anda dapat mereset pencarian atau membuat tiket pengaduan baru.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    Tampilkan Semua FAQ
                  </button>
                  <Link
                    href="/?createTicket=true"
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                  >
                    Buat Tiket Pengaduan
                  </Link>
                </div>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <FAQCard
                  key={faq.id}
                  faq={faq}
                  isExpanded={expandedId === faq.id}
                  onToggle={handleToggle}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
