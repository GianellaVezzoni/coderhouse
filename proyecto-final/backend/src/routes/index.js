const express = require('express');
const { Router } = express;
const router = new Router();
const products = require('../modules/products/routes/products');
const cart = require('../modules/cart/routes/cart');
const user = require("../modules/user/routes/user");

router.use('/auth', user)
router.use('/productos', products);
router.use('/carrito', cart);

module.exports = router;