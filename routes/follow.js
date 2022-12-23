const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Fs = require("fs");
const CsvReadableStream = require("csv-reader");
var yahooFinance = require("yahoo-finance");

router.post("/save", async (req, res) => {
  let body = req.body;
  let path = "../backend/csv/follow.csv";

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
            symbol: row[1],
          };
          oldData.push(obj);
        }
        i++;
      })
      .on("end", function () {
        const csvWriter = createCsvWriter({
          path: path,
          header: [
            { id: "email", title: "Email" },
            { id: "symbol", title: "Symbol" },
          ],
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

router.post("/get-symbols", async (req, res) => {
  let body = req.body;
  let path = "../backend/csv/follow.csv";

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
            symbol: row[1],
          };
          oldData.push(obj);
        }
        i++;
      })
      .on("end", async () => {
        let emails = oldData.filter((email) => email.email == body.email);
        // const data = await yahooFinance.quote('TSLA' , ["financialData", "summaryDetail", "price"])
        res
          .send({ status: 0000, message: "success", data: emails })
          .status(200);
      });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/get-data", async (req, res) => {
  let body = req.body;

  // read old data

  try {
    const data = await yahooFinance.quote(body.symbol, [
      "financialData",
      "summaryDetail",
      "price",
    ]);

    let isShariah = false;
    let dep = parseFloat(
      data.financialData.totalDebt / data.summaryDetail.marketCap
    ).toFixed(2);
    let sec = parseFloat(
      data.financialData.totalCash / data.summaryDetail.marketCap
    ).toFixed(2);
    let liq = parseFloat(
      data.financialData.totalCash / data.summaryDetail.marketCap
    ).toFixed(2);

    if (dep < 30 && sec < 30 && liq < 30) {
      isShariah = true;
    }

    let finalObj = {
      symbol: data.price.symbol,
      name: data.price.shortName,
      price: data.financialData.currentPrice,
      status: isShariah,
      marketCap: data.summaryDetail.marketCap,
      debtLevel: data.financialData.totalDebt,
    };
    res.send({ status: 0000, message: "success" , data : finalObj }).status(200);
  } catch (error) {
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

const prom = async (emails) => {
  let finalData = [];

  await emails.map(async (email, index) => {
    const data = await yahooFinance.quote(email.symbol, [
      "financialData",
      "summaryDetail",
      "price",
    ]);

    let isShariah = false;
    let dep = parseFloat(
      data.financialData.totalDebt / data.summaryDetail.marketCap
    ).toFixed(2);
    let sec = parseFloat(
      data.financialData.totalCash / data.summaryDetail.marketCap
    ).toFixed(2);
    let liq = parseFloat(
      data.financialData.totalCash / data.summaryDetail.marketCap
    ).toFixed(2);

    if (dep < 30 && sec < 30 && liq < 30) {
      isShariah = true;
    }

    let finalObj = {
      symbol: data.price.symbol,
      name: data.price.shortName,
      price: data.financialData.currentPrice,
      status: isShariah,
      marketCap: data.summaryDetail.marketCap,
      dept: data.financialData.totalDebt,
    };
    res
          .send({ status: 0000, message: "success", data: finalObj })
          .status(200);
  });

  console.log("finalData : ", finalData);
  return finalData;
};

module.exports = router;
