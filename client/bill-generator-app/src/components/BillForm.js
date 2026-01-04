import "../invoice.css";
import { useState, useEffect } from "react";
import axios from "axios";
import InvoiceLayout from "./InvoiceLayout";

export default function BillForm() {
  const [billTo, setBillTo] = useState({
    name: "",
    address: "",
    gstin: "",
    contact: ""
  });

  const [shipTo, setShipTo] = useState({
    name: "",
    address: ""
  });

  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        model: "",
        unit: "NOS",
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ]);
  };

  const updateItem = (i, field, value) => {
    const updated = [...items];

    updated[i] = {
      ...updated[i],
      [field]: value
    };

    const qty = Number(updated[i].quantity) || 0;
    const rate = Number(updated[i].rate) || 0;

    updated[i].amount = Number((qty * rate).toFixed(2));

    setItems(updated);
  };



  const [totals, setTotals] = useState({
    subtotal: 0,
    gst: 0,
    grandTotal: 0
  });

  useEffect(() => {
    const subtotal = items.reduce((sum, item) => {
      return sum + Number(item.amount || 0);
    }, 0);

    const gst = subtotal * 0.18;
    const grandTotal = subtotal + gst;

    setTotals({
      subtotal: Number(subtotal.toFixed(2)),
      gst: Number(gst.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2))
    });
  }, [items]);

  const onChangeBillTo = (field, value) =>
    setBillTo({ ...billTo, [field]: value });

  const onChangeShipTo = (field, value) =>
    setShipTo({ ...shipTo, [field]: value });

  const submitOrder = async () => {
    await axios.post("http://localhost:5000/api/orders", {
      billTo,
      shipTo,
      items,
      subtotal: totals.subtotal,
      gst: totals.gst,
      grandTotal: totals.grandTotal
    });

    alert("Invoice Saved");
  };

  return (
    <>
      <InvoiceLayout
        mode="edit"
        billTo={billTo}
        shipTo={shipTo}
        items={items}
        totals={totals}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onChangeBillTo={onChangeBillTo}
        onChangeShipTo={onChangeShipTo}
      />

      <button className="generate-btn" onClick={submitOrder}>
        Generate Invoice
      </button>
    </>
  );
}
