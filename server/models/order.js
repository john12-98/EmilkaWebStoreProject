const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },

    productId: { type: String },

    address: { type: Object }, //required : true
    quantity: { type: Number, default: 1 },
    size: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("ordertest13", OrderSchema);
module.exports = OrderModel;
