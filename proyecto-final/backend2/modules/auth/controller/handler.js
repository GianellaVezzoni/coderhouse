import { cartRoutes } from "../../cart/routes/cart.js";
import { userRoutes } from "../../products/routes/index.js";
import { sendEmailOrder } from "../../../utils/sendEmailUtils";
import { sendOrder } from "../../helpers/sendSmsUtils.js";

export async function getAllData(req, res) {
  const user = await userRoutes.getById(req.session.passport.user);
  const cart = await cartRoutes.getById(user[0].carritoId);
  res.json({
    user: user[0],
    cart: cart[0],
  });
}

export async function postPedido(req, res) {
  const user = await userRoutes.getById(req.session.passport.user);
  const cart = await cartRoutes.getById(user[0].carritoId);

  const buyedProducts = cart[0].productos
    .map((producto) => {
      return `${producto.nombre} - ${producto.precio}`;
    })
    .join("<br>");

  const html = `<h1>Nuevo pedido realizado</h1>
    ${buyedProducts}`;

  await sendEmailOrder(html, user[0].nombre, user[0].email);
  const waMessage = {
    body: "Su pedido se encuentra en proceso",
    from: "whatsapp:" + process.env.TWILIO_REG_PHONE_WHATSAPP,
    to: "whatsapp:+542615438484",
  };

  await sendOrder(waMessage);
  const smsMessage = {
    body: "Su pedido se encuentra en proceso",
    from: process.env.TWILIO_REG_PHONE_SMS,
    to: "+542615438484",
  };

  await sendOrder(smsMessage);
  res.json({
    status: "Orden enviada con éxito!",
  });
}
