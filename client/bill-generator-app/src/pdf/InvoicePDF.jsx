import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link
} from "@react-pdf/renderer";
import { numberToWords } from "../utils/numberToWords";
import dealerLogo from "../assets/dealer_logo.png";
import stampImg from "../assets/safety_stamp.png";
import { INVOICE_TYPES } from "../components/invoiceTypes";

const styles = StyleSheet.create({
  page: {
    padding: 18,
    fontSize: 9,
    fontFamily: "Helvetica",
    lineHeight: 1.4
  },

  center: {
    alignItems: "center",
    textAlign: "center"
  },

  logo: {
    width: 140,
    height: 80,
    marginBottom: 6
  },

  companyName: {
    fontSize: 12,
    fontWeight: "bold"
  },

  services: {
    fontSize: 9,
    color: "red",
    marginVertical: 2
  },

  addressBar: {
    backgroundColor: "#003399",
    color: "#ffffff",
    padding: 6,
    marginBottom: 8
  },

  title: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
    marginVertical: 8
  },

  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1 solid #000",
    padding: 5,
    marginBottom: 8
  },

  addressRow: {
    flexDirection: "row",
    border: "1 solid #000",
    marginBottom: 8
  },

  addressBox: {
    width: "50%",
    padding: 6,
    borderRight: "1 solid #000"
  },

  addressTitle: {
    fontWeight: "bold",
    marginBottom: 2
  },

  tableHeader: {
    flexDirection: "row",
    border: "1 solid #000",
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    paddingVertical: 3
  },

  tableRow: {
    flexDirection: "row",
    borderLeft: "1 solid #000",
    borderRight: "1 solid #000",
    borderBottom: "1 solid #000",
    paddingVertical: 3
  },

  cellSl: { width: "5%", textAlign: "center" },
  cellDesc: { width: "40%" },
  cellModel: { width: "15%" },
  cellUnit: { width: "8%", textAlign: "center" },
  cellQty: { width: "7%", textAlign: "center" },
  cellRate: { width: "10%", textAlign: "right" },
  cellAmount: { width: "15%", textAlign: "right" },

  totals: {
    marginTop: 8,
    alignItems: "flex-end"
  },

  amountWords: {
    border: "1 solid #000",
    padding: 6,
    marginTop: 6
  },

  signature: {
    marginTop: 30,
    alignItems: "flex-end"
  },

  stamp: {
    width: 80,
    marginVertical: 6
  },

  bankBox: {
    marginTop: 10,
    border: "1 solid #000",
    padding: 5,
    fontSize: 8
  }
});

export default function InvoicePDF({ invoice }) {
  const isPurchaseOrder =
    invoice.invoiceType === INVOICE_TYPES.PURCHASE;

  const repeatHeader = invoice.items.length >= 8;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>

        {/* LOGO */}
        <View style={styles.center}>
          <Image src={dealerLogo} style={styles.logo} />
        </View>

        {/* COMPANY INFO */}
        <View style={styles.center}>
          <Text style={styles.companyName}>SNJ SAFETY SOLUTIONS</Text>
          <Text style={styles.services}>
            Fire Alarm System, Fire Hydrant System, Fire Fighting Equipment and CCTV
          </Text>
          <Text>GSTN: 27ACPPR9449D1ZY</Text>
        </View>

        {/* ADDRESS BAR */}
        <View style={styles.addressBar}>
          <Text>
            Office No. 01, Plot No. 250, Sector-11, Vashi, Navi Mumbai - 400703
          </Text>
          <Link
            src="https://snjsafetysolutions.in"
            style={{ color: "#ffffff", textDecoration: "underline" }}
          >
            snjsafetysolutions.in
          </Link>
          <Text>
            Contact: +91 9930930880 / +91 9082162344
          </Text>
          <Text>
            Email: snj.safetysolutions18@gmail.com
          </Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          {invoice.invoiceType.toUpperCase()}
        </Text>

        {/* META */}
        <View style={styles.metaBar}>
          <Text>Invoice No: {invoice.invoiceNo}</Text>
          <Text>Date: {invoice.invoiceDate}</Text>
        </View>

        {/* ADDRESSES */}
        <View style={styles.addressRow}>
          <View style={styles.addressBox}>
            <Text style={styles.addressTitle}>Bill To</Text>
            <Text>{invoice.billTo.name}</Text>
            <Text>{invoice.billTo.address}</Text>
            <Text>GSTIN: {invoice.billTo.gstin}</Text>
            <Text>Contact: {invoice.billTo.contact}</Text>
          </View>

          <View style={[styles.addressBox, { borderRight: 0 }]}>
            <Text style={styles.addressTitle}>Ship To</Text>
            <Text>{invoice.shipTo.name}</Text>
            <Text>{invoice.shipTo.address}</Text>
          </View>
        </View>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader} fixed={repeatHeader}>
          <Text style={styles.cellSl}>Sl</Text>
          <Text style={styles.cellDesc}>Description</Text>
          <Text style={styles.cellModel}>Model</Text>
          <Text style={styles.cellUnit}>Unit</Text>
          <Text style={styles.cellQty}>Qty</Text>
          <Text style={styles.cellRate}>Rate</Text>
          <Text style={styles.cellAmount}>Amount</Text>
        </View>

        {/* TABLE ROWS */}
        {invoice.items.map((item, i) => (
          <View key={i} style={styles.tableRow} wrap={false}>
            <Text style={styles.cellSl}>{i + 1}</Text>
            <Text style={styles.cellDesc}>{item.description}</Text>
            <Text style={styles.cellModel}>{item.model}</Text>
            <Text style={styles.cellUnit}>{item.unit}</Text>
            <Text style={styles.cellQty}>{item.quantity}</Text>
            <Text style={styles.cellRate}>{item.rate}</Text>
            <Text style={styles.cellAmount}>
              Rs. {item.amount.toFixed(2)}
            </Text>
          </View>
        ))}

        {/* TOTALS */}
        <View style={styles.totals}>
          <Text>Subtotal: Rs. {invoice.subtotal.toFixed(2)}</Text>
          <Text>GST (18%): Rs. {invoice.gst.toFixed(2)}</Text>
          <Text style={{ fontWeight: "bold" }}>
            Grand Total: Rs. {invoice.grandTotal.toFixed(2)}
          </Text>
        </View>

        {/* AMOUNT IN WORDS */}
        <View style={styles.amountWords}>
          <Text>
            Amount in Words: {numberToWords(invoice.grandTotal)}
          </Text>
        </View>

        {/* SIGNATURE */}
        <View style={styles.signature} minPresenceAhead={120}>
          <Text>For SNJ Safety Solutions</Text>
          <Image src={stampImg} style={styles.stamp} />
          <Text>Authorised Signatory</Text>
        </View>

        {/* TERMS & BANK (NOT FOR PURCHASE ORDER) */}
        {!isPurchaseOrder && (
          <View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Terms and Conditions</Text>
              <Text>1. 100 percent advance payment.</Text>
              <Text>2. 18 percent GST applicable.</Text>
              <Text>3. Order once placed cannot be cancelled.</Text>
              <Text>4. One year manufacturing warranty.</Text>
              <Text>5. Transportation and packing extra.</Text>
            </View>

            <View style={styles.bankBox}>
              <Text style={{ fontWeight: "bold" }}>Bank Details</Text>
              <Text>Bank Name: Bank of Baroda</Text>
              <Text>Account Name: SNJ SAFETY SOLUTIONS</Text>
              <Text>Account No: 10430200001748</Text>
              <Text>IFSC: BARB0VASHIX</Text>
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
      }
