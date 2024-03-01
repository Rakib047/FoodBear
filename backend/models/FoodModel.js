const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema({
  restaurant_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  CategoryName: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  is_instock: {
    type: Boolean,
    default: true,
  },

  //for homekitchen only
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  minOrder: {
    type: Number,
  },
});

module.exports = mongoose.model("foods", FoodSchema);
