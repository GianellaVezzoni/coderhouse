import express from "express";
import { engine } from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import knex from "knex";
import knexSqlite from "knex";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import Contenedor from "./Contenedor.js";
import ContenedorMensajes from "./ContenedorMensajes.js";
import ContenedorProductos from "./ContenedorProductos.js";
import ContenedorMensajesNormalized from "./ContenedorMensajesNormalized.js";
import SessionsController from "./SessionsController.js";
import { mongoUrl, options, optionsSqlite } from "./config/db.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePasswords } from "./utils/encryptPassword.js";

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
const mongoSession = new SessionsController();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.engine("handlebars", engine());
app.set("views", "./public");
app.set("view engine", "handlebars");
app.use(cookieParser("GianellaCookieTest"));
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      mongoOptions: mongoOptions,
      ttl: 600,
    }),
    secret: "GianeTestSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

sql.createTable().then(() => console.log("Tabla creada"));
sqlite.createMessagesTable().then(() => console.log("Tabla mensajes creada"));

// ------------ Rutas de login  ------------ //

app.get("/", async (req, res) => {
  req.session.user = req.query.userName;
  console.log("req.query.userName ", req.query.userName);
  if (req.isAuthenticated()) {
    sql.listProducts().then((prod) => {
      let products = [];
      products = prod.map((item) => ({
        productName: item?.productName,
        productPrice: item?.productPrice,
        productImage: item?.productImage,
      }));
      res.render("form", { products, user: req.session.user });
    });
  } else {
    res.render("login");
  }
});

passport.use(
  "login",
  new LocalStrategy(async (userEmail, userPassword, done) => {
    const user = await mongoSession.getUserByEmail(userEmail);
    if (user === null) {
      return done("No se encontró el usuario", false);
    }
    if (!comparePasswords(userPassword, user.userPassword)) {
      return done("Contraseña incorrecta", false);
    }
    return done(null, user);
  })
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    const user = mongoSession
      .getUserByEmail(userEmail)
      .then((res) => {
        if (res === null) {
          return done("No se encontró el usuario", false);
        }
        if (!comparePasswords(password, res.userPassword)) {
          return done("Contraseña incorrecta", false);
        }
        return done(null, user);
      })
      .catch((err) => console.log("err ", err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.userEmail);
});

passport.deserializeUser(async (userEmail, done) => {
  const user = await mongoSession.getUserByEmail(userEmail);
  done(null, user);
});

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/loginError",
    successRedirect: "/",
  })
);

app.get("/loginError", (req, res) => {
  res.render("loginError");
});

// ------------ Rutas de registro  ------------ //

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, done) => {
      const userCreation = await mongoSession.createUser(req.body);
      if (userCreation === null) {
        done("Error al registrarse", false);
      }
      done(null, userCreation);
    }
  )
);

app.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/registerError",
    successRedirect: "/",
  })
);

app.get("/register", async (_, res) => {
  res.render("register");
});

app.get("/registerError", (_, res) => {
  res.render("registerError");
});

// ------------ Rutas de productos  ------------ //

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
    res.render("table", { products });
  } catch (err) {
    res.render("modal", {
      title: "Error al cargar los productos",
      message: "",
    });
  }
});

// ------------ Ruta de logout  ------------ //

app.get("/logout", async (req, res) => {
  const user = req.session.user;
  await mongoSession.deleteSession(user);
  res.render("logout", { user });
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
