const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/CustomerRoutes");
const orderRoutes = require("./routes/OrderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
