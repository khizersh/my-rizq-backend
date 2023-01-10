const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Fs = require("fs");
const CsvReadableStream = require("csv-reader");

router.post("/signup", async (req, res) => {
  let body = req.body;
  let path = "../backend/csv/user.csv";

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
            name: row[0],
            email: row[1],
            password: row[2],
            freeUser: row[3],
          };
          oldData.push(obj);
        }
        i++;
      })
      .on("end", function () {
        const csvWriter = createCsvWriter({
          path: path,
          header: [
            { id: "name", title: "Name" },
            { id: "email", title: "Email" },
            { id: "password", title: "Password" },
            { id: "freeUser", title: "Free User" },
          ],
        });

        let isExistEmail = oldData.find((m) => m.email == body[0].email);
        if (isExistEmail) {
          res
            .send({ status: 9999, message: "User already exist!" })
            .status(200);
        } else {
          oldData.push(body[0]);
          csvWriter
            .writeRecords(oldData) // returns a promise
            .then(() => {
              res.send({ status: 0000, message: "success" }).status(200);
            });
        }
      });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});


router.post("/delete", async (req, res) => {
  let body = req.body;
  let path = "../backend/csv/user.csv";

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
            name: row[0],
            email: row[1],
            password: row[2],
            freeUser: row[3],
          };
          oldData.push(obj);
        }
        i++;
      })
      .on("end", function () {
        const csvWriter = createCsvWriter({
          path: path,
          header: [
            { id: "name", title: "Name" },
            { id: "email", title: "Email" },
            { id: "password", title: "Password" },
            { id: "freeUser", title: "Free User" },
          ],
        });

        let removedUserList = oldData.filter((m) => m.email != body[0].email);
        csvWriter
          .writeRecords(removedUserList) // returns a promise
          .then(() => {
            res.send({ status: 0000, message: "success" }).status(200);
          });
      });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/signin", async (req, res) => {
  let body = req.body;
  let path = "../backend/csv/user.csv";

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
        let freeUser = (row[3] != null && row[3] != undefined) ? row[3] : true ;
        if (i != 0) {
          let obj = {
            name: row[0],
            email: row[1],
            password: row[2],
            freeUser: freeUser
          };
          oldData.push(obj);
        }
        i++;
      })
      .on("end", function () {
        let isExistEmail = oldData.find(
          (m) => m.email == body.email && m.password == body.password
        );
        if (isExistEmail) {
          res.send({ status: "0000", message: "Successfully login!" , data : isExistEmail }).status(200);
        } else {
          res
            .send({ status: "9999", message: "Invalid credentials!" })
            .status(200);
        }
      });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
