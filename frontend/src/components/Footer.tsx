import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoIcon from "/assets/siscon_pharma_icon.png";

const footerSections = [
  {
    title: "About Siscon Pharma",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Manufacturing", href: "/manufacturers" },
      { label: "Quality Assurance", href: "/quality" },
      { label: "Certifications", href: "/certifications" },
    ],
  },
  {
    title: "Products",
    links: [
      {
        label: "Antibiotic Injections",
        href: "/products?category=Antibiotic%20Injections",
      },
      { label: "Critical Care", href: "/products?category=Critical%20Care" },
      {
        label: "Emergency Medicines",
        href: "/products?category=Emergency%20Medicines",
      },
      {
        label: "Gastrointestinal",
        href: "/products?category=Gastrointestinal",
      },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Bulk Supply", href: "/services#bulk-supply" },
      { label: "Hospital Supply", href: "/hospital-range" },
      { label: "Distributor Enquiry", href: "/services#distributor-enquiry" },
      { label: "Export Services", href: "/services#export-services" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="pharma-footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoIcon}
                alt="Siscon Pharma"
                className="h-10 w-10 rounded-lg"
              />
              <div>
                <h3 className="font-heading font-bold text-lg text-accent">
                  Siscon Pharma
                </h3>
                <p className="text-xs text-[hsl(var(--footer-foreground))]/70">
                  Your Health, Our Innovation
                </p>
              </div>
            </div>
            <p className="text-sm text-[hsl(var(--footer-foreground))]/80 mb-6 max-w-md">
              Leading pharmaceutical manufacturer specializing in hospital
              injectables and critical care medicines. Committed to quality,
              innovation, and healthcare excellence across India.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:khantharsh88@gmail.com"
                className="flex items-center gap-3 text-sm text-[hsl(var(--footer-foreground))]/80 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>khantharsh88@gmail.com</span>
              </a>
              <a
                href="tel:+919512131217"
                className="flex items-center gap-3 text-sm text-[hsl(var(--footer-foreground))]/80 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span>+91 95121 31217</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-[hsl(var(--footer-foreground))]/80">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span>
                  80FT Road,G-104 Sitaji Township
                  <br />
                  Rajkot, Gujarat - 360004
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold text-accent mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[hsl(var(--footer-foreground))]/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[hsl(var(--footer-foreground))]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[hsl(var(--footer-foreground))]/60">
              © 2024 Siscon Pharma. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-[hsl(var(--footer-foreground))]/60 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-[hsl(var(--footer-foreground))]/60 hover:text-accent transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/refund"
                className="text-sm text-[hsl(var(--footer-foreground))]/60 hover:text-accent transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
