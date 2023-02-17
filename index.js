const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const port = process.env.PORT || 3001;
const indexRoute = require("./routes/index");
const StockRoute = require("./routes/stock");
const ReviewRoute = require("./routes/review");
const NewsletterRoute = require("./routes/email");
const UserRoute = require("./routes/users");
const FollowRoute = require("./routes/follow");
const StripeRoute = require("./routes/stripe");
const ContactRoute = require("./routes/contact");

const app = express();
const cors = require("cors");

const username = "myrizq3";
const password = "4vdvfyz7HaCPInwW";
const cluster = "<cluster name>";
const dbname = "myRizq";

app.get("/", (req, res) => {
  res.send("Express app working");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use("/", indexRoute);
app.use("/stock/", StockRoute);
app.use("/review", ReviewRoute);
app.use("/newsletter", NewsletterRoute);
app.use("/user", UserRoute);
app.use("/follow", FollowRoute);
app.use("/stripe", StripeRoute);
app.use("/contact", ContactRoute);

const mongoUrl = `mongodb+srv://${username}:${password}@my-rizq.kpmalc8.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
mongoose.connect(
  mongoUrl,
  async(err)=>{
      if(err) throw err;
      console.log("conncted to db")
  }
)

// mongoose.connect(mongoUrl, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

// const server = http.createServer(app);
app.listen(port, () => console.log(`Listening on port ${port}`));
