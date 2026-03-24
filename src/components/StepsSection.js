import Image from "next/image";

export default function StepsSection() {
  const steps = [
    {
      id: 1,
      title: "Buka Tiket Pengaduan",
      desc: "Buka Tiket Pengaduan pada MISSU dan isi informasi dengan jelas.",
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
      desc: "Anda dapat mereview issue yang telah diselesaikan oleh petugas dan jangan lupa mengisi survei.",
      image: "/ilustrasi-3.png",
    },
  ];

  return (
    <section className="w-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 my-8 border-y-5 border-gray-200/60">
      <h2 className="text-center text-2xl md:text-3xl lg:text-[32px] font-semibold text-gray-800 mb-12 md:mb-16">
        Laporkan masalah Anda dalam 3 langkah:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-56 h-48 md:w-64 md:h-56 relative mb-8 transition-transform duration-300 group-hover:-translate-y-2">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-row items-center justify-center gap-3 mb-4 w-full px-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-[#eefaf4] text-[#34c759] font-bold flex items-center justify-center text-base">
                {step.id}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg md:text-xl">
                {step.title}
              </h3>
            </div>

            <p className="text-sm md:text-base text-gray-500 max-w-[280px] leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
