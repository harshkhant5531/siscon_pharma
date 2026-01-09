import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              All Products
            </h1>
            <p className="text-muted-foreground mt-2">
              Browse our complete range of pharmaceutical products
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
      </main>

      <Footer />
    </div>
  );
};

export default Products;
