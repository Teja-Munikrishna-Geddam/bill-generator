import "../invoice.css";

export default function InvoiceLayout({
    mode = "view",
    billTo = {},
    shipTo = {},
    items = [],
    totals = {},
    invoiceNo = "",
    invoiceDate = "",
    onChangeBillTo,
    onChangeShipTo,
    onAddItem,
    onUpdateItem
}) {

    const isEdit = mode === "edit";

    return (
        <div className="invoice-page">

            {/* ===== DEALER HEADER ===== */}
            <div className="dealer-header">
                <h3>PROFORMA INVOICE</h3>

                <div className="dealer-contacts">
                    <div>
                        <p>+91 9082162344</p>
                        <p>+91 9969406915</p>
                    </div>
                    <div>
                        <p>+91 9930930880</p>
                        <p>+91 9819577725</p>
                    </div>
                </div>

                <div className="dealer-center">
                    <img
                        src="/dealer_logo.png"
                        alt="Dealer Logo"
                        className="dealer-logo"
                    />
                </div>

                <p className="dealer-services">
                    Fire Alarm System, Fire Hydrent System,
                    Fire Fighting Equipment & CCTV
                </p>

                <p className="dealer-gstin">
                    <strong>GSTN :</strong> 27ACPRR9449D1ZY
                </p>

                <div className="dealer-address">
                    <p>
                        <strong>Address :</strong> Shop No. 05, House No. 250,
                        Bharat House, Sector-11, Vashi, Navi Mumbai – 400703
                    </p>
                    <p>
                        <strong>Email :</strong> snj.safetysolutions18@gmail.com
                    </p>
                </div>
            </div>

            {/* ===== INVOICE META (VIEW ONLY) ===== */}
            {mode === "view" && (
                <div className="invoice-meta-bar">
                    <p>Invoice No: {invoiceNo}</p>
                    <p>Date: {invoiceDate}</p>
                </div>
            )}

            {/* ===== ADDRESSES ===== */}
            <div className="address-block">
                <div className="address-box">
                    <h4>Bill To</h4>

                    {isEdit ? (
                        <>
                            <input
                                placeholder="Customer Name"
                                value={billTo.name || ""}
                                onChange={(e) => onChangeBillTo("name", e.target.value)}
                            />

                            <textarea
                                placeholder="Address"
                                value={billTo.address || ""}
                                onChange={(e) => onChangeBillTo("address", e.target.value)}
                            />

                            <input
                                placeholder="GSTIN"
                                value={billTo.gstin || ""}
                                onChange={(e) => onChangeBillTo("gstin", e.target.value)}
                            />

                            <input
                                placeholder="Contact"
                                value={billTo.contact || ""}
                                onChange={(e) => onChangeBillTo("contact", e.target.value)}
                            />

                        </>
                    ) : (
                        <>
                            <p><b>{billTo.name}</b></p>
                            <p>{billTo?.address || "—"}</p>
                            <p>GSTIN: {billTo.gstin}</p>
                            <p>Contact: {billTo.contact}</p>
                        </>
                    )}
                </div>

                <div className="address-box">
                    <h4>Ship To</h4>

                    {isEdit ? (
                        <>
                            <input
                                placeholder="Customer Name"
                                value={shipTo.name || ""}
                                onChange={(e) => onChangeShipTo("name", e.target.value)}
                            />

                            <textarea
                                placeholder="Address"
                                value={shipTo.address || ""}
                                onChange={(e) => onChangeShipTo("address", e.target.value)}
                            />

                        </>
                    ) : (
                        <>
                            <p><b>{shipTo.name}</b></p>
                            <p>{shipTo?.address || "—"}</p>
                        </>
                    )}
                </div>
            </div>

            {/* ===== ITEMS ===== */}
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>

                            <td>
                                {isEdit ? (
                                    <input
                                        value={item.product}
                                        onChange={(e) =>
                                            onUpdateItem(i, "product", e.target.value)
                                        }
                                    />
                                ) : (
                                    item.product
                                )}
                            </td>

                            <td>
                                {isEdit ? (
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            onUpdateItem(i, "quantity", +e.target.value)
                                        }
                                    />
                                ) : (
                                    item.quantity
                                )}
                            </td>

                            <td>
                                {isEdit ? (
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                            onUpdateItem(i, "price", +e.target.value)
                                        }
                                    />
                                ) : (
                                    item.price
                                )}
                            </td>

                            <td>₹{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEdit && (
                <button className="add-item-btn" onClick={onAddItem}>
                    + Add Item
                </button>
            )}

            {/* ===== TOTALS ===== */}
            <div className="totals-box">
                <p>Net Total: ₹{Number(totals.subtotal || 0).toFixed(2)}</p>
                <p>CGST @9%: ₹{Number(totals.cgst || 0).toFixed(2)}</p>
                <p>SGST @9%: ₹{Number(totals.sgst || 0).toFixed(2)}</p>
                <h3>Grand Total: ₹{Number(totals.grandTotal || 0).toFixed(2)}</h3>
            </div>


        </div>
    );
}
