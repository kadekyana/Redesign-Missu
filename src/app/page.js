"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    // Cek query parameter jika dinavigasi dari halaman lain via chatbot
    const params = new URLSearchParams(window.location.search);
    if (params.get("createTicket") === "true") {
      setTimeout(() => {
        setIsTicketModalOpen(true);
      }, 0);
      window.history.replaceState({}, "", "/");
    }

    // Event listener untuk membuka modal tiket langsung dari chatbot
    const handleOpenTicket = () => setIsTicketModalOpen(true);
    window.addEventListener("missu:open-ticket", handleOpenTicket);
    return () => window.removeEventListener("missu:open-ticket", handleOpenTicket);
  }, []);

  const handleHeroSearch = (query) => {
    router.push(`/faq?search=${query}`);
  };

  return (
    <main className="min-h-screen bg-missu-light font-sans flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#523be2] opacity-[0.05] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1c40f2] opacity-[0.05] rounded-full blur-[150px]"></div>
      </div>

      <HeroSection
        onOpenModal={() => setIsTicketModalOpen(true)}
        onSearchSubmit={handleHeroSearch}
      />

      <StepsSection />

      <div className="flex-grow">
        <MenuSection onOpenWhistleBlower={() => setIsWBModalOpen(true)} />
      </div>

      <Footer />

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
