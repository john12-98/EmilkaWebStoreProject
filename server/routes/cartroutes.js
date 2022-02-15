const router = require("express").Router();
const AllProductsModel = require("../models/allproducts");
const CartModel = require("../models/cart");

router.post("/addtocart", async (req, res) => {
  try {
    const id = req.body.ID;
    const owner = req.body.Owner;
    const size = req.body.Size;
    const quantity = req.body.Quantity;

    const a = await CartModel.updateOne(
      { cartOwner: owner },
      {
        $push: {
          productsList: {
            productId: id,
            quantity: quantity,
            size: size,
          },
        },
      },
      { upsert: true }
    );
    res.send(a);
    console.log(a);
  } catch (e) {
    console.log("error occured,,,...", e.message);
  }

  // console.log("addtocart");
  // res.send("added to cart");
});
router.post("/viewcart", async (req, res) => {
  try {
    const carttList = await CartModel.find(
      { cartOwner: req.body.Owner },
      { productsList: 1 }
    );

    let productsInCart = [];

    // console.log(carttList);
    carttList.forEach((val) => {
      val.productsList.forEach((item) => {
        productsInCart.push(item);
        console.log(
          "id is:   ",
          item.productId,
          "    quantity is  :",
          item.quantity,
          "   size is  :",
          item.size
        );
      });
    });
    console.log(productsInCart);
    res.send(productsInCart);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const del = await CartModel.deleteOne({ cartOwner: req.query.email });
    console.log(del);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
