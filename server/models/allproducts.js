const mongoose = require("mongoose");

const AllGarment = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  garmentName: {
    type: String,
    required: true,
    unique: true,
    //trim: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
});

const AllGarmentModel = mongoose.model("ProductsTest", AllGarment);
module.exports = AllGarmentModel;
