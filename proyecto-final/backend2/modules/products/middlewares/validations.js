export function validateProductId(req, res, next) {
  req.params.id != undefined && req.params.id.length != 24
    ? res.status(404).json({ status: "error", description: "ID inválido" })
    : next();
}
