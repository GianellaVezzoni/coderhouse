import MessageModel from "../models/message.js";
import { transformToDTO } from "../models/dto/messagesDTO";
import MessagesFactory from "../models/factory/MessagesFactory.js";

export default class MessageRepository {
  constructor() {
    this.factory = MessagesFactory.getInstance();
    this.dao = this.factory.getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((e) => new MessageModel(e));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return new MessageModel(dto);
  }

  async save(product) {
    const dto = transformToDTO(product);
    const messageSaved = await this.dao.save(dto);
    return new MessageModel(messageSaved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const messageRemoved = await this.dao.deleteById(id);
    return new MessageModel(messageRemoved);
  }

  async update(id, message) {
    const messageUpdated = await this.dao.update(id, transformToDTO(message));
    return new MessageModel(messageUpdated);
  }
}
