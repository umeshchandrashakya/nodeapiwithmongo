require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser     = require('body-parser');


const mongoose = require("mongoose");
mongoose.connect(process.env.DATA_BASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads',express.static('uploads'));

mongoose.Promise = global.Promise;

const subscribers1 = require("./routes/subscribers");
const students = require("./routes/students");
const userRoute = require("./routes/user");
const productRouter = require("./routes/product")

app.use("/subscribers", subscribers1);
app.use("/students", students);
app.use("/user", userRoute);
app.use("/products",productRouter);

app.listen(3000, () => console.log("server started"));
 