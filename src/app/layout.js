import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MISSU Undiksha - Manajemen Issue Undiksha",
  description: "Platform Layanan Pengaduan & Manajemen Issue Terpadu Universitas Pendidikan Ganesha",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('missu_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>
          {children}
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
