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

    // ⏳ Wait for images to fully load
    const images = el.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((res) => {
            if (img.complete) res();
            else img.onload = img.onerror = res;
          })
      )
    );

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff"
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
            gst: invoice.gst || 0,
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
