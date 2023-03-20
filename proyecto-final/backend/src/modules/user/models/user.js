const mongoose = require("mongoose");

const userCollName = "user";
const userSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  avatar: {type: String}
});

module.exports = mongoose.model(userCollName, userSchema);
