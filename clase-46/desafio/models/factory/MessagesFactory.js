import MessagesDAOMem from "../dao/messagesDAOMem.js";
import MessagesDAOMongo from "../dao/messagesDAOMongo.js";
import { messagesSchema } from "../schemas/messages";
import * as dotenv from "dotenv";
dotenv.config();

export default class MessagesFactory {
  getDaoAccordingToPersistence() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        return new MessagesDAOMongo(messagesSchema);
      case "mem":
        return new MessagesDAOMem();
      default:
        return new MessagesDAOMem();
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MessagesFactory();
    }
    return this.instance;
  }
}
