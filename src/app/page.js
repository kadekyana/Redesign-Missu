"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StepsSection from "@/components/StepsSection";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import TicketModal from "@/components/TicketModal";
import WhistleBlowerModal from "@/components/WhistleBlowerModal";

export default function Home() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isWBModalOpen, setIsWBModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cek query parameter jika dinavigasi dari halaman lain via chatbot atau navbar
    const params = new URLSearchParams(window.location.search);
    if (params.get("createTicket") === "true") {
      setTimeout(() => {
        setIsTicketModalOpen(true);
      }, 0);
      window.history.replaceState({}, "", "/");
    }

    // Event listener untuk membuka modal tiket langsung dari chatbot atau navbar
    const handleOpenTicket = () => setIsTicketModalOpen(true);
    window.addEventListener("missu:open-ticket", handleOpenTicket);
    return () => window.removeEventListener("missu:open-ticket", handleOpenTicket);
  }, []);

  const handleHeroSearch = (query) => {
    router.push(`/faq?search=${encodeURIComponent(query)}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#523be2] opacity-[0.05] dark:opacity-[0.12] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1c40f2] opacity-[0.05] dark:opacity-[0.12] rounded-full blur-[150px]"></div>
      </div>

      {/* Unified Navbar with ThemeToggle and Buat Tiket */}
      <Navbar onOpenTicketModal={() => setIsTicketModalOpen(true)} />

      {/* Hero Banner with Search */}
      <HeroSection
        onOpenModal={() => setIsTicketModalOpen(true)}
        onSearchSubmit={handleHeroSearch}
      />

      {/* 3 Langkah Pelaporan */}
      <StepsSection />

      {/* Menu Cards */}
      <div className="flex-grow">
        <MenuSection onOpenWhistleBlower={() => setIsWBModalOpen(true)} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      <WhistleBlowerModal
        isOpen={isWBModalOpen}
        onClose={() => setIsWBModalOpen(false)}
      />
    </main>
  );
}
