const express = require("express");
const ProductMongoDbController = require("../containers/mongo/products/ProductMongoDbController");
const router = express.Router();
const isAdmin = true;
const ProductFirebaseController = require("../containers/firebase/products/ProductFirebaseController");
const productFirebase = new ProductFirebaseController();

const verifyRole = (_, res, next) => {
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
  const product = new ProductMongoDbController();
  let productData = [];
  let productDataFb = [];
  if (id) {
   productDataFb = await productFirebase.getProductsById(id);
   productData = await product.getProductsById(id);
  } else {
   productDataFb = await productFirebase.getAllProducts();
   productData = await product.getProducts();
  }
  if (productData?.length || productData !== null) {
   return res.status(200).json({
    status: "success",
    products: productData,
    productDataFb: productDataFb,
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
  const product = new ProductMongoDbController();
  const productCreatedId = await product.createProduct(productData);
  const productCreated = await productFirebase.createProduct(
   productData,
   productCreatedId._id
  );
  if (productCreatedId && productCreated) {
   return res.status(200).json({
    status: "success",
    message: `Producto creado! ID asignado ${productCreatedId._id}`,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "Error al crear el producto.",
   });
  }
 } catch (err) {
  console.log(err);
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
  const product = new ProductMongoDbController();
  const productUpdated = await product.updateProductById(id, productData);
  const fbProdUpdated = await productFirebase.updateProductById(
   id,
   productData
  );
  if (productUpdated && fbProdUpdated) {
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
 } catch (err) {
  return res.status(400).json({
   status: "error",
   error: "Error al actualizar el producto.",
  });
 }
});

router.delete("/:id", verifyRole, async (req, res) => {
 try {
  const { id } = req.params;
  const product = new ProductMongoDbController();
  const productDeleted = await product.deleteById(id);
  const productFbDeleted = await productFirebase.deleteProductById(id);
  if (productDeleted && productFbDeleted) {
   return res.status(200).json({
    status: "success",
    message: `Producto eliminado!`,
   });
  } else {
   return res.status(400).json({
    status: "error",
    message: "Error al eliminar el producto.",
   });
  }
 } catch (_) {
  return res.status(400).json({
   status: "error",
   error: "Error al eliminar el producto.",
  });
 }
});

module.exports = router;
