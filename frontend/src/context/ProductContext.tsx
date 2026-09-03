import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/components/ProductCard";
import { products as fallbackProducts } from "@/data/products";
import { api } from "@/lib/api";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: any) => void;
  updateProduct: (id: string, product: any) => void;
  removeProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      if (data && data.length > 0) {
        setProducts(data);
      }
      // If API returns empty, keep fallback data
    } catch (err) {
      console.warn("API unavailable, using local product data:", err);
      setError("Using offline data");
      // Keep fallback products — graceful degradation
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: any) => {
    try {
      // Create local preview if image is a File
      const optimisticProduct = { ...product };
      if (product.image instanceof File) {
        optimisticProduct.image = URL.createObjectURL(product.image);
      }
      setProducts((prev) => [...prev, optimisticProduct as Product]);

      if (!error) {
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === "boolean") {
            formData.append(key, value ? "true" : "false");
          } else {
            formData.append(key, String(value ?? ""));
          }
        });
        const savedProduct = await api.createProduct(formData as any);
        setProducts((prev) =>
          prev.map((p) => (p.id === optimisticProduct.id ? savedProduct : p)),
        );
      }
    } catch (err) {
      console.error("Failed to add product to backend", err);
    }
  };

  const updateProduct = async (id: string, product: any) => {
    try {
      const optimisticProduct = { ...product };
      if (product.image instanceof File) {
        optimisticProduct.image = URL.createObjectURL(product.image);
      }
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? (optimisticProduct as Product) : p)),
      );
      if (!error) {
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === "boolean") {
            formData.append(key, value ? "true" : "false");
          } else {
            formData.append(key, String(value ?? ""));
          }
        });
        const savedProduct = await api.updateProduct(id, formData as any);
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? savedProduct : p)),
        );
      }
    } catch (err) {
      console.error("Failed to update product on backend", err);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (!error) {
        await api.deleteProduct(id);
      }
    } catch (err) {
      console.error("Failed to delete product from backend", err);
    }
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        removeProduct,
        getProductById,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
