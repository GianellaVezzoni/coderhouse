const express = require('express');
const { Router } = express;
const router = new Router();
const products = require('../routes/products');
// const cart = require('');

router.use('/productos', products);
// router.use('/cart', cart);

module.exports = router;