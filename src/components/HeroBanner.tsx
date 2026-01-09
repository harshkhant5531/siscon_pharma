import { ArrowRight, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-primary-foreground/10 text-primary-foreground text-sm font-medium rounded-full mb-6">
            Trusted by 1000+ Hospitals Across India
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Premium Hospital<br />
            <span className="text-primary-foreground/90">Injectable Medicines</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
            Quality pharmaceutical solutions for critical care, emergency medicine, and hospital requirements. 
            WHO-GMP certified manufacturing excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link to="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-2xl">
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">WHO-GMP Certified</p>
              <p className="text-xs text-primary-foreground/70">Quality Assured</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
            <Truck className="h-8 w-8 text-primary-foreground" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">Pan-India Delivery</p>
              <p className="text-xs text-primary-foreground/70">Fast & Reliable</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
            <Award className="h-8 w-8 text-primary-foreground" />
            <div>
              <p className="text-sm font-semibold text-primary-foreground">10+ Years</p>
              <p className="text-xs text-primary-foreground/70">Industry Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}