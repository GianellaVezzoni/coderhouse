import { transformToDTO } from "../DTO/messagesDTO.js";

export default class MessagesDAOMem {
  constructor() {
    this.messages = [];
  }

  getAllMessages() {
    return transformToDTO(this.messages);
  }

  index(id) {
    return this.messages.findIndex((p) => p.id == id);
  }

  getMessageById(id) {
    return transformToDTO(this.messages[this.index(id)]);
  }

  save(object) {
    this.messages.push(object);
    return object;
  }

  deleteAllMessages() {
    this.messages = [];
  }

  deleteMessageById(id) {
    const deleted = transformToDTO(this.messages.splice(this.index(id), 1));
    return deleted;
  }

  updateMessage(id, mensaje) {
    const updated = { ...this.messages[this.index(id)], ...mensaje };
    this.messages.splice(this.index(id), 1, updated);
    return transformToDTO(updated);
  }
}
