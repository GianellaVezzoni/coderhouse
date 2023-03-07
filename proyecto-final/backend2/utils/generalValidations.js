import { isUserAdmin } from "../server.js";

export function isAdmin(req, res, next) {
  isUserAdmin
    ? next()
    : res.status(401).json({
        error: -4,
        descripcion: "Usuario no autorizado",
        route: req.originalUrl,
      });
}
