require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATA_BASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));
app.use(express.json());

const subscribers1 = require("./routes/subscribers");
const students = require("./routes/students");
const userRoute = require("./routes/user");
app.use("/subscribers", subscribers1);
app.use("/students", students);
app.use("/user", userRoute);

app.listen(3000, () => console.log("server started"));
