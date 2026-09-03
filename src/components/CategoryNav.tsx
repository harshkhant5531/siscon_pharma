import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";

export function CategoryNav() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products } = useProducts();
  
  // Extract unique categories from products, but keep some base defaults just in case
  const defaultCategories = [
    "Antibiotic Injections",
    "Critical Care",
    "Gastrointestinal",
    "Emergency Medicines",
    "Hospital Supplies",
    "ICU Products",
  ];
  
  const allCategories = Array.from(new Set([...defaultCategories, ...products.map(p => p.category)]));
  const activeCategory = searchParams.get("category") || "";

  return (
    <div className="pharma-category-nav py-3 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/products?category=${encodeURIComponent(category)}`)}
              className={`category-pill whitespace-nowrap ${
                activeCategory === category ? "category-pill-active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
