const experess = require("express");
const router = experess.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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

module.exports = router;
