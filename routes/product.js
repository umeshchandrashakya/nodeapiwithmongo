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

//add product api
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
        return res.send({data:productAdded});
        } catch (error) {
          console.log(error);
        }
    });


router.post('/updateproduct',auth,async(req,res,next)=>{
  try {
   
    const updatedProduct = await Products.updateOne(
      {_id:(req.body._id)},
      {$set:{productName:"ProductOne"}}
    );
    return res.send({message:'Product updated',data:updatedProduct})
  } catch (error) {
    console.log(error)
  }
})

//find all product
router.get('/allproduct',async(req,res,next)=>{
  try {
  const allProduct = await Products.find({});
  res.json({data:allProduct});
} catch (error) {
  console.log(error)
}
})

router.get('/',async(req,res,next)=>{
try {

   let productId = (req.param('id'))
    const productById = await Products.findById(productId);
    res.send({data:productById});
} catch (error) {
  console.log(error);
}

});

module.exports = router;