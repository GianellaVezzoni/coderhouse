const mongoose = require("mongoose");

const cartCollectionName = "cart";

const cartSchema = new mongoose.Schema({
 timestamp: { type: Number, require: true },
 products: { type: Array, require: true },
});

module.exports = mongoose.model(cartCollectionName, cartSchema);
