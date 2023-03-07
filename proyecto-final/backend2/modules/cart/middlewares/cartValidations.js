export async function checkCartExistance(req, res, next) {
  const cart = await cartContainer.getById(req.params.id);
  cart?.length != 0
    ? next()
    : res
        .status(404)
        .json({ status: "error", description: "El carrito no existe" });
}

export async function checkProductExistance(req, res, next) {
  const product = await prodContainer.getById(req.params.id_prod);
  product?.length == 0
    ? res
        .status(404)
        .json({
          status: "error",
          description: "El producto seleccionado no existe",
        })
    : next();
}
