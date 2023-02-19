const express = require("express");
const router = express.Router();
const ContactModel = require("../models/ContactSchema");
const { validateEmail } = require("../service/commonService");

router.post("/add", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/newsletter.csv";

  try {
    const request = new ContactModel(body);
    if (!validateEmail(request.email)) {
      res
        .send({ status: 9999, message: "Please Enter Valid Email" })
        .status(200);
    } else {
      await request.save();
      res.send({ status: 0000, message: "success" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
