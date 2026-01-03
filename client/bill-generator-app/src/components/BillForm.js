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
      { product: "", quantity: 1, price: 0, total: 0 }
    ]);
  };

  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    updated[i].total =
      updated[i].quantity * updated[i].price;
    setItems(updated);
  };

  const [totals, setTotals] = useState({
    subtotal: 0,
    cgst: 0,
    sgst: 0,
    grandTotal: 0
  });

  useEffect(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const grandTotal = subtotal + cgst + sgst;

    setTotals({ subtotal, cgst, sgst, grandTotal });
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
      cgst: totals.cgst,
      sgst: totals.sgst,
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
