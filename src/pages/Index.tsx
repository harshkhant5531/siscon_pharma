import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

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
                  className="pharma-card p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-2xl">
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
