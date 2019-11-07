const mongoose = require("mongoose");

const product = mongoose.model("Product", {
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  averageRating: { type: Number, min: 0, max: 5 },

  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    default: 0,
    min: [0, "Should not be negative"]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = product;
