const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
});

const NewsletterModel = mongoose.model("newsletter", NewsletterSchema);

module.exports = NewsletterModel;
