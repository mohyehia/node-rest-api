const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
   res.status(200).json({
    message: 'handling get request for products!'
   });
});

router.post('/', (req, res, next) =>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'handling post request for products!',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'good job!',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'u selected an id!'
        });
    } 
});

router.put('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Updated successfully!'
    });
});

router.delete('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Deleted successfully!'
    });
});

module.exports = router;