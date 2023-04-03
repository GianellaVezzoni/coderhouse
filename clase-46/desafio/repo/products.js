import ProductModel from "../models/message.js";
import { transformToDTO } from "../models/dto/productsDTO";
import ProductsFactory from "../models/factory/ProductsFactory.js";

export default class ProductRepository {
    constructor() {
        this.factory = ProductsFactory.getInstance();
        this.dao = this.factory.getDao()
        this.factorySecondInstance = ProductsFactory.getInstance();
    }

    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(e => new ProductModel(e))
    }

    async getById(id) {
        const dto = await this.dao.getById(id);
        return new ProductModel(dto)
    }

    async save(product) {
        const dto = transformToDTO(product);
        const productCreated = await this.dao.save(dto);
        return new ProductModel(productCreated)
    }

    async deleteAll() {
        await this.dao.deleteAll();
    }

    async deleteById(id) {
        const productRemoved = await this.dao.deleteById(id);
        return new ProductModel(productRemoved)
    }

    async update(id, product) {
        const productUpdated = await this.dao.update(id, transformToDTO(product))
        return new ProductModel(productUpdated)
    }
}