const mongoose = require('mongoose')

const post_schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment",
        require:"comment is required"
    }]
});
module.exports = mongoose.model("post",post_schema)