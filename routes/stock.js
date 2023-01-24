const express = require("express");
const router = express.Router();
var yahooFinance = require('yahoo-finance');

router.post("/", async (req, res) => {
  let data = null;
  let symbol = req.body.symbol;

  try{
    if(symbol){
        yahooFinance.quote({
          symbol: symbol,
          modules: [  'financialData' , 'summaryDetail' , 'price' , 'summaryProfile' ] // see the docs for the full list
        }, function (err, quotes) {
          data = quotes;
          res.send({ response: data }).status(200);
          // res.send({ response: "My name is dash" }).status(200);
        });
    }

  }catch(err){
    res.send({ response: data }).status(200);
  }
});

module.exports = router;