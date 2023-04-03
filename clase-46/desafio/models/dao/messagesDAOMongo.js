import mongoose from "mongoose";
import { transformToDTO } from "../dto/messagesDTO";
mongoose.set("strictQuery", false);

export default class MessagesDAOMongo {
  constructor(model) {
    this.model = model;
  }

  generateDAOCompatible(mongooseOBJ) {
    if (Array?.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return { id: m._id, email: m.email, name: m.name, lastname: m.lastname, age: m.age, alias: m.alias, avatar: m.avatar, text: m.text, timestamp: m.timestamp };
      });
    } else {
      return mongooseOBJ;
    }
  }

  async save(object) {
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformToDTO(this.generateDAOCompatible(saved));
    } catch (error) {
      return null;
    }
  }

  async getById(id) {
    try {
      return transformToDTO(this.generateDAOCompatible(await this.model.findOne({ _id: id })));
    } catch (error) {
      return null;
    }
  }

  async update(id, newObject) {
    try {     
      return await this.model.updateOne({ _id: id }, newObject);
    } catch (error) {
      return null;
    }
  }

  async getAll() {
    try {
      const mensajes = await this.model.find();
      return transformToDTO(this.generateDAOCompatible(mensajes));
    } catch (error) {
      return null;
    }
  }

  async deleteAll() {
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      return null;
    }
  }

  async deleteById(id) {
    try {
      return await this.model.deleteOne({ _id: id });
    } catch (error) {
      return null;
    }
  }
}
