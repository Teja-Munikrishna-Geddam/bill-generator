import InvoiceLayout from "./InvoiceLayout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceTemplate({ invoice }) {
  if (!invoice) return null;

  const downloadPDF = async () => {
    const el = document.getElementById("pdf-capture");
    if (!el) return;

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    // Convert canvas pixels to mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Additional pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("invoice.pdf");
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
          invoiceType={invoice.invoiceType || "Proforma Invoice"}
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
