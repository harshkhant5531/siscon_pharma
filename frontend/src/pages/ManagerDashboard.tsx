import React, { useState, useEffect } from "react";
import {
  Search,
  Package,
  Activity,
  CalendarDays,
  Command as CommandIcon,
  AlertCircle,
  RotateCcw,
  HeartPulse,
  Info,
  ShieldAlert,
  Lock,
  Unlock,
  IndianRupee,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/components/PageLoader";

export default function ManagerDashboard() {
  const { products, loading, addProduct, updateProduct, removeProduct } =
    useProducts();
  const { user } = useAuth();
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  // Controlled Substance Vault State
  const [showVaultMode, setShowVaultMode] = useState(false);
  const [vaultPin, setVaultPin] = useState("");
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const handleUnlockVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (vaultPin === "1234") {
      setVaultUnlocked(true);
      toast.success("Vault Unlocked: High-Security Mode Active");
    } else {
      toast.error("Invalid Vault PIN. Access Denied.");
      setVaultPin("");
    }
  };

  // Undo Timeline State
  const [actionHistory, setActionHistory] = useState<
    { id: string; name: string; type: string; payload?: any; time: Date }[]
  >([]);

  const handleUndo = (action: any) => {
    if (action.type === "delete") {
      addProduct(action.payload);
      toast.success(`Restored ${action.name} successfully!`);
      setActionHistory((prev) => prev.filter((a) => a !== action));
    }
  };

  const [open, setOpen] = useState(false);
  const [searchCmd, setSearchCmd] = useState("");
  const [previewProductId, setPreviewProductId] = useState<string | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getExpiryDays = (product: any) => {
    if (product.expiryDate) {
      const ms = new Date(product.expiryDate).getTime() - new Date().getTime();
      return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    }
    return Infinity; // Return Infinity so it naturally falls out of the 'expiring soon' lists
  };

  const getExpiryColor = (days: number) => {
    if (days < 30) return "text-red-600 bg-red-100 border-red-200";
    if (days < 90) return "text-amber-600 bg-amber-100 border-amber-200";
    return "text-green-600 bg-green-100 border-green-200";
  };

  const [formData, setFormData] = useState({
    name: "",
    strength: "",
    manufacturer: "Siscon Pharma",
    price: "",
    image: "",
    category: "Antibiotic Injections",
    expiryDate: "",
    quantity: "",
  });

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(formData.image || "");
      return;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile, formData.image]);

  const [inStock, setInStock] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.strength ||
      !formData.price ||
      !formData.image
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editId) {
      updateProduct(editId, {
        id: editId,
        ...formData,
        image: imageFile || formData.image,
        inStock,
      });
      toast.success("Product updated successfully");
      setEditId(null);
    } else {
      addProduct({
        id: Date.now().toString(),
        ...formData,
        image: imageFile || formData.image,
        inStock,
      });
      toast.success("Product added successfully");
    }

    setFormData({
      name: "",
      strength: "",
      manufacturer: "Siscon Pharma",
      price: "",
      image: "",
      category: "Antibiotic Injections",
      expiryDate: "",
      quantity: "",
    });
    setImageFile(null);
    setInStock(true);
  };

  const handleEdit = (product: any) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      strength: product.strength || "",
      manufacturer: product.manufacturer || "",
      price: product.price || "",
      image: product.image || "",
      category: product.category,
      expiryDate: product.expiryDate
        ? new Date(product.expiryDate).toISOString().split("T")[0]
        : "",
      quantity: product.quantity?.toString() || "0",
    });
    setImageFile(null);
    setInStock(product.inStock);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <PageLoader message="Loading dashboard..." />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight">Siscon Admin</div>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-800 text-amber-500 border-amber-500/50 hover:bg-slate-700 hover:text-amber-400 font-bold"
            onClick={() => setShowVaultMode(!showVaultMode)}
          >
            <ShieldAlert className="w-4 h-4 mr-2" />
            {showVaultMode ? "Exit Vault" : "Vault Access"}
          </Button>
          <a href="/" className="text-sm hover:underline text-slate-300">
            View Storefront
          </a>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {showVaultMode ? (
            <div className="mb-8">
              {!vaultUnlocked ? (
                <Card className="max-w-md mx-auto mt-20 border-amber-200 bg-amber-50/30 shadow-2xl">
                  <CardHeader className="text-center">
                    <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <CardTitle className="text-xl">
                      Controlled Substance Vault
                    </CardTitle>
                    <CardDescription>
                      Step-up authentication required. Enter PIN (1234)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUnlockVault} className="space-y-4">
                      <Input
                        type="password"
                        placeholder="4-Digit PIN"
                        value={vaultPin}
                        onChange={(e) => setVaultPin(e.target.value)}
                        className="text-center text-2xl tracking-[1em]"
                        autoFocus
                      />
                      <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700"
                      >
                        Authenticate
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b-2 border-amber-500 pb-4">
                    <div>
                      <h1 className="text-3xl font-bold font-heading text-slate-900 flex items-center gap-3">
                        <Unlock className="w-8 h-8 text-amber-500" /> Vault
                        Controls
                      </h1>
                      <p className="text-amber-700 font-medium mt-2">
                        Strict chain-of-custody for all controlled inventory.
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Vault Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                      <p className="text-xs font-semibold text-amber-600 uppercase">
                        Total Items
                      </p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">
                        {products.length}
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                      <p className="text-xs font-semibold text-red-600 uppercase">
                        Zero Stock
                      </p>
                      <p className="text-3xl font-bold text-red-700 mt-1">
                        {
                          products.filter((p) => !p.inStock || p.quantity === 0)
                            .length
                        }
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                      <p className="text-xs font-semibold text-orange-600 uppercase">
                        Low Stock
                      </p>
                      <p className="text-3xl font-bold text-orange-700 mt-1">
                        {
                          products.filter(
                            (p) => p.quantity > 0 && p.quantity < 100,
                          ).length
                        }
                      </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                      <p className="text-xs font-semibold text-emerald-600 uppercase">
                        Total Units
                      </p>
                      <p className="text-3xl font-bold text-emerald-700 mt-1">
                        {products.reduce(
                          (sum, p) => sum + (p.quantity || 0),
                          0,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {products.map((p) => {
                      const expiryDays = getExpiryDays(p);
                      const stockStatus =
                        p.quantity === 0
                          ? "DEPLETED"
                          : p.quantity < 100
                            ? "LOW"
                            : "OK";
                      const stockColor =
                        stockStatus === "DEPLETED"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : stockStatus === "LOW"
                            ? "bg-orange-100 text-orange-700 border-orange-200"
                            : "bg-green-100 text-green-700 border-green-200";
                      const expiryLabel =
                        expiryDays === Infinity
                          ? "No Expiry Set"
                          : `${expiryDays}d to expiry`;
                      const expiryColor =
                        expiryDays < 30
                          ? "text-red-600"
                          : expiryDays < 90
                            ? "text-amber-600"
                            : "text-green-600";

                      return (
                        <Card
                          key={p.id}
                          className="border-amber-200 shadow-sm relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 opacity-5 bg-amber-500 h-full w-48 hidden md:block"></div>
                          <CardContent className="p-4 flex flex-col md:flex-row justify-between gap-6 relative z-10">
                            <div className="flex items-start gap-4 flex-1">
                              <img
                                src={p.image}
                                className="w-16 h-16 rounded object-contain bg-white border border-border shrink-0 p-1"
                              />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg">{p.name}</h4>
                                <p className="text-sm font-medium text-slate-600">
                                  LOT-{p.id.substring(0, 6).toUpperCase()} •{" "}
                                  {p.strength} • {p.category}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <span
                                    className={`px-2 py-1 text-xs font-bold rounded border ${stockColor}`}
                                  >
                                    {stockStatus}: {p.quantity || 0} units
                                  </span>
                                  <span
                                    className={`text-xs font-semibold ${expiryColor}`}
                                  >
                                    {expiryLabel}
                                  </span>
                                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                                    {p.manufacturer}
                                  </span>
                                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">
                                    {p.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-1/3 bg-slate-50 p-3 rounded-lg border border-border flex flex-col justify-center">
                              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                                Custody Log
                              </p>
                              <p className="text-xs text-slate-700 leading-relaxed mb-1">
                                •{" "}
                                {new Date(
                                  p.updatedAt || Date.now(),
                                ).toLocaleDateString()}{" "}
                                - Last modified by {user?.name || "Manager"}
                              </p>
                              <p className="text-xs text-slate-700 leading-relaxed mb-1">
                                •{" "}
                                {new Date(
                                  p.createdAt || Date.now(),
                                ).toLocaleDateString()}{" "}
                                - Product registered
                              </p>
                              {expiryDays !== Infinity && (
                                <p
                                  className={`text-xs leading-relaxed font-semibold ${expiryColor}`}
                                >
                                  • Expiry:{" "}
                                  {new Date(p.expiryDate!).toLocaleDateString()}{" "}
                                  ({expiryDays} days remaining)
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold font-heading text-slate-900">
                    Manager Dashboard
                  </h1>
                  <p className="text-slate-500 mt-2">
                    Manage your clinical products and inventory
                  </p>
                </div>
                <div
                  className="hidden md:flex items-center text-sm font-medium text-muted-foreground bg-white border border-border px-3 py-1.5 rounded-lg shadow-sm gap-2 opacity-80 select-none cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setOpen(true)}
                >
                  <Search className="w-4 h-4" />
                  <span>Search & Quick Actions</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-2">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </div>

              {/* Daily Briefing & Expiry Radar */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <Activity className="w-24 h-24" />
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Daily Briefing
                    </p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 z-10">
                      Overview
                    </h3>

                    <div className="mt-6 space-y-3 text-sm font-medium">
                      <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-lg border border-white/40 group relative cursor-help">
                        <span className="flex items-center gap-2 text-slate-700">
                          <div className="w-2 h-2 rounded-full bg-red-500" />{" "}
                          Out of Stock
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-red-700 font-bold">
                            {
                              products.filter(
                                (p) => !p.inStock || p.quantity === 0,
                              ).length
                            }
                          </span>
                          <Info className="w-4 h-4 text-slate-400" />
                        </div>

                        <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-slate-900 text-white text-xs rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <b>Explain this number:</b> <br />
                          Counts every catalog item that either has its quantity
                          hitting strictly 0, or is manually toggled offline.
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-lg border border-white/40 group relative cursor-help">
                        <span className="flex items-center gap-2 text-slate-700">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />{" "}
                          Low Stock (&lt;100)
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-700 font-bold">
                            {
                              products.filter(
                                (p) => p.quantity > 0 && p.quantity < 100,
                              ).length
                            }
                          </span>
                          <Info className="w-4 h-4 text-slate-400" />
                        </div>

                        <div className="absolute bottom-full left-12 mb-2 w-48 p-2 bg-slate-900 text-white text-xs rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <b>Explain this number:</b> <br />
                          These are items in dangerous supply zones (above 0,
                          but under 100). Prioritize reordering these
                          immediately.
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-lg border border-white/40 group relative cursor-help">
                        <span className="flex items-center gap-2 text-slate-700">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />{" "}
                          Expiring (&lt;30d)
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-700 font-bold">
                            {
                              products.filter((p) => getExpiryDays(p) < 30)
                                .length
                            }
                          </span>
                          <Info className="w-4 h-4 text-slate-400" />
                        </div>

                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 text-white text-xs rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                          <b>Explain this number:</b> <br />
                          Subtracts today's date from the physical batch expiry
                          dates you entered. Less than 30 days means you must
                          return these to supplier or destroy them soon.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 overflow-hidden border-border bg-white shadow-sm flex flex-col">
                  <CardHeader className="bg-slate-50 border-b border-border px-6 py-4 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-slate-500" />
                      <CardTitle className="text-base font-bold">
                        Expiry Radar
                      </CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      Auto-flagged batches
                    </span>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 relative">
                    <div className="absolute inset-0 overflow-y-auto divide-y divide-border custom-scrollbar">
                      {products
                        .map((p) => ({ ...p, days: getExpiryDays(p) }))
                        .filter((p) => p.days !== Infinity)
                        .sort((a, b) => a.days - b.days)
                        .slice(0, 5)
                        .map((p, idx) => (
                          <div
                            key={p.id}
                            className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                          >
                            <div className="flex items-center gap-4 overflow-hidden w-full max-w-[80%]">
                              <span className="text-slate-300 font-bold text-lg w-4">
                                {idx + 1}
                              </span>
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 rounded border border-border shrink-0 object-contain bg-white p-0.5"
                              />
                              <div className="truncate flex-1">
                                <p className="text-sm font-semibold truncate text-slate-900 group-hover:text-primary transition-colors">
                                  {p.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  LOT-{p.id.substring(0, 6).toUpperCase()} •{" "}
                                  {p.category}
                                </p>
                              </div>
                            </div>
                            <div
                              className={`text-xs font-bold px-3 py-1.5 rounded-full border shrink-0 ${getExpiryColor(p.days)}`}
                            >
                              {p.days} days left
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Category Health Score Widget */}
              <div className="mb-8">
                <h2 className="text-xl font-bold font-heading mb-4 text-slate-900 flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-primary" /> Category
                  Health Score
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from(new Set(products.map((p) => p.category))).map(
                    (cat) => {
                      const catProducts = products.filter(
                        (p) => p.category === cat,
                      );
                      let score = 100;
                      catProducts.forEach((p) => {
                        if (!p.inStock || p.quantity === 0) score -= 15;
                        else if (p.quantity < 100) score -= 5;
                        if (getExpiryDays(p) < 30) score -= 10;
                      });
                      score = Math.max(0, score);
                      const color =
                        score >= 90
                          ? "bg-green-100 text-green-700 border-green-200"
                          : score >= 70
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : "bg-red-100 text-red-700 border-red-200";

                      return (
                        <div
                          key={cat}
                          className={`rounded-xl border p-4 flex flex-col justify-between ${color}`}
                        >
                          <p className="text-xs font-bold uppercase tracking-wider opacity-80 truncate">
                            {cat}
                          </p>
                          <div className="mt-2 flex items-end justify-between">
                            <span className="text-3xl font-bold tracking-tight">
                              {score}
                            </span>
                            <span className="text-sm font-medium opacity-80 mb-1">
                              / 100
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Dead Stock Capital Lock-Up View */}
              <div className="mb-8">
                <h2 className="text-xl font-bold font-heading mb-4 text-slate-900 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-emerald-600" /> Dead
                  Stock Capital Lock-Up
                </h2>
                <Card className="bg-white border-border shadow-sm">
                  <CardContent className="p-0 flex flex-col md:flex-row">
                    <div className="p-6 border-b md:border-b-0 md:border-r border-border md:w-1/3 flex flex-col justify-center">
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                        Frozen Capital
                      </p>
                      <h3 className="text-4xl font-bold text-emerald-700 mt-2">
                        ₹
                        {products
                          .reduce(
                            (acc, p) =>
                              acc +
                              (parseFloat(
                                p.price?.replace(/[^\d.-]/g, "") || "0",
                              ) || 0) *
                                (p.quantity || 0),
                            0,
                          )
                          .toLocaleString()}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-4 leading-relaxed group relative cursor-help flex items-center">
                        <Info className="w-3.5 h-3.5 mr-1 text-slate-400" />{" "}
                        This represents the total monetary value trapped
                        strictly within your currently stocked shelves across
                        all items.
                      </p>
                    </div>
                    <div className="p-6 md:w-2/3">
                      <p className="text-sm font-bold text-slate-700 mb-3">
                        Top 3 Frozen Capital Offenders
                      </p>
                      <div className="space-y-3">
                        {products
                          .map((p) => ({
                            p,
                            frozen:
                              (parseFloat(
                                p.price?.replace(/[^\d.-]/g, "") || "0",
                              ) || 0) * (p.quantity || 0),
                          }))
                          .filter((x) => x.frozen > 0)
                          .sort((a, b) => b.frozen - a.frozen)
                          .slice(0, 3)
                          .map((x, idx) => (
                            <div
                              key={x.p.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="font-medium text-slate-800">
                                {idx + 1}. {x.p.name} ({x.p.quantity} leftover)
                              </span>
                              <span className="font-semibold text-emerald-700">
                                ₹{x.frozen.toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
                <Card className="h-fit sticky top-24 shadow-sm">
                  <CardHeader>
                    <CardTitle>
                      {editId ? "Edit Product" : "Add New Product"}
                    </CardTitle>
                    <CardDescription>
                      {editId
                        ? "Update product details"
                        : "Enter product details to add to catalog"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Product Name *
                        </label>
                        <Input
                          placeholder="e.g. Meropenem Injection"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Product Image *
                        </label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setImageFile(e.target.files[0]);
                            }
                          }}
                        />

                        {imagePreviewUrl && (
                          <div className="mt-3 rounded-lg border border-border bg-slate-50 p-3">
                            <img
                              src={imagePreviewUrl}
                              alt="Product preview"
                              className="h-28 w-full rounded-md border border-border object-contain bg-white"
                            />
                          </div>
                        )}

                        {editId && formData.image && !imageFile && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Current image is saved. Upload a new file to replace
                            it.
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Strength *
                        </label>
                        <Input
                          placeholder="e.g. 1gm"
                          value={formData.strength}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              strength: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Manufacturer
                        </label>
                        <Input
                          value={formData.manufacturer}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              manufacturer: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Price (Formatted) *
                        </label>
                        <Input
                          placeholder="e.g. ₹1085"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                          value={formData.category}
                          onValueChange={(val) =>
                            setFormData({ ...formData, category: val })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Antibiotic Injections">
                              Antibiotic Injections
                            </SelectItem>
                            <SelectItem value="Gastrointestinal">
                              Gastrointestinal
                            </SelectItem>
                            <SelectItem value="Critical Care">
                              Critical Care
                            </SelectItem>
                            <SelectItem value="Emergency Medicines">
                              Emergency Medicines
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Expiry Date (Optional)
                        </label>
                        <Input
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expiryDate: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Stock Quantity
                        </label>
                        <Input
                          type="number"
                          min="0"
                          value={formData.quantity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center space-x-2 py-2">
                        <input
                          type="checkbox"
                          id="inStock"
                          checked={inStock}
                          onChange={(e) => setInStock(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <label
                          htmlFor="inStock"
                          className="text-sm font-medium"
                        >
                          In Stock
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="flex-1">
                          {editId ? "Update Product" : "Add Product"}
                        </Button>
                        {editId && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setEditId(null);
                              setImageFile(null);
                              setFormData({
                                name: "",
                                strength: "",
                                manufacturer: "Siscon Pharma",
                                price: "",
                                image: "",
                                category: "Antibiotic Injections",
                                expiryDate: "",
                                quantity: "",
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-border shadow-sm">
                    <h2 className="text-xl font-bold font-heading">
                      Manage Products
                    </h2>
                    <div className="flex gap-2 text-xs font-medium">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                        Total: {products.length}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md">
                        In Stock: {products.filter((p) => p.inStock).length}
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md">
                        Out: {products.filter((p) => !p.inStock).length}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 max-h-[800px] overflow-y-auto pr-2 pb-4">
                    {products
                      .slice()
                      .reverse()
                      .map((product) => (
                        <Card key={product.id}>
                          <CardContent className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex gap-4 items-start w-full">
                              <div
                                className="relative"
                                onMouseEnter={() =>
                                  setPreviewProductId(product.id)
                                }
                                onMouseLeave={() => setPreviewProductId(null)}
                              >
                                <button
                                  type="button"
                                  className="block rounded border p-1 shrink-0 bg-white transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                  onFocus={() =>
                                    setPreviewProductId(product.id)
                                  }
                                  onBlur={() => setPreviewProductId(null)}
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain rounded"
                                  />
                                </button>

                                {previewProductId === product.id && (
                                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]">
                                    <div className="relative max-w-3xl w-full rounded-xl border border-white/60 bg-white p-4 shadow-2xl">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setPreviewProductId(null)
                                        }
                                        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-700 hover:bg-slate-200"
                                        aria-label="Close preview"
                                      >
                                        ×
                                      </button>
                                      <div className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50 p-2 sm:p-4">
                                        <img
                                          src={product.image}
                                          alt={product.name}
                                          className="max-h-[75vh] max-w-full object-contain rounded-md"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 w-full">
                                <h4 className="font-semibold text-foreground text-lg leading-tight">
                                  {product.name}
                                </h4>
                                <p className="text-primary font-medium text-sm mt-1">
                                  {product.price}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-1 mt-2 text-xs text-muted-foreground w-full">
                                  <span>
                                    <strong className="text-foreground">
                                      Category:
                                    </strong>{" "}
                                    {product.category}
                                  </span>
                                  <span>
                                    <strong className="text-foreground">
                                      Strength:
                                    </strong>{" "}
                                    {product.strength || "N/A"}
                                  </span>
                                  <span>
                                    <strong className="text-foreground">
                                      Company:
                                    </strong>{" "}
                                    {product.manufacturer || "N/A"}
                                  </span>
                                  <span>
                                    <strong className="text-foreground">
                                      Stock Qty:
                                    </strong>{" "}
                                    {product.quantity || 0} units
                                  </span>
                                  <span className="col-span-1 md:col-span-2">
                                    <strong className="text-foreground">
                                      Status:
                                    </strong>{" "}
                                    <span
                                      className={
                                        product.inStock &&
                                        product.quantity !== 0
                                          ? "text-green-600 font-medium"
                                          : "text-destructive font-medium"
                                      }
                                    >
                                      {product.inStock && product.quantity !== 0
                                        ? "🟢 In Stock"
                                        : "🔴 Out of Stock"}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex sm:flex-col gap-2 justify-center shrink-0 border-t sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0 border-border">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(product)}
                                className="flex-1"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this product?",
                                    )
                                  ) {
                                    removeProduct(product.id);
                                    setActionHistory((prev) =>
                                      [
                                        {
                                          id: product.id,
                                          name: product.name,
                                          type: "delete",
                                          payload: product,
                                          time: new Date(),
                                        },
                                        ...prev,
                                      ].slice(0, 5),
                                    );
                                    toast.success(
                                      "Product deleted successfully",
                                    );
                                  }
                                }}
                                className="flex-1"
                              >
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Undo Timeline Fixed Widget */}
      {actionHistory.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-white border border-border shadow-2xl rounded-xl w-80 overflow-hidden animate-in slide-in-from-bottom-[5%]">
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between">
            <span className="text-white text-xs font-semibold flex items-center gap-2">
              <RotateCcw className="w-3 h-3" /> Recent Action Timeline
            </span>
            <span
              className="text-slate-400 text-[10px] cursor-pointer hover:text-white"
              onClick={() => setActionHistory([])}
            >
              Clear
            </span>
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-slate-100">
            {actionHistory.map((action, i) => (
              <div
                key={i}
                className="p-3 hover:bg-slate-50 transition-colors flex justify-between items-center group"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800 line-through opacity-80">
                    {action.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Deleted{" "}
                    {Math.floor(
                      (new Date().getTime() - action.time.getTime()) / 1000,
                    )}
                    s ago
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleUndo(action)}
                >
                  Undo Revert
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Command Palette Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-4 border-b border-border bg-white">
              <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
              <input
                autoFocus
                placeholder="Search inventory, products, actions... (Cmd+K)"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-base"
                value={searchCmd}
                onChange={(e) => setSearchCmd(e.target.value)}
              />
              <code className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded-md font-semibold border border-border tracking-widest shrink-0 uppercase">
                ESC
              </code>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2 bg-slate-50/50">
              {!searchCmd && (
                <>
                  <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
                    Quick Actions
                  </div>
                  <div
                    className="px-3 py-3 mx-1 flex items-center gap-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors text-sm font-medium text-slate-700"
                    onClick={() => {
                      setOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    Add New Product to Catalog
                  </div>
                  <div
                    className="px-3 py-3 mx-1 flex items-center gap-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors text-sm font-medium text-slate-700"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <div className="p-1.5 bg-destructive/10 rounded-md">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    </div>
                    Generate Restock Report (Low Inventory)
                  </div>
                </>
              )}

              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mt-2 mb-1">
                {searchCmd ? "Search Results" : "Recent Products (Jump & Edit)"}
              </div>

              {products
                .filter(
                  (p) =>
                    p.name.toLowerCase().includes(searchCmd.toLowerCase()) ||
                    p.strength?.toLowerCase().includes(searchCmd.toLowerCase()),
                )
                .slice(0, 5)
                .map((p) => (
                  <div
                    key={p.id}
                    className="px-3 py-2.5 mx-1 flex items-center justify-between rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-border cursor-pointer transition-all"
                    onClick={() => {
                      handleEdit(p);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded border border-border bg-white flex items-center justify-center p-1">
                        <img
                          src={p.image}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">
                          {p.strength} • {p.manufacturer}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          p.inStock
                            ? "w-2 h-2 rounded-full bg-green-500"
                            : "w-2 h-2 rounded-full bg-red-500"
                        }
                      ></span>
                      <span className="text-xs text-muted-foreground mr-2 font-medium">
                        Edit
                      </span>
                    </div>
                  </div>
                ))}

              {searchCmd &&
                products.filter((p) =>
                  p.name.toLowerCase().includes(searchCmd.toLowerCase()),
                ).length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No products found for "{searchCmd}"
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
