import InvoiceLayout from "./InvoiceLayout";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/InvoicePDF";

export default function InvoiceTemplate({ invoice }) {
  if (!invoice) return null;

  return (
    <>
      {/* ✅ HTML PREVIEW (VIEW BUTTON) */}
      <div id="invoice-preview">
        <InvoiceLayout
          mode="view"
          invoiceType={invoice.invoiceType}
          billTo={invoice.billTo}
          shipTo={invoice.shipTo}
          items={invoice.items}
          totals={{
            subtotal: invoice.subtotal,
            gst: invoice.gst,
            grandTotal: invoice.grandTotal
          }}
          invoiceNo={invoice.invoiceNo}
          invoiceDate={new Date(invoice.invoiceDate).toLocaleDateString()}
        />
      </div>
      <PDFDownloadLink
        document={<InvoicePDF invoice={invoice} />}
        fileName={`${invoice.invoiceNo}.pdf`}
      >
        {({ loading }) =>
          loading ? "Preparing PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
      </>
      );
    
}
