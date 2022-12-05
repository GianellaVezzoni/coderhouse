const fs = require("fs");

module.exports = class CartContainer {
 constructor(fileName) {
  this.fileName = fileName;
 }

 async createCart() {
  if (fs.existsSync(this.fileName)) {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   const fileParsed = JSON.parse(file);
   const cart = {
    id: fileParsed.length > 0 ? fileParsed[fileParsed.length - 1].id + 1 : 0,
    timestamp: Date.now(),
    productos: [],
   };
   await fs.promises.writeFile(this.fileName, JSON.stringify([cart]), "utf-8");
   return cart.id;
  } else {
   const newCart = {
    id: 0,
    timestamp: Date.now(),
    productos: [],
   };
   await fs.promises.writeFile(
    this.fileName,
    JSON.stringify([newCart]),
    "utf-8"
   );
   return newCart.id;
  }
 }

 async deleteCart(cartId) {
  if (fs.existsSync(this.fileName)) {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   const fileParsed = JSON.parse(file);
   const cartsNotDeleted = fileParsed?.find(
    (element) => element.id === parseInt(cartId)
   );
   if (cartsNotDeleted) {
    await fs.promises.writeFile(this.fileName, JSON.stringify([]), "utf-8");
    return cartId;
   } else {
    return null;
   }
  }
 }

 async showProducts(cartId) {
  if (fs.existsSync(this.fileName)) {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   const fileParsed = JSON.parse(file);
   const cartFounded = fileParsed?.find((cart) => cart.id === parseInt(cartId));
   if (cartFounded) {
    return cartFounded.productos;
   } else {
    return null;
   }
  } else {
   return [];
  }
 }

 async saveProducts(cartId, productInfo) {
  if (fs.existsSync(this.fileName)) {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   const fileParsed = JSON.parse(file);
   const cartFounded = fileParsed.find((cart) => cart.id === parseInt(cartId));
   if (cartFounded) {
    const product = {
     ...productInfo,
     id:
      cartFounded.productos.length > 0
       ? cartFounded.productos[cartFounded.productos.length - 1].id + 1
       : 0,
    };
    cartFounded.productos.push(product);
    await fs.promises.writeFile(
     this.fileName,
     JSON.stringify([cartFounded]),
     "utf-8"
    );
    return true;
   } else {
    return false;
   }
  } else {
   return false;
  }
 }

 async deleteProduct(cartId, idProducto) {
  if (fs.existsSync(this.fileName)) {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   let fileParsed = JSON.parse(file);
   const cartFounded = fileParsed.find((cart) => cart.id === parseInt(cartId));
   const productsNotDelete = cartFounded.productos.filter(
    (product) => product.id !== parseInt(idProducto)
   );
   fileParsed[0].productos = productsNotDelete;
   await fs.promises.writeFile(
    this.fileName,
    JSON.stringify(fileParsed),
    "utf-8"
   );
   return true;
  } else {
   return false;
  }
 }
};
