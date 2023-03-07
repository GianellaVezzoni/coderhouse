import { Router } from "express";
export const router = Router();
import cart from "./cart/routes/cart.js";
import product from "./products/routes/index.js";
import users from "./users/routes/index.js";

router.use("/cart", cart);
router.use("/product", product);
router.use("/users", users)

export default router;
