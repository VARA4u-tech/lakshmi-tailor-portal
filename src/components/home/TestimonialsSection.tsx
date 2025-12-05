import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsSectionProps {
  language: "en" | "te";
}

const testimonials = [
  {
    id: 1,
    name: { en: "Priya Sharma", te: "ప్రియ శర్మ" },
    text: {
      en: "Lakshmi Fashion made my bridal lehenga exactly as I dreamed. The attention to detail was incredible!",
      te: "లక్ష్మి ఫ్యాషన్ నా బ్రైడల్ లెహెంగాను నేను కలలు కన్నట్లుగానే తయారు చేసింది. వివరాలపై శ్రద్ధ అద్భుతం!",
    },
    rating: 5,
    type: { en: "Bridal Customer", te: "బ్రైడల్ కస్టమర్" },
  },
  {
    id: 2,
    name: { en: "Anjali Reddy", te: "అంజలి రెడ్డి" },
    text: {
      en: "Best tailoring shop in the city! They understand exactly what you want and deliver perfection.",
      te: "నగరంలో అత్యుత్తమ టైలరింగ్ షాప్! మీకు ఏమి కావాలో వారు సరిగ్గా అర్థం చేసుకుంటారు.",
    },
    rating: 5,
    type: { en: "Regular Customer", te: "రెగ్యులర్ కస్టమర్" },
  },
  {
    id: 3,
    name: { en: "Kavitha Nair", te: "కవిత నాయర్" },
    text: {
      en: "I've been getting all my blouses stitched here for 5 years. Consistent quality every time!",
      te: "నేను 5 సంవత్సరాలుగా ఇక్కడ నా అన్ని బ్లౌజ్‌లను కుట్టించుకుంటున్నాను. ప్రతిసారి స్థిరమైన నాణ్యత!",
    },
    rating: 5,
    type: { en: "Loyal Customer", te: "నమ్మకమైన కస్టమర్" },
  },
];

const sectionContent = {
  en: {
    subtitle: "Testimonials",
    title: "What Our Customers Say",
    description: "Join thousands of happy customers who trust us with their special occasions.",
  },
  te: {
    subtitle: "టెస్టిమోనియల్స్",
    title: "మా కస్టమర్లు ఏమి చెప్తున్నారు",
    description: "తమ ప్రత్యేక సందర్భాలకు మమ్మల్ని విశ్వసించే వేలాది సంతోషకరమైన కస్టమర్లలో చేరండి.",
  },
};

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const t = sectionContent[language];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-medium mb-2">{t.subtitle}</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              variant="glass"
              className="relative"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.text[language]}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-semibold">
                      {testimonial.name[language].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name[language]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.type[language]}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
