const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../entity/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', (req, res, next) =>{
    const email = req.body.email;
    User.find({email: req.body.email})
    .then(user =>{
        if(user.length > 0){
            return res.status(409).json({error: 'User already exists!'});
        }else{
            bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(user => {
                        console.log(user);
                        res.status(201).json({
                            message: 'User created successfully!',
                            createdUser: {
                                id: user._id,
                                email: user.email
                            }
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({error: err});
                    });
                }
            });
        }
    }).catch();
});

router.delete('/:userId', (req, res, next) =>{
    User.deleteOne({_id: req.params.userId})
    .then(result =>{
        res.status(200).json({
            message: 'User deleted!',
            request: {
                type: 'POST',
                url: 'http://localhost:5000/users/signup',
                description: 'Create new user',
                body: {
                    email: 'String', password: 'String'
                }
            }
        });
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;