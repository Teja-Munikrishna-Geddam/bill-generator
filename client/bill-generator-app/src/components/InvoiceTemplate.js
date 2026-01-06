import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/InvoicePDF";

export default function InvoiceTemplate({ invoice }) {
  if (!invoice) return null;

  return (
    <PDFDownloadLink
      document={<InvoicePDF invoice={invoice} />}
      fileName={`${invoice.invoiceNo}.pdf`}
    >
      {({ loading }) =>
        loading ? "Preparing PDF..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
}
