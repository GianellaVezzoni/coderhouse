const express = require("express");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

const optionsConnection = require("./config/db.js");
const sqliteOptions = require("./config/db.sqlite");
const knex = require("knex")(optionsConnection);
const knexSqlite = require("knex")(sqliteOptions);
const Contenedor = require("./Contenedor");
const ContenedorMensajes = require("./ContenedorMensajes");
const sql = new Contenedor(knex);
const sqlite = new ContenedorMensajes(knexSqlite);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.engine("handlebars", handlebars.engine());
app.set("views", "./public");
app.set("view engine", "handlebars");

sql.createTable().then(() => console.log("Tabla creada"));
sqlite.createMessagesTable().then(() => console.log("Tabla mensajes creada"));

let messages = [];

io.on("connection", (socket) => {
  sql.listProducts().then((prod) => {
    socket.emit("products", prod);
  });
  socket.on("new-product", (data) => {
    sql.insertProduct(data).then((prod) => {
      io.sockets.emit("products", prod);
    });
  });
  sqlite.getMessages().then(messagesList => {
    messages = messagesList;
    socket.emit("messages", messagesList);
  });
  socket.on("new-message", (data) => {
    sqlite.createMessage(data).then((mess) => {
      io.sockets.emit("messages", mess);
    });
  });
});

app.get("/", (_, res) => {
  sql.listProducts().then((prod) => {
    let products = []
    products = prod.map((item) => ({
      productName: item?.productName,
      productPrice: item?.productPrice,
      productImage: item?.productImage,
    }));
    res.render("form", { products });
  });
});

app.post("/productos", (req, res) => {
  try {
    const { body } = req;
    sql.insertProduct(body);
  } catch (err) {
    res.render("modal", { title: "Error al cargar el producto", message: "" });
  }
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando el puerto ${PORT}`);
});
