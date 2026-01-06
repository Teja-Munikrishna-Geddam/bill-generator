import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";
import { numberToWords } from "../utils/numberToWords";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        fontFamily: "Helvetica"
    },

    title: {
        textAlign: "center",
        fontSize: 14,
        marginBottom: 10,
        fontWeight: "bold"
    },

    row: {
        flexDirection: "row",
        borderBottom: "1 solid #000",
        paddingVertical: 4
    },

    headerRow: {
        flexDirection: "row",
        borderBottom: "1 solid #000",
        fontWeight: "bold",
        backgroundColor: "#f2f2f2"
    },

    cellSl: { width: "5%", textAlign: "center" },
    cellDesc: { width: "40%" },
    cell: { width: "11%", textAlign: "center" },
    cellAmount: { width: "12%", textAlign: "right" },

    amountWords: {
        marginTop: 10,
        border: "1 solid #000",
        padding: 5
    },

    signature: {
        marginTop: 40,
        alignItems: "flex-end",
        fontSize: 10
    },
    header: {
        textAlign: "center",
        marginBottom: 10
    },
    company: {
        fontSize: 12,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 9
    }

});

export default function InvoicePDF({ invoice }) {
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>

                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ width: "50%" }}>
                        <Text>Bill To:</Text>
                        <Text>{invoice.billTo.name}</Text>
                        <Text>{invoice.billTo.address}</Text>
                        <Text>GSTIN: {invoice.billTo.gstin}</Text>
                    </View>

                    <View style={{ width: "50%" }}>
                        <Text>Ship To:</Text>
                        <Text>{invoice.shipTo.name}</Text>
                        <Text>{invoice.shipTo.address}</Text>
                    </View>
                </View>


                {/* TITLE */}
                <Text style={styles.title}>
                    {invoice.invoiceType?.toUpperCase() || "INVOICE"}
                </Text>
                <View style={styles.header}>
                    <Text style={styles.company}>SNJ SAFETY SOLUTIONS</Text>
                    <Text style={styles.subtitle}>
                        Fire Alarm, Fire Fighting & CCTV
                    </Text>
                    <Text style={styles.title}>
                        {invoice.invoiceType.toUpperCase()}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text>Invoice No: {invoice.invoiceNo}</Text>
                    <Text>Date: {invoice.invoiceDate}</Text>
                </View>



                {/* TABLE HEADER — AUTO REPEATS */}
                <View style={styles.headerRow} fixed>
                    <Text style={styles.cellSl}>Sl</Text>
                    <Text style={styles.cellDesc}>Description</Text>
                    <Text style={styles.cell}>Unit</Text>
                    <Text style={styles.cell}>Qty</Text>
                    <Text style={styles.cell}>Rate</Text>
                    <Text style={styles.cellAmount}>Amount</Text>
                </View>

                {/* TABLE ROWS — NEVER SPLIT */}
                {invoice.items.map((item, i) => (
                    <View key={i} style={styles.row} wrap={false}>
                        <Text style={styles.cellSl}>{i + 1}</Text>
                        <Text style={styles.cellDesc}>{item.description}</Text>
                        <Text style={styles.cell}>{item.unit}</Text>
                        <Text style={styles.cell}>{item.quantity}</Text>
                        <Text style={styles.cell}>{item.rate}</Text>
                        <Text style={styles.cellAmount}>
                            ₹{item.amount.toFixed(2)}
                        </Text>
                    </View>
                ))}

                {/* TOTALS */}
                <View style={{ marginTop: 10 }}>
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
                    <Text>Authorised Signatory</Text>
                </View>

            </Page>
        </Document>
    );
}
