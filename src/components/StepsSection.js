import Image from "next/image";

export default function StepsSection() {
  const steps = [
    {
      id: 1,
      title: "Buka Tiket Pengaduan",
      desc: "Buka Tiket Pengaduan pada MISSU dan isi informasi masalah dengan jelas dan lengkap.",
      image: "/ilustrasi-1.png",
    },
    {
      id: 2,
      title: "Tracking Penanganan Issue",
      desc: "Anda akan mendapatkan kode tiket untuk mengecek status dan penanganan yang dilakukan petugas.",
      image: "/ilustrasi-2.png",
    },
    {
      id: 3,
      title: "Review Penanganan Issue",
      desc: "Anda dapat mereview issue yang telah diselesaikan oleh petugas dan jangan lupa mengisi survei kepuasan.",
      image: "/ilustrasi-3.png",
    },
  ];

  return (
    <section className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 my-8 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2 block">
          Alur Pelayanan
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold text-slate-800 dark:text-white tracking-tight">
          Laporkan masalah Anda dalam 3 langkah mudah:
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center group p-6 rounded-2xl transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-900/40"
          >
            <div className="w-52 h-44 sm:w-60 sm:h-52 relative mb-8 transition-transform duration-300 group-hover:-translate-y-2 drop-shadow-sm">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-row items-center justify-center gap-3 mb-3 w-full px-2">
              <div className="w-8 h-8 shrink-0 rounded-full bg-[#eefaf4] dark:bg-emerald-950/80 text-[#16a34a] dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-700/60 font-black flex items-center justify-center text-sm shadow-xs">
                {step.id}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg md:text-xl">
                {step.title}
              </h3>
            </div>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-[280px] leading-relaxed font-normal">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
