const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const productController = require('../controller/products.controller');

router.get('/', productController.retrieveAllProducts);

router.post('/', checkAuth, productController.createNewProduct);

router.get('/:productId', productController.retrieveOneProduct);

router.put('/:productId', checkAuth, productController.updateProduct);

router.delete('/:productId', checkAuth, productController.removeProduct);

module.exports = router;