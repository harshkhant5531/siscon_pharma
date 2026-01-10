import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { Trash } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Cart = () => {
  const { items, updateQty, removeFromCart, clearCart, totalCount } = useCart();

  const parsePrice = (p?: string) => {
    if (!p) return 0;
    const num = Number(String(p).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(num) ? num : 0;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  const totalPrice = items.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0);

  const navigate = useNavigate();

  const generateInvoice = () => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const invoiceNo = `INV-${Date.now()}`;

    // save invoice to history
    try {
      const raw = localStorage.getItem("sc_invoices") || "[]";
      const arr = JSON.parse(raw);
      arr.push({
        invoiceNo,
        date: new Date().toISOString(),
        items,
        total: totalPrice,
      });
      localStorage.setItem("sc_invoices", JSON.stringify(arr));
    } catch (err) {
      // ignore
    }

    // Navigate to invoice page which renders a printable invoice (avoids popup blockers)
    navigate("/invoice", { state: { invoiceNo } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

          {items.length === 0 ? (
            <div className="pharma-card p-8 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty.</p>
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="pharma-card p-4 flex items-center gap-4"
                  >
                    <img
                      src={it.image}
                      alt={it.name}
                      className="h-20 w-20 object-contain"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {it.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {it.price || "Contact for Price"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateQty(it.id, it.qty - 1)}
                      >
                        -
                      </Button>
                      <div className="px-3">{it.qty}</div>
                      <Button
                        size="sm"
                        onClick={() => updateQty(it.id, it.qty + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(it.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="pharma-card p-4">
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground">Items</div>
                  <div className="text-xl font-semibold">{totalCount}</div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground">
                    Estimated Total
                  </div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(totalPrice)}
                  </div>
                </div>
                <Button
                  className="w-full mb-2"
                  onClick={() => generateInvoice()}
                >
                  Generate Bill / Print
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
