import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export class MongoContainer {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      return await this.model.find();
    } catch (error) {
      return null;
    }
  }

  async getById(id) {
    try {
      return this.model.find({ _id: id });
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

  async save(object) {
    try {
      const saveModel = new this.model(object);
      return await saveModel.save();
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
