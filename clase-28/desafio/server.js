import express from "express";
import { engine } from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import util from "util";
import knex from "knex";
import knexSqlite from "knex";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { fork } from 'child_process'
import Contenedor from "./containers/products/Contenedor.js";
import ContenedorMensajes from "./containers/messages/ContenedorMensajes.js";
import ContenedorProductos from "./containers/products/ContenedorProductos.js";
import ContenedorMensajesNormalized from "./containers/messages/ContenedorMensajesNormalized.js";
import SessionsController from "./controllers/SessionsController.js";
import { mongoUrl, options, optionsSqlite } from "./config/db.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePasswords } from "./utils/encryptPassword.js";
import { puerto } from "./config/argsParser.js";

const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer);
const PORT = puerto || 8080;
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

//Passport

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "userEmail",
      passwordField: "userPassword",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { userName } = req.body;
      const userCreation = await mongoSession.createUser({
        userName,
        username,
        password,
      });
      if (userCreation === null) {
        done("Error al registrarse", false);
      }
      req.session.user = userCreation;
      done(null, userCreation);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "userEmail",
      passwordField: "userPassword",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await mongoSession.getUserByEmail(username);
      if (user === null) {
        return done("No se encontró el usuario", false);
      }
      const passwordComparedResult = await comparePasswords(
        password,
        user.userPassword
      );
      if (!passwordComparedResult) {
        return done("Contraseña incorrecta", false);
      }
      req.session.user = user;
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.userEmail);
});

passport.deserializeUser(async (userEmail, done) => {
  const user = await mongoSession.getUserByEmail(userEmail);
  done(null, user);
});

// ------------ Rutas de login  ------------ //

app.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    req.session.user = req.session.passport.user;
    const user = req.session.user;
    sql.listProducts().then((prod) => {
      let products = [];
      products = prod.map((item) => ({
        productName: item?.productName,
        productPrice: item?.productPrice,
        productImage: item?.productImage,
      }));
      res.render("form", { products, user });
    });
  } else {
    res.render("login");
  }
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

// ------------ Ruta de info  ------------ //

app.get("/api/info", async (req, res) => {
  const memory = util.inspect(process.memoryUsage().rss);
  res.render("info", {
    arguments: process.argv.slice(2),
    platformName: process.platform,
    nodeVersion: process.version,
    totalMemory: memory,
    execPath: process.execPath,
    pid: process.pid,
    projectFile: process.cwd(),
  });
});

// ------------ Ruta de calcular numeros random  ------------ //

app.get("/api/randoms", (req, res) => {
  const cant = req.query;
  const result = fork(path.resolve(process.cwd(), './utils/calculateRandomNumbers.js'));
  result.on('message', numbers => {
    if (numbers == 'listo') {
      result.send('start')
    } else {
        res.json(numbers)
    }
})
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
