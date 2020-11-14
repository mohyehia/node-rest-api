const express = require('express');
const router = express.Router();

const Order = require('../entity/order');
const Product = require('../entity/product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) =>{
    Order.find()
    .select('_id product quantity')
    .then(orders =>{
        res.status(200).json({
            count: orders.length,
            orders: orders.map(order =>{
                return {
                    id: order._id,
                    productId: order.product,
                    quantity: order.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/orders/' + order._id
                    }
                }
            })
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) =>{
    Product.findById(req.body.productId)
    .then(prod =>{
        if(!prod){
            return res.status(404).json({
                message: 'Product not found!'
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save()
    })
    .then(order =>{
        res.status(201).json({
            message: 'Order created successfully!',
            createdOrder: {
                id: order._id,
                productId: order.product,
                quantity: order.quantity,
            },
            request: {
                type: 'GET',
                url: 'http://localhost:5000/orders/' + order._id
            }
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:orderId', (req, res, next) =>{
    Order.findById(req.params.orderId)
    .select('_id product quantity')
    .then(order =>{
        if(order){
            res.status(200).json({
                order: {
                    id: order._id,
                    productId: order.product,
                    quantity: order.quantity,
                },
                request: {
                    type: 'GET',
                    description: 'Get all orders',
                    url: 'http://localhost:5000/orders'
                }
            });
        }else{
            res.status(404).json({message: 'Order Not Found!'});
        }
    })
    .catch(err =>{
        res.status(500).json({error: err});
    });
});

router.delete('/:orderId', (req, res, next) =>{
    Order.remove({_id: req.params.orderId})
    .then(result =>{
        res.status(200).json({
            message: 'Order deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:5000/orders',
                description: 'Create new order',
                body: {
                    productId: 'ID', quantity: 'Number'
                }
            }
        })
    })
    .catch(err =>{
        res.status(500).json({error: err});
    });
})

module.exports = router;