import Image from "next/image";
import Link from "next/link";

// Tambahkan prop onOpenWhistleBlower
export default function MenuSection({ onOpenWhistleBlower }) {
  const menus = [
    {
      id: 1,
      title: "Cek Status Tiket",
      desc: "Pantau status dan perkembangan tiket Anda.",
      iconMain: "/status.svg",
      iconBg: "/statusbg.svg",
      href: "/status",
    },
    {
      id: 2,
      title: "Riwayat Tiket",
      desc: "Lihat riwayat tiket dan detail pengaduan Anda.",
      iconMain: "/history.svg",
      iconBg: "/historybg.svg",
      href: "/history",
    },
    {
      id: 3,
      title: "Pusat Bantuan / FAQ",
      desc: "Lihat riwayat tiket dan detail pengaduan Anda.",
      iconMain: "/faq.svg",
      iconBg: "/faqbg.svg",
      href: "/faq",
    },
    {
      id: 4,
      title: "Whistle Blower",
      desc: "Laporkan pelanggaran secara aman dan rahasia.",
      iconMain: "/wb.svg", // Pastikan nama file SVG-nya sesuai dengan yang kamu simpan
      iconBg: "/wbbg.svg",
      onClick: onOpenWhistleBlower, // Menggunakan onClick, bukan href
    },
  ];

  return (
    <section className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-10 pt-16 pb-20 ">
      <div className="flex flex-col gap-6 md:gap-8">
        {menus.map((menu) => {
          // Isi dari card disatukan agar tidak mengulang kode
          const cardContent = (
            <>
              {/* Ikon Utama (Kiri) */}
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 mr-5 md:mr-8 relative z-20 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={menu.iconMain}
                  alt={menu.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Teks Area */}
              <div className="flex-1 relative z-20">
                <h3 className="text-lg md:text-2xl font-extrabold text-gray-800 mb-1">
                  {menu.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 max-w-[80%]">
                  {menu.desc}
                </p>
              </div>

              {/* Ikon Transparan Watermark (Kanan) */}
              <div className="absolute right-[-20px] md:right-[-10px] top-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                <Image
                  src={menu.iconBg}
                  alt=""
                  fill
                  className="object-contain object-right"
                />
              </div>
            </>
          );

          // Class seragam untuk semua card
          const commonClasses =
            "group relative bg-white rounded-[24px] p-6 md:p-8 flex items-center shadow-sm border border-gray-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden z-10 w-full text-left";

          // Jika menu punya href, jadikan <Link>
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

          // Jika menu punya onClick, jadikan <button>
          return (
            <button
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
