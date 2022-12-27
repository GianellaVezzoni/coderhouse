const MongoDbController = require("../MongoDbController");
const productCollectionName = require("../../../entities/product");

class ProductMongoDbController {
 constructor() {
  this.connection = new MongoDbController().connect();
 }

 async getProducts() {
  return await productCollectionName.find();
 }

 async getProductsById(productId) {
  return await productCollectionName.find({ _id: parseInt(productId) });
 }

 async createProduct(productData) {
  const product = {
   ...productData,
   timestamp: Date.now(),
  };
  return await productCollectionName.create(product);
 }

 async updateProductById(productId, productData) {
  const product = {
   ...productData,
   timestamp: Date.now(),
  };
  return await productCollectionName.updateOne({ _id: productId }, product);
 }

 async deleteById(productId) {
  return await productCollectionName.deleteOne({ _id: productId });
 }
}

module.exports = ProductMongoDbController;
