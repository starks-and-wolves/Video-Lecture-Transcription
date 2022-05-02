const express = require("express");
const multer = require("multer");

// const upload = multer({ dest: "uploads/" }).single("demo_image");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// var upload = multer({ storage: storage }).single("demo_image");

const app = express();

module.exports.uploadfiles = function uploadfiles(req, res) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    var upload = multer({ storage: storage }).single("demo_image");

    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        res.status(400).send("Something went wrong!");
      }
      res.send(req.file);
    });
  } catch (err) {
    res.json({
      ok: false,
      message: err.message,
    });
  }
};

// app.post("/image", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send("Something went wrong!");
//     }
//     res.send(req.file);
//   });
// });

// app.listen(3000, () => {
//   console.log("Started on port 3000");
// });
