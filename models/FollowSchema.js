const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    require: true,
  },
});

const FollowModel = mongoose.model("follow", FollowSchema);

module.exports = FollowModel;
