const mongoose = require("mongoose");

let address = new mongoose.Schema({
    "address":String,
    "Country":String,
    "City":String,
    "Picode":String
})


const students = new mongoose.Schema({
  FirstName:String,
  LastName: String,
  SNO: String,
  Age: String,
  address:[address]
 
});
module.exports = mongoose.model("students", students);