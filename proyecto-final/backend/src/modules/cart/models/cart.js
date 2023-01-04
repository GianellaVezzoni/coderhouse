const mongoose = require("mongoose");

const cartCollName = "cart";
const cartSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  products: { type: Array, required: true },
});

module.exports = mongoose.model(cartCollName, cartSchema);
