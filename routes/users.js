const express = require("express");
const router = express.Router();
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Fs = require("fs");
const CsvReadableStream = require("csv-reader");
const User = require("../models/UserSchema");
const { validateEmail } = require("../service/commonService");

const path = "./csv/user.csv";

router.post("/createFile", async (req, res) => {
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: "name", title: "Name" },
      { id: "email", title: "Email" },
      { id: "password", title: "Password" },
      { id: "freeUser", title: "Free User" },
    ],
  });

  csvWriter
    .writeRecords([]) // returns a promise
    .then(() => {
      res.send({ status: 0000, message: "success" }).status(200);
    });
});

router.post("/signup", async (req, res) => {
  const request = new User(req.body[0]);
  //   // let path = "../backend/csv/user.csv";

  try {
    const dbUser = await User.exists({ email: request.email });

    if (dbUser != null) {
      res.send({ status: 9999, message: "User already exist!" }).status(200);
    } else {
      if (!validateEmail(request.email)) {
        res
          .send({ status: 9999, message: "Please Enter Valid Email" })
          .status(200);
      }
      await request.save();
      res.send({ status: 0000, message: "success" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/update-plan", async (req, res) => {
  const request = new User(req.body);
  //   // let path = "../backend/csv/user.csv";

  try {
    const dbUser = await User.findOne({ email: request.email });

    if (dbUser != null) {
      if (!validateEmail(request.email)) {
        res
          .send({ status: 9999, message: "Please Enter Valid Email" })
          .status(200);
      } else {
        dbUser.freeUser = false;
      }
      const savedUser = await dbUser.save();
      res
        .send({ status: 0000, message: "success", data: savedUser })
        .status(200);
    } else {
      res.send({ status: 9999, message: "User already exist!" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});
router.post("/cancel-plan", async (req, res) => {
  const request = new User(req.body);
  //   // let path = "../backend/csv/user.csv";

  try {
    const dbUser = await User.findOne({ email: request.email });

    if (dbUser != null) {
      if (!validateEmail(request.email)) {
        res
          .send({ status: 9999, message: "Please Enter Valid Email" })
          .status(200);
      } else {
        dbUser.freeUser = true;
      }
      const savedUser = await dbUser.save();
      res
        .send({ status: 0000, message: "success", data: savedUser })
        .status(200);
    } else {
      res.send({ status: 9999, message: "User already exist!" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/delete", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/user.csv";

  try {
    const data = await User.deleteOne({ email: body[0].email });
    console.log("data : ", data);
    // read old data
    // let inputStream = Fs.createReadStream(path, "utf8");
    res.send({ status: 0000, message: "success" }).status(200);

    // let i = 0;
    // let oldData = [];
    // inputStream
    //   .pipe(
    //     new CsvReadableStream({
    //       parseNumbers: true,
    //       parseBooleans: true,
    //       trim: true,
    //     })
    //   )
    //   .on("data", function (row) {
    //     if (i != 0) {
    //       let obj = {
    //         name: row[0],
    //         email: row[1],
    //         password: row[2],
    //         freeUser: row[3],
    //       };
    //       oldData.push(obj);
    //     }
    //     i++;
    //   })
    //   .on("end", function () {
    //     const csvWriter = createCsvWriter({
    //       path: path,
    //       header: [
    //         { id: "name", title: "Name" },
    //         { id: "email", title: "Email" },
    //         { id: "password", title: "Password" },
    //         { id: "freeUser", title: "Free User" },
    //       ],
    //     });

    //     let removedUserList = oldData.filter((m) => m.email != body[0].email);
    //     csvWriter
    //       .writeRecords(removedUserList) // returns a promise
    //       .then(() => {
    //         res.send({ status: 0000, message: "success" }).status(200);
    //       });
    //   });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/signin", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/user.csv";

  try {
    if (body.email && body.password) {
      const isExistEmail = await User.findOne({
        email: body.email,
        password: body.password,
      });

      if (isExistEmail) {
        res
          .send({
            status: "0000",
            message: "Successfully login!",
            data: isExistEmail,
          })
          .status(200);
      } else {
        res
          .send({ status: "9999", message: "Invalid credentials!" })
          .status(200);
      }
    }

    // read old data
    // let inputStream = Fs.createReadStream(path, "utf8");

    // let i = 0;
    // let oldData = [];
    // inputStream
    //   .pipe(
    //     new CsvReadableStream({
    //       parseNumbers: true,
    //       parseBooleans: true,
    //       trim: true,
    //     })
    //   )
    //   .on("data", function (row) {
    //     let freeUser = row[3] != null && row[3] != undefined ? row[3] : true;
    //     if (i != 0) {
    //       let obj = {
    //         name: row[0],
    //         email: row[1],
    //         password: row[2],
    //         freeUser: freeUser,
    //       };
    //       oldData.push(obj);
    //     }
    //     i++;
    //   })
    //   .on("end", function () {
    //     let isExistEmail = oldData.find(
    //       (m) => m.email == body.email && m.password == body.password
    //     );
    //     if (isExistEmail) {
    //       res
    //         .send({
    //           status: "0000",
    //           message: "Successfully login!",
    //           data: isExistEmail,
    //         })
    //         .status(200);
    //     } else {
    //       res
    //         .send({ status: "9999", message: "Invalid credentials!" })
    //         .status(200);
    //     }
    //   });
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/reset", async (req, res) => {
  let body = req.body;
  // let path = "../backend/csv/user.csv";

  try {
    if (body.email && body.password) {
      const isExistEmail = await User.findOne({
        email: body.email,
      });

      if (isExistEmail) {
        isExistEmail.password = body.password;
        await isExistEmail.save();
        res
          .send({
            status: "0000",
            message: "Successfully login!",
            data: isExistEmail,
          })
          .status(200);
      } else {
        res
          .send({ status: "9999", message: "Invalid credentials!" })
          .status(200);
      }
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/test", async (request, response) => {
  const user = new User(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/find-user", async (request, response) => {
  const user = new User(request.body);

  try {
    const data = await User.find({ email: user.email });
    response.send(data);
  } catch (error) {
    console.log("error : ", error);
    response.status(500).send(error);
  }
});

module.exports = router;
