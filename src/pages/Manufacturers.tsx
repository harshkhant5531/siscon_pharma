import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Factory, Cog, CheckCircle2 } from "lucide-react";

export default function Manufacturers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        
        <div className="bg-slate-900 py-24 text-white relative">
          <div className="container mx-auto px-4 text-center z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-amber-50">Manufacturing Excellence</h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Our products are produced in state-of-the-art facilities compliant with global standards.
            </p>
          </div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Factory className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">WHO-GMP Facilities</h3>
                <p className="text-slate-600 text-sm">
                  Partnered with world-class hygienic manufacturing units tailored specifically for sterile injectable production.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Stringent QC</h3>
                <p className="text-slate-600 text-sm">
                  Every batch undergoes rigorous lab testing to ensure zero contamination and 100% efficacy before dispatch.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Cog className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Advanced Tech</h3>
                <p className="text-slate-600 text-sm">
                  Automated filling lines and lyophilization technologies to ensure product stability and maximum shelf-life.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
              <h2 className="text-3xl font-bold font-heading mb-6 text-slate-900 text-center">Our Commitment to Safety</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
                  The manufacturing of injectables requires the highest order of precision and environmental control. Siscon Pharma only partners with manufacturers that utilize sophisticated HVAC systems, Class 100 cleanrooms, and automated sterilization protocols.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-semibold text-slate-800">ISO 9001:2015 Certified</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-semibold text-slate-800">Cleanroom Class 10,000</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-semibold text-slate-800">Automated Visual Inspection</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-semibold text-slate-800">Cold Chain Management</span>
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
