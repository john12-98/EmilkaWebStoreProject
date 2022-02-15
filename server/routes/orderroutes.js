const router = require("express").Router();
const OrderModel = require("../models/order");

router.post("/addorder", async (req, res) => {
  try {
    const result = await OrderModel.create(req.body);
    res.send(result);
  } catch (e) {
    console.log("error occured,,,...", e.message);
  }
});

module.exports = router;
