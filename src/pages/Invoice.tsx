import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const STORAGE_INVOICES = "sc_invoices";

const COMPANY = {
  name: "Siscon Pharma",
  address: "80FT Road,G-104 Sitaji Township,Rajkot,Gujarat - 360004",
  phone: "+91-95121 31217",
  email: "sisconpharma@gmail.com",
  gstin: "33AAAAA0000A1Z5",
};

const BANK_DETAILS = {
  accountName: "Siscon Pharma",
  bankName: "ICICI Bank",
  accountNo: "1234567890",
  ifsc: "ICICI0001234",
  branch: "Rajkot",
};

const numberToWords = (num: number): string => {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return "";

  let str = "";
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore " : "";
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh " : "";
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand " : "";
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred " : "";
  str += (Number(n[5]) !== 0) ? (str !== "" ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) : "";

  return str.trim() + " Only";
};


const Invoice = () => {
  const { items, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [invoiceNo, setInvoiceNo] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerGSTIN, setCustomerGSTIN] = useState("");

  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingGSTIN, setShippingGSTIN] = useState("");

  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString());
  const [isFromCart, setIsFromCart] = useState(false);

  useEffect(() => {
    if (sameAsBilling) {
      setShippingName(customerName);
      setShippingAddress(customerAddress);
      setShippingPhone(customerPhone);
      setShippingGSTIN(customerGSTIN);
    }
  }, [sameAsBilling, customerName, customerAddress, customerPhone, customerGSTIN]);

  const invoiceRef = useRef<HTMLDivElement | null>(null);

  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);

  useEffect(() => {
    const locState = location.state as { invoiceNo?: string } | null;

    if (locState?.invoiceNo) {
      // Loading existing invoice
      setInvoiceNo(locState.invoiceNo);
      const raw = localStorage.getItem(STORAGE_INVOICES);
      if (raw) {
        try {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) {
            const foundVar = arr.find((i: any) => i.invoiceNo === locState.invoiceNo);
            if (foundVar) {
              setInvoiceItems(foundVar.items || []);
              if (foundVar.date) setInvoiceDate(foundVar.date);
              setCustomerName(foundVar.customer?.name || "");
              setCustomerAddress(foundVar.customer?.address || "");
              setCustomerPhone(foundVar.customer?.phone || "");
              setCustomerGSTIN(foundVar.customer?.gstin || "");

              // Handle shipping
              if (foundVar.shipping) {
                setShippingName(foundVar.shipping.name || "");
                setShippingAddress(foundVar.shipping.address || "");
                setShippingPhone(foundVar.shipping.phone || "");
                setShippingGSTIN(foundVar.shipping.gstin || "");

                const isSame =
                  foundVar.shipping.name === foundVar.customer?.name &&
                  foundVar.shipping.address === foundVar.customer?.address;
                setSameAsBilling(isSame);
              }
            }
          }
        } catch (e) { console.error(e); }
      }
    } else {
      // New invoice from Cart
      setInvoiceNo(`INV-${Date.now()}`);
      setInvoiceItems(items);
      setInvoiceDate(new Date().toISOString());
      setIsFromCart(true);

      if (!items || items.length === 0) {
        // toast.error("No items in cart to generate invoice");
        // navigate("/cart");
      }
    }
  }, [items, location.state, navigate]);

  const parsePrice = (p?: string) => {
    if (!p) return 0;
    const num = Number(String(p).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(num) ? num : 0;
  };

  const total = useMemo(() => invoiceItems.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0), [invoiceItems]);

  const formatCurrency = (v: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v);

  const saveInvoice = () => {
    const inv = {
      invoiceNo,
      date: invoiceDate,
      items: invoiceItems,
      total,
      customer: {
        name: customerName,
        address: customerAddress,
        phone: customerPhone,
        gstin: customerGSTIN,
      },
      shipping: {
        name: shippingName,
        address: shippingAddress,
        phone: shippingPhone,
        gstin: shippingGSTIN,
      },
    };

    try {
      const raw = localStorage.getItem(STORAGE_INVOICES) || "[]";
      let arr = JSON.parse(raw);
      if (!Array.isArray(arr)) arr = [];

      // Check if exists
      const existingIndex = arr.findIndex((i: any) => i.invoiceNo === invoiceNo);
      if (existingIndex >= 0) {
        arr[existingIndex] = inv;
      } else {
        arr.push(inv);
      }

      localStorage.setItem(STORAGE_INVOICES, JSON.stringify(arr));
      toast.success("Invoice saved");
    } catch (err) {
      toast.error("Failed to save invoice");
    }
  };

  const downloadPdf = async () => {
    if (!invoiceRef.current) return;
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const element = invoiceRef.current as HTMLElement;
      // Increase scale for better quality
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = (pdf as any).getImageProperties(imgData);
      const imgWidth = pageWidth - 40;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
      pdf.save(`${invoiceNo || "invoice"}.pdf`);

      if (isFromCart) {
        clearCart();
        setIsFromCart(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF. Try Print instead.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-5xl">

          <div className="flex justify-end gap-3 mb-4 no-print">
            <Button onClick={() => window.print()}>Print / PDF</Button>
            <Button onClick={() => downloadPdf()}>Download PDF</Button>
            <Button variant="outline" onClick={() => saveInvoice()}>Save Invoice</Button>
            <Button variant="ghost" onClick={() => { clearCart(); navigate("/products"); }}>Clear Cart</Button>
          </div>

          <div className="bg-white text-black text-sm p-8 shadow-lg print:shadow-none print:p-0" ref={invoiceRef}>

            <div className="border-2 border-black">

              <div className="flex justify-between border-b border-black px-2 py-1 bg-gray-100 print:bg-transparent">
                <div className="w-1/3">Page No. 1 of 1</div>
                <div className="w-1/3 text-center font-bold">TAX INVOICE</div>
                <div className="w-1/3 text-right">Original Copy</div>
              </div>

              <div className="flex border-b border-black">
                <div className="w-32 flex items-center justify-center border-r border-black p-4">
                  <img src="/assets/siscon_pharma_icon.png" alt="Siscon Pharma" className="w-full h-auto object-contain grayscale brightness-0" />
                </div>
                <div className="flex-1 p-2 text-center">
                  <h1 className="text-2xl font-bold uppercase">{COMPANY.name}</h1>
                  <p>{COMPANY.address}</p>
                  <p>Mobile: {COMPANY.phone} | Email: {COMPANY.email}</p>
                  <p className="font-bold mt-1">GSTIN: {COMPANY.gstin}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-black">
                <div className="border-r border-black p-2 space-y-1">
                  <div className="flex"><span className="w-24 font-semibold">Invoice No</span>: {invoiceNo}</div>
                  <div className="flex"><span className="w-24 font-semibold">Invoice Date</span>: {new Date(invoiceDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  <div className="flex"><span className="w-24 font-semibold">Due Date</span>: {new Date(invoiceDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  <div className="flex"><span className="w-24 font-semibold">Place of Supply</span>: 24 - Gujarat</div>
                </div>
                <div className="p-2 space-y-1">
                  <div className="flex"><span className="w-24 font-semibold">Transport Mode</span>: Road</div>
                  <div className="flex"><span className="w-24 font-semibold">Vehicle No</span>: -</div>
                  <div className="flex"><span className="w-24 font-semibold">Date of Supply</span>: {new Date(invoiceDate).toLocaleDateString('en-GB')}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-black">
                <div className="border-r border-black p-2">
                  <h3 className="font-bold border-b border-gray-300 mb-2">Billing Details</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span>Name:</span>
                      <input
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Customer Name"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Phone:</span>
                      <input
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Phone"
                      />
                    </div>
                    <div className="flex gap-2">
                      <span>Address:</span>
                      <textarea
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white resize-none h-12"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Address"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>GSTIN:</span>
                      <input
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white"
                        value={customerGSTIN}
                        onChange={(e) => setCustomerGSTIN(e.target.value)}
                        placeholder="GSTIN"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="p-2">
                  <div className="flex justify-between items-center border-b border-gray-300 mb-2">
                    <h3 className="font-bold">Shipping Details</h3>
                    <label className="flex items-center gap-2 text-xs cursor-pointer no-print">
                      <input
                        type="checkbox"
                        checked={sameAsBilling}
                        onChange={(e) => setSameAsBilling(e.target.checked)}
                      />
                      Same as Billing
                    </label>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span>Name:</span>
                      <input
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white disabled:text-gray-500"
                        value={shippingName}
                        onChange={(e) => !sameAsBilling && setShippingName(e.target.value)}
                        placeholder="Shipping Name"
                        disabled={sameAsBilling}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Phone:</span>
                      <input
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white disabled:text-gray-500"
                        value={shippingPhone}
                        onChange={(e) => !sameAsBilling && setShippingPhone(e.target.value)}
                        placeholder="Phone"
                        disabled={sameAsBilling}
                      />
                    </div>
                    <div className="flex gap-2">
                      <span>Address:</span>
                      <textarea
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white resize-none h-12 disabled:text-gray-500"
                        value={shippingAddress}
                        onChange={(e) => !sameAsBilling && setShippingAddress(e.target.value)}
                        placeholder="Address"
                        disabled={sameAsBilling}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span>GSTIN:</span>
                      <input
                        className="flex-1 border-b border-dashed border-gray-300 outline-none bg-white disabled:text-gray-500"
                        value={shippingGSTIN}
                        onChange={(e) => !sameAsBilling && setShippingGSTIN(e.target.value)}
                        placeholder="GSTIN"
                        disabled={sameAsBilling}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ITEM TABLE */}
              <div className="overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-100 print:bg-transparent border-b border-black">
                      <th className="p-2 border-r border-black w-10 text-center">Sr.</th>
                      <th className="p-2 border-r border-black">Item Description</th>
                      <th className="p-2 border-r border-black w-20 text-center">HSN/SAC</th>
                      <th className="p-2 border-r border-black w-16 text-center">Qty</th>
                      <th className="p-2 border-r border-black w-16 text-center">Unit</th>
                      <th className="p-2 border-r border-black w-24 text-right">Rate</th>
                      <th className="p-2 border-r border-black w-16 text-center">Disc.</th>
                      <th className="p-2 border-r border-black w-16 text-center">Tax %</th>
                      <th className="p-2 text-right w-28">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black">
                    {invoiceItems.map((it, idx) => {
                      const rate = parsePrice(it.price);
                      const amount = rate * it.qty;
                      return (
                        <tr key={it.id}>
                          <td className="p-2 border-r border-black text-center">{idx + 1}</td>
                          <td className="p-2 border-r border-black font-medium">{it.name}</td>
                          <td className="p-2 border-r border-black text-center">3004</td>
                          <td className="p-2 border-r border-black text-center">{it.qty}</td>
                          <td className="p-2 border-r border-black text-center">Nos</td>
                          <td className="p-2 border-r border-black text-right">{rate.toFixed(2)}</td>
                          <td className="p-2 border-r border-black text-center">-</td>
                          <td className="p-2 border-r border-black text-center">12%</td>
                          <td className="p-2 text-right">{amount.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                    {/* Empty rows to fill space matching the image style roughly */}
                    {Array.from({ length: Math.max(0, 5 - invoiceItems.length) }).map((_, i) => (
                      <tr key={`empty-${i}`}>
                        <td className="p-2 border-r border-black text-center">&nbsp;</td>
                        <td className="p-2 border-r border-black"></td>
                        <td className="p-2 border-r border-black"></td>
                        <td className="p-2 border-r border-black"></td>
                        <td className="p-2 border-r border-black"></td>
                        <td className="p-2 border-r border-black"></td>
                        <td className="p-2 border-r border-black"></td>
                        <td className="p-2 border-r border-black"></td>
                        <td className="p-2"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TOTALS */}
              <div className="border-t border-black p-2 flex justify-end items-center gap-4 bg-gray-100 print:bg-transparent">
                <span className="font-bold">Total Amount:</span>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
              </div>

              {/* AMOUNT IN WORDS */}
              <div className="border-t border-black p-2 bg-gray-50 print:bg-transparent">
                <span className="font-bold">Amount in Words: </span>
                <span className="capitalize">{numberToWords(total)} Rupees Only</span>
              </div>


              {/* TAX SUMMARY (Optional, can just list it) */}
              <div className="border-t border-black p-2 text-xs">
                <p>Tax Summary: Sale @ 12% on {formatCurrency(total)}</p>
              </div>

              {/* FOOTER: TERMS & BANK */}
              <div className="grid grid-cols-2 border-t border-black">
                <div className="p-2 border-r border-black text-xs space-y-1">
                  <h4 className="font-bold underline mb-1">Terms and Conditions</h4>
                  <p>1. Goods once sold will not be taken back.</p>
                  <p>2. Interest @ 18% p.a. will be charged if payment is delayed.</p>
                  <p>3. Subject to 'Rajkot' jurisdiction only.</p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="border border-black p-1 inline-block bg-white">
                      <QRCode
                        value={JSON.stringify({
                          invoice: invoiceNo,
                          date: new Date().toISOString().split('T')[0],
                          total: total,
                          customer: customerName
                        })}
                        size={64}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <div className="text-[10px] text-gray-500 max-w-[150px]">
                      Scan to view invoice details digitally
                    </div>
                  </div>
                </div>

                <div className="p-2 flex flex-col justify-between">
                  <div className="text-xs space-y-1">
                    <h4 className="font-bold underline mb-1">Bank Details</h4>
                    <p><span className="font-semibold">Bank:</span> {BANK_DETAILS.bankName}</p>
                    <p><span className="font-semibold">A/c No:</span> {BANK_DETAILS.accountNo}</p>
                    <p><span className="font-semibold">IFSC:</span> {BANK_DETAILS.ifsc}</p>
                    <p><span className="font-semibold">Branch:</span> {BANK_DETAILS.branch}</p>
                  </div>

                  <div className="mt-8 text-right">
                    <p className="font-bold mb-8">For {COMPANY.name}</p>
                    <p className="text-xs">Authorized Signatory</p>
                  </div>
                </div>
              </div>

            </div> {/* End Invoice Border */}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Invoice;
