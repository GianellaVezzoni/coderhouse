import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const messagesCollectionName = "messages";

const messagesSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  email: { type: String, require: true, max: 50 },
  name: { type: String, require: true, max: 30 },
  lastname: { type: String, require: true, max: 30 },
  age: { type: Number, require: true, max: 2 },
  alias: { type: String, require: true, max: 20 },
  avatar: { type: String, require: true },
  text: { type: String, require: true },
  timestamp: { type: String, require: true },
});

const DbConnectionOptions = mongoose.createConnection(
  process.env.MONGO_CONN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export const messageSchema = DbConnectionOptions.model(
  messagesCollectionName,
  messagesSchema
);
