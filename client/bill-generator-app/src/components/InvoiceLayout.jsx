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

                <div className="dealer-contacts" >
                    <div id="dealer-number-left">
                        <p><strong>NAGESH RAJBHAR </strong>:- +91 9082162344</p>
                        <p>+91 9930930880</p>
                    </div>
                    <div id="dealer-number-right">
                        <img
                            src="/hanuman_logo.png"
                            className="dealer-logo2"
                            alt="Dealer Logo"
                            crossOrigin="anonymous"
                        />

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
            <h3 id="h3">PROFORMA INVOICE</h3>
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
                        <th>Sl. No.</th>
                        <th>Description of Items</th>
                        <th>Model</th>
                        <th>Unit</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>

                            <td>
                                {isEdit ? (
                                    <input
                                        value={item.description}
                                        placeholder="Product Description"
                                        onChange={(e) =>
                                            onUpdateItem(i, "description", e.target.value)
                                        }
                                    />
                                ) : (
                                    item.description
                                )}
                            </td>

                            <td>
                                {isEdit ? (
                                    <input
                                        value={item.model}
                                        onChange={(e) =>
                                            onUpdateItem(i, "model", e.target.value)
                                        }
                                    />
                                ) : (
                                    item.model
                                )}
                            </td>

                            <td>
                                {isEdit ? (
                                    <input
                                        value={item.unit}
                                        onChange={(e) =>
                                            onUpdateItem(i, "unit", e.target.value)
                                        }
                                    />
                                ) : (
                                    item.unit
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
                                        value={item.rate}
                                        onChange={(e) =>
                                            onUpdateItem(i, "rate", +e.target.value)
                                        }
                                    />
                                ) : (
                                    item.rate
                                )}
                            </td>

                            <td>₹{Number(item.amount).toFixed(2)}</td>

                        </tr>

                    ))}
                    <tr>
                        {/* Empty columns */}
                        <td colSpan={5}></td>

                        {/* Labels */}
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                            Grand Total
                        </td>
                        <td>₹{Number(totals.subtotal || 0).toFixed(2)}</td>
                    </tr>

                    <tr>
                        <td colSpan={5}></td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                            GST @18%
                        </td>
                        <td>₹{Number(totals.gst || 0).toFixed(2)}</td>
                    </tr>

                    <tr>
                        <td colSpan={5}></td>
                        <td style={{ textAlign: "right", fontWeight: "bold" }}>
                            Total
                        </td>
                        <td>
                            <b>₹{Number(totals.grandTotal || 0).toFixed(2)}</b>
                        </td>
                    </tr>

                </tbody>

            </table>


            {isEdit && (
                <button className="add-item-btn" onClick={onAddItem}>
                    + Add Item
                </button>
            )}
            <div className="invoice-stamp">
                <div>
                    <p style={{ fontSize: "12px", textAlign: "center" }}>
                        <b>For SNJ Safety Solutions</b>
                    </p>
                    <img src="/safety_stamp.png" alt="Stamp" />
                    <p style={{ fontSize: "12px", textAlign: "center" }}>
                        <b>Authorised Signatory</b>
                    </p>
                </div>
            </div>





            <div className="invoice-footer">
                <div className="footer-note-left">
                    <ul>
                        <li>Terms and conditions apply.</li>
                        <li>18% GST applicable.</li>
                        <li>Once goods sold won't be returned.</li>
                        <li>1 year warranty on manufacturing defects.</li>
                    </ul>
                </div>

                <div className="footer-note-right">
                    <p><b>Bank Name:</b> Bank of Baroda</p>
                    <p><b>Account Name:</b> SNJ SAFETY SOLUTIONS</p>
                    <p><b>Account Number:</b> 10430200001748</p>
                    <p><b>IFSC Code:</b> BARB0VASHIX</p>
                </div>
            </div>

        </div>
    );
}
