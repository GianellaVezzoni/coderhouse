import * as dotenv from "dotenv";
dotenv.config();
import cluster from "cluster";
import express from "express";
import parseArgs from "minimist";
import { logger } from "./settings/logConfig.js";
export const args = parseArgs(process.argv.slice(2));
import { router } from "./modules/index.js";
import loggedInRouter from "./modules/users/routes/index.js";
import passport from "passport";
import session from "express-session";
import { mongoSession } from "./settings/db.js";

export const isUserAdmin = true;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.EXPRESS,
    resave: false,
    saveUninitialized: false,
    store: mongoSession,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);
app.use(loggedInRouter);

app.use((req, res) => {
  res.json({
    error: -1,
    description: "Ruta no implementada" + req.originalUrl,
  });
});

const SERVERMODE = args.serverMode || "FORK";
const PORT = args.port || process.env.PORT || 8080;

if (SERVERMODE === "CLUSTER" && cluster.isPrimary) {
  logger.info(`Proceso corriendo: ${process.pid}`);

  for (let index = 0; index < 7; index++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      logger.info(`Proceso worker finalizado: ${worker.process.pid}`);
    });
  }
} else {
  app.listen(PORT, () => logger.info(`Servidor corriendo en puerto ${PORT}`));
}
