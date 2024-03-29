const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Fs = require("fs");
const CsvReadableStream = require("csv-reader");
const ReviewModel = require("../models/ReviewSchema");


const path = "./csv/feedback.csv";


router.post("/createFile", async (req, res) => { 

  const csvWriter = createCsvWriter({
      path: path,
      header: [
        { id: "thoughts", title: "Thoughts" },
        { id: "review", title: "Review" },
        { id: "likeCount", title: "Like Count" },
        { id: "reviewCount", title: "Review Count" },
      ],
    });

    csvWriter
    .writeRecords([]) // returns a promise
    .then(() => {
      res.send({ status: 0000, message: "success" }).status(200);
    });

})

router.post("/", async (req, res) => {
  let body = req.body;

// 
  try {
    const review = new ReviewModel(req.body[0]);

    await review.save();
    res.send({ status: 0000, message: "success" }).status(200);
    // read old data
    // let inputStream = Fs.createReadStream(path, "utf8");

    // let i = 0;
    // let oldData = []
    // inputStream
    //   .pipe(
    //     new CsvReadableStream({
    //       parseNumbers: true,
    //       parseBooleans: true,
    //       trim: true,
    //     })
    //   )
    //   .on("data", function (row ) {
    //     if(i != 0){
    //       let obj = {
    //         thoughts : row[0],
    //         review : row[1],
    //         likeCount : row[2],
    //         reviewCount : row[3],
    //       }
    //       oldData.push(obj);
    //     }
    //     i++;
    //   })
    //   .on("end", function () {

    //     const csvWriter = createCsvWriter({
    //       path: path,
    //       header: [
    //         { id: "thoughts", title: "Thoughts" },
    //         { id: "review", title: "Review" },
    //         { id: "likeCount", title: "Like Count" },
    //         { id: "reviewCount", title: "Review Count" },
    //       ],
    //     });
    //     oldData.push(body[0]);
    //     csvWriter.writeRecords(oldData).then(() => {
    //       res.send({ status: 0000, message: "success" }).status(200);
    //     });
    //   });

    // // write data with old data

  } catch (error) {
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/read", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/feedback.csv";

  try {

    const data = await ReviewModel.find({});
    res.send({ status: 0000, data: data}).status(200);

    // // read old data
    // let inputStream = Fs.createReadStream(path, "utf8");

    // let i = 0;
    // let oldData = []
    // inputStream
    //   .pipe(
    //     new CsvReadableStream({
    //       parseNumbers: true,
    //       parseBooleans: true,
    //       trim: true,
    //     })
    //   )
    //   .on("data", function (row ) {
    //     if(i != 0){
    //       let obj = {
    //         thoughts : row[0],
    //         review : row[1],
    //         likeCount : row[2],
    //         reviewCount : row[3],
    //       }
    //       oldData.push(obj);
    //     }
    //     i++;
    //   })
    //   .on("end", function () {
    //     res.send({ status: 0000, data: oldData}).status(200);
    //   });

    // // write data with old data


  
  } catch (error) {
    console.log("error : ",error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
