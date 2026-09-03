import { Search, ShoppingCart, User, Menu, ChevronDown, ArrowRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "/assets/siscon_pharma.png";
import { useCart } from "@/context/cart";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Manufacturers", href: "/manufacturers" },
  { label: "Hospital Range", href: "/hospital-range" },
  { label: "My Invoices", href: "/saved-invoices" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useProducts();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter((p) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, products]);

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = Array.from(new Set(products.map(p => p.category))) as string[];

  // Search Bar Component
  const SearchBar = ({ isMobile = false }) => (
    <div className={`relative ${isMobile ? 'w-full' : 'flex-1 max-w-xl mx-8'}`} ref={!isMobile ? searchRef : undefined}>
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Medicines, Categories..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-10 pr-4 bg-secondary text-foreground border-border rounded-full h-10 transition-all focus:ring-2 focus:ring-primary"
        />
      </form>

      {/* Live Search Suggestions Dropdown */}
      {showSuggestions && searchResults.length > 0 && searchQuery.trim() && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="py-2">
            {searchResults.map((product) => (
              <button
                key={product.id}
                className="w-full text-left px-4 py-2 hover:bg-muted/50 flex items-center justify-between"
                onClick={() => {
                  setShowSuggestions(false);
                  setSearchQuery("");
                  navigate(`/product/${product.id}`);
                }}
              >
                <div>
                  <div className="font-medium text-sm text-foreground">{product.name}</div>
                  <div className="text-xs text-muted-foreground">{product.category}</div>
                </div>
                <div className="text-xs text-primary font-medium">{product.price}</div>
              </button>
            ))}
          </div>
          <div 
            className="px-4 py-2 bg-muted/30 border-t border-border text-center text-sm text-primary cursor-pointer hover:bg-muted/50"
            onClick={handleSearchSubmit}
          >
            View all results for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Main Header */}
      <div className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Siscon Pharma - Your Health, Our Innovation"
                className="h-12 md:h-14 w-auto"
              />
            </Link>

            <SearchBar />

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-foreground font-medium">
                    {user?.name || user?.email}
                  </span>
                  {user?.role === 'manager' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground ml-2"
                      onClick={() => navigate('/manager')}
                    >
                      Dashboard
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:bg-secondary"
                    onClick={() => { logout(); navigate('/login'); }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:bg-secondary hidden sm:flex"
                  onClick={() => navigate('/login')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Login / Register
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary relative"
                aria-label="View cart"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                    {totalCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground hover:bg-secondary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <SearchBar isMobile={true} />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground relative shadow-md">
        <div className="container mx-auto px-4">
          <ul
            className={`${mobileMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row items-start md:items-center py-2 md:py-0 w-full`}
          >
            <li>
              <Link
                to="/"
                className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${location.pathname === '/' ? 'bg-primary-foreground/10' : ''}`}
              >
                Home
              </Link>
            </li>

            {/* Products Mega Menu Hover */}
            <li className="group relative">
              <div
                className={`flex items-center cursor-pointer px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${location.pathname.startsWith('/product') ? 'bg-primary-foreground/10' : ''}`}
                onClick={() => navigate('/products')}
              >
                Products <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </div>
              
              {/* Mega Dropdown */}
              <div className="hidden md:block absolute top-[100%] left-0 w-[400px] bg-background text-foreground shadow-xl border border-border rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top translate-y-2 group-hover:translate-y-0">
                <div className="p-4 grid grid-cols-2 gap-4">
                  {categories.slice(0,6).map((cat) => (
                    <div 
                      key={cat} 
                      className="text-sm hover:text-primary cursor-pointer p-2 rounded hover:bg-muted font-medium transition-colors"
                      onClick={() => {
                        navigate(`/products?category=${encodeURIComponent(cat)}`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                  <div className="col-span-2 mt-2 pt-3 border-t border-border">
                    <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
                      View All Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Mobile Submenu fallback */}
              {mobileMenuOpen && (
                <div className="md:hidden pl-8 pr-4 py-2 space-y-2 bg-primary-foreground/5 w-full">
                  {categories.map(cat => (
                    <div 
                      key={cat} 
                      className="text-sm py-1 cursor-pointer hover:text-accent font-light"
                      onClick={() => {
                        navigate(`/products?category=${encodeURIComponent(cat)}`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </li>

            {navLinks.slice(1).map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${location.pathname === link.href ? 'bg-primary-foreground/10' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
