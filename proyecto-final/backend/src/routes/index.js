const express = require('express');
const { Router } = express;
const router = new Router();
const products = require('../modules/products/routes/products');
const cart = require('../modules/cart/routes/cart');

router.use('/productos', products);
router.use('/carrito', cart);

module.exports = router;