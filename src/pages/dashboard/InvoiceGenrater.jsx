// // import { useState, useCallback, useEffect } from "react";
// // import logoSrc from "../../assets/images/logo.png";
// // import stampSrc from "../../assets/images/stemp.png";
// // import signatureSrc from "../../assets/images/signature.png";
// // import Nav from "../components/Nav";

// // /* ── helpers ── */
// // const fmt = (n) =>
// //   "AED " +
// //   Number(n).toLocaleString("en-AE", {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   });

// // const numToWords = (n) => {
// //   const a = [
// //     "",
// //     "One",
// //     "Two",
// //     "Three",
// //     "Four",
// //     "Five",
// //     "Six",
// //     "Seven",
// //     "Eight",
// //     "Nine",
// //     "Ten",
// //     "Eleven",
// //     "Twelve",
// //     "Thirteen",
// //     "Fourteen",
// //     "Fifteen",
// //     "Sixteen",
// //     "Seventeen",
// //     "Eighteen",
// //     "Nineteen",
// //   ];
// //   const b = [
// //     "",
// //     "",
// //     "Twenty",
// //     "Thirty",
// //     "Forty",
// //     "Fifty",
// //     "Sixty",
// //     "Seventy",
// //     "Eighty",
// //     "Ninety",
// //   ];
// //   if (n === 0) return "Zero";
// //   if (n < 20) return a[n];
// //   if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
// //   if (n < 1000)
// //     return (
// //       a[Math.floor(n / 100)] +
// //       " Hundred" +
// //       (n % 100 ? " " + numToWords(n % 100) : "")
// //     );
// //   if (n < 100000)
// //     return (
// //       numToWords(Math.floor(n / 1000)) +
// //       " Thousand" +
// //       (n % 1000 ? " " + numToWords(n % 1000) : "")
// //     );
// //   return (
// //     numToWords(Math.floor(n / 100000)) +
// //     " Lakh" +
// //     (n % 100000 ? " " + numToWords(n % 100000) : "")
// //   );
// // };

// // const grandToWords = (grand) => {
// //   const int = Math.floor(grand);
// //   const fils = Math.round((grand - int) * 100);
// //   let words = numToWords(int) + " Dirhams";
// //   if (fils > 0) words += " and " + numToWords(fils) + " Fils";
// //   return words + " Only";
// // };

// // const today = () => new Date().toISOString().split("T")[0];
// // const formatDate = (dateStr) => {
// //   if (!dateStr)
// //     return new Date().toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });
// //   return new Date(dateStr).toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });
// // };

// // const newItem = () => ({
// //   id: Date.now(),
// //   itemCode: "",
// //   qty: 1,
// //   cts: "",
// //   price: "",
// // });

// // /* ── convert image URL → base64 data URL ── */
// // const toBase64 = (url) =>
// //   fetch(url)
// //     .then((r) => r.blob())
// //     .then(
// //       (blob) =>
// //         new Promise((res, rej) => {
// //           const reader = new FileReader();
// //           reader.onloadend = () => res(reader.result);
// //           reader.onerror = rej;
// //           reader.readAsDataURL(blob);
// //         }),
// //     );

// // /* ── build print HTML (images passed as full data-URLs) ── */
// // const buildPrintHTML = (data) => {
// //   const {
// //     invNo,
// //     invDate,
// //     invType,
// //     trn,
// //     custName,
// //     custAddr,
// //     custTrn,
// //     custPhone,
// //     custEmail,
// //     items,
// //     vatPct,
// //     discount,
// //     subtotal,
// //     vat,
// //     grand,
// //     notes,
// //     paidAmount,
// //     remainingAmount,
// //     logoB64,
// //     stampB64,
// //     sigB64,
// //   } = data;

// //   const itemCount = items.length;
// //   const rowPad =
// //     itemCount >= 10 ? "3px 8px" : itemCount >= 5 ? "5px 8px" : "8px 10px";
// //   const rowFont = itemCount >= 10 ? "10px" : itemCount >= 5 ? "11px" : "12px";

// //   const rows = items
// //     .map(
// //       (it, i) => `
// //   <tr>
// //     <td style="padding:${rowPad};border-bottom:1px solid #E8ECF5;font-size:${rowFont};">${i + 1}</td>
// //     <td style="padding:${rowPad};border-bottom:1px solid #E8ECF5;font-size:${rowFont};">${it.itemCode || "—"}</td>
// //     <td style="padding:${rowPad};border-bottom:1px solid #E8ECF5;text-align:right;font-size:${rowFont};">${it.qty}</td>
// //     <td style="padding:${rowPad};border-bottom:1px solid #E8ECF5;text-align:right;font-size:${rowFont};">${it.GWT || "—"}</td>
// //     <td style="padding:${rowPad};border-bottom:1px solid #E8ECF5;text-align:right;font-size:${rowFont};">${it.cts || "—"}</td>
// //     <td style="padding:${rowPad};border-bottom:1px solid #E8ECF5;text-align:right;font-size:${rowFont};">${it.price ? "AED " + Number(it.price).toFixed(2) : "—"}</td>
// //     <td style="padding:${rowPad};border-bottom:1px solid #E8ECF5;text-align:right;font-size:${rowFont};">${it.price ? "AED " + (it.qty * Number(it.price)).toFixed(2) : "—"}</td>
// //   </tr>`,
// //     )
// //     .join("");

// //   return `<!DOCTYPE html><html><head><meta charset="UTF-8">
// // <meta name="viewport" content="width=900, initial-scale=1.0, maximum-scale=4.0, user-scalable=yes">

// // <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
// // <style>
// //   *{box-sizing:border-box;margin:0;padding:0}
// //   html,body{
// //     width:100%;
// //     margin:0;
// //     padding:0;
// //     background:#fff;
// //     font-family:'DM Sans',sans-serif;
// //     -webkit-print-color-adjust:exact;
// //     print-color-adjust:exact;
// //   }
// //   .invoice-wrap{
// //     width:900px;
// //     margin:0 auto;
// //     transform-origin:top left;
// //   }
// //   .mobile-white-logo{
// //     filter:brightness(0) invert(1) !important;
// //     -webkit-filter:brightness(0) invert(1) !important;
// //   }
// //   @media print {
// //     html, body {
// //       width: 100% !important;
// //       height: auto !important;
// //       margin: 0 !important;
// //       padding: 0 !important;
// //       overflow: visible !important;
// //       -webkit-print-color-adjust: exact !important;
// //       print-color-adjust: exact !important;
// //     }
// //     @page {
// //       size: A4 portrait;
// //       margin: 0;
// //     }
// //     .invoice-wrap {
// //       /* Scale 900px design to fit 794px A4 print width */
// //       transform: scale(0.882) !important;
// //       transform-origin: top left !important;
// //       width: 900px !important;
// //       /* Collapse extra whitespace caused by scale */
// //       margin-bottom: -106px !important;
// //     }
// //     .invoice-wrap.single-page {
// //       page-break-inside: avoid !important;
// //     }
// //     .invoice-wrap.multi-page {
// //       page-break-inside: auto !important;
// //     }
// //   }
// // </style>
// // </head><body>
// // <div class="invoice-wrap ${itemCount <= 10 ? "single-page" : "multi-page"}" style="border:1px solid #C5CDE8;border-radius:12px;overflow:hidden;max-width:900px;margin:auto;">

// //   <div style="background:#0D1B4B;color:#ffffff;padding:24px 28px;display:flex;justify-content:space-between;align-items:center;-webkit-print-color-adjust:exact;print-color-adjust:exact;">

// //   <div>
// //     ${
// //       logoB64
// //         ? `<img src="${logoB64}" class="mobile-white-logo"
// //                 style="height:70px;object-fit:contain;
// //                        filter: brightness(0) invert(1) !important;
// //                        -webkit-filter: brightness(0) invert(1) !important;" />`
// //         : `<div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;letter-spacing:3px;color:#ffffff;">
// //             AMARAA<br>
// //             <span style="font-size:10px;letter-spacing:5px;opacity:0.7;color:#ffffff;">JEWELRY</span>
// //            </div>`
// //     }
// //   </div>

// //   <div style="text-align:right;font-size:12px;opacity:0.9;color:#ffffff;">
// //     <div style="font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:2px;color:#A8B8E8;font-weight:600;">
// //       ${invType.toUpperCase()}
// //     </div>
// //     <div>No. ${invNo}</div>
// //     <div>Date: ${formatDate(invDate)}</div>
// //     <div style="margin-top:4px;font-size:10px;opacity:0.7;">
// //       TRN: ${trn}
// //     </div>
// //   </div>

// // </div>

// //   <div style="height:3px;background:linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A);"></div>

// //   <div style="padding:24px 28px;">
// //     <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:20px;">
// //       <div>
// //         <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:5px;">From</div>
// //         <div style="font-size:14px;font-weight:500;color:#0D1B4B;">Amaraa FZCO</div>
// //         <div style="font-size:12px;color:#555;margin-top:2px;line-height:1.6;">Almas 25-J-04, Almas Tower<br>JLT-PH1-A0, Jumeirah Lake Towers<br>Dubai, United Arab Emirates<br>Tel: +971 543969425 | +971 521866038<br>info@amaraa.com · www.amaraa.com <br/> HS CODE   7113.19</div>
// //       </div>
// //       <div>
// //         <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:5px;">To</div>
// //         <div style="font-size:14px;font-weight:500;color:#0D1B4B;">${custName || "—"}</div>
// //         <div style="font-size:12px;color:#555;margin-top:2px;line-height:1.6;">${custAddr || ""}${custTrn ? "<br>TRN: " + custTrn : ""}${[custPhone, custEmail].filter(Boolean).join(" | ") ? "<br>" + [custPhone, custEmail].filter(Boolean).join(" | ") : ""}</div>
// //       </div>
// //     </div>

// //     <div style="margin-bottom:12px;font-weight:500;font-size:13px;color:#2B3A7A;letter-spacing:0.5px;">✦ Lab Grown Diamonds</div>

// //     <table style="width:100%;border-collapse:collapse;font-size:12px;margin:16px 0;">
// //       <thead>
// //         <tr style="background:#EEF1FA;">
// //           <th style="padding:8px 10px;text-align:left;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Sl.</th>
// //           <th style="padding:8px 10px;text-align:left;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Item Name / Code</th>
// //           <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Qty</th>
// //           <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">GWT</th>
// //           <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Cts/Size</th>
// //           <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Unit Price</th>
// //           <th style="padding:8px 10px;text-align:right;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;">Amount (AED)</th>
// //         </tr>
// //       </thead>
// //       <tbody>${rows}</tbody>
// //     </table>

// //     <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px;margin-top:16px;">
// //       <div style="flex:1; min-width:280px;">
// //         <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">Amount in Words</div>
// //         <div style="background:#EEF1FA;border-radius:6px;padding:8px 12px;font-style:italic;font-size:12px;color:#0D1B4B;margin-bottom:14px;">${grandToWords(grand)}</div>
// // ${notes ? '<div style="font-size:11px;font-style:italic;margin-top:4px;margin-bottom:12px;color:#FF0000;">' + notes + "</div>" : ""}
// //         <div style="padding:12px 14px;background:#EEF1FA;border-radius:8px;border:1px solid #C5CDE8;">
// //           <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:6px;font-weight:600;">Bank Details</div>
// //           <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 16px;font-size:11px;color:#333;">
// //             <div><span style="color:#555;font-size:9px;">Bank Name:</span><br/><strong>National Bank of Ras Al-Khaimah</strong></div>
// //             <div><span style="color:#555;font-size:9px;">Account Name:</span><br/><strong>AMARAA FZCO</strong></div>
// //             <div><span style="color:#555;font-size:9px;">Account Number:</span><br/><strong>0333479509001</strong></div>
// //             <div><span style="color:#555;font-size:9px;">SWIFT Code:</span><br/><strong>NRAKAEAK</strong></div>
// //             <div style="grid-column: span 2;"><span style="color:#555;font-size:9px;">IBAN:</span><br/><strong>AE25 0400 0003 3347 9509 001</strong></div>
// //             <div><span style="color:#555;font-size:9px;">Currency:</span><br/><strong>AED</strong></div>
// //             <div><span style="color:#555;font-size:9px;">Purpose of Payment:</span><br/><strong>Invoice ${invNo || ""}</strong></div>
// //           </div>
// //         </div>
// //       </div>

// //       <div style="width:230px;font-size:12px;margin-top:4px;">
// //         <div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
// //         ${discount > 0 ? `<div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>Discount</span><span>${fmt(discount)}</span></div>` : ""}
// //         <div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>VAT ${vatPct}%</span><span>${fmt(vat)}</span></div>
// //         <div style="display:flex;justify-content:space-between;padding:4px 0;color:#666;"><span>Paid Amount</span><span>${fmt(paidAmount || 0)}</span></div>
// //         <div style="display:flex;justify-content:space-between;padding:8px 0 4px;color:#0D1B4B;font-weight:600;font-size:14px;border-top:1px solid #C5CDE8;margin-top:4px;"><span>Remaining Amount</span><span>${fmt(remainingAmount)}</span></div>
// //       </div>
// //     </div>

// //     <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px;">
// //       <div style="text-align:center;">
// //         <div style="height:50px;"></div>
// //         <div style="border-top:1px solid #ccc;width:150px;padding-top:4px;font-size:10px;color:#888;">Receiver's Sign</div>
// //       </div>
// //       <div style="text-align:center;">
// //         ${stampB64 ? `<img src="${stampB64}" style="width:110px;height:110px;object-fit:contain;opacity:0.9;" />` : ""}
// //       </div>
// //       <div style="text-align:center;">
// //         ${sigB64 ? `<img src="${sigB64}" style="width:130px;height:65px;object-fit:contain;" />` : ""}
// //         <div style="border-top:1px solid #ccc;width:150px;padding-top:4px;font-size:10px;color:#888;margin-top:4px;">AMARAA JEWELRY</div>
// //       </div>
// //     </div>
// //   </div>

// //   <div style="background:#EEF1FA;padding:16px 28px;border-top:1px solid #C5CDE8;display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:11px;color:#555;">
// //     <div>
// //       <div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">Contact</div>
// //       Tel: +971 543969425 / +971 521866038<br>WhatsApp: +971 54 396 9425<br>info@amaraa.com · www.amaraa.com <br/> HS CODE  7113.19
// //     </div>
// //     <div>
// //       <div style="font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">Registered Address</div>
// //       Almas Tower, Plot No JLT-PH1-A0<br>Jumeirah Lake Towers, Dubai, UAE<br>License: DMCC-896920
// //     </div>
// //   </div>
// // </div>
// // <script>
// // <script>
// // window.onload = function() {
// //   setTimeout(function() {
// //     var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
// //     var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
// //     var itemCount = ${itemCount};

// //     if (isIOS || isSafari) {
// //       // iOS/Safari: CSS @media print handles scaling — just print
// //       // Do NOT manipulate viewport, transforms, or overflow here
// //       // as they interfere with the CSS print rules
// //       setTimeout(function() { window.print(); }, 800);
// //       return;
// //     }

// //     // ── Android / Chrome / Desktop ──
// //     var wrap = document.querySelector('.invoice-wrap');
// //     if (!wrap) { window.print(); return; }

// //     var A4_W = 794;
// //     var A4_H = 1123;

// //     if (itemCount <= 10) {
// //       var contentW = wrap.scrollWidth;
// //       var contentH = wrap.scrollHeight;
// //       var scaleW = A4_W / contentW;
// //       var projectedH = contentH * scaleW;
// //       var finalScale = projectedH <= A4_H ? scaleW : A4_H / contentH;

// //       wrap.style.transformOrigin = 'top left';
// //       wrap.style.transform = 'scale(' + finalScale + ')';
// //       var newH = contentH * finalScale;
// //       wrap.style.marginBottom = '-' + (contentH - newH) + 'px';
// //       document.body.style.width = (contentW * finalScale) + 'px';
// //       document.body.style.height = A4_H + 'px';
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       var screenW = window.innerWidth || 900;
// //       var scale = screenW / 900;
// //       var contentH = wrap.scrollHeight;
// //       wrap.style.transformOrigin = 'top left';
// //       wrap.style.transform = 'scale(' + scale + ')';
// //       wrap.style.marginBottom = '-' + (contentH * (1 - scale)) + 'px';
// //       document.body.style.width = (900 * scale) + 'px';
// //       document.body.style.overflow = 'visible';
// //     }

// //     window.print();
// //   }, 1200);
// // };
// // </script></body></html>`;
// // };

// // /* ── UI primitives with navy color scheme ── */
// // const Label = ({ children }) => (
// //   <label className="block text-[11px] tracking-wider text-blue-800 mb-1 uppercase font-medium">
// //     {children}
// //   </label>
// // );

// // const Input = ({ className = "", ...props }) => (
// //   <input
// //     className={`w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300 ${className}`}
// //     {...props}
// //   />
// // );

// // const Select = ({ children, ...props }) => (
// //   <select
// //     className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
// //     {...props}
// //   >
// //     {children}
// //   </select>
// // );

// // const SectionTitle = ({ children }) => (
// //   <div className="text-[10px] tracking-[3px] uppercase text-blue-700 font-semibold mt-6 mb-3 flex items-center gap-2">
// //     <span className="text-blue-400">✦</span> {children}
// //     <span className="flex-1 h-px bg-blue-100 ml-1"></span>
// //   </div>
// // );

// // /* ══════════════════════════════════════════════════════════════ */
// // export default function AmaraaInvoiceGenerator() {
// //   const [invNo, setInvNo] = useState("0066");
// //   const [invDate, setInvDate] = useState(today());
// //   const [invType, setInvType] = useState("Tax Cash Invoice");
// //   const [trn, setTrn] = useState("104149856700003");
// //   const [custName, setCustName] = useState("");
// //   const [custAddr, setCustAddr] = useState("");
// //   const [custTrn, setCustTrn] = useState("");
// //   const [custPhone, setCustPhone] = useState("");
// //   const [custEmail, setCustEmail] = useState("");
// //   const [vatPct, setVatPct] = useState(5);
// //   const [discount, setDiscount] = useState(0);
// //   const [notes, setNotes] = useState("");
// //   const [items, setItems] = useState([newItem()]);
// //   const [showInvoice, setShowInvoice] = useState(false);
// //   const [paidAmount, setPaidAmount] = useState(0);

// //   /* Pre-load base64 versions of all images for PDF use */
// //   const [logoB64, setLogoB64] = useState("");
// //   const [stampB64, setStampB64] = useState("");
// //   const [sigB64, setSigB64] = useState("");

// //   useEffect(() => {
// //     toBase64(logoSrc)
// //       .then(setLogoB64)
// //       .catch(() => {});
// //     toBase64(stampSrc)
// //       .then(setStampB64)
// //       .catch(() => {});
// //     toBase64(signatureSrc)
// //       .then(setSigB64)
// //       .catch(() => {});
// //   }, []);

// //   const addItem = () => setItems((prev) => [...prev, newItem()]);
// //   const removeItem = (id) =>
// //     setItems((prev) => prev.filter((it) => it.id !== id));
// //   const updateItem = (id, field, value) =>
// //     setItems((prev) =>
// //       prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
// //     );

// //   const subtotal = items.reduce(
// //     (s, it) => s + (it.qty || 0) * (Number(it.price) || 0),
// //     0,
// //   );
// //   const discounted = Math.max(0, subtotal - (discount || 0));
// //   const vat = (discounted * (vatPct || 0)) / 100;
// //   const grand = discounted + vat;
// //   const remainingAmount = Math.max(0, grand - paidAmount);

// //   const clearAll = () => {
// //     setCustName("");
// //     setCustAddr("");
// //     setCustTrn("");
// //     setCustPhone("");
// //     setCustEmail("");
// //     setNotes("");
// //     setDiscount(0);
// //     setPaidAmount(0);
// //     setItems([newItem()]);
// //     setShowInvoice(false);
// //   };

// //   const printInvoice = useCallback(() => {
// //     const html = buildPrintHTML({
// //       invNo,
// //       invDate,
// //       invType,
// //       trn,
// //       custName,
// //       custAddr,
// //       custTrn,
// //       custPhone,
// //       custEmail,
// //       items,
// //       vatPct,
// //       discount,
// //       subtotal,
// //       vat,
// //       grand,
// //       notes,
// //       paidAmount,
// //       remainingAmount,
// //       logoB64,
// //       stampB64,
// //       sigB64, // ← pass base64 images
// //     });
// //     const w = window.open("", "_blank", "width=900,height=700");
// //     w.document.write(html);
// //     w.document.close();
// //   }, [
// //     invNo,
// //     invDate,
// //     invType,
// //     trn,
// //     custName,
// //     custAddr,
// //     custTrn,
// //     custPhone,
// //     custEmail,
// //     items,
// //     vatPct,
// //     discount,
// //     subtotal,
// //     vat,
// //     grand,
// //     notes,
// //     paidAmount,
// //     remainingAmount,
// //     logoB64,
// //     stampB64,
// //     sigB64,
// //   ]);

// //   /* ── FORM ── */
// //   if (!showInvoice)
// //     return (
// //       <div className="min-h-screen font-sans bg-[#d4d4d4]">
// //         <Nav />
// //         <link
// //           href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
// //           rel="stylesheet"
// //         />

// //         <div className="max-w-2xl mx-auto p-6">
// //           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
// //             {/* Brand header */}
// //             <div className="bg-[#0D1B4B] px-8 py-6 flex items-center justify-between">
// //               <div className="h-16">
// //                 {logoB64 ? (
// //                   <img
// //                     src={logoB64}
// //                     alt="Amaraa"
// //                     className="h-full object-contain"
// //                     style={{ filter: "brightness(0) invert(1)" }}
// //                   />
// //                 ) : (
// //                   <span
// //                     className="text-white font-serif text-2xl tracking-widest"
// //                     style={{ fontFamily: "'Cormorant Garamond',serif" }}
// //                   >
// //                     AMARAA JEWELRY
// //                   </span>
// //                 )}
// //               </div>
// //               <div className="text-right">
// //                 <div className="text-blue-200 text-xs tracking-[3px] uppercase">
// //                   Invoice Generator
// //                 </div>
// //                 <div className="text-white/50 text-[10px] mt-1">
// //                   Lab Grown Diamonds · Dubai, UAE
// //                 </div>
// //               </div>
// //             </div>
// //             <div
// //               className="h-[3px]"
// //               style={{
// //                 background: "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
// //               }}
// //             />

// //             <div className="px-8 py-6">
// //               <SectionTitle>Invoice Details</SectionTitle>
// //               <div className="grid grid-cols-2 gap-3">
// //                 <div>
// //                   <Label>Invoice No.</Label>
// //                   <Input
// //                     value={invNo}
// //                     onChange={(e) => setInvNo(e.target.value)}
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label>Date</Label>
// //                   <Input
// //                     type="date"
// //                     value={invDate}
// //                     onChange={(e) => setInvDate(e.target.value)}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-2 gap-3 mt-3">
// //                 <div>
// //                   <Label>Invoice Type</Label>
// //                   <Select
// //                     value={invType}
// //                     onChange={(e) => setInvType(e.target.value)}
// //                   >
// //                     <option>Invoice</option>
// //                     <option>Tax Cash Invoice</option>
// //                     <option>Tax Invoice</option>
// //                     <option>Memo</option>
// //                     <option>Proforma Invoice</option>
// //                   </Select>
// //                 </div>
// //                 <div>
// //                   <Label>TRN No.</Label>
// //                   <Input value={trn} onChange={(e) => setTrn(e.target.value)} />
// //                 </div>
// //               </div>

// //               <SectionTitle>Customer Info</SectionTitle>
// //               <div>
// //                 <Label>Customer Name</Label>
// //                 <Input
// //                   value={custName}
// //                   placeholder="e.g. Dana"
// //                   onChange={(e) => setCustName(e.target.value)}
// //                 />
// //               </div>
// //               <div className="grid grid-cols-2 gap-3 mt-3">
// //                 <div>
// //                   <Label>Address</Label>
// //                   <Input
// //                     value={custAddr}
// //                     placeholder="Dubai, UAE"
// //                     onChange={(e) => setCustAddr(e.target.value)}
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label>Customer TRN</Label>
// //                   <Input
// //                     value={custTrn}
// //                     placeholder="Optional"
// //                     onChange={(e) => setCustTrn(e.target.value)}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-2 gap-3 mt-3">
// //                 <div>
// //                   <Label>Phone</Label>
// //                   <Input
// //                     value={custPhone}
// //                     placeholder="+971..."
// //                     onChange={(e) => setCustPhone(e.target.value)}
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label>Email</Label>
// //                   <Input
// //                     type="email"
// //                     value={custEmail}
// //                     placeholder="customer@email.com"
// //                     onChange={(e) => setCustEmail(e.target.value)}
// //                   />
// //                 </div>
// //               </div>

// //               <SectionTitle>Items</SectionTitle>
// //               <div className="overflow-x-auto rounded-xl border border-blue-100">
// //                 <table className="w-full text-xs">
// //                   <thead>
// //                     <tr className="bg-blue-50">
// //                       {[
// //                         "Item Name / Code",
// //                         "Qty",
// //                         "GWT",
// //                         "Cts/Size",
// //                         "Price (AED)",
// //                         "",
// //                       ].map((h) => (
// //                         <th
// //                           key={h}
// //                           className="text-left text-[9px] tracking-widest uppercase text-blue-700 py-2 px-3 font-medium"
// //                         >
// //                           {h}
// //                         </th>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {items.map((it) => (
// //                       <tr key={it.id} className="border-t border-blue-50">
// //                         <td className="py-1 px-1">
// //                           <Input
// //                             className="text-xs py-1"
// //                             value={it.itemCode}
// //                             placeholder="e.g. HR-1001"
// //                             onChange={(e) =>
// //                               updateItem(it.id, "itemCode", e.target.value)
// //                             }
// //                           />
// //                         </td>
// //                         <td className="py-1 px-1 w-14">
// //                           <Input
// //                             type="number"
// //                             className="text-xs py-1 w-14"
// //                             value={it.qty}
// //                             min={1}
// //                             onChange={(e) =>
// //                               updateItem(it.id, "qty", Number(e.target.value))
// //                             }
// //                           />
// //                         </td>
// //                         <td className="py-1 px-1 w-16">
// //                           <Input
// //                             className="text-xs py-1 w-16"
// //                             value={it.GWT}
// //                             placeholder="0.0g"
// //                             onChange={(e) =>
// //                               updateItem(it.id, "GWT", e.target.value)
// //                             }
// //                           />
// //                         </td>
// //                         <td className="py-1 px-1 w-16">
// //                           <Input
// //                             className="text-xs py-1 w-16"
// //                             value={it.cts}
// //                             placeholder="5.06"
// //                             onChange={(e) =>
// //                               updateItem(it.id, "cts", e.target.value)
// //                             }
// //                           />
// //                         </td>
// //                         <td className="py-1 px-1 w-24">
// //                           <Input
// //                             type="number"
// //                             className="text-xs py-1 w-24"
// //                             value={it.price}
// //                             placeholder="0"
// //                             onChange={(e) =>
// //                               updateItem(it.id, "price", e.target.value)
// //                             }
// //                           />
// //                         </td>
// //                         <td className="py-1 px-1">
// //                           <button
// //                             onClick={() => removeItem(it.id)}
// //                             className="text-gray-300 hover:text-red-400 transition-colors text-lg px-1"
// //                           >
// //                             ×
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //               <button
// //                 onClick={addItem}
// //                 className="mt-3 border border-dashed border-blue-300 text-blue-600 text-xs px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
// //               >
// //                 + Add Item
// //               </button>

// //               <SectionTitle>Totals & Payment</SectionTitle>
// //               <div className="grid grid-cols-2 gap-3">
// //                 <div>
// //                   <Label>VAT %</Label>
// //                   <Input
// //                     type="number"
// //                     value={vatPct}
// //                     min={0}
// //                     max={100}
// //                     onChange={(e) => setVatPct(Number(e.target.value))}
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label>Discount (AED)</Label>
// //                   <Input
// //                     type="number"
// //                     value={discount}
// //                     min={0}
// //                     onChange={(e) => setDiscount(Number(e.target.value))}
// //                   />
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-2 gap-3 mt-3">
// //                 <div>
// //                   <Label>Paid Amount (AED)</Label>
// //                   <Input
// //                     type="number"
// //                     value={paidAmount}
// //                     min={0}
// //                     onChange={(e) => setPaidAmount(Number(e.target.value))}
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label>Remaining Amount</Label>
// //                   <div className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-blue-50 text-[#0D1B4B] font-medium">
// //                     {fmt(remainingAmount)}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mt-4 bg-blue-50 rounded-xl p-4 space-y-1">
// //                 {[
// //                   ["Subtotal", fmt(subtotal)],
// //                   ["Discount", fmt(discount || 0)],
// //                   [`VAT ${vatPct}%`, fmt(vat)],
// //                 ].map(([label, val]) => (
// //                   <div
// //                     key={label}
// //                     className="flex justify-between text-sm text-gray-500"
// //                   >
// //                     <span>{label}</span>
// //                     <span>{val}</span>
// //                   </div>
// //                 ))}
// //                 <div className="flex justify-between text-base font-semibold text-[#0D1B4B] border-t border-blue-200 pt-2 mt-2">
// //                   <span>Grand Total</span>
// //                   <span>{fmt(grand)}</span>
// //                 </div>
// //               </div>

// //               <SectionTitle>Notes</SectionTitle>
// //               <textarea
// //                 className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
// //                 rows={2}
// //                 placeholder="Additional notes..."
// //                 value={notes}
// //                 onChange={(e) => setNotes(e.target.value)}
// //               />

// //               <div className="flex gap-3 mt-6">
// //                 <button
// //                   onClick={clearAll}
// //                   className="flex-1 py-3 rounded-xl border border-blue-200 text-gray-500 text-sm hover:border-blue-400 hover:text-blue-700 transition-all"
// //                 >
// //                   Clear
// //                 </button>
// //                 <button
// //                   onClick={() => setShowInvoice(true)}
// //                   className="flex-[2] py-3 rounded-xl text-white text-sm font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90"
// //                   style={{
// //                     background: "linear-gradient(135deg,#0D1B4B,#2B3A7A)",
// //                   }}
// //                 >
// //                   <span>Generate Invoice</span>
// //                   <span className="text-blue-300">✦</span>
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );

// //   /* ── INVOICE PREVIEW ── */
// //   return (
// //     <div className="min-h-screen font-sans bg-[#d4d4d4]">
// //       <link
// //         href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
// //         rel="stylesheet"
// //       />

// //       <div className="max-w-4xl mx-auto p-6">
// //         <div className="flex items-center justify-between mb-5">
// //           <button
// //             onClick={() => setShowInvoice(false)}
// //             className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 border-white/20 hover:border-white/50 px-4 py-2 rounded-lg transition-all bg-white/10 backdrop-blur cursor-pointer "
// //           >
// //             ← Back to Form
// //           </button>
// //           <button
// //             onClick={printInvoice}
// //             className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2"
// //             style={{ background: "linear-gradient(135deg,#2B3A7A,#4a5fa8)" }}
// //           >
// //             🖨 Print / Save PDF
// //           </button>
// //         </div>

// //         {/* Invoice Card */}
// //         <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden shadow-2xl">
// //           {/* Header */}
// //           <div className="bg-[#0D1B4B] text-white px-8 py-6 flex justify-between items-center">
// //             <div className="h-16">
// //               {logoB64 ? (
// //                 <img
// //                   src={logoB64}
// //                   alt="Amaraa"
// //                   className="h-full object-contain"
// //                   style={{ filter: "brightness(0) invert(1)" }}
// //                 />
// //               ) : (
// //                 <span
// //                   className="text-white font-serif text-2xl tracking-widest"
// //                   style={{ fontFamily: "'Cormorant Garamond',serif" }}
// //                 >
// //                   AMARAA
// //                 </span>
// //               )}
// //             </div>
// //             <div className="text-right text-xs opacity-85">
// //               <div
// //                 className="text-blue-200 text-lg font-semibold tracking-widest"
// //                 style={{ fontFamily: "'Cormorant Garamond',serif" }}
// //               >
// //                 {invType.toUpperCase()}
// //               </div>
// //               <div>No. {invNo}</div>
// //               <div>Date: {formatDate(invDate)}</div>
// //               <div className="text-[10px] mt-1 opacity-60">TRN: {trn}</div>
// //             </div>
// //           </div>
// //           <div
// //             className="h-[3px]"
// //             style={{
// //               background: "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
// //             }}
// //           />

// //           <div className="px-8 py-6">
// //             {/* From / To */}
// //             <div className="grid grid-cols-2 gap-6 mb-5">
// //               <div>
// //                 <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
// //                   From
// //                 </div>
// //                 <div className="text-sm font-medium text-[#0D1B4B]">
// //                   Amaraa FZCO
// //                 </div>
// //                 <div className="text-xs text-gray-500 mt-1 leading-relaxed">
// //                   Almas 25-J-04, Almas Tower
// //                   <br />
// //                   JLT-PH1-A0, Jumeirah Lake Towers
// //                   <br />
// //                   Dubai, United Arab Emirates
// //                   <br />
// //                   Tel: +971 543969425 | +971 521866038
// //                   <br />
// //                   info@amaraa.com · www.amaraa.com
// //                   <br />
// //                   HS CODE 7113.19
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
// //                   To
// //                 </div>
// //                 <div className="text-sm font-medium text-[#0D1B4B]">
// //                   {custName || "—"}
// //                 </div>
// //                 <div className="text-xs text-gray-500 mt-1 leading-relaxed">
// //                   {custAddr && (
// //                     <>
// //                       {custAddr}
// //                       <br />
// //                     </>
// //                   )}
// //                   {custTrn && (
// //                     <>
// //                       TRN: {custTrn}
// //                       <br />
// //                     </>
// //                   )}
// //                   {[custPhone, custEmail].filter(Boolean).join(" | ")}
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mb-3 text-sm font-medium text-blue-700">
// //               ✦ Lab Grown Diamonds
// //             </div>

// //             {/* Items table */}
// //             <div className="rounded-xl overflow-hidden border border-blue-100">
// //               <table className="w-full text-xs">
// //                 <thead>
// //                   <tr className="bg-blue-50">
// //                     {[
// //                       "Sl.",
// //                       "Item Name / Code",
// //                       "Qty",
// //                       "GWT",
// //                       "Cts/Size",
// //                       "Unit Price",
// //                       "Amount (AED)",
// //                     ].map((h, i) => (
// //                       <th
// //                         key={h}
// //                         className={`text-[9px] tracking-wider uppercase text-blue-700 py-2 px-3 font-medium ${i > 1 ? "text-right" : "text-left"}`}
// //                       >
// //                         {h}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {items.map((it, i) => (
// //                     <tr
// //                       key={it.id}
// //                       className="border-t border-blue-50 hover:bg-blue-50/30 transition-colors"
// //                     >
// //                       <td className="py-2 px-3 text-gray-400">{i + 1}</td>
// //                       <td className="py-2 px-3 text-gray-800 font-medium">
// //                         {it.itemCode || "—"}
// //                       </td>
// //                       <td className="py-2 px-3 text-right text-gray-600">
// //                         {it.qty}
// //                       </td>
// //                       <td className="py-2 px-3 text-right text-gray-600">
// //                         {it.GWT}
// //                       </td>
// //                       <td className="py-2 px-3 text-right text-gray-600">
// //                         {it.cts || "—"}
// //                       </td>
// //                       <td className="py-2 px-3 text-right text-gray-600">
// //                         {it.price ? "AED " + Number(it.price).toFixed(2) : "—"}
// //                       </td>
// //                       <td className="py-2 px-3 text-right font-semibold text-[#0D1B4B]">
// //                         {it.price
// //                           ? "AED " + (it.qty * Number(it.price)).toFixed(2)
// //                           : "—"}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* Totals */}
// //             <div className="flex flex-wrap justify-between items-end gap-5 mt-5">
// //               <div className="flex-1 min-w-0">
// //                 <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
// //                   Amount in Words
// //                 </div>
// //                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-xs italic text-[#0D1B4B] leading-relaxed">
// //                   {grandToWords(grand)}
// //                 </div>
// //                 {notes && (
// //                   <div className="text-[11px] italic mt-2 text-[#FF0000]">
// //                     {notes}
// //                   </div>
// //                 )}
// //               </div>
// //               <div className="w-56 text-xs shrink-0 bg-blue-50 rounded-xl p-4">
// //                 <div className="flex justify-between py-1 text-gray-500">
// //                   <span>Subtotal</span>
// //                   <span>{fmt(subtotal)}</span>
// //                 </div>
// //                 {discount > 0 && (
// //                   <div className="flex justify-between py-1 text-gray-500">
// //                     <span>Discount</span>
// //                     <span>{fmt(discount)}</span>
// //                   </div>
// //                 )}
// //                 <div className="flex justify-between py-1 text-gray-500">
// //                   <span>VAT {vatPct}%</span>
// //                   <span>{fmt(vat)}</span>
// //                 </div>
// //                 <div className="flex justify-between py-1 text-gray-500">
// //                   <span>Paid Amount</span>
// //                   <span>{fmt(paidAmount)}</span>
// //                 </div>
// //                 <div className="flex justify-between py-2 font-bold text-[#0D1B4B] text-sm border-t border-blue-200 mt-1">
// //                   <span>Remaining</span>
// //                   <span>{fmt(remainingAmount)}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
// //               <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-3 font-semibold">
// //                 Bank Details
// //               </div>
// //               <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
// //                 {[
// //                   ["Bank Name", "National Bank of Ras Al-Khaimah"],
// //                   ["Account Name", "AMARAA FZCO"],
// //                   ["Account Number", "0333479509001"],
// //                   ["SWIFT Code", "NRAKAEAK"],
// //                   ["IBAN", "AE25 0400 0003 3347 9509 001"],
// //                   ["Currency", "AED"],
// //                   ["Payment Code", "GDS"],
// //                   [
// //                     "Purpose of Payment",
// //                     "Payment received against invoice No.",
// //                   ],
// //                 ].map(([label, val]) => (
// //                   <div key={label}>
// //                     <div className="text-gray-400 text-[10px]">{label}</div>
// //                     <div className="font-medium text-[#0D1B4B]">{val}</div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Signature row */}
// //             <div className="flex justify-between items-end mt-8">
// //               <div className="text-center">
// //                 <div className="h-12"></div>
// //                 <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400">
// //                   Receiver's Sign
// //                 </div>
// //               </div>
// //               <div className="flex flex-col items-center">
// //                 {stampB64 && (
// //                   <img
// //                     src={stampB64}
// //                     alt="Stamp"
// //                     className="w-24 h-24 object-contain opacity-90"
// //                   />
// //                 )}
// //               </div>
// //               <div className="flex flex-col items-center">
// //                 {sigB64 && (
// //                   <img
// //                     src={sigB64}
// //                     alt="Signature"
// //                     className="w-28 h-14 object-contain mb-1"
// //                   />
// //                 )}
// //                 <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400 text-center">
// //                   AMARAA JEWELRY
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Footer */}
// //           <div className="bg-blue-50 border-t border-blue-100 px-8 py-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
// //             <div>
// //               <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
// //                 Contact
// //               </div>
// //               Tel: +971 543969425 / +971 521866038
// //               <br />
// //               WhatsApp: +971 54 396 9425
// //               <br />
// //               info@amaraa.com · www.amaraa.com
// //             </div>
// //             <div>
// //               <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
// //                 Registered Address
// //               </div>
// //               Jumeirah Lake Towers, Dubai, UAE <br /> Almas Tower, Plot No
// //               JLT-PH1-A0
// //               <br />
// //               License: DMCC-896920
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useCallback, useEffect, useRef } from "react";
// import logoSrc from "../../assets/images/logo.png";
// import stampSrc from "../../assets/images/stemp.png";
// import signatureSrc from "../../assets/images/signature.png";
// import Nav from "../components/Nav";
// import * as htmlToImage from "html-to-image";
// import { jsPDF } from "jspdf";
// import { InvoicePage1, InvoicePage2 } from "../components/InvoiceTemplate";
// /* ── helpers ── */
// const fmt = (n) =>
//   "AED " +
//   Number(n).toLocaleString("en-AE", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

// const numToWords = (n) => {
//   const a = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];
//   const b = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];
//   if (n === 0) return "Zero";
//   if (n < 20) return a[n];
//   if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//   if (n < 1000)
//     return (
//       a[Math.floor(n / 100)] +
//       " Hundred" +
//       (n % 100 ? " " + numToWords(n % 100) : "")
//     );
//   if (n < 100000)
//     return (
//       numToWords(Math.floor(n / 1000)) +
//       " Thousand" +
//       (n % 1000 ? " " + numToWords(n % 1000) : "")
//     );
//   return (
//     numToWords(Math.floor(n / 100000)) +
//     " Lakh" +
//     (n % 100000 ? " " + numToWords(n % 100000) : "")
//   );
// };

// const grandToWords = (grand) => {
//   const int = Math.floor(grand);
//   const fils = Math.round((grand - int) * 100);
//   let words = numToWords(int) + " Dirhams";
//   if (fils > 0) words += " and " + numToWords(fils) + " Fils";
//   return words + " Only";
// };

// const today = () => new Date().toISOString().split("T")[0];
// const formatDate = (dateStr) => {
//   if (!dateStr)
//     return new Date().toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   return new Date(dateStr).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const newItem = () => ({
//   id: Date.now(),
//   itemCode: "",
//   qty: 1,
//   cts: "",
//   price: "",
// });

// /* ── convert image URL → base64 data URL ── */
// const toBase64 = (url) =>
//   fetch(url)
//     .then((r) => r.blob())
//     .then(
//       (blob) =>
//         new Promise((res, rej) => {
//           const reader = new FileReader();
//           reader.onloadend = () => res(reader.result);
//           reader.onerror = rej;
//           reader.readAsDataURL(blob);
//         }),
//     );

// /* ── load html2canvas + jsPDF dynamically ── */
// const loadScript = (src) =>
//   new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${src}"]`)) {
//       resolve();
//       return;
//     }
//     const s = document.createElement("script");
//     s.src = src;
//     s.onload = resolve;
//     s.onerror = reject;
//     document.head.appendChild(s);
//   });

// /* ── UI primitives ── */
// const Label = ({ children }) => (
//   <label className="block text-[11px] tracking-wider text-blue-800 mb-1 uppercase font-medium">
//     {children}
//   </label>
// );

// const Input = ({ className = "", ...props }) => (
//   <input
//     className={`w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300 ${className}`}
//     {...props}
//   />
// );

// const Select = ({ children, ...props }) => (
//   <select
//     className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
//     {...props}
//   >
//     {children}
//   </select>
// );

// const SectionTitle = ({ children }) => (
//   <div className="text-[10px] tracking-[3px] uppercase text-blue-700 font-semibold mt-6 mb-3 flex items-center gap-2">
//     <span className="text-blue-400">✦</span> {children}
//     <span className="flex-1 h-px bg-blue-100 ml-1"></span>
//   </div>
// );

// /* ══════════════════════════════════════════════════════════════ */
// export default function AmaraaInvoiceGenerator() {
//   const [invNo, setInvNo] = useState("0066");
//   const [invDate, setInvDate] = useState(today());
//   const [invType, setInvType] = useState("Tax Cash Invoice");
//   const [trn, setTrn] = useState("104149856700003");
//   const [custName, setCustName] = useState("");
//   const [custAddr, setCustAddr] = useState("");
//   const [custTrn, setCustTrn] = useState("");
//   const [custPhone, setCustPhone] = useState("");
//   const [custEmail, setCustEmail] = useState("");
//   const [vatPct, setVatPct] = useState(5);
//   const [discount, setDiscount] = useState(0);
//   const [notes, setNotes] = useState("");
//   const [items, setItems] = useState([newItem()]);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [paidAmount, setPaidAmount] = useState(0);
//   const [downloading, setDownloading] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(1123); // Default A4 height

//   const invoiceRef = useRef(null);
//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);

//   /* Pre-load base64 versions of all images */
//   const [logoB64, setLogoB64] = useState("");
//   const [stampB64, setStampB64] = useState("");
//   const [sigB64, setSigB64] = useState("");

//   useEffect(() => {
//     toBase64(logoSrc)
//       .then(setLogoB64)
//       .catch(() => {});
//     toBase64(stampSrc)
//       .then(setStampB64)
//       .catch(() => {});
//     toBase64(signatureSrc)
//       .then(setSigB64)
//       .catch(() => {});
//   }, []);

//   const addItem = () => setItems((prev) => [...prev, newItem()]);
//   const removeItem = (id) =>
//     setItems((prev) => prev.filter((it) => it.id !== id));
//   const updateItem = (id, field, value) =>
//     setItems((prev) =>
//       prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
//     );

//   const subtotal = items.reduce(
//     (s, it) => s + (it.qty || 0) * (Number(it.price) || 0),
//     0,
//   );
//   const discounted = Math.max(0, subtotal - (discount || 0));
//   const vat = (discounted * (vatPct || 0)) / 100;
//   const grand = discounted + vat;
//   const remainingAmount = Math.max(0, grand - paidAmount);

//   const clearAll = () => {
//     setCustName("");
//     setCustAddr("");
//     setCustTrn("");
//     setCustPhone("");
//     setCustEmail("");
//     setNotes("");
//     setDiscount(0);
//     setPaidAmount(0);
//     setItems([newItem()]);
//     setShowInvoice(false);
//   };
//   // Add this helper function before your component
//   // const calculateInvoiceHeight = (itemCount) => {
//   //   // Base heights in pixels
//   //   const headerHeight = 200; // Header + from/to section
//   //   const tableHeaderHeight = 40; // Table header
//   //   const rowHeight = 45; // Each item row
//   //   const totalsHeight = 280; // Totals + bank details + signature + footer
//   //   const paddingHeight = 40; // Extra padding

//   //   // Calculate table body height
//   //   const tableBodyHeight = itemCount * rowHeight;

//   //   // Total height
//   //   let totalHeight =
//   //     headerHeight +
//   //     tableHeaderHeight +
//   //     tableBodyHeight +
//   //     totalsHeight +
//   //     paddingHeight;

//   //   // Ensure minimum height for one page (1123px = A4 height at 96 DPI)
//   //   return Math.max(1123, totalHeight);
//   // };
//   const calculateInvoiceHeight = (itemCount) => {
//     // A4 height in pixels at 96 DPI = 1123px
//     const A4_HEIGHT = 1123;

//     // Base heights
//     const FIXED_SECTIONS_HEIGHT = 780; // Header, from/to, totals, bank, signature, footer
//     const TABLE_HEADER_HEIGHT = 40;
//     const ROW_HEIGHT = 45; // Per item row height

//     // Calculate content height
//     const tableHeight = TABLE_HEADER_HEIGHT + itemCount * ROW_HEIGHT;
//     const totalHeight = FIXED_SECTIONS_HEIGHT + tableHeight;

//     // Determine if we need multiple pages
//     // Only go to second page if items > 10 (or totalHeight > A4_HEIGHT + 100)
//     if (itemCount <= 10) {
//       // Force single page by returning A4 height
//       return A4_HEIGHT;
//     }

//     // For more than 10 items, return actual height for multiple pages
//     return totalHeight;
//   };
//   useEffect(() => {
//     const newHeight = calculateInvoiceHeight(items.length);
//     setContainerHeight(newHeight);
//   }, [items.length]);
//   /* ── Direct PDF download from the rendered preview ── */
//   // const downloadPDF = useCallback(async () => {
//   //   if (!invoiceRef.current || downloading) return;
//   //   setDownloading(true);
//   //   try {
//   //     // Load libraries if not already loaded
//   //     await loadScript(
//   //       "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
//   //     );
//   //     await loadScript(
//   //       "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
//   //     );

//   //     const element = invoiceRef.current;

//   //     // Fix: html2canvas doesn't support oklch (Tailwind v4 default).
//   //     // Use onclone to replace all oklch values with safe fallbacks in the cloned doc.
//   //     const fixOklch = (doc) => {
//   //       const sheets = Array.from(doc.styleSheets);
//   //       sheets.forEach((sheet) => {
//   //         try {
//   //           const rules = Array.from(sheet.cssRules || []);
//   //           rules.forEach((rule) => {
//   //             if (rule.style) {
//   //               Array.from(rule.style).forEach((prop) => {
//   //                 const val = rule.style.getPropertyValue(prop);
//   //                 if (val && val.includes("oklch")) {
//   //                   // Replace oklch with transparent fallback; visible colors come from inline styles
//   //                   rule.style.setProperty(
//   //                     prop,
//   //                     "transparent",
//   //                     rule.style.getPropertyPriority(prop),
//   //                   );
//   //                 }
//   //               });
//   //             }
//   //           });
//   //         } catch (_) {
//   //           // Cross-origin stylesheets are inaccessible — skip silently
//   //         }
//   //       });

//   //       // Also walk all elements and fix any inline oklch
//   //       doc.querySelectorAll("*").forEach((el) => {
//   //         const style = el.style;
//   //         if (!style) return;
//   //         Array.from(style).forEach((prop) => {
//   //           const val = style.getPropertyValue(prop);
//   //           if (val && val.includes("oklch")) {
//   //             style.setProperty(prop, "transparent");
//   //           }
//   //         });
//   //       });
//   //     };

//   //     // Capture the invoice card at 2× resolution for crisp output
//   //     const canvas = await window.html2canvas(element, {
//   //       scale: 2,
//   //       useCORS: true,
//   //       allowTaint: true,
//   //       backgroundColor: "#ffffff",
//   //       logging: false,
//   //       windowWidth: element.scrollWidth,
//   //       windowHeight: element.scrollHeight,
//   //       onclone: (_clonedDoc) => fixOklch(_clonedDoc),
//   //     });

//   //     const imgData = canvas.toDataURL("image/jpeg", 0.95);

//   //     // A4 dimensions in mm
//   //     const A4_W = 210;
//   //     const A4_H = 297;

//   //     const { jsPDF } = window.jspdf;

//   //     // Determine orientation — if content is very tall use multiple pages
//   //     const imgW = canvas.width;
//   //     const imgH = canvas.height;

//   //     // Scale image to fit A4 width
//   //     const pdfImgW = A4_W;
//   //     const pdfImgH = (imgH / imgW) * A4_W;

//   //     let pdf;
//   //     if (pdfImgH <= A4_H) {
//   //       // Single page — center vertically
//   //       pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//   //       const yOffset = (A4_H - pdfImgH) / 2;
//   //       pdf.addImage(imgData, "JPEG", 0, yOffset, pdfImgW, pdfImgH);
//   //     } else {
//   //       // Multi-page — slice the image into A4 chunks
//   //       pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//   //       let yPosition = 0;
//   //       let pageRemaining = pdfImgH;

//   //       while (pageRemaining > 0) {
//   //         pdf.addImage(imgData, "JPEG", 0, -yPosition, pdfImgW, pdfImgH);
//   //         pageRemaining -= A4_H;
//   //         yPosition += A4_H;
//   //         if (pageRemaining > 0) pdf.addPage();
//   //       }
//   //     }

//   //     const fileName = `Amaraa_Invoice_${invNo || "draft"}_${formatDate(invDate).replace(/ /g, "-")}.pdf`;
//   //     pdf.save(fileName);
//   //   } catch (err) {
//   //     console.error("PDF generation failed:", err);
//   //     alert("PDF download failed. Please try again.");
//   //   } finally {
//   //     setDownloading(false);
//   //   }
//   // }, [downloading, invNo, invDate]);
//   <style>{`
//   /* Ensure table rows don't break awkwardly */
//   table {
//     width: 100%;
//     border-collapse: collapse;
//   }

//   td, th {
//     padding: 8px 12px;
//   }

//   /* Make text smaller if many items */
//   @media (max-height: 1123px) {
//     .invoice-content {
//       font-size: 11px;
//     }
//   }
// `}</style>;
//   // const downloadPDF = useCallback(async () => {
//   //   if (downloading) return;

//   //   setDownloading(true);

//   //   try {
//   //     const pdf = new jsPDF("p", "mm", "a4");
//   //     const pageWidth = 210;
//   //     const pageHeight = 297;

//   //     if (items.length <= 10) {
//   //       // Single page - capture page1Ref only
//   //       if (page1Ref.current) {
//   //         const canvas = await htmlToImage.toCanvas(page1Ref.current, {
//   //           quality: 1,
//   //           pixelRatio: 2,
//   //           backgroundColor: "#ffffff",
//   //           cacheBust: true,
//   //         });

//   //         const imgWidth = pageWidth;
//   //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//   //         let finalHeight = imgHeight;
//   //         if (imgHeight > pageHeight) {
//   //           finalHeight = pageHeight;
//   //         }

//   //         pdf.addImage(
//   //           canvas.toDataURL("image/jpeg", 0.95),
//   //           "JPEG",
//   //           0,
//   //           0,
//   //           pageWidth,
//   //           finalHeight,
//   //         );
//   //       }
//   //     } else {
//   //       // Multiple pages - capture both pages separately

//   //       // Capture Page 1
//   //       if (page1Ref.current) {
//   //         const canvas1 = await htmlToImage.toCanvas(page1Ref.current, {
//   //           quality: 1,
//   //           pixelRatio: 2,
//   //           backgroundColor: "#ffffff",
//   //           cacheBust: true,
//   //         });

//   //         const imgWidth1 = pageWidth;
//   //         const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width;

//   //         pdf.addImage(
//   //           canvas1.toDataURL("image/jpeg", 0.95),
//   //           "JPEG",
//   //           0,
//   //           0,
//   //           imgWidth1,
//   //           imgHeight1,
//   //         );
//   //       }

//   //       // Capture Page 2
//   //       if (page2Ref.current) {
//   //         const canvas2 = await htmlToImage.toCanvas(page2Ref.current, {
//   //           quality: 1,
//   //           pixelRatio: 2,
//   //           backgroundColor: "#ffffff",
//   //           cacheBust: true,
//   //         });

//   //         // Add new page for page 2
//   //         pdf.addPage();

//   //         const imgWidth2 = pageWidth;
//   //         const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;

//   //         pdf.addImage(
//   //           canvas2.toDataURL("image/jpeg", 0.95),
//   //           "JPEG",
//   //           0,
//   //           0,
//   //           imgWidth2,
//   //           imgHeight2,
//   //         );
//   //       }
//   //     }

//   //     const fileName = `Amaraa_Invoice_${invNo || "draft"}_${formatDate(invDate).replace(/ /g, "-")}.pdf`;

//   //     // Handle iOS
//   //     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

//   //     if (isIOS) {
//   //       const blob = pdf.output("blob");
//   //       const url = URL.createObjectURL(blob);
//   //       window.open(url, "_blank");
//   //       setTimeout(() => {
//   //         URL.revokeObjectURL(url);
//   //       }, 1000);
//   //       return;
//   //     }

//   //     pdf.save(fileName);
//   //   } catch (err) {
//   //     console.error("PDF generation failed:", err);
//   //     alert("PDF download failed. Please try again.");
//   //   } finally {
//   //     setDownloading(false);
//   //   }
//   // }, [downloading, invNo, invDate, items.length]);
//   const downloadPDF = useCallback(async () => {
//     if (downloading) return;
//     setDownloading(true);

//     try {
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageWidth = 210;
//       const pageHeight = 297;

//       if (items.length <= 10) {
//         // Single page - use Page 1 template with all items
//         const element = document.getElementById("invoice-page-1");
//         if (element) {
//           const canvas = await htmlToImage.toCanvas(element, {
//             quality: 1,
//             pixelRatio: 2,
//             backgroundColor: "#ffffff",
//             cacheBust: true,
//           });

//           const imgWidth = pageWidth;
//           const imgHeight = (canvas.height * imgWidth) / canvas.width;

//           pdf.addImage(
//             canvas.toDataURL("image/jpeg", 0.95),
//             "JPEG",
//             0,
//             0,
//             imgWidth,
//             imgHeight,
//           );
//         }
//       } else {
//         // Multiple pages
//         // Page 1
//         const element1 = document.getElementById("invoice-page-1");
//         if (element1) {
//           const canvas1 = await htmlToImage.toCanvas(element1, {
//             quality: 1,
//             pixelRatio: 2,
//             backgroundColor: "#ffffff",
//             cacheBust: true,
//           });

//           const imgWidth1 = pageWidth;
//           const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width;

//           pdf.addImage(
//             canvas1.toDataURL("image/jpeg", 0.95),
//             "JPEG",
//             0,
//             0,
//             imgWidth1,
//             imgHeight1,
//           );
//         }

//         // Page 2
//         const element2 = document.getElementById("invoice-page-2");
//         if (element2) {
//           pdf.addPage();

//           const canvas2 = await htmlToImage.toCanvas(element2, {
//             quality: 1,
//             pixelRatio: 2,
//             backgroundColor: "#ffffff",
//             cacheBust: true,
//           });

//           const imgWidth2 = pageWidth;
//           const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;

//           pdf.addImage(
//             canvas2.toDataURL("image/jpeg", 0.95),
//             "JPEG",
//             0,
//             0,
//             imgWidth2,
//             imgHeight2,
//           );
//         }
//       }

//       const fileName = `Amaraa_Invoice_${invNo || "draft"}_${formatDate(invDate).replace(/ /g, "-")}.pdf`;
//       pdf.save(fileName);
//     } catch (err) {
//       console.error("PDF generation failed:", err);
//       alert("PDF download failed. Please try again.");
//     } finally {
//       setDownloading(false);
//     }
//   }, [downloading, invNo, invDate, items.length]);
//   /* ── FORM ── */
//   if (!showInvoice)
//     return (
//       <div className="min-h-screen font-sans bg-[#d4d4d4]">
//         <Nav />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
//           rel="stylesheet"
//         />

//         <div className="max-w-4xl mx-auto py-6 px-3">
//           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//             {/* Brand header */}
//             <div className="bg-[#0D1B4B] px-8 py-6 flex items-center justify-between">
//               <div className="h-16">
//                 {logoB64 ? (
//                   <img
//                     src={logoB64}
//                     alt="Amaraa"
//                     className="h-full object-contain"
//                     style={{ filter: "brightness(0) invert(1)" }}
//                   />
//                 ) : (
//                   <span
//                     className="text-white font-serif text-2xl tracking-widest"
//                     style={{ fontFamily: "'Cormorant Garamond',serif" }}
//                   >
//                     AMARAA JEWELRY
//                   </span>
//                 )}
//               </div>
//               <div className="text-right">
//                 <div className="text-blue-200 text-xs tracking-[3px] uppercase">
//                   Invoice Generator
//                 </div>
//                 <div className="text-white/50 text-[10px] mt-1">
//                   Lab Grown Diamonds · Dubai, UAE
//                 </div>
//               </div>
//             </div>
//             <div
//               className="h-[3px]"
//               style={{
//                 background: "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
//               }}
//             />

//             <div className="px-8 py-6">
//               <SectionTitle>Invoice Details</SectionTitle>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <Label>Invoice No.</Label>
//                   <Input
//                     value={invNo}
//                     onChange={(e) => setInvNo(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label>Date</Label>
//                   <Input
//                     type="date"
//                     value={invDate}
//                     onChange={(e) => setInvDate(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-3">
//                 <div>
//                   <Label>Invoice Type</Label>
//                   <Select
//                     value={invType}
//                     onChange={(e) => setInvType(e.target.value)}
//                   >
//                     <option>Invoice</option>
//                     <option>Tax Cash Invoice</option>
//                     <option>Tax Invoice</option>
//                     <option>Memo</option>
//                     <option>Proforma Invoice</option>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label>TRN No.</Label>
//                   <Input value={trn} onChange={(e) => setTrn(e.target.value)} />
//                 </div>
//               </div>

//               <SectionTitle>Customer Info</SectionTitle>
//               <div>
//                 <Label>Customer Name</Label>
//                 <Input
//                   value={custName}
//                   placeholder="e.g. Dana"
//                   onChange={(e) => setCustName(e.target.value)}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-3">
//                 <div>
//                   <Label>Address</Label>
//                   <Input
//                     value={custAddr}
//                     placeholder="Dubai, UAE"
//                     onChange={(e) => setCustAddr(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label>Customer TRN</Label>
//                   <Input
//                     value={custTrn}
//                     placeholder="Optional"
//                     onChange={(e) => setCustTrn(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-3">
//                 <div>
//                   <Label>Phone</Label>
//                   <Input
//                     value={custPhone}
//                     placeholder="+971..."
//                     onChange={(e) => setCustPhone(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label>Email</Label>
//                   <Input
//                     type="email"
//                     value={custEmail}
//                     placeholder="customer@email.com"
//                     onChange={(e) => setCustEmail(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <SectionTitle>Items</SectionTitle>
//               <div className="overflow-x-auto rounded-xl border border-blue-100">
//                 <table className="w-full text-xs">
//                   <thead>
//                     <tr className="bg-blue-50">
//                       {[
//                         "Item Name / Code",
//                         "Qty",
//                         "GWT",
//                         "Cts/Size",
//                         "Price (AED)",
//                         "",
//                       ].map((h) => (
//                         <th
//                           key={h}
//                           className="text-left text-[9px] tracking-widest uppercase text-blue-700 py-2 px-3 font-medium"
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {items.map((it) => (
//                       <tr key={it.id} className="border-t border-blue-50">
//                         <td className="py-1 px-1">
//                           <Input
//                             className="text-xs py-1"
//                             value={it.itemCode}
//                             placeholder="e.g. HR-1001"
//                             onChange={(e) =>
//                               updateItem(it.id, "itemCode", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td className="py-1 px-1 w-14">
//                           <Input
//                             type="number"
//                             className="text-xs py-1 w-14"
//                             value={it.qty}
//                             min={1}
//                             onChange={(e) =>
//                               updateItem(it.id, "qty", Number(e.target.value))
//                             }
//                           />
//                         </td>
//                         <td className="py-1 px-1 w-16">
//                           <Input
//                             className="text-xs py-1 w-16"
//                             value={it.GWT}
//                             placeholder="0.0g"
//                             onChange={(e) =>
//                               updateItem(it.id, "GWT", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td className="py-1 px-1 w-16">
//                           <Input
//                             className="text-xs py-1 w-16"
//                             value={it.cts}
//                             placeholder="5.06"
//                             onChange={(e) =>
//                               updateItem(it.id, "cts", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td className="py-1 px-1 w-24">
//                           <Input
//                             type="number"
//                             className="text-xs py-1 w-24"
//                             value={it.price}
//                             placeholder="0"
//                             onChange={(e) =>
//                               updateItem(it.id, "price", e.target.value)
//                             }
//                           />
//                         </td>
//                         <td className="py-1 px-1">
//                           <button
//                             onClick={() => removeItem(it.id)}
//                             className="text-gray-300 hover:text-red-400 transition-colors text-lg px-1"
//                           >
//                             ×
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <button
//                 onClick={addItem}
//                 className="mt-3 border border-dashed border-blue-300 text-blue-600 text-xs px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
//               >
//                 + Add Item
//               </button>

//               <SectionTitle>Totals & Payment</SectionTitle>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <Label>VAT %</Label>
//                   <Input
//                     type="number"
//                     value={vatPct}
//                     min={0}
//                     max={100}
//                     onChange={(e) => setVatPct(Number(e.target.value))}
//                   />
//                 </div>
//                 <div>
//                   <Label>Discount (AED)</Label>
//                   <Input
//                     type="number"
//                     value={discount}
//                     min={0}
//                     onChange={(e) => setDiscount(Number(e.target.value))}
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 mt-3">
//                 <div>
//                   <Label>Paid Amount (AED)</Label>
//                   <Input
//                     type="number"
//                     value={paidAmount}
//                     min={0}
//                     onChange={(e) => setPaidAmount(Number(e.target.value))}
//                   />
//                 </div>
//                 <div>
//                   <Label>Remaining Amount</Label>
//                   <div className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-blue-50 text-[#0D1B4B] font-medium">
//                     {fmt(remainingAmount)}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 bg-blue-50 rounded-xl p-4 space-y-1">
//                 {[
//                   ["Subtotal", fmt(subtotal)],
//                   ["Discount", fmt(discount || 0)],
//                   [`VAT ${vatPct}%`, fmt(vat)],
//                 ].map(([label, val]) => (
//                   <div
//                     key={label}
//                     className="flex justify-between text-sm text-gray-500"
//                   >
//                     <span>{label}</span>
//                     <span>{val}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between text-base font-semibold text-[#0D1B4B] border-t border-blue-200 pt-2 mt-2">
//                   <span>Grand Total</span>
//                   <span>{fmt(grand)}</span>
//                 </div>
//               </div>

//               <SectionTitle>Notes</SectionTitle>
//               <textarea
//                 className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
//                 rows={2}
//                 placeholder="Additional notes..."
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />

//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={clearAll}
//                   className="flex-1 py-3 rounded-xl border border-blue-200 text-gray-500 text-sm hover:border-blue-400 hover:text-blue-700 transition-all"
//                 >
//                   Clear
//                 </button>
//                 <button
//                   onClick={() => setShowInvoice(true)}
//                   className="flex-[2] py-3 rounded-xl text-white text-sm font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90"
//                   style={{
//                     background: "linear-gradient(135deg,#0D1B4B,#2B3A7A)",
//                   }}
//                 >
//                   <span>Generate Invoice</span>
//                   <span className="text-blue-300">✦</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );

//   /* ── INVOICE PREVIEW ── */
//   return (
//     // <div className="min-h-screen font-sans bg-[#d4d4d4]">
//     //   <link
//     //     href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap"
//     //     rel="stylesheet"
//     //   />

//     //   <div className=" mx-auto p-5 ">
//     //     <div className="flex items-center justify-between mb-5 mt-5">
//     //       <button
//     //         onClick={() => setShowInvoice(false)}
//     //         className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 border-white/20 hover:border-white/50 px-4 py-2 rounded-lg transition-all bg-white/10 backdrop-blur cursor-pointer"
//     //       >
//     //         ← Back to Form
//     //       </button>

//     //       {/* ── Download PDF button ── */}
//     //       <button
//     //         onClick={downloadPDF}
//     //         disabled={downloading}
//     //         className="px-6 py-2 rounded-lg text-white text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//     //         style={{ background: "linear-gradient(135deg,#2B3A7A,#4a5fa8)" }}
//     //       >
//     //         {downloading ? (
//     //           <>
//     //             <svg
//     //               className="animate-spin w-4 h-4 text-white"
//     //               xmlns="http://www.w3.org/2000/svg"
//     //               fill="none"
//     //               viewBox="0 0 24 24"
//     //             >
//     //               <circle
//     //                 className="opacity-25"
//     //                 cx="12"
//     //                 cy="12"
//     //                 r="10"
//     //                 stroke="currentColor"
//     //                 strokeWidth="4"
//     //               />
//     //               <path
//     //                 className="opacity-75"
//     //                 fill="currentColor"
//     //                 d="M4 12a8 8 0 018-8v8z"
//     //               />
//     //             </svg>
//     //             <span>Generating PDF…</span>
//     //           </>
//     //         ) : (
//     //           <>
//     //             <svg
//     //               className="w-4 h-4"
//     //               fill="none"
//     //               stroke="currentColor"
//     //               strokeWidth="2"
//     //               viewBox="0 0 24 24"
//     //             >
//     //               <path
//     //                 strokeLinecap="round"
//     //                 strokeLinejoin="round"
//     //                 d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
//     //               />
//     //             </svg>
//     //             <span>Download PDF</span>
//     //           </>
//     //         )}
//     //       </button>
//     //     </div>

//     //     {/* Invoice Card — ref attached here for capture */}
//     //     {/* Invoice Card Container */}
//     //     <div>
//     //       {/* Page 1 - Always visible */}
//     //       <div
//     //         ref={page1Ref}
//     //         style={{
//     //           width: "794px",
//     //           minHeight: "1123px",
//     //           background: "#fff",
//     //           padding: "0",
//     //           marginBottom: items.length > 10 ? "20px" : "0",
//     //         }}
//     //       >
//     //         {/* Page 1 Content */}
//     //         {/* Header */}
//     //         <div className="bg-[#0D1B4B] text-white px-8 py-6 flex justify-between items-center">
//     //           <div className="h-16">
//     //             {logoB64 ? (
//     //               <img
//     //                 src={logoB64}
//     //                 alt="Amaraa"
//     //                 className="h-full object-contain"
//     //                 style={{ filter: "brightness(0) invert(1)" }}
//     //               />
//     //             ) : (
//     //               <span
//     //                 className="text-white font-serif text-2xl tracking-widest"
//     //                 style={{ fontFamily: "'Cormorant Garamond',serif" }}
//     //               >
//     //                 AMARAA
//     //               </span>
//     //             )}
//     //           </div>
//     //           <div className="text-right text-xs opacity-85">
//     //             <div
//     //               className="text-blue-200 text-lg font-semibold tracking-widest"
//     //               style={{ fontFamily: "'Cormorant Garamond',serif" }}
//     //             >
//     //               {invType.toUpperCase()}
//     //             </div>
//     //             <div>No. {invNo}</div>
//     //             <div>Date: {formatDate(invDate)}</div>
//     //             <div className="text-[10px] mt-1 opacity-60">TRN: {trn}</div>
//     //           </div>
//     //         </div>
//     //         <div
//     //           className="h-[3px]"
//     //           style={{
//     //             background: "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
//     //           }}
//     //         />

//     //         <div className="px-8 py-6">
//     //           {/* From / To */}
//     //           <div className="grid grid-cols-2 gap-6 mb-5">
//     //             <div>
//     //               <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
//     //                 From
//     //               </div>
//     //               <div className="text-sm font-medium text-[#0D1B4B]">
//     //                 Amaraa FZCO
//     //               </div>
//     //               <div className="text-xs text-gray-500 mt-1 leading-relaxed">
//     //                 Almas 25-J-04, Almas Tower
//     //                 <br />
//     //                 JLT-PH1-A0, Jumeirah Lake Towers
//     //                 <br />
//     //                 Dubai, United Arab Emirates
//     //                 <br />
//     //                 Tel: +971 543969425 | +971 521866038
//     //                 <br />
//     //                 info@amaraa.com · www.amaraa.com
//     //                 <br />
//     //                 HS CODE 7113.19
//     //               </div>
//     //             </div>
//     //             <div>
//     //               <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
//     //                 To
//     //               </div>
//     //               <div className="text-sm font-medium text-[#0D1B4B]">
//     //                 {custName || "—"}
//     //               </div>
//     //               <div className="text-xs text-gray-500 mt-1 leading-relaxed">
//     //                 {custAddr && (
//     //                   <>
//     //                     {custAddr}
//     //                     <br />
//     //                   </>
//     //                 )}
//     //                 {custTrn && (
//     //                   <>
//     //                     TRN: {custTrn}
//     //                     <br />
//     //                   </>
//     //                 )}
//     //                 {[custPhone, custEmail].filter(Boolean).join(" | ")}
//     //               </div>
//     //             </div>
//     //           </div>

//     //           <div className="mb-3 text-sm font-medium text-blue-700">
//     //             ✦ Lab Grown Diamonds
//     //           </div>

//     //           {/* Items Table - First Page (first 10 items) */}
//     //           <div className="rounded-xl overflow-hidden border border-blue-100">
//     //             <table className="w-full text-xs">
//     //               <thead>
//     //                 <tr className="bg-blue-50">
//     //                   {[
//     //                     "Sl.",
//     //                     "Item Name / Code",
//     //                     "Qty",
//     //                     "GWT",
//     //                     "Cts/Size",
//     //                     "Unit Price",
//     //                     "Amount (AED)",
//     //                   ].map((h, i) => (
//     //                     <th
//     //                       key={h}
//     //                       className={`text-[9px] tracking-wider uppercase text-blue-700 py-2 px-3 font-medium ${i > 1 ? "text-right" : "text-left"}`}
//     //                     >
//     //                       {h}
//     //                     </th>
//     //                   ))}
//     //                 </tr>
//     //               </thead>
//     //               <tbody>
//     //                 {items.slice(0, 10).map((it, i) => (
//     //                   <tr
//     //                     key={it.id}
//     //                     className="border-t border-blue-50 hover:bg-blue-50/30 transition-colors"
//     //                   >
//     //                     <td className="py-2 px-3 text-gray-400">{i + 1}</td>
//     //                     <td className="py-2 px-3 text-gray-800 font-medium">
//     //                       {it.itemCode || "—"}
//     //                     </td>
//     //                     <td className="py-2 px-3 text-right text-gray-600">
//     //                       {it.qty}
//     //                     </td>
//     //                     <td className="py-2 px-3 text-right text-gray-600">
//     //                       {it.GWT || "—"}
//     //                     </td>
//     //                     <td className="py-2 px-3 text-right text-gray-600">
//     //                       {it.cts || "—"}
//     //                     </td>
//     //                     <td className="py-2 px-3 text-right text-gray-600">
//     //                       {it.price
//     //                         ? "AED " + Number(it.price).toFixed(2)
//     //                         : "—"}
//     //                     </td>
//     //                     <td className="py-2 px-3 text-right font-semibold text-[#0D1B4B]">
//     //                       {it.price
//     //                         ? "AED " + (it.qty * Number(it.price)).toFixed(2)
//     //                         : "—"}
//     //                     </td>
//     //                   </tr>
//     //                 ))}
//     //               </tbody>
//     //             </table>
//     //           </div>

//     //           {/* Only show totals on first page if items <= 10 */}
//     //           {items.length <= 10 && (
//     //             <>
//     //               {/* Totals */}
//     //               <div className="flex flex-wrap justify-between items-end gap-5 mt-5">
//     //                 <div className="flex-1 min-w-0">
//     //                   <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
//     //                     Amount in Words
//     //                   </div>
//     //                   <div className="bg-blue-50 rounded-xl px-4 py-3 text-xs italic text-[#0D1B4B] leading-relaxed">
//     //                     {grandToWords(grand)}
//     //                   </div>
//     //                   {notes && (
//     //                     <div className="text-[11px] italic mt-2 text-[#FF0000]">
//     //                       {notes}
//     //                     </div>
//     //                   )}
//     //                 </div>
//     //                 <div className="w-56 text-xs shrink-0 bg-blue-50 rounded-xl p-4">
//     //                   <div className="flex justify-between py-1 text-gray-500">
//     //                     <span>Subtotal</span>
//     //                     <span>{fmt(subtotal)}</span>
//     //                   </div>
//     //                   {discount > 0 && (
//     //                     <div className="flex justify-between py-1 text-gray-500">
//     //                       <span>Discount</span>
//     //                       <span>{fmt(discount)}</span>
//     //                     </div>
//     //                   )}
//     //                   <div className="flex justify-between py-1 text-gray-500">
//     //                     <span>VAT {vatPct}%</span>
//     //                     <span>{fmt(vat)}</span>
//     //                   </div>
//     //                   <div className="flex justify-between py-1 text-gray-500">
//     //                     <span>Paid Amount</span>
//     //                     <span>{fmt(paidAmount)}</span>
//     //                   </div>
//     //                   <div className="flex justify-between py-2 font-bold text-[#0D1B4B] text-sm border-t border-blue-200 mt-1">
//     //                     <span>Remaining</span>
//     //                     <span>{fmt(remainingAmount)}</span>
//     //                   </div>
//     //                 </div>
//     //               </div>

//     //               {/* Bank Details */}
//     //               <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
//     //                 <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-3 font-semibold">
//     //                   Bank Details
//     //                 </div>
//     //                 <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
//     //                   {[
//     //                     ["Bank Name", "National Bank of Ras Al-Khaimah"],
//     //                     ["Account Name", "AMARAA FZCO"],
//     //                     ["Account Number", "0333479509001"],
//     //                     ["SWIFT Code", "NRAKAEAK"],
//     //                     ["IBAN", "AE25 0400 0003 3347 9509 001"],
//     //                     ["Currency", "AED"],
//     //                     ["Payment Code", "GDS"],
//     //                     [
//     //                       "Purpose of Payment",
//     //                       "Payment received against invoice No.",
//     //                     ],
//     //                   ].map(([label, val]) => (
//     //                     <div key={label}>
//     //                       <div className="text-gray-400 text-[10px]">
//     //                         {label}
//     //                       </div>
//     //                       <div className="font-medium text-[#0D1B4B]">
//     //                         {val}
//     //                       </div>
//     //                     </div>
//     //                   ))}
//     //                 </div>
//     //               </div>

//     //               {/* Signature row */}
//     //               <div className="flex justify-between items-end mt-8">
//     //                 <div className="text-center">
//     //                   <div className="h-12"></div>
//     //                   <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400">
//     //                     Receiver's Sign
//     //                   </div>
//     //                 </div>
//     //                 <div className="flex flex-col items-center">
//     //                   {stampB64 && (
//     //                     <img
//     //                       src={stampB64}
//     //                       alt="Stamp"
//     //                       className="w-24 h-24 object-contain opacity-90"
//     //                     />
//     //                   )}
//     //                 </div>
//     //                 <div className="flex flex-col items-center">
//     //                   {sigB64 && (
//     //                     <img
//     //                       src={sigB64}
//     //                       alt="Signature"
//     //                       className="w-28 h-14 object-contain mb-1"
//     //                     />
//     //                   )}
//     //                   <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400 text-center">
//     //                     AMARAA JEWELRY
//     //                   </div>
//     //                 </div>
//     //               </div>
//     //             </>
//     //           )}
//     //         </div>

//     //         {/* Footer for first page when items <= 10 */}
//     //         {items.length <= 10 && (
//     //           <div className="bg-blue-50 border-t border-blue-100 px-8 py-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
//     //             <div>
//     //               <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
//     //                 Contact
//     //               </div>
//     //               Tel: +971 543969425 / +971 521866038
//     //               <br />
//     //               WhatsApp: +971 54 396 9425
//     //               <br />
//     //               info@amaraa.com · www.amaraa.com
//     //             </div>
//     //             <div>
//     //               <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
//     //                 Registered Address
//     //               </div>
//     //               Jumeirah Lake Towers, Dubai, UAE
//     //               <br />
//     //               Almas Tower, Plot No JLT-PH1-A0
//     //               <br />
//     //               License: DMCC-896920
//     //             </div>
//     //           </div>
//     //         )}
//     //       </div>

//     //       {/* Page 2 - Only show when items > 10 */}
//     //       {items.length > 10 && (
//     //         <div
//     //           ref={page2Ref}
//     //           style={{
//     //             width: "794px",
//     //             minHeight: "1123px",
//     //             background: "#fff",
//     //             padding: "0",
//     //           }}
//     //         >
//     //           {/* Page 2 Content - Remaining Items + All Bottom Sections */}
//     //           <div className="bg-[#0D1B4B] text-white px-8 py-6 flex justify-between items-center">
//     //             <div className="h-16">
//     //               {logoB64 ? (
//     //                 <img
//     //                   src={logoB64}
//     //                   alt="Amaraa"
//     //                   className="h-full object-contain"
//     //                   style={{ filter: "brightness(0) invert(1)" }}
//     //                 />
//     //               ) : (
//     //                 <span
//     //                   className="text-white font-serif text-2xl tracking-widest"
//     //                   style={{ fontFamily: "'Cormorant Garamond',serif" }}
//     //                 >
//     //                   AMARAA
//     //                 </span>
//     //               )}
//     //             </div>
//     //             <div className="text-right text-xs opacity-85">
//     //               <div
//     //                 className="text-blue-200 text-lg font-semibold tracking-widest"
//     //                 style={{ fontFamily: "'Cormorant Garamond',serif" }}
//     //               >
//     //                 {invType.toUpperCase()} (Continued)
//     //               </div>
//     //               <div>No. {invNo}</div>
//     //               <div>Date: {formatDate(invDate)}</div>
//     //               <div className="text-[10px] mt-1 opacity-60">TRN: {trn}</div>
//     //             </div>
//     //           </div>
//     //           <div
//     //             className="h-[3px]"
//     //             style={{
//     //               background: "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
//     //             }}
//     //           />

//     //           <div className="px-8 py-6">
//     //             {/* Items Table - Second Page (remaining items) */}
//     //             <div className="rounded-xl overflow-hidden border border-blue-100">
//     //               <table className="w-full text-xs">
//     //                 <thead>
//     //                   <tr className="bg-blue-50">
//     //                     {[
//     //                       "Sl.",
//     //                       "Item Name / Code",
//     //                       "Qty",
//     //                       "GWT",
//     //                       "Cts/Size",
//     //                       "Unit Price",
//     //                       "Amount (AED)",
//     //                     ].map((h, i) => (
//     //                       <th
//     //                         key={h}
//     //                         className={`text-[9px] tracking-wider uppercase text-blue-700 py-2 px-3 font-medium ${i > 1 ? "text-right" : "text-left"}`}
//     //                       >
//     //                         {h}
//     //                       </th>
//     //                     ))}
//     //                   </tr>
//     //                 </thead>
//     //                 <tbody>
//     //                   {items.slice(10).map((it, i) => (
//     //                     <tr
//     //                       key={it.id}
//     //                       className="border-t border-blue-50 hover:bg-blue-50/30 transition-colors"
//     //                     >
//     //                       <td className="py-2 px-3 text-gray-400">{i + 11}</td>
//     //                       <td className="py-2 px-3 text-gray-800 font-medium">
//     //                         {it.itemCode || "—"}
//     //                       </td>
//     //                       <td className="py-2 px-3 text-right text-gray-600">
//     //                         {it.qty}
//     //                       </td>
//     //                       <td className="py-2 px-3 text-right text-gray-600">
//     //                         {it.GWT || "—"}
//     //                       </td>
//     //                       <td className="py-2 px-3 text-right text-gray-600">
//     //                         {it.cts || "—"}
//     //                       </td>
//     //                       <td className="py-2 px-3 text-right text-gray-600">
//     //                         {it.price
//     //                           ? "AED " + Number(it.price).toFixed(2)
//     //                           : "—"}
//     //                       </td>
//     //                       <td className="py-2 px-3 text-right font-semibold text-[#0D1B4B]">
//     //                         {it.price
//     //                           ? "AED " + (it.qty * Number(it.price)).toFixed(2)
//     //                           : "—"}
//     //                       </td>
//     //                     </tr>
//     //                   ))}
//     //                 </tbody>
//     //               </table>
//     //             </div>

//     //             {/* Totals - Always show on last page */}
//     //             <div className="flex flex-wrap justify-between items-end gap-5 mt-5">
//     //               <div className="flex-1 min-w-0">
//     //                 <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
//     //                   Amount in Words
//     //                 </div>
//     //                 <div className="bg-blue-50 rounded-xl px-4 py-3 text-xs italic text-[#0D1B4B] leading-relaxed">
//     //                   {grandToWords(grand)}
//     //                 </div>
//     //                 {notes && (
//     //                   <div className="text-[11px] italic mt-2 text-[#FF0000]">
//     //                     {notes}
//     //                   </div>
//     //                 )}
//     //               </div>
//     //               <div className="w-56 text-xs shrink-0 bg-blue-50 rounded-xl p-4">
//     //                 <div className="flex justify-between py-1 text-gray-500">
//     //                   <span>Subtotal</span>
//     //                   <span>{fmt(subtotal)}</span>
//     //                 </div>
//     //                 {discount > 0 && (
//     //                   <div className="flex justify-between py-1 text-gray-500">
//     //                     <span>Discount</span>
//     //                     <span>{fmt(discount)}</span>
//     //                   </div>
//     //                 )}
//     //                 <div className="flex justify-between py-1 text-gray-500">
//     //                   <span>VAT {vatPct}%</span>
//     //                   <span>{fmt(vat)}</span>
//     //                 </div>
//     //                 <div className="flex justify-between py-1 text-gray-500">
//     //                   <span>Paid Amount</span>
//     //                   <span>{fmt(paidAmount)}</span>
//     //                 </div>
//     //                 <div className="flex justify-between py-2 font-bold text-[#0D1B4B] text-sm border-t border-blue-200 mt-1">
//     //                   <span>Remaining</span>
//     //                   <span>{fmt(remainingAmount)}</span>
//     //                 </div>
//     //               </div>
//     //             </div>

//     //             {/* Bank Details */}
//     //             <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
//     //               <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-3 font-semibold">
//     //                 Bank Details
//     //               </div>
//     //               <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
//     //                 {[
//     //                   ["Bank Name", "National Bank of Ras Al-Khaimah"],
//     //                   ["Account Name", "AMARAA FZCO"],
//     //                   ["Account Number", "0333479509001"],
//     //                   ["SWIFT Code", "NRAKAEAK"],
//     //                   ["IBAN", "AE25 0400 0003 3347 9509 001"],
//     //                   ["Currency", "AED"],
//     //                   ["Payment Code", "GDS"],
//     //                   [
//     //                     "Purpose of Payment",
//     //                     "Payment received against invoice No.",
//     //                   ],
//     //                 ].map(([label, val]) => (
//     //                   <div key={label}>
//     //                     <div className="text-gray-400 text-[10px]">{label}</div>
//     //                     <div className="font-medium text-[#0D1B4B]">{val}</div>
//     //                   </div>
//     //                 ))}
//     //               </div>
//     //             </div>

//     //             {/* Signature row */}
//     //             <div className="flex justify-between items-end mt-8">
//     //               <div className="text-center">
//     //                 <div className="h-12"></div>
//     //                 <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400">
//     //                   Receiver's Sign
//     //                 </div>
//     //               </div>
//     //               <div className="flex flex-col items-center">
//     //                 {stampB64 && (
//     //                   <img
//     //                     src={stampB64}
//     //                     alt="Stamp"
//     //                     className="w-24 h-24 object-contain opacity-90"
//     //                   />
//     //                 )}
//     //               </div>
//     //               <div className="flex flex-col items-center">
//     //                 {sigB64 && (
//     //                   <img
//     //                     src={sigB64}
//     //                     alt="Signature"
//     //                     className="w-28 h-14 object-contain mb-1"
//     //                   />
//     //                 )}
//     //                 <div className="border-t border-gray-200 w-36 pt-1 text-[10px] text-gray-400 text-center">
//     //                   AMARAA JEWELRY
//     //                 </div>
//     //               </div>
//     //             </div>
//     //           </div>

//     //           {/* Footer for last page */}
//     //           <div className="bg-blue-50 border-t border-blue-100 px-8 py-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
//     //             <div>
//     //               <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
//     //                 Contact
//     //               </div>
//     //               Tel: +971 543969425 / +971 521866038
//     //               <br />
//     //               WhatsApp: +971 54 396 9425
//     //               <br />
//     //               info@amaraa.com · www.amaraa.com
//     //             </div>
//     //             <div>
//     //               <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
//     //                 Registered Address
//     //               </div>
//     //               Jumeirah Lake Towers, Dubai, UAE
//     //               <br />
//     //               Almas Tower, Plot No JLT-PH1-A0
//     //               <br />
//     //               License: DMCC-896920
//     //             </div>
//     //           </div>
//     //         </div>
//     //       )}
//     //     </div>
//     //   </div>
//     // </div>
//     <>
//       {/* Responsive Preview - Only for viewing, NOT for PDF */}
//       <div className="container mx-auto px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 overflow-x-auto">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-5 mt-5">
//           <button
//             onClick={() => setShowInvoice(false)}
//             className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 px-4 py-2 rounded-lg bg-white/10 backdrop-blur cursor-pointer w-full sm:w-auto justify-center"
//           >
//             ← Back to Form
//           </button>
//           <button
//             onClick={downloadPDF}
//             disabled={downloading}
//             className="px-6 py-2 rounded-lg text-white text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-60 w-full sm:w-auto justify-center"
//             style={{ background: "linear-gradient(135deg,#2B3A7A,#4a5fa8)" }}
//           >
//             {downloading ? (
//               <>
//                 <svg
//                   className="animate-spin w-4 h-4 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8z"
//                   />
//                 </svg>
//                 <span>Generating PDF…</span>
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
//                   />
//                 </svg>
//                 <span>Download PDF</span>
//               </>
//             )}
//           </button>
//         </div>

//         {/* Preview Container - Responsive scaling */}
//         <div className="flex flex-col items-center gap-6">
//           <div
//             className="preview-wrapper w-full overflow-x-auto"
//             style={{ maxWidth: "100%" }}
//           >
//             <div
//               style={{
//                 transform: "scale(0.95)",
//                 transformOrigin: "top center",
//                 display: "inline-block",
//                 width: "100%",
//               }}
//             >
//               <InvoicePage1
//                 logoB64={logoB64}
//                 invType={invType}
//                 invNo={invNo}
//                 invDate={invDate}
//                 trn={trn}
//                 custName={custName}
//                 custAddr={custAddr}
//                 custTrn={custTrn}
//                 custPhone={custPhone}
//                 custEmail={custEmail}
//                 items={items.slice(0, 10)}
//                 subtotal={subtotal}
//                 discount={discount}
//                 vatPct={vatPct}
//                 vat={vat}
//                 paidAmount={paidAmount}
//                 remainingAmount={remainingAmount}
//                 grand={grand}
//                 notes={notes}
//                 stampB64={stampB64}
//                 sigB64={sigB64}
//               />
//             </div>
//           </div>

//           {items.length > 10 && (
//             <div
//               className="preview-wrapper w-full overflow-x-auto"
//               style={{ maxWidth: "100%" }}
//             >
//               <div
//                 style={{
//                   transform: "scale(0.95)",
//                   transformOrigin: "top center",
//                   display: "inline-block",
//                   width: "100%",
//                 }}
//               >
//                 <InvoicePage2
//                   logoB64={logoB64}
//                   invType={invType}
//                   invNo={invNo}
//                   invDate={invDate}
//                   trn={trn}
//                   items={items.slice(10)}
//                   subtotal={subtotal}
//                   discount={discount}
//                   vatPct={vatPct}
//                   vat={vat}
//                   paidAmount={paidAmount}
//                   remainingAmount={remainingAmount}
//                   grand={grand}
//                   notes={notes}
//                   stampB64={stampB64}
//                   sigB64={sigB64}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//   @media (max-width: 640px) {
//     .preview-wrapper {
//       transform: scale(0.7);
//       transform-origin: center top;
//     }
//   }

//   @media (max-width: 480px) {
//     .preview-wrapper {
//       transform: scale(0.55);
//       transform-origin: center top;
//     }
//   }
// `}</style>
//     </>
//   );
// }
import { useState, useCallback, useEffect } from "react";
// import logoSrc from "../../assets/images/logo.png";
import whitelogoSrc from "../../assets/images/whitelogo.png";
import stampSrc from "../../assets/images/stemp.png";
import signatureSrc from "../../assets/images/signature.png";
import Nav from "../components/Nav";

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
  GWT: "",
  cts: "",
  price: "",
});

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

/* ══════════════════════════════════════════════════════════════
   BUILD PRINT HTML WITH PROPER WIDTH AND CENTERING
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   BUILD PRINT HTML WITH CONDITIONAL PAGINATION
   - Only creates pages when items actually require them
   - No empty "continued" pages
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   BUILD PRINT HTML - ONLY CREATE PAGES WITH ACTUAL CONTENT
══════════════════════════════════════════════════════════════ */
const buildPrintHTML = ({
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
}) => {
  /* ── DYNAMIC PAGINATION - ONLY CREATE PAGES WITH ITEMS ── */
  const FIRST_PAGE_MAX_ITEMS = 10;
  const NEXT_PAGES_MAX_ITEMS = 18;

  // Calculate pages - only create pages that have items
  let pages = [];

  if (items.length === 0) {
    // If no items, create one page with empty state
    pages = [[]];
  } else if (items.length <= FIRST_PAGE_MAX_ITEMS) {
    // All items fit on first page
    pages = [items];
  } else {
    // First page with up to FIRST_PAGE_MAX_ITEMS items
    pages.push(items.slice(0, FIRST_PAGE_MAX_ITEMS));

    // Remaining items
    let remainingItems = items.slice(FIRST_PAGE_MAX_ITEMS);

    // Only add subsequent pages if there are remaining items
    while (remainingItems.length > 0) {
      const pageItems = remainingItems.slice(0, NEXT_PAGES_MAX_ITEMS);
      if (pageItems.length > 0) {
        pages.push(pageItems);
      }
      remainingItems = remainingItems.slice(NEXT_PAGES_MAX_ITEMS);
    }
  }

  // Debug: log pages info
  console.log(`Total items: ${items.length}, Pages created: ${pages.length}`);

  const fmtLocal = (n) =>
    "AED " +
    Number(n).toLocaleString("en-AE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const bankDetails = [
    ["Bank Name", "National Bank of Ras Al-Khaimah"],
    ["Account Name", "AMARAA FZCO"],
    ["Account Number", "0333479509001"],
    ["SWIFT Code", "NRAKAEAK"],
    ["IBAN", "AE25 0400 0003 3347 9509 001"],
    ["Currency", "AED"],
    ["Payment Code", "GDS"],
    ["Purpose of Payment", `Payment received against invoice No. ${invNo}`],
  ];

  const logoBlock = logoB64
    ? `<img src="${logoB64}" style="height:52px;object-fit:contain;filter:brightness(0) invert(1);-webkit-filter:brightness(0) invert(1);" alt="Amaraa"/>`
    : `<span style="font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:700;letter-spacing:4px;color:#fff;">AMARAA <span style="font-size:9px;letter-spacing:5px;opacity:.6;">JEWELRY</span></span>`;

  const header = (label, pageNum, totalPages) => `
    <div style="background:#0D1B4B;padding:18px 28px;display:flex;justify-content:space-between;align-items:center;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
      ${logoBlock}
      <div style="text-align:right;font-size:11px;color:rgba(255,255,255,.82);">
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;letter-spacing:2px;color:#A8B8E8;font-weight:600;margin-bottom:3px;">${label}</div>
        <div>No. ${invNo}</div>
        <div>Date: ${formatDate(invDate)}</div>
        <div style="font-size:9px;opacity:.55;margin-top:2px;">TRN: ${trn}</div>
      </div>
    </div>
    <div style="height:3px;background:linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A);-webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>`;

  const tableHead = () => `
    <thead>
      <tr style="background:#EEF1FA;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
        <th style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;padding:7px 8px;font-weight:600;text-align:left;width:6%;">Sl.</th>
        <th style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;padding:7px 8px;font-weight:600;text-align:left;width:30%;">Item Name / Code</th>
        <th style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;padding:7px 8px;font-weight:600;text-align:left;width:8%;">Qty</th>
        <th style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;padding:7px 8px;font-weight:600;text-align:left;width:12%;">GWT</th>
        <th style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;padding:7px 8px;font-weight:600;text-align:left;width:12%;">Cts/Size</th>
        <th style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;padding:7px 8px;font-weight:600;text-align:left;width:14%;">Unit Price</th>
        <th style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;padding:7px 8px;font-weight:600;text-align:left;width:18%;">Amount (AED)</th>
      </tr>
    </thead>`;

  const tdStyle =
    "padding:6px 8px;border-bottom:1px solid #E8ECF5;font-size:11px;vertical-align:top;";

  const renderRows = (chunk, startIdx) =>
    chunk
      .map(
        (it, i) => `
        <tr>
          <td style="${tdStyle}text-align:left;color:#aaa;">${startIdx + i + 1}</td>
          <td style="${tdStyle}text-align:left;font-weight:600;color:#0D1B4B;">${it.itemCode || "—"}</td>
          <td style="${tdStyle}text-align:left;">${it.qty}</td>
          <td style="${tdStyle}text-align:left;">${it.GWT || "—"}</td>
          <td style="${tdStyle}text-align:left;">${it.cts || "—"}</td>
          <td style="${tdStyle}text-align:left;">${it.price ? "AED " + Number(it.price).toFixed(2) : "—"}</td>
          <td style="${tdStyle}text-align:left;font-weight:600;color:#0D1B4B;">${it.price ? "AED " + (it.qty * Number(it.price)).toFixed(2) : "—"}</td>
        </tr>`,
      )
      .join("");

  const totalsBlock = () => `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-top:18px;flex-wrap:wrap;">
      <div style="flex:1;min-width:250px;">
        <div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">Amount in Words</div>
        <div style="background:#EEF1FA;border-radius:6px;padding:8px 12px;font-style:italic;font-size:11px;color:#0D1B4B;margin-bottom:10px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">${grandToWords(grand)}</div>
        ${notes ? `<div style="font-size:10px;font-style:italic;color:#c00;margin-bottom:10px;">${notes}</div>` : ""}
        <div style="background:#EEF1FA;border-radius:8px;border:1px solid #C5CDE8;padding:12px 14px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
          <div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;font-weight:700;margin-bottom:8px;">Bank Details</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 16px;">
            ${bankDetails
              .map(
                ([l, v]) => `
              <div>
                <div style="font-size:8px;color:#999;">${l}</div>
                <div style="font-size:10px;font-weight:600;color:#0D1B4B;">${v}</div>
              </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>
      <div style="width:210px;background:#EEF1FA;border-radius:8px;border:1px solid #C5CDE8;padding:12px 14px;font-size:11px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
        <div style="display:flex;justify-content:space-between;padding:3px 0;color:#666;"><span>Subtotal</span><span>${fmtLocal(subtotal)}</span></div>
        ${discount > 0 ? `<div style="display:flex;justify-content:space-between;padding:3px 0;color:#666;"><span>Discount</span><span>${fmtLocal(discount)}</span></div>` : ""}
        <div style="display:flex;justify-content:space-between;padding:3px 0;color:#666;"><span>VAT ${vatPct}%</span><span>${fmtLocal(vat)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:3px 0;color:#666;"><span>Paid Amount</span><span>${fmtLocal(paidAmount || 0)}</span></div>
        <div style="display:flex;justify-content:space-between;padding:7px 0 3px;font-weight:700;font-size:13px;color:#0D1B4B;border-top:1px solid #C5CDE8;margin-top:4px;"><span>Remaining</span><span>${fmtLocal(remainingAmount)}</span></div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:30px;margin-bottom:4px;">
      <div style="text-align:center;">
        <div style="height:44px;"></div>
        <div style="border-top:1px solid #ccc;width:150px;padding-top:4px;font-size:9px;color:#aaa;">Receiver's Sign</div>
      </div>
      <div style="text-align:center;">
        ${stampB64 ? `<img src="${stampB64}" style="width:90px;height:90px;object-fit:contain;opacity:.9;" alt="Stamp"/>` : ""}
      </div>
      <div style="text-align:center;">
        ${sigB64 ? `<img src="${sigB64}" style="width:120px;height:54px;object-fit:contain;display:block;margin:0 auto 4px;" alt="Signature"/>` : ""}
        <div style="border-top:1px solid #ccc;width:150px;padding-top:4px;font-size:9px;color:#aaa;margin:0 auto;">AMARAA JEWELRY</div>
      </div>
    </div>`;

  const footerBlock = () => `
    <div style="background:#EEF1FA;border-top:1px solid #C5CDE8;padding:12px 28px;display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:10px;color:#666;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
      <div>
        <div style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;margin-bottom:3px;">Contact</div>
        Tel: +971 543969425 / +971 521866038<br/>
        WhatsApp: +971 54 396 9425<br/>
        info@amaraa.com · www.amaraa.com
      </div>
      <div>
        <div style="font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#2B3A7A;margin-bottom:3px;">Registered Address</div>
        Almas Tower, Plot No JLT-PH1-A0<br/>
        Jumeirah Lake Towers, Dubai, UAE<br/>
        License: DMCC-896920
      </div>
    </div>`;

  // Only create pages that actually have items
  const pagesHTML = pages
    .filter(
      (page) => page.length > 0 || (page.length === 0 && pages.length === 1),
    ) // Filter out empty pages unless it's the only page
    .map((chunk, pageIndex) => {
      const isFirst = pageIndex === 0;
      const isLast = pageIndex === pages.length - 1;

      // Calculate starting serial number correctly
      let startIdx = 0;
      if (pageIndex === 0) {
        startIdx = 0;
      } else {
        startIdx =
          FIRST_PAGE_MAX_ITEMS + (pageIndex - 1) * NEXT_PAGES_MAX_ITEMS;
      }

      // Only show "Continued" label if there are actually multiple pages
      const label =
        pages.length > 1 && !isFirst
          ? `${invType.toUpperCase()} (Continued)`
          : invType.toUpperCase();

      // Only show "Continued on next page" if this is NOT the last page AND there are more pages
      const showContinued = !isLast && pages.length > 1;

      return `
<div class="page" style="page-break-after: ${isLast ? "auto" : "always"}; break-after: ${isLast ? "auto" : "page"};">
  ${header(label, pageIndex + 1, pages.length)}
  <div style="padding:18px 28px 20px;">
    ${
      isFirst
        ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:16px;">
      <div>
        <div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">From</div>
        <div style="font-size:13px;font-weight:500;color:#0D1B4B;">Amaraa FZCO</div>
        <div style="font-size:10.5px;color:#555;margin-top:3px;line-height:1.7;">Almas 25-J-04, Almas Tower<br/>JLT-PH1-A0, Jumeirah Lake Towers<br/>Dubai, United Arab Emirates<br/>Tel: +971 543969425 | +971 521866038<br/>info@amaraa.com · www.amaraa.com<br/>HS CODE 7113.19</div>
      </div>
      <div>
        <div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#2B3A7A;margin-bottom:4px;">To</div>
        <div style="font-size:13px;font-weight:500;color:#0D1B4B;">${custName || "—"}</div>
        <div style="font-size:10.5px;color:#555;margin-top:3px;line-height:1.7;">
          ${custAddr ? custAddr + "<br/>" : ""}
          ${custTrn ? "TRN: " + custTrn + "<br/>" : ""}
          ${[custPhone, custEmail].filter(Boolean).join(" | ")}
        </div>
      </div>
    </div>
    <div style="font-size:12px;font-weight:500;color:#2B3A7A;margin-bottom:10px;">✦ Lab Grown Diamonds</div>
    `
        : ""
    }
    <table style="width:100%;border-collapse:collapse;margin-bottom:4px;table-layout:fixed;">
      ${tableHead()}
      <tbody>${chunk.length > 0 ? renderRows(chunk, startIdx) : `<tr><td colspan="7" style="padding:40px;text-align:center;color:#999;">No items to display</td></tr>`}</tbody>
    </table>
    ${showContinued ? `<div style="text-align:center;font-size:10px;color:#bbb;font-style:italic;padding:10px 0 2px;">*** Continued on next page ***</div>` : ""}
    ${isLast ? totalsBlock() : ""}
  </div>
  ${isLast ? footerBlock() : ""}
</div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<title>Amaraa Invoice ${invNo}</title>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 12px;
    color: #333;
    background: #fff;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .print-container {
    width: 100%;
    max-width: 210mm;
    margin: 0 auto;
    background: #fff;
  }
  
  .page {
    width: 100%;
    max-width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: #fff;
    position: relative;
    page-break-after: always;
    break-after: page;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  .page:last-child {
    page-break-after: auto;
    break-after: auto;
  }
  
  .page > div {
    max-width: 100%;
    overflow-x: hidden;
  }
  
  table {
    width: 100%;
    word-wrap: break-word;
    table-layout: fixed;
  }
  
  td, th {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  @media print {
    body {
      margin: 0;
      padding: 0;
      background: #fff;
      width: 100%;
    }
    
    .print-container {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 100%;
    }
    
    .page {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 100%;
      page-break-after: always;
      break-after: page;
      box-shadow: none;
    }
    
    .page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Hide URL, date, time, page numbers in print */
    @page {
      margin: 0;
      size: A4;
    }
    
    /* Remove default print headers and footers */
    @page :header {
      display: none;
    }
    
    @page :footer {
      display: none;
    }
  }
  
  @media screen {
    body {
      background: #e0e0e0;
      padding: 20px;
    }
    
    .print-container {
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }
    
    .page {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
  }
</style>
</head>
<body>
<div class="print-container">
${pagesHTML}
</div>
<script>
  (function() {
    setTimeout(function() {
      window.print();
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (!isSafari) {
        setTimeout(function() {
          window.close();
        }, 1000);
      }
    }, 500);
  })();
</script>
</body>
</html>`;
};

/* ── UI primitives ── */
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
  const [downloading, setDownloading] = useState(false);

  const [logoB64, setLogoB64] = useState("");
  const [stampB64, setStampB64] = useState("");
  const [sigB64, setSigB64] = useState("");

  /* ── Convert local assets to base64 on mount ── */
  useEffect(() => {
    toBase64(whitelogoSrc)
      .then(setLogoB64)
      .catch(() => {});
    toBase64(stampSrc)
      .then(setStampB64)
      .catch(() => {});
    toBase64(signatureSrc)
      .then(setSigB64)
      .catch(() => {});
  }, []);

  const addItem = () => setItems((p) => [...p, newItem()]);
  const removeItem = (id) => setItems((p) => p.filter((it) => it.id !== id));
  const updateItem = (id, field, value) =>
    setItems((p) =>
      p.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
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

  /* ── PDF generation using native print (preserves design perfectly) ── */
  const downloadPDF = useCallback(() => {
    if (downloading) return;
    setDownloading(true);

    try {
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
        sigB64,
      });

      // Create a new window for printing
      const printWindow = window.open(
        "",
        "_blank",
        "width=800,height=600,toolbar=yes,menubar=yes",
      );
      if (!printWindow) {
        alert(
          "Please allow popups to generate PDF. Check your browser settings.",
        );
        setDownloading(false);
        return;
      }

      printWindow.document.write(html);
      printWindow.document.close();

      // Clean up
      setTimeout(() => {
        setDownloading(false);
      }, 3000);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
      setDownloading(false);
    }
  }, [
    downloading,
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

  // Only create second page if items exceed first page limit

  /* ══════════════════════════════ FORM VIEW ══════════════════════════════ */
  if (!showInvoice)
    return (
      <div className="min-h-screen font-sans bg-[#d4d4d4]">
        <Nav />
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
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
                  <span className="text-white font-serif text-2xl tracking-widest">
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
                        "GWT",
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
                            placeholder="e.g. AM-481"
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
                            value={it.GWT}
                            placeholder="0.0g"
                            onChange={(e) =>
                              updateItem(it.id, "GWT", e.target.value)
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
                className="mt-3 border border-dashed border-blue-300 text-blue-600 text-xs px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
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
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="flex justify-between text-sm text-gray-500"
                  >
                    <span>{l}</span>
                    <span>{v}</span>
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

  /* ══════════════════════════════ PREVIEW VIEW ══════════════════════════════ */
  const FIRST_PAGE_MAX = 13;
  const NEXT_PAGE_MAX = 18;
  const previewPages = [items.slice(0, FIRST_PAGE_MAX)];
  let pi = FIRST_PAGE_MAX;
  while (pi < items.length) {
    previewPages.push(items.slice(pi, pi + NEXT_PAGE_MAX));
    pi += NEXT_PAGE_MAX;
  }

  return (
    <div className="min-h-screen font-sans bg-[#d4d4d4]">
      <Nav />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Action bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setShowInvoice(false)}
            className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 px-4 py-2 rounded-lg bg-white/80 shadow-sm cursor-pointer w-full sm:w-auto justify-center transition-all"
          >
            ← Back to Form
          </button>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-60 w-full sm:w-auto justify-center shadow-md hover:shadow-lg hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#0D1B4B,#2B3A7A)" }}
          >
            {downloading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeOpacity="0.25"
                    fill="none"
                  />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                </svg>
                <span>Preparing PDF…</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Invoice pages preview */}
        <div className="flex flex-col items-center gap-8">
          {previewPages.map((chunk, pageIdx) => {
            const isFirst = pageIdx === 0;
            const isLast = pageIdx === previewPages.length - 1;
            const startIdx = isFirst
              ? 0
              : FIRST_PAGE_MAX + (pageIdx - 1) * NEXT_PAGE_MAX;
            const typeLabel =
              previewPages.length > 1
                ? `${invType.toUpperCase()}${isFirst ? "" : " (Continued)"}`
                : invType.toUpperCase();

            return (
              <div
                key={pageIdx}
                className="bg-white border border-blue-100 shadow-2xl overflow-hidden"
                style={{ width: "794px" }}
              >
                {/* Header */}
                <div className="bg-[#0D1B4B] text-white px-8 py-5 flex justify-between items-center">
                  <div className="h-14">
                    {logoB64 ? (
                      <img
                        src={logoB64}
                        alt="Amaraa"
                        className="h-full object-contain"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    ) : (
                      <span className="text-white font-serif text-2xl tracking-widest">
                        AMARAA
                      </span>
                    )}
                  </div>
                  <div className="text-right text-xs opacity-85">
                    <div
                      className="text-blue-200 text-base font-semibold tracking-widest"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      {typeLabel}
                    </div>
                    <div>No. {invNo}</div>
                    <div>Date: {formatDate(invDate)}</div>
                    <div className="text-[10px] mt-1 opacity-60">
                      TRN: {trn}
                    </div>
                    {previewPages.length > 1 && (
                      <div className="text-[9px] mt-1 opacity-50">
                        Page {pageIdx + 1} of {previewPages.length}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="h-[3px]"
                  style={{
                    background:
                      "linear-gradient(90deg,#2B3A7A,#A8B8E8,#2B3A7A)",
                  }}
                />

                <div className="px-8 py-5">
                  {/* From / To — first page only */}
                  {isFirst && (
                    <>
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
                            <br />
                            HS CODE 7113.19
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
                    </>
                  )}

                  {/* Items table */}
                  <div className="rounded-xl overflow-hidden border border-blue-100">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-blue-50">
                          {[
                            "Sl.",
                            "Item Name / Code",
                            "Qty",
                            "GWT",
                            "Cts/Size",
                            "Unit Price",
                            "Amount (AED)",
                          ].map((h, i) => (
                            <th
                              key={h}
                              className={`text-[9px] tracking-wider uppercase text-blue-700 py-2 px-3 font-medium ${i > 1 ? "text-left" : "text-left"}`}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {chunk.map((it, i) => (
                          <tr
                            key={it.id}
                            className="border-t border-blue-50 hover:bg-blue-50/30 transition-colors"
                          >
                            <td className="py-2 px-3 text-gray-400">
                              {startIdx + i + 1}
                            </td>
                            <td className="py-2 px-3 text-gray-800 font-medium">
                              {it.itemCode || "—"}
                            </td>
                            <td className="py-2 px-3 text-left text-gray-600">
                              {it.qty}
                            </td>
                            <td className="py-2 px-3 text-left text-gray-600">
                              {it.GWT || "—"}
                            </td>
                            <td className="py-2 px-3 text-left text-gray-600">
                              {it.cts || "—"}
                            </td>
                            <td className="py-2 px-3 text-left text-gray-600">
                              {it.price
                                ? "AED " + Number(it.price).toFixed(2)
                                : "—"}
                            </td>
                            <td className="py-2 px-3 text-left font-semibold text-[#0D1B4B]">
                              {it.price
                                ? "AED " +
                                  (it.qty * Number(it.price)).toFixed(2)
                                : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {!isLast && previewPages.length > 1 && (
                    <div className="text-center mt-4 text-xs text-gray-400 italic">
                      *** Continued on next page ***
                    </div>
                  )}

                  {/* Totals + bank + signatures — last page only */}
                  {isLast && (
                    <>
                      <div className="flex flex-wrap justify-between items-end gap-5 mt-5">
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-1">
                            Amount in Words
                          </div>
                          <div className="bg-blue-50 rounded-xl px-4 py-3 text-xs italic text-[#0D1B4B] leading-relaxed">
                            {grandToWords(grand)}
                          </div>
                          {notes && (
                            <div className="text-[11px] italic mt-2 text-[#c00]">
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

                      <div className="mt-5 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="text-[9px] tracking-[2px] uppercase text-blue-700 mb-3 font-semibold">
                          Bank Details
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                          {[
                            ["Bank Name", "National Bank of Ras Al-Khaimah"],
                            ["Account Name", "AMARAA FZCO"],
                            ["Account Number", "0333479509001"],
                            ["SWIFT Code", "NRAKAEAK"],
                            ["IBAN", "AE25 0400 0003 3347 9509 001"],
                            ["Currency", "AED"],
                            ["Payment Code", "GDS"],
                            [
                              "Purpose of Payment",
                              `Payment received against invoice No. ${invNo}`,
                            ],
                          ].map(([label, val]) => (
                            <div key={label}>
                              <div className="text-gray-400 text-[10px]">
                                {label}
                              </div>
                              <div className="font-medium text-[#0D1B4B]">
                                {val}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

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
                            AMARAA JEWELRY
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Footer — last page only */}
                {isLast && (
                  <div className="bg-blue-50 border-t border-blue-100 px-8 py-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                      <div className="text-[9px] tracking-[1.5px] uppercase text-blue-700 mb-1">
                        Contact
                      </div>
                      Tel: +971 543969425 / +971 521866038
                      <br />
                      WhatsApp: +971 54 396 9425
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
                )}

                {previewPages.length > 1 && !isLast && (
                  <div className="text-center py-2 text-[10px] text-gray-400 bg-white border-t border-blue-50">
                    Page {pageIdx + 1} of {previewPages.length}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px)  { .flex.flex-col.items-center.gap-8 > div { transform:scale(0.88); transform-origin:center top; margin-bottom:-60px; } }
        @media (max-width: 760px)  { .flex.flex-col.items-center.gap-8 > div { transform:scale(0.76); transform-origin:center top; margin-bottom:-120px; } }
        @media (max-width: 650px)  { .flex.flex-col.items-center.gap-8 > div { transform:scale(0.64); transform-origin:center top; margin-bottom:-180px; } }
        @media (max-width: 540px)  { .flex.flex-col.items-center.gap-8 > div { transform:scale(0.52); transform-origin:center top; margin-bottom:-240px; } }
        @media (max-width: 430px)  { .flex.flex-col.items-center.gap-8 > div { transform:scale(0.42); transform-origin:center top; margin-bottom:-300px; } }
      `}</style>
    </div>
  );
}
