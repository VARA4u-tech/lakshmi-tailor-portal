import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MessageCircle, Filter, Loader2, IndianRupee, ShoppingBag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = {
  en: [
    "All",
    "Earrings",
    "Bangles",
    "Saree Materials",
    "Clips",
    "Nail Polish",
    "Mehendhi cone's",
    "Threads",
    "Cosmetics",
    "Accessories",
  ],
  te: [
    "అన్నీ",
    "చెవి పోగులు",
    "గాజులు",
    "సారీ మెటీరియల్స్",
    "క్లిప్స్",
    "నైల్ పోలిస్",
    "మేహేంధి కోన్లు",
    "ట్రేధ్లు",
    "సౌందర్య సాధనాలు",
    "ఆభరణాలు",
  ],
};

interface Product {
  id: string;
  name_en: string;
  name_te: string;
  category: string;
  category_te: string;
  price: number;
  image_url: string;
  in_stock: boolean;
}

const pageContent = {
  en: {
    subtitle: "Fancy Store",
    title: "Beautiful Accessories",
    description:
      "Complete your look with our curated collection of jewelry, bags, and fashion accessories.",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    enquire: "Enquire Now",
    filter: "Filter",
    contactPrice: "Contact for Price",
    noProducts: "No products found.",
  },
  te: {
    subtitle: "ఫ్యాన్సీ స్టోర్",
    title: "అందమైన యాక్సెసరీలు",
    description:
      "మా క్యూరేటెడ్ జ్యువెలరీ, బ్యాగులు మరియు ఫ్యాషన్ యాక్సెసరీల సేకరణతో మీ లుక్‌ను పూర్తి చేయండి.",
    inStock: "స్టాక్‌లో ఉంది",
    outOfStock: "స్టాక్ అయిపోయింది",
    enquire: "ఇప్పుడు విచారించండి",
    filter: "ఫిల్టర్",
    contactPrice: "ధర కోసం సంప్రదించండి",
    noProducts: "ఉత్పత్తులు కనుగొనబడలేదు.",
  },
};

const Products = () => {
  const { language, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  const t = pageContent[language];
  const categoryList = categories[language];

  const fetchRecommendations = async (productId: string) => {
    setRecommendationsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/recommendations/${productId}`,
      );
      const data = await response.json();
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setRecommendationsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (!product.id.startsWith("lp-")) {
      // Only fetch for real DB products
      fetchRecommendations(product.id);
    } else {
      setRecommendations([]);
    }
  };

  const localProducts: Product[] = [
    // Earrings
    {
      id: "lp-2",
      name_en: "Crystal Studs",
      name_te: "క్రిస్టల్ స్టడ్స్",
      category: "Earrings",
      category_te: "చెవి పోగులు",
      price: 0,
      image_url:
        "https://i.ibb.co/BK7JDgsF/shopping-q-tbn-ANd9-Gc-Rpk-Xuf-HS4-Cg-F8-LVXVu-ZKgcr-Fjh-E0a0-ELto-e503w0-ZF16ifmf-CAIWZef9-Xg-UA0-zveb6-XB.webp",
      in_stock: true,
    },
    {
      id: "lp-3",
      name_en: "Peacock Jhumkas",
      name_te: "నెమలి జుంకాలు",
      category: "Earrings",
      category_te: "చెవి పోగులు",
      price: 0,
      image_url:
        "https://i.ibb.co/TMbGPT8h/shopping-q-tbn-ANd9-Gc-RMFJakxf8-Xp-Vl-C1t-XBRW8l-Sw-Z9-UO8i1ci3vv-UAHu-Io4-ZCu-NDy-VLDDRKw-On8-Xs-PLP0-L.webp",
      in_stock: true,
    },
    // Bangles
    {
      id: "lp-4",
      name_en: "Silk Thread Bangles",
      name_te: "సిల్క్ త్రెడ్ గాజులు",
      category: "Bangles",
      category_te: "గాజులు",
      price: 0,
      image_url:
        "https://i.ibb.co/PGr3gfsD/shopping-q-tbn-ANd9-Gc-TPTOez-Mh-U45-JJW6za-P41-E4n-UWh2j7-Uc-WZ8vk-WJgd-F5-Bj-XTIU2en8-Yy9i-EWyhc-T2g7u-f.webp",
      in_stock: true,
    },
    {
      id: "lp-5",
      name_en: "Bridal Chura Set",
      name_te: "బ్రైడల్ చురా సెట్",
      category: "Bangles",
      category_te: "గాజులు",
      price: 0,
      image_url: "https://i.ibb.co/qFNrryR9/10744044-GL-a5f5e1bd-b4a7-43f7-9dbe-471d860947d9.jpg",
      in_stock: true,
    },
    {
      id: "lp-6",
      name_en: "Stone Work Bangles",
      name_te: "స్టోన్ వర్క్ గాజులు",
      category: "Bangles",
      category_te: "గాజులు",
      price: 0,
      image_url:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
      in_stock: true,
    },
    // Saree Materials
    {
      id: "lp-7",
      name_en: "Aari Work Blouse Material",
      name_te: "ఆరి వర్క్ బ్లౌజ్ మెటీరియల్",
      category: "Saree Materials",
      category_te: "సారీ మెటీరియల్స్",
      price: 0,
      image_url: "https://i.ibb.co/S8qCT65/aari-work-blouse-bits-2.jpg",
      in_stock: true,
    },
    {
      id: "lp-9",
      name_en: "Saree Falls & Zigzag",
      name_te: "చీర ఫాల్స్ & జిగ్‌జాగ్",
      category: "Saree Materials",
      category_te: "సారీ మెటీరియల్స్",
      price: 0,
      image_url: "https://i.ibb.co/99HmP0GP/hq720.jpg",
      in_stock: true,
    },
    // Clips
    {
      id: "lp-10",
      name_en: "Stone Hair Clips",
      name_te: "స్టోన్ హెయిర్ క్లిప్స్",
      category: "Clips",
      category_te: "క్లిప్స్",
      price: 0,
      image_url:
        "https://i.ibb.co/NnGvJdtV/Smart-BG-2024-11-11-883690ac-3ebd-493b-9088-b66722dc6302.png",
      in_stock: true,
    },
    // Mehendhi
    {
      id: "lp-15",
      name_en: "Bridal Mehendi Kit",
      name_te: "బ్రైడల్ మెహందీ కిట్",
      category: "Mehendhi cone's",
      category_te: "మేహేంధి కోన్లు",
      price: 0,
      image_url:
        "https://i.ibb.co/bjg68kTw/images-q-tbn-ANd9-Gc-Sp0o8-RYFm-Dqo9v-Vznpm1-MEm1yb-O81e-Sxapkg-s.jpg",
      in_stock: true,
    },
    // Threads
    {
      id: "lp-16",
      name_en: "Silk Embroidery Threads",
      name_te: "సిల్క్ ఎంబ్రాయిడరీ త్రెడ్స్",
      category: "Threads",
      category_te: "ట్రేధ్లు",
      price: 0,
      image_url:
        "https://i.ibb.co/DPGzVqYC/Premium-Quality-Multi-Color-Cotton-nbsp-Silk-Hand-Embroidery-Threads-For-School-Projects-amp-Home-Us.jpg",
      in_stock: true,
    },
    {
      id: "lp-17",
      name_en: "Zari Thread Spools",
      name_te: "జరీ త్రెడ్ స్పూల్స్",
      category: "Threads",
      category_te: "ట్రేధ్లు",
      price: 0,
      image_url: "https://i.ibb.co/9KNkgcZ/zari-thread-combo.jpg",
      in_stock: true,
    },
    // Cosmetics & Accessories
    {
      id: "lp-18",
      name_en: "Waterproof Eyeliner",
      name_te: "వాటర్ ప్రూఫ్ ఐలైనర్",
      category: "Cosmetics",
      category_te: "సౌందర్య సాధనాలు",
      price: 0,
      image_url: "https://i.ibb.co/9HhBR3Sz/8902656303752-1-720x.jpg",
      in_stock: true,
    },
  ];

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await response.json();
      if (data.success) {
        setProducts([...(data.products || []), ...localProducts]);
      } else {
        setProducts(localProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(localProducts);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === 0
      ? products
      : products.filter((p) => p.category === categories["en"][selectedCategory]); // Filter by English category name stored in DB

  const handleEnquire = (productName: string) => {
    const message = `Hi! I'm interested in the ${productName} from your store.`;
    window.open(`https://wa.me/919381487134?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-40 md:pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium mb-2">{t.subtitle}</p>
            <h1 className="font-heading text-3xl md:text-6xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg">{t.description}</p>
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
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">{t.noProducts}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  variant="elevated"
                  className="group overflow-hidden hover-lift cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={language === "en" ? product.name_en : product.name_te}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Stock Badge */}
                    <div
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                        product.in_stock
                          ? "bg-success/20 text-[hsl(142,76%,36%)]"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {product.in_stock ? t.inStock : t.outOfStock}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-accent text-xs font-medium mb-1">
                      {language === "en" ? product.category : product.category_te}
                    </p>
                    <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-1">
                      {language === "en" ? product.name_en : product.name_te}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-medium text-foreground/80">
                        {product.price > 0 ? `₹${product.price}` : t.contactPrice}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnquire(product.name_en);
                        }}
                        disabled={!product.in_stock}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-8 pt-6">
              {/* Product Image */}
              <div className="aspect-square relative overflow-hidden rounded-xl border border-border/30">
                <img
                  src={selectedProduct.image_url}
                  alt={language === "en" ? selectedProduct.name_en : selectedProduct.name_te}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <DialogHeader className="p-0 text-left mb-6">
                  <p className="text-accent font-medium mb-2">
                    {language === "en" ? selectedProduct.category : selectedProduct.category_te}
                  </p>
                  <DialogTitle className="text-3xl font-heading font-bold">
                    {language === "en" ? selectedProduct.name_en : selectedProduct.name_te}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-2 mb-6">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedProduct.in_stock
                        ? "bg-success/10 text-[hsl(142,76%,36%)]"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {selectedProduct.in_stock ? t.inStock : t.outOfStock}
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-8">
                  {selectedProduct.price > 0 && <IndianRupee className="w-5 h-5 text-foreground" />}
                  <span className="text-3xl font-bold">
                    {selectedProduct.price > 0 ? selectedProduct.price : t.contactPrice}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold">{language === "en" ? "Description" : "వివరణ"}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "en"
                      ? "Premium quality fashion product handcrafted for perfection. Available in various colors and designs."
                      : "ఖచ్చితత్వం కోసం రూపొందించబడిన ప్రీమియం నాణ్యత ఫ్యాషన్ ఉత్పత్తి. వివిధ రంగులు మరియు డిజైన్లలో అందుబాటులో ఉంది."}
                  </p>
                </div>

                <div className="mt-auto space-y-3">
                  <Button
                    className="w-full gap-2 h-12 text-lg"
                    onClick={() => handleEnquire(selectedProduct.name_en)}
                    disabled={!selectedProduct.in_stock}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.enquire}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    {language === "en"
                      ? "Get personalized tailoring advice for this product"
                      : "ఈ ఉత్పత్తి కోసం వ్యక్తిగతీకరించిన టైలరింగ్ సలహాలను పొందండి"}
                  </p>
                </div>
              </div>

              {/* Related Products Section */}
              <div className="md:col-span-2 mt-8 pt-8 border-t border-border/30">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                  <h4 className="text-xl font-heading font-bold">
                    {language === "en"
                      ? "Related Products (AI Recommendations)"
                      : "సంబంధిత ఉత్పత్తులు (AI సిఫార్సులు)"}
                  </h4>
                </div>

                {recommendationsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="group cursor-pointer"
                        onClick={() => handleProductClick(rec)}
                      >
                        <div className="aspect-square rounded-lg overflow-hidden border border-border/30 mb-2">
                          <img
                            src={rec.image_url}
                            alt={language === "en" ? rec.name_en : rec.name_te}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h5 className="text-sm font-medium line-clamp-1 group-hover:text-accent transition-colors">
                          {language === "en" ? rec.name_en : rec.name_te}
                        </h5>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    {language === "en"
                      ? "No recommendations found for this item."
                      : "ఈ ఐటెమ్ కోసం ఎటువంటి సిఫార్సులు కనుగొనబడలేదు."}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Products;
