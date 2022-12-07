const express = require("express");
const CartContainer = require("../persistence/cartContainer");
const router = express.Router();
const fileName = "cart.txt";
const productsFileName = "products.txt"

router.post("/", async (req, res) => {
 try {
  const cart = new CartContainer(fileName);
  const cartCreated = await cart.createCart();
  if (cartCreated >= 0) {
   return res.status(200).json({
    status: "success",
    message: `Carrito creado!. ID ${cartCreated}`,
    id: cartCreated
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "No se pudo crear el carrito.",
   });
  }
 } catch (err) {
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

router.delete("/:id", async(req, res) => {
 try {
  const { id } = req.params;
  const cart = new CartContainer(fileName);
  const cartDeleted = await cart.deleteCart(id);
  if (cartDeleted >= 0 && cartDeleted !== null) {
   return res.status(200).json({
    status: "success",
    message: `Carrito eliminado!. ID ${cartDeleted}`,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "No se pudo eliminar el carrito.",
   });
  }
 } catch (err) {
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

router.get("/:id/productos", async(req, res) => {
 try {
  const { id } = req.params;
  const cart = new CartContainer(fileName);
  const products = await cart.showProducts(id);
  if (products.length > 0 && products !== null) {
   return res.status(200).json({
    status: "success",
    products: products,
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

router.post("/:id/productos", async(req, res) => {
 try {
  const { id } = req.params;
  const cart = new CartContainer(fileName);
  const productAdded = await cart.saveProducts(id, productsFileName);
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

router.delete("/:id/productos/:id_prod", async(req, res) => {
 try {
  const { id, id_prod } = req.params;
  const cart = new CartContainer(fileName);
  const productDeleted = await cart.deleteProduct(id, id_prod);
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
