import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Phone, Package, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/cart";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const product = id ? getProductById(id) : null;
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isManager = user?.role === "manager";

  const isAvailable = product && product.inStock && product.quantity !== 0;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <Link to="/" className="text-primary hover:underline">
              Go back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="product-image-zoom pharma-card p-8 aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge
                  className={
                    isAvailable
                      ? "stock-badge-available"
                      : "stock-badge-unavailable"
                  }
                >
                  {isAvailable ? "In Stock" : "Out of Stock"}
                </Badge>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-4">
                  {product.name}
                </h1>
                <p className="text-xl text-primary font-semibold mt-2">
                  {product.strength}
                </p>
                <p className="text-muted-foreground mt-1">
                  By {product.manufacturer}
                </p>
              </div>

              <div className="text-3xl font-bold text-foreground">
                {product.price || "Contact for Price"}
              </div>

              {/* Product Details */}
              <div className="pharma-card p-6 space-y-4">
                <h3 className="font-heading font-semibold text-foreground">
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium text-foreground">
                      {product.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Strength</p>
                    <p className="font-medium text-foreground">
                      {product.strength}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Route</p>
                    <p className="font-medium text-foreground">IV / IM</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Manufacturer</p>
                    <p className="font-medium text-foreground">
                      {product.manufacturer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pharma-card p-6">
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  High-quality {product.name} manufactured under WHO-GMP
                  certified facilities. Suitable for hospital and clinical use.
                  Each batch undergoes rigorous quality control testing to
                  ensure safety and efficacy.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isManager && (
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!isAvailable}
                    onClick={() => {
                      if (!isAvailable) return;
                      addToCart(product, 1);
                      toast.success(`${product.name} added to cart`, {
                        action: {
                          label: "View Cart",
                          onClick: () => (window.location.href = "/cart"),
                        },
                      });
                    }}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isAvailable ? "Add to Cart" : "Out of Stock"}
                  </Button>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg">
                    <Package className="h-4 w-4 mr-2" />
                    Request Bulk Order
                  </Button>
                  <Button variant="outline" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Sales
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Pan-India Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">WHO-GMP</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
