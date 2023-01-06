const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Fs = require("fs");
const CsvReadableStream = require("csv-reader");
const Stripe = require('stripe');
const stripe = Stripe("sk_test_51Kmn42HxzdoZduY7tcd4RuB7hL9pwQY9r6FQyDOw0zs8oGvhM8M4yEzXEypUdx39bl3KzR72Ejcd4wS3GKmgoJyc00gXk8WQWL");

router.post("/charge", async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      console.log("stripe-routes.js 19 | payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 17 | error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  });

module.exports = router;
