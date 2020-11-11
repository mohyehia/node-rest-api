const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Orders were fetched!'
    });
});

router.post('/', (req, res, next) =>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Order was created!',
        createdOrder: order
    });
});

router.get('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message: 'order details!',
        orderId: req.params.orderId
    });
});

router.delete('/:orderI', (req, res, next) =>{
    res.status(200).json({
        message: 'order deleted!',
        orderId: req.params.orderId
    });
})

module.exports = router;