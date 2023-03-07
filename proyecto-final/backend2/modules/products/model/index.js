import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const producsCollecion = "products";

const schema = new mongoose.Schema({
  timestamp: { type: String, require: true },
  nombre: { type: String, require: true },
  foto: { type: String, require: true },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true },
  codigo: { type: String, require: true },
  descripcion: { type: String, require: true },
});

const connection = mongoose.createConnection(process.env.MONGO_DB_STRING_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const productsModel = connection.model(producsCollecion, schema);
