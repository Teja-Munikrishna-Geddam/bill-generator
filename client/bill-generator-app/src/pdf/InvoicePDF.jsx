import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";
import { numberToWords } from "../utils/numberToWords";
import { Image } from "@react-pdf/renderer";
import dealerLogo from "../assets/dealer_logo.png";
import stampImg from "../assets/safety_stamp.png";
import { INVOICE_TYPES } from "../components/invoiceTypes";

const COLS = {
    sl: "5%",
    desc: "40%",
    model: "15%",
    unit: "8%",
    qty: "7%",
    rate: "10%",
    amount: "15%"
};




const styles = StyleSheet.create({
    page: {
        padding: 18,
        fontSize: 9,
        fontFamily: "Helvetica",
        lineHeight: 1.4
    },

    /* ===== HEADER ===== */
    center: {
        alignItems: "center",
        textAlign: "center"
    },

    dealerLogo: {
        width: 180,
        height: 120,
        marginBottom: 4
    },

    dealerServices: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#c40000",
        marginVertical: 4
    },

    gstin: {
        fontSize: 10,
        marginBottom: 4
    },

    addressBar: {
        backgroundColor: "#003399",
        color: "#ffffff",
        padding: 6,
        marginBottom: 10
    },

    /* ===== TITLE ===== */
    title: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        textDecoration: "underline",
        marginBottom: 8
    },

    metaBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        border: "1 solid #000",
        padding: 5,
        marginBottom: 8
    },

    /* ===== ADDRESS BLOCK ===== */
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

    /* ===== TABLE ===== */
    tableHeader: {
        flexDirection: "row",
        border: "1 solid #000",
        fontWeight: "bold",
        backgroundColor: "#f2f2f2",
        paddingVertical: 3
    },

    headerRow: {
        flexDirection: "row",
        borderTop: "1 solid #000",
        borderBottom: "1 solid #000",
        borderLeft: "1 solid #000",
        borderRight: "1 solid #000",
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
        width: "3%",
        textAlign: "center"
    },

    cellDesc: {
        width: "40%",
        paddingRight: 4
    },

    cellModel: {
        width: "15%",
        textAlign: "left"
    },

    cellUnit: {
        width: "10%",
        textAlign: "center"
    },

    cellQty: {
        width: "7%",
        textAlign: "center"
    },

    cellRate: {
        width: "10%",
        textAlign: "right"
    },

    cellAmount: {
        width: "15%",
        textAlign: "right"
    },

    totalsRow: {
        flexDirection: "row",
        border: "1 solid #000"
    },

    totalsLabel: {
        width: "85%",
        textAlign: "right",
        padding: 4,
        fontWeight: "bold"
    },

    totalsValue: {
        width: "15%",
        textAlign: "right",
        padding: 4
    },

    amountWords: {
        border: "1 solid #000",
        padding: 6,
        marginTop: 6
    },

    /* ===== SIGNATURE ===== */
    signature: {
        alignItems: "flex-end",
        marginTop: 30
    },

    stamp: {
        width: 80,
        marginVertical: 6
    },

    /* ===== FOOTER ===== */
    footerRow: {
        flexDirection: "row",
        marginTop: 10
    },

    terms: {
        width: "65%",
        fontSize: 8,
        lineHeight: 1.4
    },

    bankBox: {
        marginTop: 30,
        width: "35%",
        border: "1 solid #000",
        padding: 5,
        fontSize: 8
    }
});


export default function InvoicePDF({ invoice }) {
    const isPurchaseOrder =
        invoice.invoiceType === INVOICE_TYPES.PURCHASE;
        
    const shouldRepeatHeader = invoice.items?.length >= 8;
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <View style={{ alignItems: "center", marginBottom: 8 }}>
                    <Image src={dealerLogo} style={{ width: 140, height: 80 }} />
                </View>

                <View style={{ textAlign: "center", marginBottom: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                        SNJ SAFETY SOLUTIONS
                    </Text>
                    <Text style={{ fontSize: 9, color: 'red' }}>
                        Fire Alarm System, Fire Hydrant System,
                        Fire Fighting Equipment & CCTV
                    </Text >
                    <Text style={{ fontSize: 9 }}>
                        GSTN: 27ACPPR9449D1ZY
                    </Text>
                </View>
                <View style={{ marginBottom: 10, backgroundColor: '#003399', padding: 5, color: 'white', fontWeight: 'bold' }}>
                    <Text style={{ fontSize: 9 }}>
                        Office No. 01, Plot No. 250, Sector-11, Vashi,
                        Navi Mumbai – 400703 
                        SNJ Safety Solutions – Complete Fire Fighting Solutions : https://share.google/ZKagZNeuCjSIelIVS
                    </Text>
                    <Text style={{ fontSize: 9 }}>
                        Contact Person: Nagesh
                        Contact NO: +91 9930930880/+91 9082162344
                        Email:snj.safetysolutions18@gmail.com
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ width: "50%" }}>
                        <Text>Bill To:</Text>
                        <Text>{invoice.billTo.name}</Text>
                        <Text>{invoice.billTo.address}</Text>
                        <Text>GSTIN: {invoice.billTo.gstin}</Text>
                        <Text>Contact: {invoice.billTo.contact}</Text>
                    </View>

                    <View style={{ width: "50%" }}>
                        <Text>Ship To:</Text>
                        <Text>{invoice.shipTo.name}</Text>
                        <Text>{invoice.shipTo.address}</Text>
                    </View>
                </View>


                {/* TITLE */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {invoice.invoiceType?.toUpperCase() || "INVOICE"}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text>Invoice No: {invoice.invoiceNo}</Text>
                    <Text>Date: {invoice.invoiceDate}</Text>
                </View>



                {/* TABLE HEADER — AUTO REPEATS */}
                {shouldRepeatHeader ? (
                    <View style={styles.tableHeader} fixed>
                        <Text style={styles.cellSl}>Sl</Text>
                        <Text style={styles.cellDesc}>Description</Text>
                        <Text style={styles.cellModel}>Model</Text>
                        <Text style={styles.cellUnit}>Unit</Text>
                        <Text style={styles.cellQty}>Qty</Text>
                        <Text style={styles.cellRate}>Rate</Text>
                        <Text style={styles.cellAmount}>Amount</Text>
                    </View>
                ) : (
                    <View style={styles.tableHeader}>
                        <Text style={styles.cellSl}>Sl</Text>
                        <Text style={styles.cellDesc}>Description</Text>
                        <Text style={styles.cellModel}>Model</Text>
                        <Text style={styles.cellUnit}>Unit</Text>
                        <Text style={styles.cellQty}>Qty</Text>
                        <Text style={styles.cellRate}>Rate</Text>
                        <Text style={styles.cellAmount}>Amount</Text>
                    </View>
                )}



                {/* TABLE ROWS — NEVER SPLIT */}
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

                {/* TOTALS */}
                <View style={{ marginTop: 10, alignItems: "flex-end" }}>
                    <Text>Subtotal : ₹{invoice.subtotal.toFixed(2)}</Text>
                    <Text>GST (18%) : ₹{invoice.gst.toFixed(2)}</Text>
                    <Text>Grand Total : ₹{invoice.grandTotal.toFixed(2)}</Text>
                </View>

                {/* AMOUNT IN WORDS */}
                <View style={styles.amountWords}>
                    <Text>
                        Amount in Words : {numberToWords(invoice.grandTotal)}
                    </Text>
                </View>

                {/* SIGNATURE — AUTO MOVES TO NEXT PAGE */}
                <View style={styles.signature} minPresenceAhead={150}>
                    <Text>For SNJ Safety Solutions</Text>
                    <Image src={stampImg} style={{ width: 80, marginTop: 10 }} />
                    <Text>Authorised Signatory</Text>
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
