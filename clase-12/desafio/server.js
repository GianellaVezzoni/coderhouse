const express = require("express");
const handlebars = require("express-handlebars");
const fs = require("fs");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

let products = require("./utils/products");
let messages = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./public");
app.set("view engine", "handlebars");

const fileName = "./utils/messages.txt";

async function checkFileMessages() {
 try {
  if (fs.existsSync(fileName)) {
   const file = await fs.promises.readFile(fileName, "utf-8");
   const fileParsed = JSON.parse(file);
   messages = fileParsed;
  } else {
   fs.promises.writeFile(fileName, JSON.stringify([]), "utf-8");
  }
 } catch (err) {}
}

io.on("connection", (socket) => {
   checkFileMessages();
 socket.emit("products", products);
 socket.on("new-product", (data) => {
  products.push(data);
  io.sockets.emit("products", products);
 });
 socket.emit("messages", messages);
 socket.on("new-message", (data) => {
  messages.push(data);
  fs.promises.writeFile(fileName, JSON.stringify(messages), "utf-8");
  io.sockets.emit("messages", messages);
 });
});

app.get("/", (_, res) => {
 res.render("form", { products });
});

app.post("/productos", (req, res) => {
 try {
  const lastIdArray = products[products.length - 1].id + 1;
  const { body } = req;
  products.push({
   ...body,
   id: lastIdArray,
  });
 } catch (err) {
  res.render("modal", { title: "Error al cargar el producto", message: "" });
 }
});

httpServer.listen(PORT, () => {
 console.log(`Servidor escuchando el puerto ${PORT}`);
});
