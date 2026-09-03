import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PackageOpen, Handshake, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="bg-slate-900 py-24 text-white relative">
          <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-emerald-400">Our Services</h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Trusted by institutions globally for seamless supply chain execution.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="space-y-12">
              
              <div id="bulk-supply" className="flex flex-col md:flex-row bg-white items-center gap-8 p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                 <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex shrink-0 items-center justify-center">
                    <PackageOpen className="w-12 h-12 text-emerald-600" />
                 </div>
                 <div className="flex-1">
                   <h2 className="text-2xl font-bold mb-3">Bulk Supply Procurement</h2>
                   <p className="text-slate-600 mb-6 leading-relaxed">
                     We cater to high-volume orders for state health departments, NGO stockpiles, and large corporate hospital chains. Enjoy volume-based pricing, dedicated account management, and strictly met production timelines.
                   </p>
                   <Button asChild variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"><Link to="/contact">Request Bulk Quote</Link></Button>
                 </div>
              </div>

              <div id="distributor-enquiry" className="flex flex-col md:flex-row-reverse bg-white items-center gap-8 p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                 <div className="w-24 h-24 bg-blue-100 rounded-2xl flex shrink-0 items-center justify-center">
                    <Handshake className="w-12 h-12 text-blue-600" />
                 </div>
                 <div className="flex-1 text-left md:text-right">
                   <h2 className="text-2xl font-bold mb-3">Distributor Partnership</h2>
                   <p className="text-slate-600 mb-6 leading-relaxed">
                     Expand your pharmaceutical portfolio by partnering with Siscon Pharma. We provide our localized distributors with high-demand critical care injectables, marketing support, and exclusive territorial rights.
                   </p>
                   <Button asChild variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50"><Link to="/contact">Become a Partner</Link></Button>
                 </div>
              </div>

              <div id="export-services" className="flex flex-col md:flex-row bg-white items-center gap-8 p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                 <div className="w-24 h-24 bg-purple-100 rounded-2xl flex shrink-0 items-center justify-center">
                    <Plane className="w-12 h-12 text-purple-600" />
                 </div>
                 <div className="flex-1">
                   <h2 className="text-2xl font-bold mb-3">Global Export Services</h2>
                   <p className="text-slate-600 mb-6 leading-relaxed">
                     Meeting international regulatory standards allows us to export our life-saving medicines across borders. Our export division manages dossier submissions, international cold chain logistics, and customs compliance perfectly.
                   </p>
                   <Button asChild variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50"><Link to="/contact">Export Division Enquiry</Link></Button>
                 </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
