import express from "express";
import knex from "knex";
import { options } from "../config/db.js";
import Contenedor from "../containers/products/Contenedor.js";
import ContenedorProductos from "../containers/products/ContenedorProductos.js";

const productRouter = express.Router();
const productsObj = new ContenedorProductos(5);
const knexInstance = knex(options);
const sql = new Contenedor(knexInstance);

productRouter.post("/", (req, res) => {
  try {
    const { body } = req;
    sql.insertProduct(body);
  } catch (err) {
    res.render("modal", {
      title: "Error al cargar el producto",
      message: "",
    });
  }
});

productRouter.delete("/", (req, res) => {
  try {
    const { id } = req.params;
    sql.deleteProduct(id);
  } catch (err) {
    res.render("modal", {
      title: "Error al eliminar el producto",
      message: "",
    });
  }
});

productRouter.put("/", (req, res) => {
  try {
    const { id } = req.params;
    sql.updateProduct(id);
  } catch (err) {
    res.render("modal", {
      title: "Error al actualizar el producto",
      message: "",
    });
  }
});

productRouter.get("/productos-test", (req, res) => {
  try {
    const products = productsObj.generateProducts();
    res.render("table", { products });
  } catch (err) {
    res.render("modal", {
      title: "Error al cargar los productos",
      message: "",
    });
  }
});

export default productRouter;
