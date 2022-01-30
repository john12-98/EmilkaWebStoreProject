const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    cartOwner: {
      type: String,
      required: true,
      unique: true,
    },
    productsList: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        size: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("carttest13", CartSchema);
module.exports = CartModel;
