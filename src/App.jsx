import { useState, useCallback, useEffect } from "react";
import logoSrc from "./assets/images/logo.png";
import stampSrc from "./assets/images/stemp.png";
import signatureSrc from "./assets/images/signature.png";

/* ── helpers ── */
const fmt = (n) =>
  "AED " +
  Number(n).toLocaleString("en-AE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const numToWords = (n) => {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  if (n === 0) return "Zero";
  if (n < 20) return a[n];
  if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
  if (n < 1000)
    return (
      a[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 ? " " + numToWords(n % 100) : "")
    );
  if (n < 100000)
    return (
      numToWords(Math.floor(n / 1000)) +
      " Thousand" +
      (n % 1000 ? " " + numToWords(n % 1000) : "")
    );
  return (
    numToWords(Math.floor(n / 100000)) +
    " Lakh" +
    (n % 100000 ? " " + numToWords(n % 100000) : "")
  );
};

const grandToWords = (grand) => {
  const int = Math.floor(grand);
  const fils = Math.round((grand - int) * 100);
  let words = numToWords(int) + " Dirhams";
  if (fils > 0) words += " and " + numToWords(fils) + " Fils";
  return words + " Only";
};

const today = () => new Date().toISOString().split("T")[0];
const formatDate = (dateStr) => {
  if (!dateStr)
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const newItem = () => ({
  id: Date.now(),
  itemCode: "",
  qty: 1,
  cts: "",
  price: "",
});

/* ── convert image URL → base64 data URL ── */
const toBase64 = (url) =>
  fetch(url)
    .then((r) => r.blob())
    .then(
      (blob) =>
        new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onloadend = () => res(reader.result);
          reader.onerror = rej;
          reader.readAsDataURL(blob);
        }),
    );

/* ── build print HTML (images passed as full data-URLs) ── */
const buildPrintHTML = (data) => {
  const {
    invNo,
    invDate,
    invType,
    trn,
    custName,
    custAddr,
    custTrn,
    custPhone,
    custEmail,
    items,
    vatPct,
    discount,
    subtotal,
    vat,
    grand,
    notes,
    paidAmount,
    remainingAmount,
    logoB64,
    stampB64,
    sigB64,
  } = data;

  const rows = items
    .map(
      (it, i) => `
    <tr>
      <td style="padding:8px 10px;border-bottom:1px solid #E8ECF5;">${i + 1}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E8ECF5;">${it.itemCode || "—"}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E8ECF5;text-align:right;">${it.qty}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E8ECF5;text-align:right;">${it.cts || "—"}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E8ECF5;text-align:right;">${it.price ? "AED " + Number(it.price).toFixed(2) : "—"}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E8ECF5;text-align:right;">${it.price ? "AED " + (it.qty * Number(it.price)).toFixed(2) : "—"}</td>
    </tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Amaraa Invoice ${invNo}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:#fff;padding:20px;}
  @media print{body{padding:0;}@page{margin:10mm;}}
</style>
</head><body>
<div style="border:1px solid #C5CDE8;border-radius:12px;overflow:hidden;max-width:900px;margin:auto;">

  <!-- HEADER -->
  <div style="background:#0D1B4B;color:#fff;padding:24px 28px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      ${logoB64 ? `<img src="${logoB64}" style="height:70px;object-fit:contain;filter:brightness(0) invert(1);" />` : `<div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;letter-spacing:3px;">AMARAA<br><span style="font-size:10px;letter-spacing:5px;opacity:0.6;">JEWELRY</span></div>`}
    </div>
    <div style="text-align:right;font-size:12px;opacity:0.85;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:2px;color:#A8B8E8;font-weight:600;">${invType.toUpperCase()}</div>
      <div>No. ${invNo}</div>
      <div>Date: ${formatDate(invDate)}</div>
      <div style="margin-top:4px;font-size:10px;opacity:0.7;">TRN: ${trn}</div>
    </div>
  </div>

  <!-- ACCENT BAR -->
  <div style="height:3px;background:linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A);"></div>

  <div style="padding:24px 28px;">
    <!-- FROM / TO -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
      <div>
        <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:5px;">From</div>
        <div style="font-size:14px;font-weight:500;color:#0D1B4B;">Amaraa FZCO</div>
        <div style="font-size:12px;color:#555;margin-top:2px;line-height:1.6;">Almas 25-J-04, Almas Tower<br>JLT-PH1-A0, Jumeirah Lake Towers<br>Dubai, United Arab Emirates<br>Tel: +971 543969425 | +971 521866038<br>info@amaraa.com · www.amaraa.com</div>
      </div>
      <div>
        <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:5px;">To</div>
        <div style="font-size:14px;font-weight:500;color:#0D1B4B;">${custName || "—"}</div>
        <div style="font-size:12px;color:#555;margin-top:2px;line-height:1.6;">${custAddr || ""}${custTrn ? "<br>TRN: " + custTrn : ""}${[custPhone, custEmail].filter(Boolean).join(" | ") ? "<br>" + [custPhone, custEmail].filter(Boolean).join(" | ") : ""}</div>
      </div>
    </div>

    <div style="margin-bottom:12px;font-weight:500;font-size:13px;color:#2B3A7A;letter-spacing:0.5px;">✦ Lab Grown Diamonds</div>

    <!-- ITEMS TABLE -->
    <table style="width:100%;border-collapse:collapse;font-size:12px;margin:16px 0;">
      <thead>
        <tr style="background:#EEF1FA;">
          <th style="padding:8px 10px;text-align:left;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Sl.</th>
          <th style="padding:8px 10px;text-align:left;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Item Name / Code</th>
          <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Qty</th>
          <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Cts/Size</th>
          <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Unit Price</th>
          <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Amount (AED)</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <!-- TOTALS -->
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
      <div style="flex:1;">
        <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">Amount in Words</div>
        <div style="background:#EEF1FA;border-radius:6px;padding:8px 12px;font-style:italic;font-size:12px;color:#0D1B4B;">${grandToWords(grand)}</div>
        ${notes ? `<div style="font-size:11px;color:#888;font-style:italic;margin-top:6px;">${notes}</div>` : ""}
      </div>
      <div style="width:230px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
        ${discount > 0 ? `<div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>Discount</span><span>${fmt(discount)}</span></div>` : ""}
        <div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>VAT ${vatPct}%</span><span>${fmt(vat)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>Paid Amount</span><span>${fmt(paidAmount || 0)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:8px 0 4px;color:#0D1B4B;font-weight:600;font-size:14px;border-top:1px solid #C5CDE8;margin-top:4px;"><span>Remaining Amount</span><span>${fmt(remainingAmount)}</span></div>
      </div>
    </div>

    <!-- SIGNATURES -->
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:36px;">
      <div style="text-align:center;">
        <div style="height:50px;"></div>
        <div style="border-top:1px solid #ccc;width:150px;padding-top:4px;font-size:10px;color:#888;">Receiver's Sign</div>
      </div>
      <div style="text-align:center;">
        ${stampB64 ? `<img src="${stampB64}" style="width:110px;height:110px;object-fit:contain;opacity:0.9;" />` : ""}
      </div>
      <div style="text-align:center;">
        ${sigB64 ? `<img src="${sigB64}" style="width:130px;height:65px;object-fit:contain;" />` : ""}
        <div style="border-top:1px solid #ccc;width:150px;padding-top:4px;font-size:10px;color:#888;margin-top:4px;">For AMARAA JEWELRY</div>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div style="background:#EEF1FA;padding:16px 28px;border-top:1px solid #C5CDE8;display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:11px;color:#555;">
    <div>
      <div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">Contact</div>
      Tel: +971 543969425 / +971 521866038<br>WhatsApp: +32488401207<br>info@amaraa.com · www.amaraa.com
    </div>
    <div>
      <div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">Registered Address</div>
      Almas Tower, Plot No JLT-PH1-A0<br>Jumeirah Lake Towers, Dubai, UAE<br>License: DMCC-896920
    </div>
  </div>
</div>
<script>window.onload=()=>setTimeout(()=>window.print(),800);</script>
</body></html>`;
};

/* ── UI primitives with navy color scheme ── */
const Label = ({ children }) => (
  <label className="block text-[11px] tracking-wider text-blue-800 mb-1 uppercase font-medium">
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300 ${className}`}
    {...props}
  />
);

const Select = ({ children, ...props }) => (
  <select
    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
    {...props}
  >
    {children}
  </select>
);

const SectionTitle = ({ children }) => (
  <div className="text-[10px] tracking-[3px] uppercase text-blue-700 font-semibold mt-6 mb-3 flex items-center gap-2">
    <span className="text-blue-400">✦</span> {children}
    <span className="flex-1 h-px bg-blue-100 ml-1"></span>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
export default function AmaraaInvoiceGenerator() {
  const [invNo, setInvNo] = useState("0066");
  const [invDate, setInvDate] = useState(today());
  const [invType, setInvType] = useState("Tax Cash Invoice");
  const [trn, setTrn] = useState("104149856700003");
  const [custName, setCustName] = useState("");
  const [custAddr, setCustAddr] = useState("");
  const [custTrn, setCustTrn] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [vatPct, setVatPct] = useState(5);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([newItem()]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  /* Pre-load base64 versions of all images for PDF use */
  const [logoB64, setLogoB64] = useState("");
  const [stampB64, setStampB64] = useState("");
  const [sigB64, setSigB64] = useState("");

  useEffect(() => {
    toBase64(logoSrc)
      .then(setLogoB64)
      .catch(() => {});
    toBase64(stampSrc)
      .then(setStampB64)
      .catch(() => {});
    toBase64(signatureSrc)
      .then(setSigB64)
      .catch(() => {});
  }, []);

  const addItem = () => setItems((prev) => [...prev, newItem()]);
  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));
  const updateItem = (id, field, value) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    );

  const subtotal = items.reduce(
    (s, it) => s + (it.qty || 0) * (Number(it.price) || 0),
    0,
  );
  const discounted = Math.max(0, subtotal - (discount || 0));
  const vat = (discounted * (vatPct || 0)) / 100;
  const grand = discounted + vat;
  const remainingAmount = Math.max(0, grand - paidAmount);

  const clearAll = () => {
    setCustName("");
    setCustAddr("");
    setCustTrn("");
    setCustPhone("");
    setCustEmail("");
    setNotes("");
    setDiscount(0);
    setPaidAmount(0);
    setItems([newItem()]);
    setShowInvoice(false);
  };

  const printInvoice = useCallback(() => {
    const html = buildPrintHTML({
      invNo,
      invDate,
      invType,
      trn,
      custName,
      custAddr,
      custTrn,
      custPhone,
      custEmail,
      items,
      vatPct,
      discount,
      subtotal,
      vat,
      grand,
      notes,
      paidAmount,
      remainingAmount,
      logoB64,
      stampB64,
      sigB64, // ← pass base64 images
    });
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
  }, [
    invNo,
    invDate,
    invType,
    trn,
    custName,
    custAddr,
    custTrn,
    custPhone,
    custEmail,
    items,
    vatPct,
    discount,
    subtotal,
    vat,
    grand,
    notes,
    paidAmount,
    remainingAmount,
    logoB64,
    stampB64,
    sigB64,
  ]);

  /* ── FORM ── */
  if (!showInvoice)
    return (
      <div className="min-h-screen font-sans bg-[#d4d4d4]">
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Brand header */}
            <div className="bg-[#0D1B4B] px-8 py-6 flex items-center justify-between">
              <div className="h-16">
                {logoB64 ? (
                  <img
                    src={logoB64}
                    alt="Amaraa"
                    className="h-full object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                ) : (
                  <span
                    className="text-white font-serif text-2xl tracking-widest"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    AMARAA JEWELRY
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-blue-200 text-xs tracking-[3px] uppercase">
                  Invoice Generator
                </div>
                <div className="text-white/50 text-[10px] mt-1">
                  Lab Grown Diamonds · Dubai, UAE
                </div>
              </div>
            </div>
            <div
              className="h-[3px]"
              style={{
                background: "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
              }}
            />

            <div className="px-8 py-6">
              <SectionTitle>Invoice Details</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Invoice No.</Label>
                  <Input
                    value={invNo}
                    onChange={(e) => setInvNo(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={invDate}
                    onChange={(e) => setInvDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label>Invoice Type</Label>
                  <Select
                    value={invType}
                    onChange={(e) => setInvType(e.target.value)}
                  >
                    <option>Invoice</option>
                    <option>Tax Cash Invoice</option>
                    <option>Tax Invoice</option>
                    <option>Memo</option>
                    <option>Proforma Invoice</option>
                  </Select>
                </div>
                <div>
                  <Label>TRN No.</Label>
                  <Input value={trn} onChange={(e) => setTrn(e.target.value)} />
                </div>
              </div>

              <SectionTitle>Customer Info</SectionTitle>
              <div>
                <Label>Customer Name</Label>
                <Input
                  value={custName}
                  placeholder="e.g. Dana"
                  onChange={(e) => setCustName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label>Address</Label>
                  <Input
                    value={custAddr}
                    placeholder="Dubai, UAE"
                    onChange={(e) => setCustAddr(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Customer TRN</Label>
                  <Input
                    value={custTrn}
                    placeholder="Optional"
                    onChange={(e) => setCustTrn(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={custPhone}
                    placeholder="+971..."
                    onChange={(e) => setCustPhone(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={custEmail}
                    placeholder="customer@email.com"
                    onChange={(e) => setCustEmail(e.target.value)}
                  />
                </div>
              </div>

              <SectionTitle>Items</SectionTitle>
              <div className="overflow-x-auto rounded-xl border border-blue-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-blue-50">
                      {[
                        "Item Name / Code",
                        "Qty",
                        "Cts/Size",
                        "Price (AED)",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[9px] tracking-widest uppercase text-blue-700 py-2 px-3 font-medium"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it) => (
                      <tr key={it.id} className="border-t border-blue-50">
                        <td className="py-1 px-1">
                          <Input
                            className="text-xs py-1"
                            value={it.itemCode}
                            placeholder="e.g. HR-1001"
                            onChange={(e) =>
                              updateItem(it.id, "itemCode", e.target.value)
                            }
                          />
                        </td>
                        <td className="py-1 px-1 w-14">
                          <Input
                            type="number"
                            className="text-xs py-1 w-14"
                            value={it.qty}
                            min={1}
                            onChange={(e) =>
                              updateItem(it.id, "qty", Number(e.target.value))
                            }
                          />
                        </td>
                        <td className="py-1 px-1 w-16">
                          <Input
                            className="text-xs py-1 w-16"
                            value={it.cts}
                            placeholder="5.06"
                            onChange={(e) =>
                              updateItem(it.id, "cts", e.target.value)
                            }
                          />
                        </td>
                        <td className="py-1 px-1 w-24">
                          <Input
                            type="number"
                            className="text-xs py-1 w-24"
                            value={it.price}
                            placeholder="0"
                            onChange={(e) =>
                              updateItem(it.id, "price", e.target.value)
                            }
                          />
                        </td>
                        <td className="py-1 px-1">
                          <button
                            onClick={() => removeItem(it.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors text-lg px-1"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={addItem}
                className="mt-3 border border-dashed border-blue-300 text-blue-600 text-xs px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
              >
                + Add Item
              </button>

              <SectionTitle>Totals & Payment</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>VAT %</Label>
                  <Input
                    type="number"
                    value={vatPct}
                    min={0}
                    max={100}
                    onChange={(e) => setVatPct(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Discount (AED)</Label>
                  <Input
                    type="number"
                    value={discount}
                    min={0}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <Label>Paid Amount (AED)</Label>
                  <Input
                    type="number"
                    value={paidAmount}
                    min={0}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Remaining Amount</Label>
                  <div className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-blue-50 text-[#0D1B4B] font-medium">
                    {fmt(remainingAmount)}
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 rounded-xl p-4 space-y-1">
                {[
                  ["Subtotal", fmt(subtotal)],
                  ["Discount", fmt(discount || 0)],
                  [`VAT ${vatPct}%`, fmt(vat)],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="flex justify-between text-sm text-gray-500"
                  >
                    <span>{label}</span>
                    <span>{val}</span>
                  </div>
                ))}
                <div className="flex justify-between text-base font-semibold text-[#0D1B4B] border-t border-blue-200 pt-2 mt-2">
                  <span>Grand Total</span>
                  <span>{fmt(grand)}</span>
                </div>
              </div>

              <SectionTitle>Notes</SectionTitle>
              <textarea
                className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                rows={2}
                placeholder="Additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={clearAll}
                  className="flex-1 py-3 rounded-xl border border-blue-200 text-gray-500 text-sm hover:border-blue-400 hover:text-blue-700 transition-all"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowInvoice(true)}
                  className="flex-[2] py-3 rounded-xl text-white text-sm font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg,#0D1B4B,#2B3A7A)",
                  }}
                >
                  <span>Generate Invoice</span>
                  <span className="text-blue-300">✦</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  /* ── INVOICE PREVIEW ── */
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          "linear-gradient(135deg,#0D1B4B 0%,#1a2d6b 40%,#0f2255 100%)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => setShowInvoice(false)}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/50 px-4 py-2 rounded-lg transition-all bg-white/10 backdrop-blur"
          >
            ← Back to Form
          </button>
          <button
            onClick={printInvoice}
            className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#2B3A7A,#4a5fa8)" }}
          >
            🖨 Print / Save PDF
          </button>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-[#0D1B4B] text-white px-8 py-6 flex justify-between items-center">
            <div className="h-16">
              {logoB64 ? (
                <img
                  src={logoB64}
                  alt="Amaraa"
                  className="h-full object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              ) : (
                <span
                  className="text-white font-serif text-2xl tracking-widest"
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}
                >
                  AMARAA
                </span>
              )}
            </div>
            <div className="text-right text-xs opacity-85">
              <div
                className="text-blue-200 text-lg font-semibold tracking-widest"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                {invType.toUpperCase()}
              </div>
              <div>No. {invNo}</div>
              <div>Date: {formatDate(invDate)}</div>
              <div className="text-[10px] mt-1 opacity-60">TRN: {trn}</div>
            </div>
          </div>
          <div
            className="h-[3px]"
            style={{
              background: "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
            }}
          />

          <div className="px-8 py-6">
            {/* From / To */}
            <div className="grid grid-cols-2 gap-6 mb-5">
              <div>
                <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
                  From
                </div>
                <div className="text-sm font-medium text-[#0D1B4B]">
                  Amaraa FZCO
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Almas 25-J-04, Almas Tower
                  <br />
                  JLT-PH1-A0, Jumeirah Lake Towers
                  <br />
                  Dubai, United Arab Emirates
                  <br />
                  Tel: +971 543969425 | +971 521866038
                  <br />
                  info@amaraa.com · www.amaraa.com
                </div>
              </div>
              <div>
                <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
                  To
                </div>
                <div className="text-sm font-medium text-[#0D1B4B]">
                  {custName || "—"}
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {custAddr && (
                    <>
                      {custAddr}
                      <br />
                    </>
                  )}
                  {custTrn && (
                    <>
                      TRN: {custTrn}
                      <br />
                    </>
                  )}
                  {[custPhone, custEmail].filter(Boolean).join(" | ")}
                </div>
              </div>
            </div>

            <div className="mb-3 text-sm font-medium text-blue-700">
              ✦ Lab Grown Diamonds
            </div>

            {/* Items table */}
            <div className="rounded-xl overflow-hidden border border-blue-100">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-blue-50">
                    {[
                      "Sl.",
                      "Item Name / Code",
                      "Qty",
                      "Cts/Size",
                      "Unit Price",
                      "Amount (AED)",
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={`text-[9px] tracking-wider uppercase text-blue-700 py-2 px-3 font-medium ${i > 1 ? "text-right" : "text-left"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr
                      key={it.id}
                      className="border-t border-blue-50 hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="py-2 px-3 text-gray-400">{i + 1}</td>
                      <td className="py-2 px-3 text-gray-800 font-medium">
                        {it.itemCode || "—"}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-600">
                        {it.qty}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-600">
                        {it.cts || "—"}
                      </td>
                      <td className="py-2 px-3 text-right text-gray-600">
                        {it.price ? "AED " + Number(it.price).toFixed(2) : "—"}
                      </td>
                      <td className="py-2 px-3 text-right font-semibold text-[#0D1B4B]">
                        {it.price
                          ? "AED " + (it.qty * Number(it.price)).toFixed(2)
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex flex-wrap justify-between items-end gap-5 mt-5">
              <div className="flex-1 min-w-0">
                <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
                  Amount in Words
                </div>
                <div className="bg-blue-50 rounded-xl px-4 py-3 text-xs italic text-[#0D1B4B] leading-relaxed">
                  {grandToWords(grand)}
                </div>
                {notes && (
                  <div className="text-[11px] text-gray-400 italic mt-2">
                    {notes}
                  </div>
                )}
              </div>
              <div className="w-56 text-xs shrink-0 bg-blue-50 rounded-xl p-4">
                <div className="flex justify-between py-1 text-gray-500">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-1 text-gray-500">
                    <span>Discount</span>
                    <span>{fmt(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 text-gray-500">
                  <span>VAT {vatPct}%</span>
                  <span>{fmt(vat)}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-500">
                  <span>Paid Amount</span>
                  <span>{fmt(paidAmount)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-[#0D1B4B] text-sm border-t border-blue-200 mt-1">
                  <span>Remaining</span>
                  <span>{fmt(remainingAmount)}</span>
                </div>
              </div>
            </div>

            {/* Signature row */}
            <div className="flex justify-between items-end mt-8">
              <div className="text-center">
                <div className="h-12"></div>
                <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400">
                  Receiver's Sign
                </div>
              </div>
              <div className="flex flex-col items-center">
                {stampB64 && (
                  <img
                    src={stampB64}
                    alt="Stamp"
                    className="w-24 h-24 object-contain opacity-90"
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                {sigB64 && (
                  <img
                    src={sigB64}
                    alt="Signature"
                    className="w-28 h-14 object-contain mb-1"
                  />
                )}
                <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400 text-center">
                  For AMARAA JEWELRY
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-blue-50 border-t border-blue-100 px-8 py-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
                Contact
              </div>
              Tel: +971 543969425 / +971 521866038
              <br />
              WhatsApp: +32488401207
              <br />
              info@amaraa.com · www.amaraa.com
            </div>
            <div>
              <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
                Registered Address
              </div>
              Almas Tower, Plot No JLT-PH1-A0
              <br />
              Jumeirah Lake Towers, Dubai, UAE
              <br />
              License: DMCC-896920
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
