"use client";

export default function FAQModal({ isOpen, onClose }) {
  const faqs = [
    {
      q: "Berapa lama tiket saya akan diproses?",
      a: "Umumnya tiket akan direspon dalam waktu 1x24 jam hari kerja oleh unit terkait.",
    },
    {
      q: "Apakah saya bisa mengedit tiket yang sudah dikirim?",
      a: "Saat ini tiket yang sudah dikirim tidak dapat diedit. Jika ada kesalahan, silakan buat tiket baru dan konfirmasi via WhatsApp.",
    },
    {
      q: "Apa itu ID Tiket?",
      a: "ID Tiket adalah nomor unik (misal: TKT-1234) yang digunakan untuk melacak status pengaduan Anda.",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-5xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-800 uppercase">
            Pusat Bantuan / FAQ
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500"
          >
            <svg
              className="w-6 h-6"
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
        <div className="p-6">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-800 mb-2">Q: {faq.q}</h3>
                <p className="text-gray-600 text-sm">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
