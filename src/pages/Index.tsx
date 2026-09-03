import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import PageLoader from "@/components/PageLoader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AnimatedCounter = ({ end, suffix = "" }: { end: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span className="text-4xl md:text-5xl font-bold font-heading text-primary">{count}{suffix}</span>;
}

const Index = () => {
  const { products, loading } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  if (loading) return <PageLoader message="Loading products..." />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <HeroBanner />

      <main className="flex-1">
        {/* Products Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground mt-2">
                High-quality injectable medicines for hospitals and healthcare
                facilities
              </p>
            </div>

            <ProductGrid products={currentProducts} />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center justify-center p-4">
                <AnimatedCounter end={10} suffix="+" />
                <p className="mt-2 text-foreground font-medium">Years of Experience</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <AnimatedCounter end={150} suffix="+" />
                <p className="mt-2 text-foreground font-medium">Products Formulated</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <AnimatedCounter end={100} suffix="k+" />
                <p className="mt-2 text-foreground font-medium">Lives Touched</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <AnimatedCounter end={500} suffix="+" />
                <p className="mt-2 text-foreground font-medium">Hospital Partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose Siscon Pharma?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are committed to delivering premium pharmaceutical products
                with uncompromising quality standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "WHO-GMP Certified",
                  description:
                    "Manufacturing facilities certified by World Health Organization standards",
                  icon: "🏭",
                },
                {
                  title: "Quality Assurance",
                  description:
                    "Rigorous quality control at every stage of production",
                  icon: "✓",
                },
                {
                  title: "Pan-India Network",
                  description:
                    "Extensive distribution network covering all major cities",
                  icon: "🚚",
                },
                {
                  title: "24/7 Support",
                  description:
                    "Round-the-clock customer support for urgent requirements",
                  icon: "📞",
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="pharma-card p-6 text-center animate-fade-in transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground mx-auto">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full bg-background rounded-lg p-6 shadow-sm">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold">Are your products WHO-GMP certified?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, all our injectables and pharmaceutical products are manufactured in WHO-GMP certified facilities, ensuring the highest standards of safety and efficacy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold">Do you supply directly to hospitals?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, we have a robust B2B network that supplies critical care medicines and injectables directly to hospitals and healthcare facilities across India.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold">How long does delivery take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Delivery timelines depend on your location. Our Pan-India network generally ensures dispatch within 24 hours, with typical delivery happening in 2-5 business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-semibold">Do you accept bulk orders?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. Siscon Pharma frequently handles large-scale bulk procurement requested by clinics, government health departments, and hospital chains.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Looking for Bulk Orders?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Contact our sales team for competitive pricing on bulk orders. We
              offer special rates for hospitals and distributors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary font-medium rounded-lg hover:bg-primary-foreground/90 transition-colors"
              >
                Request Quote
              </a>
              <a
                href="tel:+91 90990 68068"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground/30 text-primary-foreground font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors"
              >
                Call: +91 95121 31217
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
