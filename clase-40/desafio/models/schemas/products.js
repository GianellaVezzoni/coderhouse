import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const productCollectionName = "products";

const productSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, require: true, max: 200 },
  price: { type: Number, require: true },
  image: { type: String, require: true },
});

const connectionOptions = mongoose.createConnection(
  process.env.MONGO_CONN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export const productoSchema = connectionOptions.model(
  productCollectionName,
  productSchema
);
