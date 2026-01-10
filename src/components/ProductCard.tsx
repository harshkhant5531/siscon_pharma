import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  name: string;
  strength: string;
  manufacturer: string;
  price?: string;
  inStock: boolean;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  return (
    <div className="pharma-card overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-muted/30 p-4 flex items-center justify-center relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={`absolute top-3 right-3 ${
              product.inStock
                ? "stock-badge-available"
                : "stock-badge-unavailable"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-primary font-medium mt-1">
          {product.strength}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          By {product.manufacturer}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-foreground">
            {product.price || "Contact for Price"}
          </span>
        </div>

        <Button
          className="w-full mt-3"
          disabled={!product.inStock}
          variant={product.inStock ? "default" : "secondary"}
          onClick={() => {
            if (!product.inStock) return;
            addToCart(product, 1);
            toast.success(`${product.name} added to cart`, {
              action: {
                label: "View Cart",
                onClick: () => (window.location.href = "/cart"),
              },
            });
          }}
        >
          {product.inStock ? (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          ) : (
            "Out of Stock"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
