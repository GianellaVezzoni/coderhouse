const express = require("express");
const app = express();
let products = require("../utils/products");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (_, res) => {
 res.render("form");
});

app.get("/productos", (req, res) => {
 res.render("products", {products});
});

app.post("/productos", (req, res) => {
 try {
  const lastIdArray = products[products.length - 1].id + 1;
  const { body } = req;
  products.push({
   ...body,
   id: lastIdArray,
  });
  res.render("modal", {
   title: "Producto cargado con éxito",
   message: `ID asignado ${lastIdArray}`,
  });
 } catch (err) {
    res.render("modal", { title: "Error al cargar el producto", message: "" });
 }
});

app.listen(8080);
