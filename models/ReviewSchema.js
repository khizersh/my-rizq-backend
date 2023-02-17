const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    thoughts: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    require: true,
  },
  likeCount: {
    type: Number,
    require: true,
  },
  reviewCount: {
    type: Number,
    require: true,
  },
});

const ReviewModel = mongoose.model("review", ReviewSchema);

module.exports = ReviewModel


