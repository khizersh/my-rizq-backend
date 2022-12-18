const express = require("express");
const router = express.Router();
var yahooFinance = require('yahoo-finance');

router.get("/", async (req, res) => {
  let data = null;
  yahooFinance.quote({
    symbol: 'AAPL',
    modules: [  'summaryDetail' ] // see the docs for the full list
  }, function (err, quotes) {
    data = quotes;
    res.send({ response: data }).status(200);
  });
});

module.exports = router;