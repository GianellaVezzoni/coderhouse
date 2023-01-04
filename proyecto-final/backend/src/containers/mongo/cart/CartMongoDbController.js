const MongoDbController = require("../MongoDbController");
const cartCollectionName = require("../../../entities/cart");

class CartMongoDbController {
 constructor() {
  this.connection = new MongoDbController().connect();
 }

 async createCart() {
  const cart = {
   timestamp: Date.now(),
   products: [],
  };
  const cartCreated = await cartCollectionName.create(cart);
  return cartCreated;
 }

 async deleteCartById(cartId) {
  const cartDeleted = await cartCollectionName.deleteOne({ _id: cartId });
  return cartDeleted;
 }

 async showProducts(cartId) {
  const productsFounded = await cartCollectionName.find({ _id: cartId });
  return productsFounded;
 }

 async addProductToCart(cartId, productData) {
  const cartFounded = await cartCollectionName.find({ _id: cartId });
  if (cartFounded) {
   const productList = cartFounded[0].products;
   productList.push(productData);
   const cartUpdated = await cartCollectionName.updateOne(
    { _id: cartId },
    { $set: { products: productList } }
   );
   return cartUpdated;
  }
  return null;
 }

 async deleteProductFromCartById(cartId, productId) {
  const cartFounded = await cartCollectionName.find({ _id: cartId });
  if (cartFounded) {
   const productListFiltered = cartFounded[0].products.filter(
    (element) => element.id !== parseInt(productId)
   );
   const cartUpdated = await cartCollectionName.updateOne(
    { _id: cartId },
    { $set: { products: productListFiltered } }
   );
   return cartUpdated;
  }
  return null;
 }
}

module.exports = CartMongoDbController;
