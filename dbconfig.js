require("dotenv").config();
const mongoose = require("mongoose");

exports.getConnection = function(){
    mongoose.connect(process.env.DATA_BASE_URL, { useNewUrlParser: true });
     const db = mongoose.connection;
     db.on("error", error => console.error(error));
     db.once("open", () => console.log("connected to database"));
     return db;
    };
