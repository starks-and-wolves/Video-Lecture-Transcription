const express = require("express");
const multer = require("multer");
const extractAudio = require("ffmpeg-extract-audio");

const fetch = require("node-fetch");
const fs = require("fs");

const url = "https://api.assemblyai.com/v2/upload";

const ASSEMBLYAI_API_KEY = "ee8cb75cdd2142d492a4f9eb1c021deb";

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

module.exports.uploadAudio = async function uploadAudio(req, res) {
  try {
    let audioPath =
      "D:Sem 3-2Video Lecture TranscriptionProject MainBackend\routesaudioFiles\test.mp3";
    fs.readFile(audioPath, (err, data) => {
      if (err) {
        return console.log(err);
      }

      const params = {
        headers: {
          authorization: ASSEMBLYAI_API_KEY,
          "Transfer-Encoding": "chunked",
        },
        body: data,
        method: "POST",
      };

      fetch(url, params)
        .then((response) => response.json())
        .then((data) => {
          console.log(`Success: ${data}`);
          console.log(`URL: ${data["upload_url"]}`);
          // res.json({
          //   ok: true,
          //   data: data,
          // });
        })
        .then((data) => {
          console.log("hiii");
          let audioUrl = data["upload_url"];
          const data1 = {
            audio_url: audioUrl,
          };

          const params = {
            headers: {
              authorization: ASSEMBLYAI_API_KEY,
              "content-type": "application/json",
            },
            body: JSON.stringify(data1),
            method: "POST",
          };

          fetch(url, params)
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              console.log("ID:", data["id"]);
              res.json({
                ok: true,
                data: data,
                message: "upload",
              });
            })
            .catch((error) => {
              console.error("Error:", error);
              res.json({
                ok: false,
                message: error,
              });
            });
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
          res.json({
            ok: false,
            error: error,
          });
        });
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
