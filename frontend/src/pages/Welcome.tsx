import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function WelcomePage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation on mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleStartJourney = () => {
    // Fade out and navigate to home
    setIsVisible(false);
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-maroon-dark/80 to-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-pattern-ornate opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-gold" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-gold animation-delay-500" />

      {/* Gold ornamental lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 flex flex-col items-center justify-center h-full max-h-screen py-4 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Logo */}
        <div className="mb-4 md:mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
            <img
              src={logo}
              alt="Lakshmi Fashion & Designers"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-accent shadow-2xl shadow-accent/30 relative z-10"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
          <span className="text-gradient-gold">Lakshmi Fashion</span>
        </h1>
        <p className="font-heading text-xl md:text-2xl text-accent mb-4">& Designers</p>

        {/* Caption */}
        <p className="text-cream/90 text-sm md:text-lg italic mb-3 max-w-2xl mx-auto px-4">
          "Tailoring is not just about making clothes, it's about making people."
        </p>

        {/* Tagline */}
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
          <Sparkles className="w-4 h-4 text-accent" />
          <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider">
            Premium Women's Tailoring & Fancy Store
          </p>
          <Sparkles className="w-4 h-4 text-accent" />
        </div>

        {/* CTA Button */}
        <Button
          variant="hero"
          size="lg"
          onClick={handleStartJourney}
          className="group animate-pulse-gold min-w-[200px]"
        >
          Start Your Journey
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 mt-8 md:mt-12 max-w-2xl mx-auto px-4 border-t border-accent/10 pt-6 md:pt-8 w-full">
          <div className="text-center group">
            <p className="font-heading text-2xl md:text-4xl font-bold text-accent transition-transform group-hover:scale-110">20+</p>
            <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-tighter">Years Experience</p>
          </div>
          <div className="text-center group">
            <p className="font-heading text-2xl md:text-4xl font-bold text-accent transition-transform group-hover:scale-110">5000+</p>
            <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-tighter">Happy Customers</p>
          </div>
          <div className="text-center group">
            <p className="font-heading text-2xl md:text-4xl font-bold text-accent transition-transform group-hover:scale-110">100+</p>
            <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-tighter">Bridal Dresses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
