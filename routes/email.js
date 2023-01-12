const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Fs = require("fs");
const CsvReadableStream = require("csv-reader");

const path = "./csv/newsletter.csv";


router.post("/", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/newsletter.csv";

  try {
    // read old data
    let inputStream = Fs.createReadStream(path, "utf8");

    let i = 0;
    let oldData = [];
    inputStream
      .pipe(
        new CsvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
        })
      )
      .on("data", function (row) {
        if (i != 0) {
          let obj = {
            email: row[0],
          };
          oldData.push(obj);
        }
        i++;
      })
      .on("end", function () {
            const csvWriter = createCsvWriter({
              path: path,
              header: [{ id: "email", title: "Email" }],
            });
        oldData.push(body[0]);
            csvWriter
              .writeRecords(oldData) // returns a promise
              .then(() => {
                res.send({ status: 0000, message: "success" }).status(200);
              });

      });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
