require("dotenv").config();
const express = require("express");
const dbconfig = require('./dbconfig')
const app = express();



const mongoose = require("mongoose");

//connect to mongo db
dbconfig.getConnection();


app.use(express.urlencoded());

app.use(express.json());
app.use('/uploads',express.static('uploads'));

mongoose.Promise = global.Promise;



const subscribers1 = require("./routes/subscribers");
const students = require("./routes/students");
const userRoute = require("./routes/user");
const productRouter = require("./routes/product");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");


app.use("/subscribers", subscribers1);
app.use("/students", students);
app.use("/user", userRoute);
app.use("/products",productRouter);
app.use("/post",postRouter);
//app.use("/comment",commentRouter);


app.listen(3000, () => console.log("server started"));
 