"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar({ onOpenTicketModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleTicketClick = () => {
    setMobileMenuOpen(false);
    if (onOpenTicketModal) {
      onOpenTicketModal();
    } else if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("missu:open-ticket"));
    } else {
      router.push("/?createTicket=true");
    }
  };

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Cek Status", href: "/status" },
    { label: "Riwayat Tiket", href: "/history" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-[#0d1a63] dark:bg-[#070b16] border-b border-blue-900/40 dark:border-slate-800/80 shadow-md backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/undiksha-logo.svg"
                alt="Logo Undiksha"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl sm:text-2xl tracking-widest leading-none font-sans">
                MISSU
              </span>
              <span className="text-[10px] sm:text-xs text-blue-200 dark:text-slate-400 font-medium tracking-wider">
                UNDIKSHA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white/15 text-white shadow-inner font-bold dark:bg-slate-800 dark:text-blue-400"
                      : "text-blue-100 hover:text-white hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Buat Tiket & Theme Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick "Buat Tiket" button on desktop */}
            {/* <button
            type="button"
            onClick={handleTicketClick}
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-blue-600/30 transition-all cursor-pointer"
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Buat Tiket</span>
          </button> */}

            {/* Theme Toggle Button (Light/Night mode) */}
            <ThemeToggle showLabel={true} />

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu navigasi"
              className="md:hidden p-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
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
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a154f] dark:bg-[#090d1a] border-b border-blue-900/50 dark:border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-white/15 text-white font-bold dark:bg-slate-800 dark:text-blue-400"
                        : "text-blue-100 hover:text-white hover:bg-white/10 dark:text-slate-300 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 dark:border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleTicketClick}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2.5 rounded-xl shadow-md cursor-pointer transition-colors"
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Buat Tiket Pengaduan</span>
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Spacer placeholder agar konten halaman/card di bawahnya tidak tertutup oleh header fixed */}
      <div
        className="h-16 sm:h-20 w-full shrink-0 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
