import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";

interface SavedInvoice {
    invoiceNo: string;
    date: string;
    total: number;
    customer?: {
        name: string;
    };
}

const SavedInvoices = () => {
    const [invoices, setInvoices] = useState<SavedInvoice[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem("sc_invoices");
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    // Filter out null/undefined or non-object items to prevent crashes during map
                    const safeList = parsed.filter(item => item && typeof item === "object");
                    setInvoices(safeList.reverse());
                } else {
                    console.error("Stored invoices is not an array", parsed);
                    setInvoices([]);
                }
            } catch (e) {
                console.error("Failed to parse invoices", e);
                setInvoices([]);
            }
        }
    }, []);

    const formatDate = (dateString: string) => {
        try {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            // Check for Invalid Date
            if (isNaN(date.getTime())) return "Invalid Date";
            return date.toLocaleDateString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
            });
        } catch (e) {
            return "Invalid Date";
        }
    };

    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v || 0);

    const deleteInvoice = (invNo: string) => {
        if (!confirm("Are you sure you want to delete this invoice?")) return;

        const filtered = invoices.filter(i => i.invoiceNo !== invNo);
        setInvoices(filtered);
        localStorage.setItem("sc_invoices", JSON.stringify(filtered.slice().reverse()));
    };

    const deleteAllInvoices = () => {
        if (!confirm("Are you sure you want to delete ALL invoices? This cannot be undone.")) return;

        localStorage.removeItem("sc_invoices");
        setInvoices([]);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 py-8 flex flex-col">
                <div className={`container mx-auto px-4 ${invoices.length === 0 ? "flex-1 flex flex-col justify-center items-center" : ""}`}>
                    <div className={`flex justify-between items-center mb-6 ${invoices.length === 0 ? "self-start w-full" : ""}`}>
                        <h1 className="text-2xl font-bold">Saved Invoices</h1>
                        {invoices.length > 0 && (
                            <Button variant="destructive" onClick={deleteAllInvoices}>
                                Clear All History
                            </Button>
                        )}
                    </div>

                    {invoices.length === 0 ? (
                        <div className="pharma-card p-12 text-center text-muted-foreground w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[300px]">
                            <p className="text-lg mb-2">No saved invoices found</p>
                            <Link to="/products" className="mt-4 inline-block">
                                <Button>Create New Invoice</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="pharma-card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted">
                                        <tr>
                                            <th className="p-4 font-semibold">Invoice No</th>
                                            <th className="p-4 font-semibold">Date</th>
                                            <th className="p-4 font-semibold">Customer</th>
                                            <th className="p-4 font-semibold text-right">Amount</th>
                                            <th className="p-4 font-semibold text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {invoices.map((inv) => (
                                            <tr key={inv.invoiceNo || Math.random()} className="hover:bg-muted/50">
                                                <td className="p-4 font-medium">{inv.invoiceNo || "Unknown"}</td>
                                                <td className="p-4 text-sm text-muted-foreground">
                                                    {formatDate(inv.date)}
                                                </td>
                                                <td className="p-4">{inv.customer?.name || "N/A"}</td>
                                                <td className="p-4 text-right font-bold text-primary">
                                                    {formatCurrency(inv.total)}
                                                </td>
                                                <td className="p-4 flex justify-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => navigate("/invoice", { state: { invoiceNo: inv.invoiceNo } })}
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" /> View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => deleteInvoice(inv.invoiceNo)}
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SavedInvoices;
