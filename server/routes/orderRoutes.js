const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

const generateInvoiceNo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const datePart = `${year}${month}${day}`;
  // 6-digit random number
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `INV-${datePart}-${randomPart}`;
};


router.post("/", async (req, res) => {
  console.log("ORDER BODY 👉", req.body);

  try {
    const invoiceNo = await generateInvoiceNo();
    const order = new Order({
      ...req.body,
      invoiceNo
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders WITH customer details
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ GET ORDERS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


// 📊 Monthly sales dashboard data
router.get("/stats/monthly", async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $match: {
          grandTotal: { $exists: true }
        }
      },
      {
        $group: {
          _id: { $month: { $ifNull: ["$createdAt", "$date"] } },
          total: { $sum: "$grandTotal" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(sales);
  } catch (err) {
    console.error("❌ MONTHLY STATS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});



module.exports = router;
