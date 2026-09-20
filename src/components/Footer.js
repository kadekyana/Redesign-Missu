import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-16 pt-8 overflow-hidden relative transition-colors duration-200">
      <div
        className="bg-[#202b70] dark:bg-[#070b16] text-white flex flex-col items-center pt-16 pb-10 px-6 sm:px-12 relative z-10 border-t border-transparent dark:border-slate-800/80"
        style={{
          borderTopLeftRadius: "50% 12%",
          borderTopRightRadius: "50% 12%",
        }}
      >
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-blue-200 dark:text-blue-400 font-bold block mb-1">
            Bantuan & Layanan
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-wide">
            HUBUNGI KAMI
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-5xl gap-8 md:gap-4 mb-14">
          {/* Layanan WhatsApp */}
          <a
            href="https://wa.me/6287730060048"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-white/20 dark:border-slate-700/80 bg-white/5 dark:bg-slate-900/60 hover:bg-white/10 dark:hover:bg-slate-800/80 rounded-2xl p-5 w-full md:w-auto min-w-[300px] transition-all duration-200 cursor-pointer shadow-lg"
          >
            <span className="text-base sm:text-lg font-bold block mb-2 text-white">
              Layanan Via WhatsApp
            </span>
            <div className="flex items-center gap-3">
              <span className="text-blue-100 dark:text-slate-300 text-sm">
                Hubungi Kami di :
              </span>
              <span className="font-bold text-white dark:text-emerald-400 text-sm font-mono tracking-wide">
                087730060048
              </span>

              <div className="ml-auto w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Image
                  src="/wa.svg"
                  alt="Logo WhatsApp"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            </div>
          </a>

          {/* Social Links */}
          <div className="w-full md:w-auto">
            <span className="text-base sm:text-lg font-bold block mb-4 text-center md:text-left text-white">
              Tetap Terhubung dengan Kami
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3.5 text-sm text-blue-100 dark:text-slate-300">
              <a
                href="https://www.facebook.com/upttikundiksha/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white dark:hover:text-blue-400 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src="/f.png"
                    alt="Facebook"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/upttik_undiksha/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white dark:hover:text-pink-400 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src="/ig.svg"
                    alt="Instagram"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@upatik_undiksha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white dark:hover:text-teal-400 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src="/tt.svg"
                    alt="Tiktok"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
                Tiktok
              </a>
              <a
                href="https://x.com/upttik_undiksha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white dark:hover:text-sky-400 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src="/x.svg"
                    alt="X"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
                Twitter / X
              </a>
              <a
                href="https://id.linkedin.com/in/upttikundiksha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white dark:hover:text-blue-400 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src="/link.svg"
                    alt="LinkedIn"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/UPTTIKUndiksha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white dark:hover:text-red-400 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image
                    src="/yt.svg"
                    alt="YouTube"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl border-t border-white/15 dark:border-slate-800/90 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/undiksha-logo.svg"
              alt="Logo Undiksha"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <span className="font-extrabold text-xl tracking-wider block leading-tight">
                MISSU
              </span>
              <span className="text-[11px] text-blue-200 dark:text-slate-400">
                Universitas Pendidikan Ganesha
              </span>
            </div>
          </div>
          <span className="text-xs sm:text-sm text-blue-200/80 dark:text-slate-400 text-center sm:text-right">
            © 2026 UPA TIK Undiksha • All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
