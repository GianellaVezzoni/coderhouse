const FirebaseController = require("../FirebaseController");
const admin = require("firebase-admin");

class CartFirebase {
 constructor() {
  this.connectionFirebase = new FirebaseController().connect();
  this.db = admin.firestore();
  this.query = this.db.collection("ecommerce");
 }

 async createCart(mongoId) {
  const docRef = this.query.doc("cart");
  await docRef.set({
   timestamp: Date.now(),
   products: [],
   id: mongoId.toString(),
  });
  return true;
 }

 async deleteCartById(cartId) {
  await this.query.doc("cart").delete();
 }

 async getProductsById(cartId) {
  const doc = this.query.doc("cart");
  const data = await doc.get();
  const response = data.data();
  return response.id === cartId ? response.products : [];
 }

 async addProductToCart(id, product) {
  const doc = this.query.doc("cart");
  const data = await doc.get();
  const response = data.data();
  if (response.id === id) {
   const productsList = response.products;
   productsList.push(product);
   this.query.doc("cart").set({ products: productsList });
   return;
  }
 }

 async deleteProductFromCart(id, productId) {
  const doc = this.query.doc("cart");
  const data = await doc.get();
  const response = data.data();
  const productsList = response.products;
  const productsFiltered = productsList.filter(
   (element) => element.id !== parseInt(productId)
  );
  this.query.doc("cart").set({ products: productsFiltered });
  return;
 }
}

module.exports = CartFirebase;
