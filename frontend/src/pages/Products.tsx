import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/PageLoader";

const Products = () => {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All";

  const [localSearch, setLocalSearch] = useState(urlSearch);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  // Sync url search to local search
  useEffect(() => {
    setLocalSearch(urlSearch);
  }, [urlSearch]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (urlCategory !== "All") {
      result = result.filter(p => p.category === urlCategory);
    }

    if (urlSearch) {
      const q = urlSearch.toLowerCase();
      result = result.filter(p => 
        (p.name?.toLowerCase() || "").includes(q) || 
        (p.category?.toLowerCase() || "").includes(q) ||
        (p.manufacturer?.toLowerCase() || "").includes(q)
      );
    }

    return result;
  }, [products, urlSearch, urlCategory]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleTabChange = (val: string) => {
    setCurrentPage(1);
    setSearchParams(prev => {
      if (val === "All") {
        prev.delete("category");
      } else {
        prev.set("category", val);
      }
      return prev;
    });
  };

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    setCurrentPage(1);
    setSearchParams(prev => {
      if (val) {
        prev.set("search", val);
      } else {
        prev.delete("search");
      }
      return prev;
    }, { replace: true });
  };

  const clearSearch = () => {
    setLocalSearch("");
    setSearchParams(prev => {
      prev.delete("search");
      return prev;
    });
  };

  if (loading) return <PageLoader message="Loading products..." />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      
      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                {urlCategory !== "All" ? `${urlCategory} Products` : "All Products"}
              </h1>
              <p className="text-muted-foreground mt-2">
                Browse our complete range of pharmaceutical products
              </p>
            </div>
            
            <div className="flex w-full md:max-w-sm relative">
              <Input 
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Filter results..."
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                {localSearch ? (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={clearSearch}>
                    <X className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex items-center justify-center h-8 w-8">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 overflow-x-auto pb-2">
            <Tabs value={urlCategory} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-auto inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat} className="px-4">
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {currentProducts.length > 0 ? (
            <>
              <ProductGrid products={currentProducts} />
              
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">No Products Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any products matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button onClick={() => {
                setLocalSearch("");
                setSearchParams(prev => {
                  prev.delete("search");
                  prev.delete("category");
                  return prev;
                });
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
