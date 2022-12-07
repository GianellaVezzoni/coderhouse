const express = require('express');
const { Router } = express;
const router = new Router();
const products = require('../routes/products');
const cart = require('../routes/cart');

router.use('/productos', products);
router.use('/carrito', cart);

module.exports = router;