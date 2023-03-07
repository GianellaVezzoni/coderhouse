import { cartMongo } from "../routes/cart.js";
import {prodContainer} from "../../products/routes/index.js";

export async function deleteCart(req, res) {
  const id = await cartMongo.deleteById(req.params.id);
  res
    .status(200)
    .json({ status: "Carrito eliminado con éxito", deletedCart: id });
}

export async function deleteProductSelected(req, res) {
  const { id, id_prod } = req.params;
  const cart = await cartMongo.getById(id);
  let i = 0;
  while (i < cart[0].productos.length) {
    if (cart[0].productos[i]._id == id_prod) {
      cart[0].productos.splice(i, 1);
      break;
    }
    i++;
  }
  const cartId = await cartMongo.update(id, cart[0]);
  res.status(201).json({
    status: "Producto eliminado con éxito",
    updatedCart: cartId,
    productDeletedId: id_prod,
  });
}

export async function getProductsSelected(req, res) {
  const cart = await cartMongo.getById(req.params.id);
  res.status(200).json({
    status: "Productos obtenidos con éxito",
    products: cart[0].productos,
  });
}

export async function createCart(req, res) {
  const cart = { timestamp: Date.now(), productos: [] };
  const cartId = await cartMongo.save(cart);
  res
    .status(200)
    .json({ status: "Carrito creado con éxito", newCartId: cartId });
}

export async function saveProductInCart(req, res) {
  const cartId = req.params.id;
  const productId = req.params.id_prod;

  const cartData = (await cartMongo.getById(cartId))[0];
  const productData = (await prodContainer.getById(productId))[0];

  cartData.productos.push(productData);

  const cartUpdatedId = await cartMongo.update(cartId, cartData);
  res.status(201).json({
    status: "Producto añadido al carrito",
    updatedCart: cartUpdatedId,
    productAdded: productData,
  });
}
