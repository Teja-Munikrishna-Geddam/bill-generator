const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();

// Add customer
router.post('/', async (req, res) => {
  console.log("REQ BODY 👉", req.body);

  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error("ERROR 👉", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

module.exports = router;
