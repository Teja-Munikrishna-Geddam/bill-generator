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

/* ================= COLUMN WIDTHS ================= */
const COLS = {
  sl: "5%",
  desc: "40%",
  model: "15%",
  unit: "8%",
  qty: "7%",
  rate: "10%",
  amount: "15%"
};

/* ================= STYLES ================= */
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

  title: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
    marginBottom: 8
  },

  addressBar: {
    backgroundColor: "#003399",
    color: "#ffffff",
    padding: 6,
    marginBottom: 10
  },

  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1 solid #000",
    padding: 5,
    marginBottom: 8
  },

  /* ===== TABLE ===== */
  tableHeader: {
    flexDirection: "row",
    border: "1 solid #000",
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    paddingVertical: 4
  },

  tableRow: {
    flexDirection: "row",
    borderLeft: "1 solid #000",
    borderRight: "1 solid #000",
    borderBottom: "1 solid #000",
    paddingVertical: 3
  },

  cellSl: {
    width: COLS.sl,
    textAlign: "center",
    borderRight: "1 solid #000"
  },

  cellDesc: {
    width: COLS.desc,
    paddingHorizontal: 4,
    borderRight: "1 solid #000"
  },

  cellModel: {
    width: COLS.model,
    borderRight: "1 solid #000"
  },

  cellUnit: {
    width: COLS.unit,
    textAlign: "center",
    borderRight: "1 solid #000"
  },

  cellQty: {
    width: COLS.qty,
    textAlign: "center",
    borderRight: "1 solid #000"
  },

  cellRate: {
    width: COLS.rate,
    textAlign: "right",
    paddingRight: 4,
    borderRight: "1 solid #000"
  },

  cellAmount: {
    width: COLS.amount,
    textAlign: "right",
    paddingRight: 4
  },

  amountWords: {
    border: "1 solid #000",
    padding: 6,
    marginTop: 6
  },

  signature: {
    alignItems: "flex-end",
    marginTop: 30
  },

  bankBox: {
    marginTop: 20,
    border: "1 solid #000",
    padding: 6,
    fontSize: 8
  }
});

/* ================= COMPONENT ================= */
export default function InvoicePDF({ invoice }) {
  const isPurchaseOrder =
    invoice.invoiceType === INVOICE_TYPES.PURCHASE;

  const shouldRepeatHeader = invoice.items?.length >= 8;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>

        {/* ===== LOGO ===== */}
        <View style={styles.center}>
          <Image src={dealerLogo} style={{ width: 140, height: 80 }} />
        </View>

        {/* ===== COMPANY DETAILS ===== */}
        <View style={styles.center}>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            SNJ SAFETY SOLUTIONS
          </Text>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Fire Alarm System, Fire Hydrant System,
            Fire Fighting Equipment & CCTV
          </Text>
          <Text>GSTN: 27ACPPR9449D1ZY</Text>
        </View>

        {/* ===== ADDRESS BAR ===== */}
        <View style={styles.addressBar}>
          <Text>
            Office No. 01, Plot No. 250, Sector-11, Vashi,
            Navi Mumbai – 400703
          </Text>
          <Text>
            SNJ Safety Solutions – Complete Fire Fighting Solutions:
          </Text>
          <Link
            src="https://snjsafetysolutions.in"
            style={{ color: "#ffffff"}}
          >
            snjsafetysolutions.in
          </Link>
          <Text>
            Contact: +91 9930930880 / +91 9082162344 |
            Email: snj.safetysolutions18@gmail.com
          </Text>
        </View>

        {/* ===== TITLE ===== */}
        <Text style={styles.title}>
          {invoice.invoiceType?.toUpperCase()}
        </Text>

        {/* ===== META ===== */}
        <View style={styles.metaBar}>
          <Text>Invoice No: {invoice.invoiceNo}</Text>
          <Text>Date: {invoice.invoiceDate}</Text>
        </View>

        {/* ===== ADDRESS ===== */}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ width: "50%" }}>
            <Text><b>Bill To</b></Text>
            <Text>{invoice.billTo.name}</Text>
            <Text>{invoice.billTo.address}</Text>
            <Text>GSTIN: {invoice.billTo.gstin}</Text>
            <Text>Contact: {invoice.billTo.contact}</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text><b>Ship To</b></Text>
            <Text>{invoice.shipTo.name}</Text>
            <Text>{invoice.shipTo.address}</Text>
          </View>
        </View>

        {/* ===== TABLE HEADER ===== */}
        <View style={styles.tableHeader} fixed={shouldRepeatHeader}>
          <Text style={styles.cellSl}>Sl</Text>
          <Text style={styles.cellDesc}>Description</Text>
          <Text style={styles.cellModel}>Model</Text>
          <Text style={styles.cellUnit}>Unit</Text>
          <Text style={styles.cellQty}>Qty</Text>
          <Text style={styles.cellRate}>Rate</Text>
          <Text style={styles.cellAmount}>Amount</Text>
        </View>

        {/* ===== TABLE ROWS ===== */}
        {invoice.items.map((item, i) => (
          <View key={i} style={styles.tableRow} wrap={false}>
            <Text style={styles.cellSl}>{i + 1}</Text>
            <Text style={styles.cellDesc}>{item.description}</Text>
            <Text style={styles.cellModel}>{item.model}</Text>
            <Text style={styles.cellUnit}>{item.unit}</Text>
            <Text style={styles.cellQty}>{item.quantity}</Text>
            <Text style={styles.cellRate}>{item.rate}</Text>
            <Text style={styles.cellAmount}>
              ₹{item.amount.toFixed(2)}
            </Text>
          </View>
        ))}

        {/* ===== TOTALS ===== */}
        <View style={{ marginTop: 10, alignItems: "flex-end" }}>
          <Text>Subtotal : ₹{invoice.subtotal.toFixed(2)}</Text>
          <Text>GST (18%) : ₹{invoice.gst.toFixed(2)}</Text>
          <Text><b>Grand Total : ₹{invoice.grandTotal.toFixed(2)}</b></Text>
        </View>

        {/* ===== AMOUNT IN WORDS ===== */}
        <View style={styles.amountWords}>
          <Text>
            Amount in Words : {numberToWords(invoice.grandTotal)}
          </Text>
        </View>

        {/* ===== SIGNATURE ===== */}
        <View style={styles.signature} minPresenceAhead={150}>
          <Text>For SNJ Safety Solutions</Text>
          <Image src={stampImg} style={{ width: 80, marginTop: 8 }} />
          <Text>Authorised Signatory</Text>
        </View>

        {/* ===== TERMS ===== */}
        {!isPurchaseOrder && (
          <View style={{ marginTop: 10 }}>
            <Text><b>Terms & Conditions</b></Text>
            <Text>1. 100% advance payment with purchase order.</Text>
            <Text>2. 18% GST applicable.</Text>
            <Text>3. Order once placed cannot be cancelled.</Text>
            <Text>4. 1 year manufacturing warranty.</Text>
            <Text>5. Transportation & packing extra.</Text>
          </View>
        )}

        {/* ===== BANK DETAILS ===== */}
        {!isPurchaseOrder && (
          <View style={styles.bankBox}>
            <Text><b>Bank Details</b></Text>
            <Text>Bank Name: Bank of Baroda</Text>
            <Text>Account Name: SNJ SAFETY SOLUTIONS</Text>
            <Text>Account No: 10430200001748</Text>
            <Text>IFSC: BARB0VASHIX</Text>
          </View>
        )}

      </Page>
    </Document>
  );
              }            <Text>Authorised Signatory</Text>
                </View>

                {!isPurchaseOrder && (
                    <View style={{ marginTop: 10, lineHeight: 1.2 }}>
                        <Text style={{ fontWeight: "bold" }}>Terms & Conditions</Text>
                        <Text>1. 100 % ADVANCE PAYMENT ALONG WITH PURCHASE ORDER.</Text>
                        <Text>2. 18% GST APPLICABLE.</Text>
                        <Text>3. ONCE ORDER IS PLACED & PAYMENT IS MADE, ORDER WILL NOT BE MODIFIED / CANCELLED.</Text>
                        <Text>4. 1 YEAR WARRANTY ON MANUFACTURING DEFECTS.</Text>
                        <Text>5. TRANSPORTATION & PACKING CHARGES WILL BE EXTRA.</Text>
                        <Text>6. DELIVERY OF MATERIAL WILL BE WITHIN 8–10 WORKING DAYS.</Text>
                    </View>
                )}

                {!isPurchaseOrder && (
                    <View
                        minPresenceAhead={50}
                        style={{ marginTop: 20, border: "1 solid #000", padding: 5 }}
                    >
                        <Text style={{ fontWeight: "bold" }}>Bank Details</Text>
                        <Text>Bank Name: Bank of Baroda</Text>
                        <Text>Account Name: SNJ SAFETY SOLUTIONS</Text>
                        <Text>Account No: 10430200001748</Text>
                        <Text>IFSC: BARB0VASHIX</Text>
                    </View>
                )}
            </Page>
        </Document>
    );
}
