const express = require("express");
const multer = require("multer");
const extractAudio = require("ffmpeg-extract-audio");

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

module.exports.uploadSlides = function uploadSlides(req, res) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./slides");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    var upload = multer({ storage: storage }).single("slides");

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

module.exports.uploadVideos = function uploadVideos(req, res) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./videos");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    var upload = multer({ storage: storage }).single("video");

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

module.exports.extractAudioFunc = async function extractAudioFunc(req, res) {
  try {
    const baseRoute =
      "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/videos/";
    const baseAudioRoute =
      "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/audioFiles/";
    const videoFileName = "input.mp4";
    await extractAudio({
      input: `${baseRoute}${videoFileName}`,
      output: `${baseAudioRoute}test.mp3`,
    });
    return res.status(200).json({
      ok: true,
      message: "extracted audio test.mp3",
    });
  } catch (err) {
    res.json({
      ok: false,
      message: err.message,
    });
  }
};

module.exports.transcribe = async function transcribe(req, res) {
  try {
    const baseRoute =
      "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/videos/";
    const baseAudioRoute =
      "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/audioFiles/";
    const videoFileName = "input.mp4";
    await extractAudio({
      input: `${baseRoute}${videoFileName}`,
      output: `${baseAudioRoute}test.mp3`,
    });
    return res.status(200).json({
      ok: true,
      message: "extracted audio test.mp3",
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
