const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

router.post("/", async (req, res) => {
  let body = req.body;
  let path = "../backend/csv/feedback.csv";

  try {
    const csvWriter = createCsvWriter({
      path: path,
      header: [
        { id: "thoughts", title: "Thoughts" },
        { id: "review", title: "Review" },
        { id: "likeCount", title: "Like Count" },
        { id: "reviewCount", title: "Review Count" },
      ],
    });

    csvWriter.writeRecords(body).then(() => {
      console.log("...Done");
      res.send({ status: 0000, message: "success" }).status(200);
    });
  } catch (error) {
    res.send({ status: 9999, message: "Something went wrong1" }).status(200);
  }
});

module.exports = router;
