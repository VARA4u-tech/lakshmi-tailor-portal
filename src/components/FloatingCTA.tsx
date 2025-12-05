import { Phone, MessageCircle } from "lucide-react";

interface FloatingCTAProps {
  language: "en" | "te";
}

export function FloatingCTA({ language }: FloatingCTAProps) {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi! I'm interested in your tailoring services.",
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden">
      <button
        onClick={handleCall}
        className="w-14 h-14 rounded-full bg-accent shadow-gold-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-accent-foreground" />
      </button>
      <button
        onClick={handleWhatsApp}
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-pulse-gold"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
