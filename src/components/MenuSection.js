import Image from "next/image";
import Link from "next/link";

export default function MenuSection({ onOpenWhistleBlower }) {
  const menus = [
    {
      id: 1,
      title: "Cek Status Tiket",
      desc: "Pantau status dan perkembangan penanganan tiket pengaduan Anda secara real-time.",
      iconMain: "/status.svg",
      iconBg: "/statusbg.svg",
      href: "/status",
    },
    {
      id: 2,
      title: "Riwayat Tiket",
      desc: "Lihat daftar riwayat tiket pengaduan terdahulu beserta detail dan survei kepuasan.",
      iconMain: "/history.svg",
      iconBg: "/historybg.svg",
      href: "/history",
    },
    {
      id: 3,
      title: "Pusat Bantuan / FAQ",
      desc: "Temukan solusi cepat atas pertanyaan umum seputar akun SSO, WiFi, dan layanan kampus.",
      iconMain: "/faq.svg",
      iconBg: "/faqbg.svg",
      href: "/faq",
    },
    {
      id: 4,
      title: "Whistle Blower",
      desc: "Laporkan dugaan pelanggaran integritas atau etika secara aman, rahasia, dan terenkripsi.",
      iconMain: "/wb.svg",
      iconBg: "/wbbg.svg",
      onClick: onOpenWhistleBlower,
    },
  ];

  return (
    <section className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 pt-8 pb-16">
      <div className="flex flex-col gap-6 md:gap-7">
        {menus.map((menu) => {
          const cardContent = (
            <>
              {/* Ikon Utama (Kiri) */}
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 mr-5 md:mr-8 relative z-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">
                <Image
                  src={menu.iconMain}
                  alt={menu.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Teks Area */}
              <div className="flex-1 relative z-20 pr-4">
                <h3 className="text-lg md:text-2xl font-extrabold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {menu.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-[90%] leading-relaxed font-normal">
                  {menu.desc}
                </p>
              </div>

              {/* Arrow Indicator */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-all duration-300 transform group-hover:translate-x-1 shrink-0 z-20 shadow-xs">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Ikon Transparan Watermark (Kanan) */}
              <div className="absolute right-[-20px] md:right-[-10px] top-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 opacity-40 dark:opacity-10 group-hover:opacity-80 dark:group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-0">
                <Image
                  src={menu.iconBg}
                  alt=""
                  fill
                  className="object-contain object-right"
                />
              </div>
            </>
          );

          const commonClasses =
            "group relative bg-white dark:bg-slate-900/90 rounded-[24px] p-6 md:p-8 flex items-center shadow-sm dark:shadow-slate-950/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden z-10 w-full text-left";

          if (menu.href) {
            return (
              <Link
                href={menu.href}
                key={menu.id}
                className={`${commonClasses} block`}
              >
                {cardContent}
              </Link>
            );
          }

          return (
            <button
              type="button"
              key={menu.id}
              onClick={menu.onClick}
              className={commonClasses}
            >
              {cardContent}
            </button>
          );
        })}
      </div>
    </section>
  );
}
