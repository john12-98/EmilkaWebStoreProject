const router = require("express").Router();
const AllProductsModel = require("../models/allproducts");
// router.get("/getallproducts", (req, res) => {
//   console.log("requested");
// });

router.get("", async (req, res) => {
  try {
    const products = await AllProductsModel.find({}).sort({
      price: 1,
      garmentName: "desc",
    });
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/item", async (req, res) => {
  //for returning a single item using ID
  try {
    console.log("inside.........", req.query.id);
    const item = await AllProductsModel.findById(req.query.id);
    console.log("vvvvbbbbb", item);
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
