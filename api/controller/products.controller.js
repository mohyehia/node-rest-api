const mongoose = require('mongoose');
const Product = require('../entity/product');

exports.retrieveAllProducts = (req, res, next) =>{
    Product.find()
    .select('_id name price')
    .then(products =>{
        res.status(200).json({
            count: products.length,
            products: products.map(prod =>{
                return {
                    id: prod._id,
                    name: prod.name,
                    price: prod.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/products/' + prod._id
                    }
                }
            })
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    });
}

exports.createNewProduct = (req, res, next) =>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(prod =>{
        console.log(prod);
        res.status(201).json({
            message: 'Product created successfully!',
            createdProduct: {
                id: prod._id,
                name: prod.name,
                price: prod.price,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/products/' + prod._id
                }
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    });
}

exports.retrieveOneProduct = (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .select('id name price')
    .then(prod =>{
        console.log(prod);
        if(prod){
            res.status(200).json({
                product: prod,
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:5000/products'
                }
            });
        }else{
            res.status(404).json({message: 'Not Found!'});
        }
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({error: err});
    })
}

exports.updateProduct = (req, res, next) =>{
    const id = req.params.productId;
    Product.update({_id: id}, {$set: {name: req.body.name, price: req.body.price}})
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Product updated successfully!',
            request: {
                type: 'GET',
                url: 'http://localhost:5000/products/' + id
            }
        });
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({erorr: err});
    });
}

exports.removeProduct = (req, res, next) =>{
    const id = req.params.productId;
    Product.remove({_id: id})
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Product deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:5000/products',
                description: 'Create new product',
                body: {
                    name: 'String', price: 'Number'
                }
            }
        });
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({error: err});
    });
}