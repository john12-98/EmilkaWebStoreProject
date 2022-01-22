const router = require("express").Router();
const AllProductsModel = require("../models/allproducts");
// router.get("/getallproducts", (req, res) => {
//   console.log("requested");
// });

router.get("", (req, res) => {
  AllProductsModel.find({}, (err, result) => {
    if (err) {
      console.log("error occured");
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

router.post("/item", async (req, res) => {
  try {
    // console.log("inside.........");
    const item = await AllProductsModel.findById(req.body.id);
    //console.log(item);
    res.send(item);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/post", async (req, res) => {
  //for posting new products, for admin purposes
  const p = req.body;
  const newproduct = new AllProductsModel(p);
  await newproduct.save();

  res.send("posteeeeeddddddd");
  console.log("pooooost");
});
module.exports = router;
