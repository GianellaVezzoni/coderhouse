import ProductsDAOMem from "../dao/productsDAOMem.js";
import ProductsDAOMongo from "../dao/productsDAOMongo";
import { productSchema } from "../schemas/products.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class ProductsFactory {
  constructor(){
    this.date = Date.now();
  }

  getDaoAccordingToPersistence() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        return new ProductsDAOMongo(productSchema);
      case "mem":
        return new ProductsDAOMem();
      default:
        return new ProductsDAOMem();
    }
  }

  static getInstance() {
    if(!this.instance) {
      this.instance = new ProductsFactory()
    }
    return this.instance;
  }
}
