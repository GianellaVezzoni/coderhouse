const express = require("express");
const CartMongoDbController = require("../containers/mongo/cart/CartMongoDbController");
const router = express.Router();
const CartFirebase = require("../containers/firebase/cart/CartFirebase");
const cartFirebase = new CartFirebase();

router.post("/", async (_, res) => {
 try {
  const cart = new CartMongoDbController();
  const cartCreated = await cart.createCart();
  const cartfbCreated = await cartFirebase.createCart(cartCreated?._id);
  if (cartCreated?._id !== undefined && cartfbCreated) {
   return res.status(200).json({
    status: "success",
    message: `Carrito creado!. ID ${cartCreated._id}`,
    id: cartCreated,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "No se pudo crear el carrito.",
   });
  }
 } catch (err) {
  console.log(err);
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

router.delete("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  cartFirebase.deleteCartById(id);
  const cart = new CartMongoDbController();
  const cartDeleted = await cart.deleteCartById(id);
  if (cartDeleted.deletedCount > 0) {
   return res.status(200).json({
    status: "success",
    message: `Carrito eliminado!. ID ${id}`,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "No se pudo eliminar el carrito.",
   });
  }
 } catch (err) {
  console.log("el error ", err);
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

router.get("/:id/productos", async (req, res) => {
 try {
  const { id } = req.params;
  cartFirebase.getProductsById(id);
  const cart = new CartMongoDbController();
  const productsFounded = await cart.showProducts(id);
  if (productsFounded.length > 0) {
   return res.status(200).json({
    status: "success",
    products: productsFounded[0].products,
   });
  } else if (products === null) {
   return res.status(400).json({
    status: "error",
    message: "No se encontro un carrito con ese id.",
   });
  } else {
   return res.status(200).json({
    status: "success",
    message: "No se encontraron productos en el carrito.",
   });
  }
 } catch (err) {
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

router.post("/:id/productos", async (req, res) => {
 try {
  const { id } = req.params;
  const product = req.body;
  cartFirebase.addProductToCart(id, product);
  const cart = new CartMongoDbController();
  const productAdded = await cart.addProductToCart(id, product);
  if (productAdded) {
   return res.status(200).json({
    status: "success",
    message: "Producto agregado al carrito!.",
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "Error al cargar el producto en el carrito.",
   });
  }
 } catch (err) {
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
 try {
  const { id, id_prod } = req.params;
  cartFirebase.deleteProductFromCart(id, id_prod);
  const cart = new CartMongoDbController();
  const productDeleted = await cart.deleteProductFromCartById(id, id_prod);
  if (productDeleted) {
   return res.status(200).json({
    status: "success",
    message: "Producto eliminado del carrito!.",
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "Error al eliminar el producto del carrito.",
   });
  }
 } catch (err) {
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

module.exports = router;
