const mongoose = require("mongoose");

const messageCollectionName = "messages";

const messageSchema = new mongoose.Schema({
 id: { type: String, require: true },
 name: { type: String, require: true },
 lastname: { type: Number, require: true },
 avatar: { type: String, require: false },
 alias: { type: Number, require: true },
 age: { type: Number, require: true },
 text: { type: Number, require: true },
 timestamp: { type: Number, require: true },
});

module.exports = mongoose.model(messageCollectionName, messageSchema);
