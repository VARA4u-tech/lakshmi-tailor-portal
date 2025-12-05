import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  const [language, setLanguage] = useState<"en" | "te">("en");

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <HeroSection language={language} />
      <ServicesPreview language={language} />
      <WhyChooseUs language={language} />
      <ProductsPreview language={language} />
      <TestimonialsSection language={language} />
      <CTASection language={language} />
    </Layout>
  );
};

export default Index;
