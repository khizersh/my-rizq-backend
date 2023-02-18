const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  freeUser: {
    type: Boolean,
    require: true,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;

