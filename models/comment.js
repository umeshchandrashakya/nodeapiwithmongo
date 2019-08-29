const mongoose = require('mongoose')

const comments_schema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    post:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"post",
     required:"Post is required Field"   
    }
});
module.exports = mongoose.model("comment",comments_schema)