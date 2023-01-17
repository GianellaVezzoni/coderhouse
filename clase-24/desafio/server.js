import express from "express";
import {engine} from "express-handlebars";
import {Server as HttpServer} from "http";
import {Server as IOServer} from "socket.io";
import knex from "knex";
import knexSqlite from "knex";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import Contenedor from "./Contenedor.js";
import ContenedorMensajes from "./ContenedorMensajes.js";
import ContenedorProductos from "./ContenedorProductos.js";
import ContenedorMensajesNormalized from "./ContenedorMensajesNormalized.js";
import { options, optionsSqlite } from "./config/db.js";

const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
const knexInstance = knex(options);
const knexSqliteInstance = knexSqlite(optionsSqlite);
const sql = new Contenedor(knexInstance);
const sqlite = new ContenedorMensajes(knexSqliteInstance);
const productsObj = new ContenedorProductos(5);
const messagesContainer = new ContenedorMensajesNormalized("messages.txt");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.engine("handlebars", engine());
app.set("views", "./public");
app.set("view engine", "handlebars");

app.use(cookieParser("GianellaCookieTest"));
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true};

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://gianeAdmin:Sl17nI8KqXOjV6a3@desafio24.bmolsth.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: mongoOptions,
    ttl: 600
  }),
  secret: "GianeTestSecret",
  resave: false,
  saveUninitialized: false,
}));

sql.createTable().then(() => console.log("Tabla creada"));
sqlite.createMessagesTable().then(() => console.log("Tabla mensajes creada"));

app.get("/", (req, res) => {
  req.session.user = req.query.userName;
  if(req.session.user){
    sql.listProducts().then((prod) => {
      let products = []
      products = prod.map((item) => ({
        productName: item?.productName,
        productPrice: item?.productPrice,
        productImage: item?.productImage,
      }));
      res.render("form", { products, user: req.session.user });
    });
  }else{
    res.render('login');
  }
});

app.post("/productos", (req, res) => {
  try {
    const { body } = req;
    sql.insertProduct(body);
  } catch (err) {
    res.render("modal", { title: "Error al cargar el producto", message: "" });
  }
});

app.get("/productos-test", (req, res) => {
  try {
      const products = productsObj.generateProducts();
     res.render("table", {products});
  } catch (err) {
    res.render("modal", { title: "Error al cargar los productos", message: "" });
  }
});

app.get("/logout", (req, res) => {
  const user = req.session.user;
  res.render('logout', {user});
  req.session.destroy();
});

io.on("connection", (socket) => {
  const products = productsObj.generateProducts();
  socket.emit("products", products);
  socket.on("new-product", (data) => {
    sql.insertProduct(data).then((prod) => {
      io.sockets.emit("products", prod);
    });
  });
  const messageList = messagesContainer.getAllMessages();
  socket.emit("messages", messageList);
  socket.on("new-message", (data) => {
    const message = messagesContainer.save(data);
    io.sockets.emit("messages", message);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando el puerto ${PORT}`);
});
