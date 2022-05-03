const fetch = require("node-fetch");
const fs = require("fs");

const urlUpload = "https://api.assemblyai.com/v2/upload";
const urlTranscript = "https://api.assemblyai.com/v2/transcript";
const ASSEMBLYAI_API_KEY = "ee8cb75cdd2142d492a4f9eb1c021deb";

// module.exports.uploadAudio = async function uploadAudio(req, res) {
//   try {
//     let audioPath =
//       "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/audioFiles/test.mp3";
//     fs.readFile(audioPath, (err, data) => {
//       if (err) {
//         return console.log(err);
//       }

//       const params = {
//         headers: {
//           authorization: ASSEMBLYAI_API_KEY,
//           "Transfer-Encoding": "chunked",
//         },
//         body: data,
//         method: "POST",
//       };

//       fetch(url, params)
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(`Success: ${data}`);
//           console.log(`URL: ${data["upload_url"]}`);
//           res.json({
//             ok: true,
//             data: data,
//           });
//         })
//         .catch((error) => {
//           console.error(`Error: ${error}`);
//           res.json({
//             ok: false,
//             error: error,
//           });
//         });
//     });
//   } catch (err) {
//     res.json({
//       ok: false,
//       message: err.message,
//     });
//   }
// };

// module.exports.uploadAudio = async function uploadAudio(req, res) {
//   try {
//     let audioUrl1;
//     let audioPath =
//       "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/audioFiles/test.mp3";
//     let downloadid;
//     fs.readFile(audioPath, (err, data) => {
//       if (err) {
//         return console.log(err);
//       }

//       const params = {
//         headers: {
//           authorization: ASSEMBLYAI_API_KEY,
//           "Transfer-Encoding": "chunked",
//         },
//         body: data,
//         method: "POST",
//       };

//       fetch(url, params)
//         .then((response) => response.json())
//         .then((data) => {
//           audioUrl1 = data["upload_url"];
//           console.log(`Success: ${data}`);
//           console.log(`URL: ${data["upload_url"]}`);
//           // res.json({
//           //   ok: true,
//           //   data: data,
//           // });
//         })
//         .then((data) => {
//           console.log("hiii");
//           //   let audioUrl = data["upload_url"];
//           const data1 = {
//             audio_url: audioUrl1,
//           };

//           const params = {
//             headers: {
//               authorization: ASSEMBLYAI_API_KEY,
//               "content-type": "application/json",
//             },
//             body: JSON.stringify(data1),
//             method: "POST",
//           };

//           fetch(url, params)
//             .then((response) => response.json())
//             .then((data) => {
//               downloadid = data["id"];
//               //   downloadid = data["upload_url"];
//               console.log("Success:", data);
//               console.log("ID:", data["id"]);
//               //   data["id"];
//               res.json({
//                 ok: true,
//                 data: data,
//                 message: "upload",
//               });
//             })
//             // .then((data) => {
//             //   const url = `https://api.assemblyai.com/v2/transcript/${downloadid}`;
//             //   console.log(downloadid);
//             //   const params = {
//             //     headers: {
//             //       authorization: ASSEMBLYAI_API_KEY,
//             //       "content-type": "application/json",
//             //     },
//             //     method: "GET",
//             //   };

//             //   function print(data) {
//             //     switch (data.status) {
//             //       case "queued":
//             //       case "processing":
//             //         console.log(
//             //           "AssemblyAI is still transcribing your audio, please try again in a few minutes!"
//             //         );
//             //         break;
//             //       case "completed":
//             //         console.log(`Success: ${data}`);
//             //         console.log(`Text: ${data.text}`);
//             //         break;
//             //       default:
//             //         console.log(`Something went wrong :-( : ${data.status}`);
//             //         break;
//             //     }
//             //   }

//             //   fetch(url, params)
//             //     .then((response) => response.json())
//             //     .then((data) => {
//             //       print(data);
//             //       res.json({
//             //         ok: true,
//             //         data: data,
//             //         message: "transcribeds",
//             //       });
//             //     })
//                 // .catch((error) => {
//                 //   console.error(`Error: ${error}`);
//                 //   res.json({
//                 //     ok: false,
//                 //     data: data,
//                 //   });
//                 // });
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//               res.json({
//                 ok: false,
//                 message: error,
//               });
//             });
//         })
//         .catch((error) => {
//           console.error(`Error: ${error}`);
//           res.json({
//             ok: false,
//             error: error,
//           });
//         });
//     });
//   } catch (err) {
//     res.json({
//       ok: false,
//       message: err.message,
//     });
//   }
// };

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
    const url = `https://api.assemblyai.com/v2/transcript/${id}`;

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
          // res.json({
          //   ok: true,
          //   message: "uploadFile",
          //   data: data,
          // });
        })
        .then((data) => {
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
              //   res.json({
              //     ok: true,
              //     data: data,
              //   });
              
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
