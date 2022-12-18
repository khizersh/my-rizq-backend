const express = require("express");
const http = require("http");
// const socketIo = require("socket.io");

const port = process.env.PORT || 3001;
const indexRoute = require("./routes/index");
const StockRoute = require("./routes/stock");

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
// const io = socketIo(server);

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));