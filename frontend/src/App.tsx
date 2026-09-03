import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import SavedInvoices from "./pages/SavedInvoices";
import ManagerDashboard from "./pages/ManagerDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Manufacturers from "./pages/Manufacturers";
import HospitalRange from "./pages/HospitalRange";
import QualityAssurance from "./pages/QualityAssurance";
import Certifications from "./pages/Certifications";
import Services from "./pages/Services";
import { CartProvider } from "./context/cart";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes — require login */}
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
                <Route path="/saved-invoices" element={<ProtectedRoute><SavedInvoices /></ProtectedRoute>} />
                <Route path="/manager" element={<ProtectedRoute requireManager><ManagerDashboard /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
                <Route path="/manufacturers" element={<ProtectedRoute><Manufacturers /></ProtectedRoute>} />
                <Route path="/quality" element={<ProtectedRoute><QualityAssurance /></ProtectedRoute>} />
                <Route path="/certifications" element={<ProtectedRoute><Certifications /></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                <Route path="/hospital-range" element={<ProtectedRoute><HospitalRange /></ProtectedRoute>} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
