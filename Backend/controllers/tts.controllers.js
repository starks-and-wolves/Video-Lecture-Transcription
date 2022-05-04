// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

// (async function () {
//   // The text to synthesize
//   var text = fs.readFileSync("./text.txt", "utf8");
//   var newArr = text.match(/[^\.]+\./g);

//   var charCount = 0;
//   var textChunk = "";
//   var index = 0;

//   for (var n = 0; n < newArr.length; n++) {
//     charCount += newArr[n].length;
//     textChunk = textChunk + newArr[n];

//     console.log(charCount);

//     if (charCount > 4600 || n == newArr.length - 1) {
//       console.log(textChunk);

//       // Construct the request
//       const request = {
//         input: {
//           text: textChunk,
//         },
//         // Select the language and SSML voice gender (optional)
//         voice: {
//           // languageCode: 'en-US',
//           // name: "en-US-Wavenet-B"
//           languageCode: "en-IN",
//           ssmlGender: "MALE",
//           name: "en-IN-Wavenet-D",
//         },
//         // select the type of audio encoding
//         audioConfig: {
//           effectsProfileId: ["headphone-class-device"],
//           pitch: -2,
//           speakingRate: 1.1,
//           audioEncoding: "MP3",
//         },
//       };

//       // Performs the text-to-speech request
//       const [response] = await client.synthesizeSpeech(request);

//       console.log(response);

//       // Write the binary audio content to a local file
//       const writeFile = util.promisify(fs.writeFile);
//       await writeFile(
//         "Psychology_of_Human_Misjudgement_" +
//           ("0000" + index).slice(-4) +
//           ".mp3",
//         response.audioContent,
//         "binary"
//       );
//       console.log("Audio content written to file: output.mp3");

//       index++;

//       charCount = 0;
//       textChunk = "";
//     }
//   }
// })();

module.exports.textToSpeechfulltranscript =
  async function textToSpeechfulltranscript(req, res) {
    try {
      var text = fs.readFileSync(
        "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/textFiles/transcription.txt",
        "utf8"
      );
      var newArr = text.match(/[^\.]+\./g);

      var charCount = 0;
      var textChunk = "";
      var index = 1;

      for (var n = 0; n < newArr.length; n++) {
        charCount += newArr[n].length;
        textChunk = textChunk + newArr[n];

        console.log(charCount);

        if (charCount > 4600 || n == newArr.length - 1) {
          console.log(textChunk);

          // Construct the request
          const request = {
            input: {
              text: textChunk,
            },
            // Select the language and SSML voice gender (optional)
            voice: {
              // languageCode: 'en-US',
              // name: "en-US-Wavenet-B"
              languageCode: "en-IN",
              ssmlGender: "MALE",
              name: "en-IN-Wavenet-D",
            },
            // select the type of audio encoding
            audioConfig: {
              effectsProfileId: ["headphone-class-device"],
              pitch: -2,
              speakingRate: 1.1,
              audioEncoding: "MP3",
            },
          };

          // Performs the text-to-speech request
          const [response] = await client.synthesizeSpeech(request);

          console.log(response);

          // Write the binary audio content to a local file
          const writeFile = util.promisify(fs.writeFile);
          await writeFile(
            `D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/textToSpeech/fulltranscript${index}.mp3`,
            //   "Psychology_of_Human_Misjudgement_" +
            //     ("0000" + index).slice(-4) +
            //     ".mp3",
            response.audioContent,
            "binary"
          );
          console.log("Audio content written to file: output.mp3");

          index++;

          charCount = 0;
          textChunk = "";
        }
      }
      res.json({
        ok: true,
        message: "Successfully converted text to speech ",
      });
    } catch (error) {
      res.json({
        ok: false,
        message: "Could not convert text to speech",
        error: error,
      });
    }
  };

module.exports.slideText = async function slideText(req, res) {
  try {
    const slideText = req.body.slideText;
    for (var i = 0; i < slideText.length; i++) {
      fs.writeFile(
        `D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/textFiles/slide${
          i + 1
        }.txt`,
        slideText[i],
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log(`The file was saved!`);
        }
      );
    }
    res.json({
      ok: true,
      data: slideText,
    });
  } catch (error) {
    res.json({
      ok: true,
      error: error,
    });
  }
};

module.exports.textToSpeechSlides = async function textToSpeechSlides(
  req,
  res
) {
  try {
    const numberOfPages = req.body.numberOfPages;
    for (var i = 1; i <= numberOfPages; i++) {
      var text = fs.readFileSync(
        `D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/textFiles/slide${i}.txt`,
        "utf8"
      );
      var newArr = text.match(/[^\.]+\./g);

      var charCount = 0;
      var textChunk = "";
      var index = 1;

      for (var n = 0; n < newArr.length; n++) {
        charCount += newArr[n].length;
        textChunk = textChunk + newArr[n];

        console.log(charCount);

        if (charCount > 4600 || n == newArr.length - 1) {
          console.log(textChunk);

          // Construct the request
          const request = {
            input: {
              text: textChunk,
            },
            // Select the language and SSML voice gender (optional)
            voice: {
              // languageCode: 'en-US',
              // name: "en-US-Wavenet-B"
              languageCode: "en-IN",
              ssmlGender: "MALE",
              name: "en-IN-Wavenet-D",
            },
            // select the type of audio encoding
            audioConfig: {
              effectsProfileId: ["headphone-class-device"],
              pitch: -2,
              speakingRate: 1.1,
              audioEncoding: "MP3",
            },
          };

          // Performs the text-to-speech request
          const [response] = await client.synthesizeSpeech(request);

          console.log(response);

          // Write the binary audio content to a local file
          const writeFile = util.promisify(fs.writeFile);
          await writeFile(
            `D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/textToSpeech/slide${i}_${index}.mp3`,
            //   "Psychology_of_Human_Misjudgement_" +
            //     ("0000" + index).slice(-4) +
            //     ".mp3",
            response.audioContent,
            "binary"
          );
          console.log("Audio content written to file: output.mp3");

          index++;

          charCount = 0;
          textChunk = "";
        }
      }
    }
    res.json({
      ok: true,
      message: "Successfully converted text to speech ",
    });
  } catch (error) {
    res.json({
      ok: false,
      message: "Could not convert text to speech",
      error: error,
    });
  }
};
