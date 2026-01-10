import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "/assets/siscon_pharma.png";
import { useCart } from "@/context/cart";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
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

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div className="bg-background border-b border-border">
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

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Medicines..."
                  className="w-full pl-10 bg-secondary text-foreground border-border rounded-full h-10"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-secondary hidden sm:flex"
              >
                <User className="h-4 w-4 mr-2" />
                Login / Register
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary relative"
                aria-label="View cart"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {totalCount}
                </span>
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Medicines..."
                className="w-full pl-10 bg-secondary text-foreground border-border rounded-full h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ul
            className={`${mobileMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-0 py-2 md:py-0`}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="block px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
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
