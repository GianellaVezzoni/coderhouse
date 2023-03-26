import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformToDTO } from "../dto/productsDTO.js";

export default class ProductsDAOMongo {
  constructor(model) {
    this.model = model;
  }

  getDAO(mongooseOBJ) {
    if (Array?.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return { id: m._id, title: m.title, price: m.price, image: m.image };
      });
    } else {
      return mongooseOBJ;
    }
  }

  async save(object) {
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformToDTO(this.getDAO(saved));
    } catch (error) {
      return null;
    }
  }

  async getById(id) {
    try {
      return transformToDTO(this.getDAO(await this.model.findOne({ _id: id })));
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
      const productos = await this.model.find();
      return transformToDTO(this.getDAO(productos));
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

  async deleteAll() {
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      return null;
    }
  }
}
