import InvoiceLayout from "./InvoiceLayout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceTemplate({ invoice }) {
  if (!invoice) return null;

  const downloadPDF = async () => {
    const el = document.getElementById("pdf-capture");
    if (!el) {
      alert("Invoice not ready");
      return;
    }

    // ✅ HARD WAIT for layout + images
    await new Promise((res) => setTimeout(res, 1200));

    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false
    });

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(img, "PNG", 0, 0, 210, 297);
    pdf.save(`${invoice.invoiceNo}.pdf`);
  };

  return (
    <>
      {/* 🔒 FIXED PDF CAPTURE WRAPPER */}
      <div
        id="pdf-capture"
        style={{
          width: "794px",
          background: "#fff",
          padding: "0",
          margin: "0 auto"
        }}
      >
        <InvoiceLayout
          mode="view"
          billTo={invoice.billTo || {}}
          shipTo={invoice.shipTo || {}}
          items={invoice.items || []}
          totals={{
            subtotal: invoice.subtotal || 0,
            cgst: invoice.cgst || 0,
            sgst: invoice.sgst || 0,
            grandTotal: invoice.grandTotal || 0
          }}
          invoiceNo={invoice.invoiceNo}
          invoiceDate={new Date(invoice.invoiceDate).toLocaleDateString()}
        />
      </div>

      <button onClick={downloadPDF}>Download PDF</button>
    </>
  );
}
