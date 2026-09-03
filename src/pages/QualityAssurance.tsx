import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Crosshair, SearchCheck } from "lucide-react";

export default function QualityAssurance() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="bg-slate-900 py-24 text-white relative">
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-blue-50">Quality Assurance</h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Our uncompromising commitment to purity, stability, and patient safety.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">100% Inspection</h3>
                <p className="text-slate-600 text-sm">
                  Complete visual and systemic inspection of every batch using advanced automated sensors.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sterility Testing</h3>
                <p className="text-slate-600 text-sm">
                  Comprehensive bio-burden monitoring and endotoxin testing prior to market release.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Crosshair className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Stability Data</h3>
                <p className="text-slate-600 text-sm">
                  Rigorous climatic zone testing to ensure shelf-life efficacy across diverse geographies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
