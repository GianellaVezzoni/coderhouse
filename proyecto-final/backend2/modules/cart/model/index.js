import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const cartCollection = "carts";

const schema = new mongoose.Schema({
  timestamp: { type: String, require: true},
  productos: { type: Array, require: true},
});

const connection = mongoose.createConnection(process.env.MONGO_DB_STRING_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const cartsModel = connection.model(cartCollection, schema);
