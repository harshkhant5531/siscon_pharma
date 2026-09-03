import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="bg-gradient-to-r from-primary to-accent py-20 text-white relative">
          <div className="container mx-auto px-4 text-center z-10 relative">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Contact Siscon Pharma
            </h1>
            <p className="text-lg opacity-90 max-w-xl mx-auto">
              We're here to assist you with bulk orders, distribution inquiries,
              and product support.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-slate-900 font-heading">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">
                        Phone
                      </h4>
                      <p className="text-slate-600 mt-1">
                        For urgent requirements and orders:
                      </p>
                      <p className="text-primary font-semibold text-lg mt-1">
                        +91 95121 31217
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">
                        Email Address
                      </h4>
                      <p className="text-slate-600 mt-1">
                        Drop us a line anytime:
                      </p>
                      <p className="text-primary font-semibold mt-1">
                        sisconpharma14@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">
                        Corporate Office
                      </h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        80FT Road,G-104 Sitaji Township,
                        <br />
                        Rajkot, Gujarat - 360004
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">
                        Working Hours
                      </h4>
                      <p className="text-slate-600 mt-1">
                        Mon - Sat: 9:00 AM to 7:00 PM
                      </p>
                      <p className="text-slate-500 text-sm">
                        24/7 support available for emergency hospital
                        requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 border border-border shadow-xl shadow-slate-200/50">
                <h3 className="text-2xl font-bold font-heading mb-6">
                  Send a Message
                </h3>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();

                    const form = e.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);

                    const firstName =
                      (formData.get("firstName") as string)?.trim() || "";
                    const lastName =
                      (formData.get("lastName") as string)?.trim() || "";
                    const email =
                      (formData.get("email") as string)?.trim() || "";
                    const phone =
                      (formData.get("phone") as string)?.trim() || "";
                    const message =
                      (formData.get("message") as string)?.trim() || "";

                    const subject = encodeURIComponent(
                      "New enquiry from Siscon Pharma website",
                    );
                    const body = encodeURIComponent(
                      `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
                    );

                    window.location.href = `mailto:sisconpharma14@gmail.com?subject=${subject}&body=${body}`;
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        First Name
                      </label>
                      <Input
                        name="firstName"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Last Name
                      </label>
                      <Input name="lastName" placeholder="Last Name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <Input name="phone" type="tel" placeholder="+91" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 mt-4"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
