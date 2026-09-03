import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Award, MapPin, Target } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="bg-primary py-20 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 blur-3xl rounded-full bg-white max-w-xl mx-auto mt-20" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">About Siscon Pharma</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Delivering high-quality, life-saving injectable medicines to healthcare institutions across the nation.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold font-heading text-slate-900 mb-6">Our Mission & Vision</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Founded with a vision to revolutionize the availability of critical care injectables, Siscon Pharma has grown into a trusted partner for over 1000 hospitals. We believe that no life should be compromised due to a lack of quality medicines.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our mission is to establish a robust, pan-India supply chain that ensures life-saving drugs reach every corner of the country efficiently, maintaining the highest standards of safety and WHO-GMP compliance.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
                  <p className="text-sm text-muted-foreground">Rigorous quality checks at every level</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">WHO-GMP</h3>
                  <p className="text-sm text-muted-foreground">Certified manufacturing facilities</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Patient First</h3>
                  <p className="text-sm text-muted-foreground">Committed to healthcare outcomes</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Pan India</h3>
                  <p className="text-sm text-muted-foreground">Robust distribution network</p>
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
