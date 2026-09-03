import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Stethoscope, Activity, Syringe, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HospitalRange() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        
        <div className="bg-emerald-900 py-24 text-white relative">
          <div className="container mx-auto px-4 text-center z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-emerald-50">Hospital Range</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Comprehensive institutional healthcare solutions for ICU, emergency, and general wards.
            </p>
          </div>
          <div className="absolute inset-0 bg-emerald-950/50 backdrop-blur-sm z-0"></div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-6">Built for Institutional Excellence</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Our hospital range is specifically curated to meet the bulk volume demands of major healthcare institutions. We provide specialized packing, bulk pricing, and priority dispatch for all registered hospital partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { title: "Critical Care", icon: Activity, desc: "Life-saving injectables for ICU patients", color: "text-red-500", bg: "bg-red-50" },
                { title: "Surgical Range", icon: Syringe, desc: "Anesthetics and post-op care solutions", color: "text-blue-500", bg: "bg-blue-50" },
                { title: "Emergency", icon: Cross, desc: "Rapid action IV fluids and medications", color: "text-amber-500", bg: "bg-amber-50" },
                { title: "General Ward", icon: Stethoscope, desc: "Everyday essentials for patient recovery", color: "text-emerald-500", bg: "bg-emerald-50" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow text-center">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${item.bg}`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3">Partner with Siscon Pharma</h3>
                <p className="text-slate-600 mb-6">
                  Register your hospital with us to access exclusive institutional pricing, dedicated account managers, and priority inventory allocation.
                </p>
                <div className="flex gap-4">
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link to="/contact">Request Hospital Registration</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/products">Browse Full Catalog</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="w-full aspect-square rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-8">
                   <div className="text-center">
                     <span className="block text-4xl mb-2">🏥</span>
                     <span className="font-bold text-emerald-800">500+ Partner Hospitals</span>
                   </div>
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
