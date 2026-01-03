const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
