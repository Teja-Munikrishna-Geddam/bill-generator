import { useEffect, useState } from "react";
import axios from "axios";
import InvoiceTemplate from "./InvoiceTemplate";

export default function InvoiceList() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Orders`);
        setOrders(res.data);
        console.log("Fetched Orders 👉", res.data);
    };

    // ✅ FIXED search
    // 🔍 GLOBAL SEARCH FUNCTION
    const matchesSearch = (order, query) => {
        if (!query) return true;

        const q = query.toLowerCase();

        const invoiceNo = order.invoiceNo?.toLowerCase() || "";
        const name =
            order.billTo?.name?.toLowerCase() ||
            order.customerId?.name?.toLowerCase() ||
            "";
        const phone =
            order.billTo?.contact?.toLowerCase() ||
            order.customerId?.phone?.toLowerCase() ||
            "";
        const gstin =
            order.billTo?.gstin?.toLowerCase() ||
            "";

        return (
            invoiceNo.includes(q) ||
            name.includes(q) ||
            phone.includes(q) ||
            gstin.includes(q)
        );
    };

    const filteredOrders = orders.filter(order =>
        matchesSearch(order, search)
    );

    return (
        <div>
            <h2>Invoice History</h2>

            {/* 🔍 Global Search */}
            <input
                placeholder="Search by Invoice No, Name, Mobile, GSTIN"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: "12px",
                    padding: "6px",
                    width: "350px"
                }}
            />

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Invoice No</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>GSTIN</th>
                        <th>Grand Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.map((order) => {
                        const customerName =
                            order.billTo?.name ||
                            order.customerId?.name ||
                            "—";

                        const gstin =
                            order.billTo?.gstin ||
                            "—";

                        return (
                            <tr key={order._id}>
                                <td>{order.invoiceNo}</td>
                                <td>
                                    {new Date(order.invoiceDate).toLocaleDateString()}
                                </td>
                                <td>{customerName}</td>
                                <td>{gstin}</td>
                                <td>₹{order.grandTotal}</td>
                                <td>
                                    <button onClick={() => setSelectedOrder(order)}>
                                        View / PDF
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* ================= VIEW / PDF ================= */}
            {selectedOrder && (
                <div id="invoice-preview">
                    <InvoiceTemplate
                        invoice={selectedOrder}
                        customer={selectedOrder.customerId}
                    />
                </div>

            )}
        </div>
    );
}
