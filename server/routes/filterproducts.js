const router = require("express").Router();
const AllProductsModel = require("../models/allproducts");

router.get("/newest", async (req, res) => {
  try {
    const products = await AllProductsModel.find({});
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/incprice", async (req, res) => {
  try {
    const products = await AllProductsModel.find({}).sort({
      price: 1,
      garmentName: 1,
    });
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
  //   AllProductsModel.find({}, (err, result) => {
  //     if (err) {
  //       console.log("error occured");
  //     } else {
  //       res.send(result);
  //     }
  //   }).sort({ price: 1, garmentName: 1 });
});
router.get("/decprice", async (req, res) => {
  try {
    const products = await AllProductsModel.find({}).sort({
      price: -1,
      garmentName: 1,
    });
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
});
module.exports = router;
