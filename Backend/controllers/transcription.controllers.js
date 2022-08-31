const fetch = require("node-fetch");
const fs = require("fs");

const urlUpload = process.env.URL_UPLOAD;
const urlTranscript = process.env.URL_TRANSCRIPT;
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

let downloadid;

module.exports.uploadAudioFile = async function uploadAudioFile(req, res) {
  try {
    let audioPath =
      "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/audioFiles/test.mp3";
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

      fetch(urlUpload, params)
        .then((response) => response.json())
        .then((data) => {
          console.log(`Success: ${data}`);
          console.log(`URL: ${data["upload_url"]}`);
          res.json({
            ok: true,
            message: "uploadFile",
            data: data,
          });
        })
        .catch((error) => {
          console.error(`Error: ${error}`);
          res.json({
            error: error,
          });
        });
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports.uploadFile = async function uploadFile(req, res) {
  try {
    let audioUrl = req.body.url;
    const data = {
      audio_url: audioUrl,
    };

    const params = {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      method: "POST",
    };

    fetch(urlTranscript, params)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log(data);
        console.log("ID:", data["id"]);
        res.json({
          ok: true,
          data: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        res.json({
          ok: false,
          message: error,
        });
      });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports.downloadFile = async function downloadFile(req, res) {
  try {
    let id = req.body.id;
    const url = `${urlTranscript}/${id}`;

    const params = {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
      },
      method: "GET",
    };

    function print(data) {
      switch (data.status) {
        case "queued":
        case "processing":
          console.log(
            "AssemblyAI is still transcribing your audio, please try again in a few minutes!"
          );
          res.json({
            message:
              "AssemblyAI is still transcribing your audio, please try again in a few minutes!",
          });
          break;
        case "completed":
          console.log(`Success: ${data}`);
          console.log(`Text: ${data.text}`);
          fs.writeFile(
            "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/textFiles/transcription.txt",
            data.text,
            function (err) {
              if (err) {
                return console.log(err);
              }
              console.log("The file was saved!");
            }
          );

          res.json({
            message: "Successfully transcribed",
            Transcription: data.text,
          });
          break;
        default:
          console.log(`Something went wrong :-( : ${data.status}`);
          res.json({
            ok: false,
            message: "Could not transcribe, please try again",
          });
          break;
      }
    }

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        print(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports.transcribe = async function transcribe(req, res) {
  try {
    let audioUrl_;
    let audioPath = process.env.AUDIO_PATH;
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

      fetch(urlUpload, params)
        .then((response) => response.json())
        .then((data) => {
          audioUrl_ = data["upload_url"];
          console.log(`Success: ${data}`);
          console.log(`URL: ${data["upload_url"]}`);
          // res.json({
          //   ok: true,
          //   message: "uploadFile",
          //   data: data,
          // });
        })
        .then((data) => {
          let audioUrl = audioUrl_;
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

          fetch(urlTranscript, params)
            .then((response) => response.json())
            .then((data) => {
              downloadid = data["id"];
              console.log(downloadid);
              console.log("Success:", data);
              console.log(data);
              console.log("ID:", data["id"]);
              res.json({
                ok: true,
                data: data,
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
            error: error,
          });
        });
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

// module.exports.downloadtranscription = async function downloadtranscription(
//   req,
//   res
// ) {
//   try {
//     console.log(downloadid);
//     let id = downloadid;
//     const url = `https://api.assemblyai.com/v2/transcript/${id}`;

//     const params = {
//       headers: {
//         authorization: ASSEMBLYAI_API_KEY,
//         "content-type": "application/json",
//       },
//       method: "GET",
//     };

//     function print(data) {
//       switch (data.status) {
//         case "queued":
//         case "processing":
//           console.log(
//             "AssemblyAI is still transcribing your audio, please try again in a few minutes!"
//           );
//           res.json({
//             message:
//               "AssemblyAI is still transcribing your audio, please try again in a few minutes!",
//           });
//           break;
//         case "completed":
//           console.log(`Success: ${data}`);
//           console.log(`Text: ${data.text}`);
//           res.json({
//             message: "Successfully transcribed",
//             Transcription: data.text,
//           });
//           break;
//         default:
//           console.log(`Something went wrong :-( : ${data.status}`);
//           res.json({
//             ok: false,
//             message: "Could not transcribe, please try again",
//           });
//           break;
//       }
//     }

//     fetch(url, params)
//       .then((response) => response.json())
//       .then((data) => {
//         print(data);
//       })
//       .catch((error) => {
//         console.error(`Error: ${error}`);
//       });
//   } catch (error) {
//     res.json({
//       ok: false,
//       message: error,
//     });
//   }
// };
