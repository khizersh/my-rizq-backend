const express = require("express");
const router = express.Router();
var yahooFinance = require("yahoo-finance");
const yahooFinance2 = require("yahoo-finance2").default;

router.post("/", async (req, res) => {
  let data = null;
  let symbol = req.body.symbol;

  try {
    if (symbol) {
      yahooFinance.quote(
        {
          symbol: symbol,
          modules: [
            "financialData",
            "summaryDetail",
            "price",
            "summaryProfile",
          ], // see the docs for the full list
        },
        function (err, quotes) {
          data = quotes;
          res.send({ response: data }).status(200);
          // res.send({ response: "My name is dash" }).status(200);
        }
      );
    }
  } catch (err) {
    res.send({ response: data }).status(200);
  }
});

router.post("/yahoo", async (req, res) => {
  let data = null;
  let symbol = req.body.symbol;

  try {
    if (symbol) {
      const quote = await yahooFinance2.quoteSummary(symbol, {
        modules: ["financialData", "balanceSheetHistoryQuarterly", "price" , "assetProfile"],
      });
      res.send({ response: quote }).status(200);
    }
  } catch (err) {
    res.send({ response: data }).status(200);
  }
});

module.exports = router;
