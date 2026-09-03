import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Award, CheckCircle2, Globe2 } from "lucide-react";

export default function Certifications() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="bg-slate-900 py-24 text-white relative">
          <div className="absolute inset-0 bg-yellow-900/20 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-amber-50">Global Certifications</h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Recognized worldwide for stringent compliance and pharmaceutical excellence.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              
              <div className="flex bg-white items-center gap-6 p-8 rounded-2xl border border-border shadow-sm">
                 <div className="w-20 h-20 bg-amber-100 rounded-full flex shrink-0 items-center justify-center">
                    <Award className="w-10 h-10 text-amber-600" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold mb-2">WHO-GMP Certified</h3>
                   <p className="text-slate-600 text-sm">Compliant with World Health Organization Good Manufacturing Practices for parenteral production.</p>
                 </div>
              </div>

              <div className="flex bg-white items-center gap-6 p-8 rounded-2xl border border-border shadow-sm">
                 <div className="w-20 h-20 bg-blue-100 rounded-full flex shrink-0 items-center justify-center">
                    <Globe2 className="w-10 h-10 text-blue-600" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold mb-2">ISO 9001:2015</h3>
                   <p className="text-slate-600 text-sm">Certified Quality Management Systems tailored for life-saving drug formulations.</p>
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
