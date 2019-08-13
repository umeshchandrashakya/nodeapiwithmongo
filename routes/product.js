const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Products = require("../models/products")
const auth = require("../middleware/check-auth")
const multer = require("multer");

const storage = multer.diskStorage({
destination:function(req,file,cb){
cb(null,'./uploads/');
},
filename:function(req,file,cb){
cb(null,new Date().toDateString()+file.originalname);
}
});



const upload = multer({storage: storage});

router.post('/addproduct', upload.single('prodcutImage'),auth, async(req,res,next)=>{
  console.log(req.file);
     const newProduct = new Products({
         productName:req.body.productName,
         prodcutImage:req.file.path,
         price:req.body.price
        });
        try {
         const productAdded = await newProduct.save();
         res.send({data:productAdded})
        } catch (error) {
          console.log(error)
        }
    });
module.exports = router;