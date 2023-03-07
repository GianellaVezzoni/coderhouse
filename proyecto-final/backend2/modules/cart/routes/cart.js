import express from "express";
import { MongoContainer } from "../../../utils/mongoContainer.js";
import { cartsModel } from "../model/index.js"
import {
  checkCartExistance,
  checkProductExistance,
} from "../middlewares/cartValidations.js";
import {
  deleteCart,
  createCart,
  getProductsSelected,
  saveProductInCart,
  deleteProductSelected
} from "../controller/handler.js";

const { Router } = express;
const cart = Router();

export const cartMongo = new MongoContainer(cartsModel);

cart.delete("/:id?", checkCartExistance, deleteCart);

cart.post("/", createCart);

cart.get("/:id/productos", checkProductExistance, getProductsSelected);

cart.post("/:id/productos/:id_prod", checkCartExistance, saveProductInCart);

cart.delete(
  "/:id/productos/:id_prod",
  checkCartExistance,
  deleteProductSelected
);

export default cart;
