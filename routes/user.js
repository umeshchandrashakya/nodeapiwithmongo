const experess = require("express");
const router = experess.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

//User Signup

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(422).json({ error: "email already exist" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            console.log(user);
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "user created"
                });
              })
              .catch(err => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
});

//User Login
router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        res.status(401).json({ message: "Auth falid" });
      } 
      bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
          return res.status(401).json({
            message:'Auth Faild'
          });
        }
        if(result){
          const token= jwt.sign({
             email:user[0].email,
             userId:user[0]._id
           },
           process.env.JWT_KEY,
           {
             expiresIn:"1h"
           }
            );
        return res.status(200).json({
          message:"Auth successful",
          user:user[0],
          token:token
        });
        }
        res.status(500).json({message:'Auth falid'});
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
