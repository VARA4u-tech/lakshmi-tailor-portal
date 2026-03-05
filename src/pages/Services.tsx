import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Crown, Sparkles, Scissors, Shirt, Flower2, Baby, Wrench, ArrowRight, Check, Clock, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = {
  en: [
    {
      icon: Crown,
      title: "Bridal Lehengas",
      description: "Complete bridal lehenga sets with heavy embroidery, zardozi work, and custom designs. Perfect for your special day.",
      price: "₹15,000 - ₹1,00,000",
      duration: "4-6 weeks",
      features: ["Custom Design", "Premium Fabrics", "Heavy Embroidery", "Multiple Fittings"],
      image: "/images/services/bridal-lehenga.png",
      popular: true,
    },
    {
      icon: Sparkles,
      title: "Designer Blouses",
      description: "Exquisite designer blouses with intricate patterns, perfect fit, and modern or traditional designs.",
      price: "₹1,500 - ₹15,000",
      duration: "1-2 weeks",
      features: ["Custom Patterns", "Perfect Fit", "Embroidery Options", "Matching Work"],
      image: "/images/services/designer-blouse.png",
      popular: true,
    },
    {
      icon: Flower2,
      title: "Gowns",
      description: "Elegant gowns for parties, receptions, and special occasions. Western and Indo-western styles available.",
      price: "₹8,000 - ₹50,000",
      duration: "2-3 weeks",
      features: ["Modern Designs", "Premium Materials", "Custom Styling", "Alteration Support"],
      image: "/images/services/gowns.png",
    },
    {
      icon: Scissors,
      title: "Saree Blouses",
      description: "Traditional and modern saree blouses. Plain, embroidered, or with heavy work to match your saree.",
      price: "₹800 - ₹5,000",
      duration: "3-5 days",
      features: ["Quick Delivery", "Pattern Matching", "Back Design Options", "Piping Work"],
      image: "/images/services/saree-blouse.png",
    },
    {
      icon: Shirt,
      title: "Kurtis & Suits",
      description: "Comfortable daily wear kurtis and salwar suits. Simple stitching to designer patterns.",
      price: "₹500 - ₹3,000",
      duration: "2-4 days",
      features: ["Comfort Fit", "Various Styles", "Affordable", "Quick Turnaround"],
      image: "/images/services/kurtis.png",
    },
    {
      icon: Baby,
      title: "Kids Wear",
      description: "Cute and comfortable outfits for kids. Lehengas, frocks, and traditional wear for little ones.",
      price: "₹500 - ₹5,000",
      duration: "3-5 days",
      features: ["Child-Friendly", "Comfortable", "Cute Designs", "Safe Fabrics"],
      image: "/images/services/kids-wear.png",
    },
    {
      icon: Wrench,
      title: "Alterations",
      description: "Expert alterations for all types of garments. Perfect fit adjustments and repairs.",
      price: "₹200 - ₹1,000",
      duration: "1-2 days",
      features: ["Quick Service", "Expert Work", "All Garments", "Affordable"],
      image: "/images/services/saree-blouse.png",
    },
  ],
  te: [
    {
      icon: Crown,
      title: "బ్రైడల్ లెహెంగాలు",
      description: "హెవీ ఎంబ్రాయిడరీ, జర్దోజీ వర్క్ మరియు కస్టమ్ డిజైన్‌లతో పూర్తి బ్రైడల్ లెహెంగా సెట్‌లు. మీ ప్రత్యేక రోజుకు సరిపోతుంది.",
      price: "₹15,000 - ₹1,00,000",
      duration: "4-6 వారాలు",
      features: ["కస్టమ్ డిజైన్", "ప్రీమియం ఫ్యాబ్రిక్స్", "హెవీ ఎంబ్రాయిడరీ", "మల్టిపుల్ ఫిట్టింగ్‌లు"],
      image: "/images/services/bridal-lehenga.png",
      popular: true,
    },
    {
      icon: Sparkles,
      title: "డిజైనర్ బ్లౌజ్‌లు",
      description: "సంక్లిష్టమైన ప్యాటర్న్‌లు, పర్ఫెక్ట్ ఫిట్ మరియు ఆధునిక లేదా సాంప్రదాయ డిజైన్‌లతో అద్భుతమైన డిజైనర్ బ్లౌజ్‌లు.",
      price: "₹1,500 - ₹15,000",
      duration: "1-2 వారాలు",
      features: ["కస్టమ్ ప్యాటర్న్‌లు", "పర్ఫెక్ట్ ఫిట్", "ఎంబ్రాయిడరీ ఆప్షన్‌లు", "మ్యాచింగ్ వర్క్"],
      image: "/images/services/designer-blouse.png",
      popular: true,
    },
    {
      icon: Flower2,
      title: "పార్టీ వేర్ గౌన్లు",
      description: "పార్టీలు, రిసెప్షన్లు మరియు ప్రత్యేక సందర్భాల కోసం ఎలిగెంట్ గౌన్లు. వెస్ట్రన్ మరియు ఇండో-వెస్ట్రన్ స్టైల్స్.",
      price: "₹8,000 - ₹50,000",
      duration: "2-3 వారాలు",
      features: ["మోడర్న్ డిజైన్‌లు", "ప్రీమియం మెటీరియల్స్", "కస్టమ్ స్టైలింగ్", "అల్టరేషన్ సపోర్ట్"],
      image: "/images/services/gowns.png",
    },
    {
      icon: Scissors,
      title: "చీర బ్లౌజ్‌లు",
      description: "సాంప్రదాయ మరియు ఆధునిక చీర బ్లౌజ్‌లు. మీ చీరకు సరిపోయేలా ప్లెయిన్, ఎంబ్రాయిడరీ లేదా హెవీ వర్క్.",
      price: "₹800 - ₹5,000",
      duration: "3-5 రోజులు",
      features: ["త్వరిత డెలివరీ", "ప్యాటర్న్ మ్యాచింగ్", "బ్యాక్ డిజైన్ ఆప్షన్‌లు", "పైపింగ్ వర్క్"],
      image: "/images/services/saree-blouse.png",
    },
    {
      icon: Shirt,
      title: "కుర్తీలు & సూట్లు",
      description: "సౌకర్యవంతమైన రోజువారీ వేర్ కుర్తీలు మరియు సల్వార్ సూట్లు. సింపుల్ స్టిచింగ్ నుండి డిజైనర్ ప్యాటర్న్‌ల వరకు.",
      price: "₹500 - ₹3,000",
      duration: "2-4 రోజులు",
      features: ["కంఫర్ట్ ఫిట్", "వివిధ స్టైల్స్", "అందుబాటులో", "త్వరిత టర్నరౌండ్"],
      image: "/images/services/kurtis.png",
    },
    {
      icon: Baby,
      title: "కిడ్స్ వేర్",
      description: "పిల్లల కోసం క్యూట్ మరియు కంఫర్టబుల్ దుస్తులు. చిన్నవారి కోసం లెహెంగాలు, ఫ్రాక్స్ మరియు సాంప్రదాయ దుస్తులు.",
      price: "₹500 - ₹5,000",
      duration: "3-5 రోజులు",
      features: ["చైల్డ్-ఫ్రెండ్లీ", "కంఫర్టబుల్", "క్యూట్ డిజైన్‌లు", "సేఫ్ ఫ్యాబ్రిక్స్"],
      image: "/images/services/kids-wear.png",
    },
    {
      icon: Wrench,
      title: "అల్టరేషన్లు",
      description: "అన్ని రకాల దుస్తులకు నిపుణుల అల్టరేషన్లు. పర్ఫెక్ట్ ఫిట్ సర్దుబాట్లు మరియు మరమ్మతులు.",
      price: "₹200 - ₹1,000",
      duration: "1-2 రోజులు",
      features: ["త్వరిత సేవ", "నిపుణుల పని", "అన్ని దుస్తులు", "అందుబాటులో"],
      image: "/images/services/saree-blouse.png",
    },
  ],
};

const pageContent = {
  en: {
    subtitle: "Our Expertise",
    title: "Premium Tailoring Services",
    description: "From bridal elegance to everyday comfort, we craft every stitch with love and precision.",
    cta: "Book Your Appointment",
    whatsapp: "Chat on WhatsApp",
    call: "Call Now",
    getQuote: "Get Quote",
    bookNow: "Book Now",
    viewDetails: "View Details",
    popularBadge: "Most Popular",
  },
  te: {
    subtitle: "మా నైపుణ్యం",
    title: "ప్రీమియం టైలరింగ్ సేవలు",
    description: "బ్రైడల్ ఎలిగెన్స్ నుండి రోజువారీ సౌకర్యం వరకు, మేము ప్రతి కుట్టును ప్రేమ మరియు ఖచ్చితత్వంతో తయారు చేస్తాము.",
    cta: "మీ అపాయింట్‌మెంట్ బుక్ చేయండి",
    whatsapp: "WhatsApp లో చాట్ చేయండి",
    call: "ఇప్పుడు కాల్ చేయండి",
    getQuote: "ధర అడగండి",
    bookNow: "ఇప్పుడు బుక్ చేయండి",
    viewDetails: "వివరాలు చూడండి",
    popularBadge: "అత్యంత ప్రజాదరణ",
  },
};

import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { language, setLanguage } = useLanguage();
  const t = pageContent[language];
  const servicesList = services[language];

  const handleWhatsApp = () => {
    window.open("https://wa.me/919381487134?text=Hi! I'm interested in your tailoring services.", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+919381487134";
  };

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 to-background" />

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-accent font-medium mb-2"
            >
              {t.subtitle}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-3xl md:text-6xl font-bold text-foreground mb-6"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              {t.description}
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="whatsapp" size="lg" onClick={handleWhatsApp} className="group">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t.whatsapp}
              </Button>
              <Button variant="gold" size="lg" onClick={handleCall} className="group">
                <Phone className="w-5 h-5 mr-2" />
                {t.call}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 relative">
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-accent text-maroon-dark px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      {t.popularBadge}
                    </div>
                  </div>
                )}

                {/* Service Card */}
                <div className="relative w-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(43_60%_52%_/_0.2)] hover:-translate-y-1 flex flex-col">
                  {/* Image Header */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute top-[12.5rem] right-6 w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center shadow-lg z-10 group-hover:border-accent/50 group-hover:shadow-[0_0_15px_-3px_hsl(43_60%_52%_/_0.4)] transition-all duration-300">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="mt-auto">
                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                            <span className="text-muted-foreground/80">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Duration & CTA */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mr-auto">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{service.duration}</span>
                        </div>

                        <Link to="/contact" className="w-full flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-accent/30 hover:bg-accent/10 hover:border-accent text-accent group/btn h-10 text-sm font-medium"
                          >
                            {t.getQuote}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-maroon via-maroon-dark to-background">
        <div className="absolute inset-0 bg-pattern-ornate opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                {language === "en" ? "Ready to Get Started?" : "ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?"}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {language === "en"
                  ? "Book your appointment today and experience the finest tailoring services in Vijayawada."
                  : "ఈరోజే మీ అపాయింట్‌మెంట్ బుక్ చేసుకోండి మరియు విజయవాడలో అత్యుత్తమ టైలరింగ్ సేవలను అనుభవించండి."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="xl" className="group">
                    {t.cta}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl" onClick={handleWhatsApp} className="border-accent text-accent hover:bg-accent/10">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t.whatsapp}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
