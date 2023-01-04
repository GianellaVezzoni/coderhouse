const ContenedorMongoDb = require ("../../../containers/mongo/ContenedorMongoDb");
const carts = require ("../models/cart");

module.exports = class CartMongoController {
  constructor() {
    this.mongoDbConnection = new ContenedorMongoDb();
  }

  async createCart(products) {
    const cartCreated = await carts.insertOne({ timestamp: Date.now(), products: products });
    console.log("cartCreated ", cartCreated)
    return cartCreated.id;
  }

  async deleteCart(cartId) {
    await carts.delete({ id: cartId });
  }

  async showProducts() {
    await carts.find();
  }

  async saveProducts(products) {
    await carts.insertMany(products);
  }

  async deleteProductById(cartId) {
    await carts.deleteOne({ id: cartId });
  }

  async disconnectConnection() {
    this.mongoDbConnection.disconnect();
  }
};
