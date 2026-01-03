const mongoose = require("mongoose");

/* =======================
   Address Schema (NEW)
======================= */
const AddressSchema = new mongoose.Schema(
  {
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    gstin: String,
    phone: String,
    email: String
  },
  { _id: false }
);

/* =======================
   Item Schema
======================= */
const ItemSchema = new mongoose.Schema(
  {
    product: String,
    quantity: Number,
    price: Number,
    total: Number
  },
  { _id: false }
);

/* =======================
   Order Schema
======================= */
const OrderSchema = new mongoose.Schema(
  {
    /* ---------- EXISTING (UNCHANGED) ---------- */
    invoiceNo: {
      type: String,
      required: true,
      unique: true
    },

    invoiceDate: {
      type: Date,
      default: Date.now
    },

    // 🔴 OLD DATA SUPPORT (DO NOT REMOVE)
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: false
    },

    items: [ItemSchema],

    subtotal: Number,

    tax: Number, // old tax support

    grandTotal: Number,

    /* ---------- NEW FIELDS (OPTIONAL) ---------- */
    billTo: {
      name: String,
      address: String,
      gstin: String,
      contact: String
    },

    shipTo: {
      name: String,
      address: String
    },


    cgst: {
      type: Number,
      default: 0
    },

    sgst: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: "CREATED"
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
