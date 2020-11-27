const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const orderController = require('../controller/orders.controller');

router.get('/', checkAuth, orderController.retrieveAllOrders);

router.post('/', checkAuth, orderController.createOrder);

router.get('/:orderId', checkAuth, orderController.retrieveOneOrder);

router.delete('/:orderId', checkAuth, orderController.removeOrder);

module.exports = router;