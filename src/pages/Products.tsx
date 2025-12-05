import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Filter } from "lucide-react";

const categories = {
  en: ["All", "Earrings", "Bangles", "Necklaces", "Dupattas", "Bags", "Dress Materials"],
  te: ["అన్నీ", "చెవి పోగులు", "గాజులు", "హారాలు", "దుపట్టాలు", "బ్యాగులు", "డ్రస్ మెటీరియల్స్"],
};

const products = [
  {
    id: 1,
    name: { en: "Traditional Jhumkas", te: "సాంప్రదాయ జుమ్కాలు" },
    category: { en: "Earrings", te: "చెవి పోగులు" },
    price: 850,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    inStock: true,
  },
  {
    id: 2,
    name: { en: "Silk Dupatta", te: "సిల్క్ దుపట్టా" },
    category: { en: "Dupattas", te: "దుపట్టాలు" },
    price: 2500,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    inStock: true,
  },
  {
    id: 3,
    name: { en: "Designer Handbag", te: "డిజైనర్ హ్యాండ్‌బ్యాగ్" },
    category: { en: "Bags", te: "బ్యాగులు" },
    price: 1800,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: { en: "Gold Bangles Set", te: "గోల్డ్ గాజుల సెట్" },
    category: { en: "Bangles", te: "గాజులు" },
    price: 3200,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    inStock: false,
  },
  {
    id: 5,
    name: { en: "Pearl Necklace", te: "ముత్యాల హారం" },
    category: { en: "Necklaces", te: "హారాలు" },
    price: 4500,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    inStock: true,
  },
  {
    id: 6,
    name: { en: "Chanderi Fabric", te: "చందేరీ ఫ్యాబ్రిక్" },
    category: { en: "Dress Materials", te: "డ్రస్ మెటీరియల్స్" },
    price: 1200,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop",
    inStock: true,
  },
  {
    id: 7,
    name: { en: "Antique Chandbali", te: "యాంటిక్ చాంద్‌బాలీ" },
    category: { en: "Earrings", te: "చెవి పోగులు" },
    price: 1500,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop",
    inStock: true,
  },
  {
    id: 8,
    name: { en: "Embroidered Clutch", te: "ఎంబ్రాయిడరీ క్లచ్" },
    category: { en: "Bags", te: "బ్యాగులు" },
    price: 950,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop",
    inStock: true,
  },
];

const pageContent = {
  en: {
    subtitle: "Fancy Store",
    title: "Beautiful Accessories",
    description: "Complete your look with our curated collection of jewelry, bags, and fashion accessories.",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    enquire: "Enquire Now",
    filter: "Filter",
  },
  te: {
    subtitle: "ఫ్యాన్సీ స్టోర్",
    title: "అందమైన యాక్సెసరీలు",
    description: "మా క్యూరేటెడ్ జ్యువెలరీ, బ్యాగులు మరియు ఫ్యాషన్ యాక్సెసరీల సేకరణతో మీ లుక్‌ను పూర్తి చేయండి.",
    inStock: "స్టాక్‌లో ఉంది",
    outOfStock: "స్టాక్ అయిపోయింది",
    enquire: "ఇప్పుడు విచారించండి",
    filter: "ఫిల్టర్",
  },
};

const Products = () => {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const t = pageContent[language];
  const categoryList = categories[language];

  const filteredProducts = selectedCategory === 0
    ? products
    : products.filter(p => p.category[language] === categoryList[selectedCategory]);

  const handleEnquire = (productName: string) => {
    const message = `Hi! I'm interested in the ${productName} from your store.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank");
  };

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
      <section className="py-6 border-b border-border/30 sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-accent flex-shrink-0" />
            {categoryList.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === index
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} variant="elevated" className="group overflow-hidden hover-lift">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Stock Badge */}
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? "bg-success/20 text-[hsl(142,76%,36%)]"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {product.inStock ? t.inStock : t.outOfStock}
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-accent text-xs font-medium mb-1">
                    {product.category[language]}
                  </p>
                  <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-1">
                    {product.name[language]}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-accent font-bold">₹{product.price.toLocaleString()}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEnquire(product.name.en)}
                      disabled={!product.inStock}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
