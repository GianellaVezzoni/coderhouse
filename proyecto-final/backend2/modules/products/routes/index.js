import express from "express";
import { MongoContainer } from "../../../utils/mongoContainer.js";
import { validateProductId } from "../middlewares/validations.js";
import {
  getProducts,
  deleteProductById,
  saveProducts,
  updateProduct,
} from "../controller/handler.js";
import {productsModel} from "../model/index.js";
import { isAdmin } from "../../../utils/generalValidations.js";

const { Router } = express;
const router = Router();

export const prodContainer = new MongoContainer(productsModel);

router.get("/:id?", validateProductId, getProducts);
router.post("/", isAdmin, saveProducts);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProductById);

export default router;
