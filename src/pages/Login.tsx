import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, UserPlus, ArrowRight, Shield, Truck, BarChart3 } from "lucide-react";
import PageLoader from "@/components/PageLoader";



/* ──────────────────────── Floating Molecule Dots ──────────────────────── */
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="floating-orb"
        style={{
          width: `${20 + i * 15}px`,
          height: `${20 + i * 15}px`,
          left: `${10 + i * 15}%`,
          top: `${15 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${6 + i * 2}s`,
        }}
      />
    ))}
  </div>
);

/* ────────────────────────── Feature Highlights ─────────────────────────── */
const features = [
  { icon: Shield, title: "Secure Platform", desc: "Enterprise-grade encryption" },
  { icon: Truck, title: "Supply Chain", desc: "End-to-end tracking" },
  { icon: BarChart3, title: "Analytics", desc: "Real-time business insights" },
];

/* ══════════════════════════ MAIN LOGIN COMPONENT ══════════════════════════ */
const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let loggedInUser;
      if (isRegister) {
        loggedInUser = await register(email, password, name);
      } else {
        loggedInUser = await login(email, password);
      }
      if (loggedInUser?.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Inline styles for animations ── */}
      <style>{`
        /* ─── Capsule Loader ─── */
        .capsule-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .capsule {
          position: relative;
          width: 28px;
          height: 56px;
          border-radius: 14px;
          overflow: hidden;
          animation: capsuleBounce 1.2s ease-in-out infinite;
        }
        .capsule-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(135deg, hsl(295 65% 72%), hsl(295 55% 60%));
          border-radius: 14px 14px 0 0;
        }
        .capsule-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(135deg, hsl(225 35% 60%), hsl(225 30% 50%));
          border-radius: 0 0 14px 14px;
        }
        .capsule-shine {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 8px;
          height: 45%;
          background: linear-gradient(180deg, rgba(255,255,255,0.6), transparent);
          border-radius: 6px;
        }
        .capsule-shadow {
          width: 20px;
          height: 6px;
          border-radius: 50%;
          background: rgba(0,0,0,0.15);
          animation: capsuleShadow 1.2s ease-in-out infinite;
        }
        @keyframes capsuleBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-18px) rotate(-8deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes capsuleShadow {
          0%, 100% { transform: scaleX(1); opacity:0.3; }
          25% { transform: scaleX(0.6); opacity:0.15; }
          50% { transform: scaleX(1); opacity:0.3; }
          75% { transform: scaleX(0.8); opacity:0.2; }
        }

        /* ─── Full-screen loader overlay ─── */
        .login-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
        }
        .dark .login-loader-overlay {
          background: rgba(15,18,30,0.9);
        }
        .login-loader-overlay p {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: hsl(225 15% 50%);
          animation: loaderPulse 1.5s ease-in-out infinite;
        }
        @keyframes loaderPulse {
          0%, 100% { opacity:0.6; }
          50% { opacity:1; }
        }

        /* ─── Floating orbs ─── */
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, hsl(295 65% 72% / 0.15), hsl(225 30% 55% / 0.1));
          animation: floatOrb ease-in-out infinite;
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          33% { transform: translateY(-30px) translateX(15px) scale(1.1); }
          66% { transform: translateY(15px) translateX(-10px) scale(0.95); }
        }

        /* ─── Left panel pulse ring ─── */
        .pulse-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          animation: pulseExpand 4s ease-out infinite;
        }
        @keyframes pulseExpand {
          0% { transform: scale(0.8); opacity:0.5; }
          100% { transform: scale(2.2); opacity:0; }
        }

        /* ─── Slide-up entrance ─── */
        .slide-up {
          opacity: 0;
          transform: translateY(24px);
          animation: slideUp 0.7s ease-out forwards;
        }
        .slide-up-delay-1 { animation-delay: 0.15s; }
        .slide-up-delay-2 { animation-delay: 0.3s; }
        .slide-up-delay-3 { animation-delay: 0.45s; }
        @keyframes slideUp {
          to { opacity:1; transform:translateY(0); }
        }

        /* ─── Input focus glow ─── */
        .login-input:focus-within {
          box-shadow: 0 0 0 3px hsl(295 65% 72% / 0.15);
          border-color: hsl(295 65% 72% / 0.5);
          transition: all 0.3s ease;
        }

        /* ─── Feature card hover ─── */
        .feature-card {
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.15);
        }
      `}</style>

      {/* ── Loader Overlay ── */}
      {loading && (
        <PageLoader message={isRegister ? "Creating your account..." : "Signing you in..."} />
      )}

      {/* ══════════════ MAIN LAYOUT ══════════════ */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* ─── LEFT: Brand Panel ─── */}
        <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-white flex-col items-center justify-center p-12">
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pulse-ring w-[300px] h-[300px]" />
            <div className="pulse-ring w-[300px] h-[300px]" style={{ animationDelay: "1.3s" }} />
            <div className="pulse-ring w-[300px] h-[300px]" style={{ animationDelay: "2.6s" }} />
          </div>

          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 max-w-md text-center space-y-8">
            <div className="slide-up">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl mb-6">
                <img
                  src="/assets/siscon_pharma_icon.png"
                  alt="Siscon Pharma"
                  className="h-20 w-auto drop-shadow-lg"
                />
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight">Siscon Pharma</h1>
              <p className="text-white/70 mt-3 text-lg">Your Trusted Pharmaceutical Partner</p>
            </div>

            {/* Feature cards */}
            <div className="space-y-3 slide-up slide-up-delay-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="feature-card flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-left"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{f.title}</p>
                    <p className="text-white/60 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Form Panel ─── */}
        <div className="flex-1 flex items-center justify-center relative bg-gradient-to-br from-background via-background to-secondary/30 p-4 sm:p-8">
          <FloatingOrbs />

          <div className={`w-full max-w-[440px] relative z-10 ${mounted ? "slide-up" : "opacity-0"}`}>
            {/* Mobile logo (visible only on small screens) */}
            <div className="lg:hidden text-center mb-8 slide-up">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 shadow-lg mb-3">
                <img
                  src="/assets/siscon_pharma_icon.png"
                  alt="Siscon Pharma"
                  className="h-14 w-auto"
                />
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Siscon Pharma</h1>
            </div>

            {/* Form card */}
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl shadow-primary/5 p-8 sm:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {isRegister ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  {isRegister
                    ? "Join Siscon Pharma to get started"
                    : "Sign in to access your dashboard"}
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center animate-fade-in flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {isRegister && (
                  <div className="space-y-2 slide-up">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground/80">Full Name</Label>
                    <div className="login-input rounded-xl border border-border/60 transition-all duration-300">
                      <Input
                        id="name"
                        type="text"
                        placeholder="First Name Last Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground/80">Email Address</Label>
                  <div className="login-input rounded-xl border border-border/60 transition-all duration-300">
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground/80">Password</Label>
                  <div className="login-input rounded-xl border border-border/60 transition-all duration-300 relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="h-12 border-0 bg-transparent text-base pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted/50"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 group mt-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : isRegister ? (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle auth mode */}
              <div className="mt-8 pt-6 border-t border-border/40 text-center">
                <p className="text-sm text-muted-foreground">
                  {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(!isRegister);
                      setError("");
                    }}
                    className="text-primary font-semibold hover:text-accent transition-colors duration-200"
                  >
                    {isRegister ? "Sign In" : "Create Account"}
                  </button>
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground/60 mt-6">
              © 2026 Siscon Pharma. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
