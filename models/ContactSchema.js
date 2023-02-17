const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const ContactModel = mongoose.model("contact", ContactSchema);

module.exports = ContactModel


