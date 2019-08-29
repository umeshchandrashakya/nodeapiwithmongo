const express = require('express');
const router = express.Router();
const post=require('../models/post');
const comment = require('../models/comment')


//Add post
router.post('/',async(req,res,next)=>{
const post1 = new post();
post1.title = req.body.title;
post1.content = req.body.content
try {
    await post1.save();
    res.send(post1);
} catch (error) {
   res.send(error); 
}

//res.send(post)
})

//add commments
router.post("/:postId/comment",async(req,res,next)=>{
    try {
        console.log(req.params.postId);
        const post1 = await post.findById(req.params.postId);
       
          const newComment = new comment();  
          newComment.content = req.body.content;
          newComment.post = post1._id;
          console.log("postId"+post1._id)
          await newComment.save();
          post1.comments.push(newComment._id);
          await post1.save();
          res.send(post1);
    } catch (error) {
        console.log(error)
        res.send(error)
    }
  });

router.get("/:postId/comment",async(req,res,next)=>{
    try {
        const newPost = await post.findOne({_id:req.params.postId}).populate("comments");
        res.send(newPost);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router