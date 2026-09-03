import { useEffect, useState, useCallback } from "react";
import { ArrowRight, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    tag: "Trusted by 1000+ Hospitals Across India",
    title: "Premium Hospital",
    subtitle: "Injectable Medicines",
    desc: "Quality pharmaceutical solutions for critical care, emergency medicine, and hospital requirements. WHO-GMP certified manufacturing excellence.",
  },
  {
    tag: "Excellence in Efficacy",
    title: "Advanced Care",
    subtitle: "Antibiotic Solutions",
    desc: "Broad-spectrum antibiotics trusted by leading healthcare professionals. Ensuring safety and maximum effectiveness.",
  },
  {
    tag: "Pan-India Reach",
    title: "Reliable Supply",
    subtitle: "Chain Network",
    desc: "Uninterrupted availability of life-saving injectables delivered fast. We prioritize human lives.",
  },
];

const AUTOPLAY_INTERVAL = 4000;

export function HeroBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Track selected slide
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Auto-advance
  const advance = useCallback(() => {
    if (!api || paused) return;
    api.scrollNext();
  }, [api, paused]);

  useEffect(() => {
    const timer = setInterval(advance, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section
      className="relative bg-gradient-to-br from-primary via-primary to-accent overflow-hidden group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="max-w-3xl">
                  <span className="inline-block px-4 py-1.5 bg-primary-foreground/10 text-primary-foreground text-sm font-medium rounded-full mb-6 animate-in slide-in-from-bottom-2 duration-500 delay-100">
                    {slide.tag}
                  </span>
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                    {slide.title}
                    <br />
                    <span className="text-primary-foreground/90">
                      {slide.subtitle}
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-in fade-in duration-500 delay-300">
                    {slide.desc}
                  </p>
                  <div className="flex flex-wrap gap-4 animate-in fade-in duration-500 delay-500">
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      asChild
                    >
                      <Link to="/products">
                        Browse Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                      asChild
                    >
                      <Link to="/contact">Contact Sales</Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators + progress bar */}
        <div className="flex items-center gap-3 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                width: i === current ? "2.5rem" : "0.75rem",
                background: "rgba(255,255,255,0.3)",
              }}
            >
              {i === current && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{
                    animation: paused
                      ? "none"
                      : `dotFill ${AUTOPLAY_INTERVAL}ms linear forwards`,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Keyframe for dot fill — injected inline */}
        <style>{`
          @keyframes dotFill {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl animate-in slide-in-from-bottom-8 duration-700 delay-500">
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4 transition-transform hover:scale-105 cursor-pointer">
            <Shield className="h-8 w-8 text-primary-foreground" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">
                WHO-GMP Certified
              </p>
              <p className="text-xs text-primary-foreground/70">
                Quality Assured
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4 transition-transform hover:scale-105 cursor-pointer">
            <Truck className="h-8 w-8 text-primary-foreground" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">
                Pan-India Delivery
              </p>
              <p className="text-xs text-primary-foreground/70">
                Fast & Reliable
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4 transition-transform hover:scale-105 cursor-pointer">
            <Award className="h-8 w-8 text-primary-foreground" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">
                10+ Years
              </p>
              <p className="text-xs text-primary-foreground/70">
                Industry Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
