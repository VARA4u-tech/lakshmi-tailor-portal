import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { X } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: { en: "Bridal Lehenga", te: "బ్రైడల్ లెహెంగా" },
    type: "tailoring",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    title: { en: "Designer Blouse", te: "డిజైనర్ బ్లౌజ్" },
    type: "tailoring",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop",
  },
  {
    id: 3,
    title: { en: "Party Gown", te: "పార్టీ గౌన్" },
    type: "tailoring",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    title: { en: "Shop Interior", te: "షాప్ ఇంటీరియర్" },
    type: "shop",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: { en: "Silk Saree Work", te: "సిల్క్ చీర వర్క్" },
    type: "tailoring",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop",
  },
  {
    id: 6,
    title: { en: "Wedding Collection", te: "వెడ్డింగ్ కలెక్షన్" },
    type: "tailoring",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop",
  },
  {
    id: 7,
    title: { en: "Jewelry Display", te: "జ్యువెలరీ డిస్ప్లే" },
    type: "product",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop",
  },
  {
    id: 8,
    title: { en: "Embroidery Work", te: "ఎంబ్రాయిడరీ వర్క్" },
    type: "tailoring",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
  },
  {
    id: 9,
    title: { en: "Fabric Collection", te: "ఫ్యాబ్రిక్ కలెక్షన్" },
    type: "product",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop",
  },
];

const filters = {
  en: ["All", "Tailoring", "Products", "Shop"],
  te: ["అన్నీ", "టైలరింగ్", "ప్రొడక్ట్స్", "షాప్"],
};

const filterMap: { [key: number]: string } = {
  0: "all",
  1: "tailoring",
  2: "product",
  3: "shop",
};

const pageContent = {
  en: {
    subtitle: "Our Work",
    title: "Gallery",
    description: "Browse through our collection of beautifully crafted outfits, accessories, and store ambiance.",
  },
  te: {
    subtitle: "మా పని",
    title: "గ్యాలరీ",
    description: "మా అందంగా తయారు చేసిన దుస్తులు, యాక్సెసరీలు మరియు స్టోర్ వాతావరణ సేకరణను బ్రౌజ్ చేయండి.",
  },
};

const Gallery = () => {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = pageContent[language];
  const filterList = filters[language];

  const filteredItems = selectedFilter === 0
    ? galleryItems
    : galleryItems.filter(item => item.type === filterMap[selectedFilter]);

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {filterList.map((filter, index) => (
              <button
                key={index}
                onClick={() => setSelectedFilter(index)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === index
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="font-heading font-semibold text-foreground">
                      {item.title[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
