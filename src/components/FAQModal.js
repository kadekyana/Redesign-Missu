"use client";

export default function FAQModal({ isOpen, onClose }) {
  const faqs = [
    {
      q: "Berapa lama tiket pengaduan saya akan diproses?",
      a: "Umumnya tiket akan direspon dan ditindaklanjuti dalam waktu 1x24 jam pada hari kerja (Senin - Jumat, 08.00 - 16.00 WITA) oleh unit teknis terkait.",
    },
    {
      q: "Apakah saya bisa mengedit tiket yang sudah terkirim?",
      a: "Demi integritas data laporan, tiket yang sudah dikirim tidak dapat diedit langsung. Silakan konfirmasi koreksi ke admin melalui WhatsApp Helpdesk resmi atau ajukan tiket baru dengan catatan.",
    },
    {
      q: "Apa itu ID Tiket dan bagaimana cara menggunakannya?",
      a: "ID Tiket adalah kode unik (misal: TKT-1234) yang diberikan setelah pengajuan aduan berhasil. Kode ini dapat Anda gunakan pada menu Cek Status Tiket untuk memantau progress secara real-time.",
    },
    {
      q: "Bagaimana jika ada kesalahan nama/data diri pada sistem?",
      a: "Perbaikan data diri dasar mahasiswa di PDDikti Kemdikbudristek (Nama, Tempat/Tanggal Lahir, Nama Ibu Kandung) dapat diajukan secara online dengan melampirkan berkas scan PDF (maks. 200 KB) melalui tautan resmi: go.undiksha.ac.id/Perubahan-Data-PDDikti atau ke Bagian Akademik Rektorat Undiksha.",
      linkUrl: "https://go.undiksha.ac.id/Perubahan-Data-PDDikti",
      linkLabel: "Form Edit Data Diri PDDikti",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100">
        <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              ?
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Pusat Bantuan / FAQ
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-700/80"
              >
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base flex items-start gap-2.5">
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold shrink-0">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-6">
                  {faq.a}
                </p>
                {faq.linkUrl && (
                  <div className="pl-6 mt-3">
                    <a
                      href={faq.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                    >
                      <span>{faq.linkLabel}</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
