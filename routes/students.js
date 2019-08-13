const experess = require("express");
const router = experess.Router();
const students = require("../models/students");
const checkAuth = require('../middleware/check-auth');

router.get("/", async (req, res, next) => {
    try {
      const students1 = await students.find()
      res.json(students1);
    } catch (error) {
      res.status(5000).json({ message: error.message });
    }
  });

  router.post("/",  async (req, res, next) => {
      console.log(req.body.address);
       const newStudents = new students({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Age:req.body.Age,
      SNO:req.body.SNO,
      address:[req.body.address]
    });
    try {
      const student = await newStudents.save();
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete("/deleteAllStudent",async(req,res,next)=>{
      try{
        const removeStudent = await students.remove();
        res.json(removeStudent)
      }catch(error){

      }
  });

  router.post("/getStudentByName",checkAuth,async(req,res,next)=>{
    try {
      const FirstName = req.body.FirstName;
      const studentByName = await students.find({"FirstName":FirstName},{"FirstName":1,"LastName":1, "address.City":1,"address.Country":1});
      res.json(studentByName);
    } catch (error) {
      
    }
  });

  router.post("/getStudentByName1",async(req,res,next)=>{
    try {
      const FirstName = req.body.FirstName;
      const studentByName = await students.find({"FirstName":FirstName},{"FirstName":1,"LastName":1, "address.City":1,"address.Country":1});
      res.json(studentByName);
    } catch (error) {
      
    }
  });

module.exports = router;