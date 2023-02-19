const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Fs = require("fs");
const CsvReadableStream = require("csv-reader");
const NewsletterModel = require("../models/NewsletterSchema");
const { validateEmail } = require("../service/commonService");

const path = "./csv/newsletter.csv";

router.post("/createFile", async (req, res) => {
  const csvWriter = createCsvWriter({
    path: path,
    header: [{ id: "email", title: "Email" }],
  });

  csvWriter
    .writeRecords([]) // returns a promise
    .then(() => {
      res.send({ status: 0000, message: "success" }).status(200);
    });
});

router.post("/", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/newsletter.csv";

  try {
    const request = new NewsletterModel(req.body[0]);

    if (!validateEmail(request.email)) {
      res
        .send({ status: 9999, message: "Please Enter Valid Email" })
        .status(200);
    } else {
      await request.save();
      res.send({ status: 0000, message: "success" }).status(200);
    }

    // read old data
    // let inputStream = Fs.createReadStream(path, "utf8");

    // let i = 0;
    // let oldData = [];
    // inputStream
    //   .pipe(
    //     new CsvReadableStream({
    //       parseNumbers: true,
    //       parseBooleans: true,
    //       trim: true,
    //     })
    //   )
    //   .on("data", function (row) {
    //     if (i != 0) {
    //       let obj = {
    //         email: row[0],
    //       };
    //       oldData.push(obj);
    //     }
    //     i++;
    //   })
    //   .on("end", function () {
    //         const csvWriter = createCsvWriter({
    //           path: path,
    //           header: [{ id: "email", title: "Email" }],
    //         });
    //     oldData.push(body[0]);
    //         csvWriter
    //           .writeRecords(oldData) // returns a promise
    //           .then(() => {
    //             res.send({ status: 0000, message: "success" }).status(200);
    //           });

    //   });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
