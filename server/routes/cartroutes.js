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

module.exports = router;
