const experess = require("express");
const router = experess.Router();
const subscriber = require("../models/subscriber");

//get All subscriber

router.get("/", async (req, res, next) => {
  try {
    const subscribes = await subscriber.find({
      "name": "ajeet kumar"
    });
    res.json(subscribes);
  } catch (error) {
    res.status(5000).json({ message: error.message });
  }
});

//get by id
router.get("/:id", (req, res, next) => {
  
});

router.post("/", async (req, res, next) => {
  const newsubscriber = new subscriber({
    name: req.body.name,
    subscribeToChannel: req.body.subscribeToChannel
    //subscribeDate: req.body.subscribeDate
  });
  try {
    const subscribe = await newsubscriber.save();
    res.status(201).json(subscribe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update
router.patch("/", (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

module.exports = router;
