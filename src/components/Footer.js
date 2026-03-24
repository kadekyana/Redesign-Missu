import Image from "next/image";
export default function Footer() {
  return (
    <footer className="w-full mt-16 pt-10 overflow-hidden relative">
      <div
        className="bg-[#202b70] text-white flex flex-col items-center pt-16 pb-8 px-6 sm:px-12 relative z-10"
        style={{
          borderTopLeftRadius: "50% 15%",
          borderTopRightRadius: "50% 15%",
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-12">HUBUNGI KAMI</h2>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-5xl gap-10 md:gap-4 mb-16">
          <div className="border border-white/20 rounded-xl p-5 w-full md:w-auto min-w-[300px]">
            <span className="text-lg font-bold block mb-2">
              Layanan Via WhatsApp
            </span>
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm">Hubungi Kami di :</span>
              <span className="font-bold text-gray-300 text-sm">
                087730060048
              </span>

              <div className="ml-auto w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Image
                  src="/wa.svg"
                  alt="Logo WhatsApp"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <span className="text-lg font-bold block mb-4 text-center md:text-left">
              Tetap terhubung dengan Kami
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm text-gray-300">
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image
                  src="/f.png"
                  alt="Logo Facebook"
                  width={25}
                  height={25}
                  className="mr-1 object-contain"
                />
                Facebook
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image
                  src="/ig.svg"
                  alt="Logo Instagram"
                  width={25}
                  height={25}
                  className="mr-1 object-contain"
                />
                Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image
                  src="/tt.svg"
                  alt="Logo Tiktok"
                  width={20}
                  height={20}
                  className="mr-1 object-contain"
                />
                Tiktok
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image
                  src="/x.svg"
                  alt="Logo X"
                  width={20}
                  height={20}
                  className="mr-1 object-contain"
                />
                Twitter / X
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image
                  src="/link.svg"
                  alt="Logo LinkedIn"
                  width={30}
                  height={30}
                  className="mr-1 object-contain"
                />
                LinkedIn
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image
                  src="/yt.svg"
                  alt="Logo Youtube"
                  width={30}
                  height={30}
                  className="mr-1 object-contain"
                />
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/undiksha-logo.svg" // Path menuju file di folder public
              alt="Logo Undiksha"
              width={50} // Sesuaikan ukuran
              height={50}
              className="object-contain"
            />
            <span className="font-bold text-xl tracking-wide">MISSU</span>
          </div>
          <span className="text-sm text-gray-400">© 2026 UPA TIK Undiksha</span>
        </div>
      </div>
    </footer>
  );
}
