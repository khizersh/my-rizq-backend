const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

router.post("/", async (req, res) => {
  let body = req.body;
  let path = "../backend/csv/newsletter.csv";

  try {
    const csvWriter = createCsvWriter({
      path: path,
      header: [{ id: "email", title: "Email" }],
    });

    csvWriter
      .writeRecords(body) // returns a promise
      .then(() => {
        res.send({ status: 0000, message: "success" }).status(200);
      });
  } catch (error) {
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
