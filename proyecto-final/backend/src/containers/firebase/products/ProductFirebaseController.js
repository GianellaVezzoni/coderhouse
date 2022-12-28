const admin = require("firebase-admin");
const FirebaseController = require('../FirebaseController');
class ProductFirebaseController {
 constructor() {
    this.connection = new FirebaseController().connect();
  this.db = admin.firestore();
  this.query = this.db.collection("products");
 }

 async getProductsById(prodId) {
  const doc = this.query.doc(prodId);
  const data = await doc.get();
  const response = data.data();
  return response;
 }

 async getAllProducts() {
  const doc = this.query.doc();
  const data = await doc.get();
  const response = data.data();
  return response;
 }

 async createProduct(productData, mongoProductId) {
  await this.query.doc().set({
   ...productData,
   id: mongoProductId.toString(),
  });
  return true;
 }

 async updateProductById(id, productData) {
  await this.query.doc(id).update({
   ...productData,
  });
  return true;
 }

 async deleteProductById(prodId) {
  await this.query.doc(prodId).delete();
  return true;
 }
}

module.exports = ProductFirebaseController;
