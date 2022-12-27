const express = require("express");
const ProductContainer = require("../containers/memory/productContainer");
const router = express.Router();
const fileName = "products.txt";
const isAdmin = true;

const verifyRole = (req, res, next) => {
 if (isAdmin) {
  next();
 } else {
  return res.status(401).json({
   status: "error",
   message: "No tienes permisos de administrador para poder acceder.",
  });
 }
};

router.get("/:id?", async (req, res) => {
 try {
  const { id } = req?.params;
  const product = new ProductContainer(fileName);
  let productData = [];
  if (id) {
   productData = await product.getProductsById(id);
  } else {
   productData = await product.getProducts();
  }
  if (productData?.length || productData !== null) {
   return res.status(200).json({
    status: "success",
    products: productData,
   });
  } else {
   return res.status(200).json({
    status: "success",
    message: "No se encontraron productos",
   });
  }
 } catch (err) {
  return res.status(400).json({
   status: "error",
   error: err,
  });
 }
});

router.post("/", verifyRole, async (req, res) => {
 try {
  const productData = req.body;
  const product = new ProductContainer(fileName);
  const productCreatedId = await product.createProduct(productData);
  if (productCreatedId) {
   return res.status(200).json({
    status: "success",
    message: `Producto creado!. id asignado ${productCreatedId.id}`,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "Error al crear el producto.",
   });
  }
 } catch (_) {
  return res.status(400).json({
   status: "error",
   error: "Error al crear el producto.",
  });
 }
});

router.put("/:id", verifyRole, async (req, res) => {
 try {
  const productData = req.body;
  const { id } = req.params;
  const product = new ProductContainer(fileName);
  const productUpdated = await product.updateProductById(id, productData);
  if (productUpdated) {
   return res.status(200).json({
    status: "success",
    message: `Producto actualizado!.`,
    product: productUpdated,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "Error al actualizar el producto.",
   });
  }
 } catch (_) {
  return res.status(400).json({
   status: "error",
   error: "Error al crear el producto.",
  });
 }
});

router.delete("/:id", verifyRole, async (req, res) => {
 try {
  const { id } = req.params;
  const product = new ProductContainer(fileName);
  const productDeleted = await product.deleteById(id);
  if (productDeleted) {
   return res.status(200).json({
    status: "success",
    message: `Producto eliminado!`,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "Error al crear el producto.",
   });
  }
 } catch (_) {
  return res.status(400).json({
   status: "error",
   error: "Error al crear el producto.",
  });
 }
});

module.exports = router;
