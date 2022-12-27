const mongoose = require("mongoose");

const productCollectionName = "products";

const productSchema = new mongoose.Schema({
 nombre: { type: String, require: true },
 descripcion: { type: String, require: true },
 codigo: { type: Number, require: true },
 foto: { type: String, require: false },
 precio: { type: Number, require: true },
 stock: { type: Number, require: true },
 id: { type: Number, require: true },
 timestamp: { type: Number, require: true },
});

module.exports = mongoose.model(productCollectionName, productSchema);
