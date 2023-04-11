import { transformToDTO } from "../DTO/productsDTO.js";

export default class ProductsDAOMem {
  constructor() {
    this.products = [];
  }

  index(id) {
    return this.products.findIndex((p) => p.id == id);
  }

  getAllProducts() {
    return transformToDTO(this.products);
  }

  getProductById(id) {
    return transformToDTO(this.products[this.index(id)]);
  }

  save(object) {
    this.products.push(object);
    return object;
  }

  deleteProductById(id) {
    const deleted = transformToDTO(this.products.splice(this.index(id), 1));
    return deleted;
  }

  deleteAllProducts() {
    this.products = [];
  }

  update(id, producto) {
    const updated = { ...this.products[this.index(id)], ...producto };
    this.products.splice(this.index(id), 1, updated);
    return transformToDTO(updated);
  }
}
