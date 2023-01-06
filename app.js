const express = require("express");
const http = require("http");

const port = process.env.PORT || 3001;
const indexRoute = require("./routes/index");
const StockRoute = require("./routes/stock");
const ReviewRoute = require("./routes/review");
const NewsletterRoute = require("./routes/email");
const UserRoute = require("./routes/users");
const FollowRoute = require("./routes/follow");
const StripeRoute = require("./routes/stripe");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) 


app.use('/' ,  indexRoute);
app.use('/stock/' ,  StockRoute);
app.use('/review' ,  ReviewRoute);
app.use('/newsletter' ,  NewsletterRoute);
app.use('/user' ,  UserRoute);
app.use('/follow' ,  FollowRoute);
app.use('/stripe' ,  StripeRoute);

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));