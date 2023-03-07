import MongoStore from "connect-mongo";
import * as dotenv from 'dotenv';
dotenv.config();

const MongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const mongoSession = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  mongoOptions: MongoOptions,
  ttl: 600,
});