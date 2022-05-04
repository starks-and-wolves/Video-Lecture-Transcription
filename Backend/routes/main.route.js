const express = require("express");
const multer = require("multer");

const app = express();

app.listen("3001");

app.use(express.json());
// staff ->2 , patient 1, admin ->0 , doctor ->3

const { splitPDF, toPNG } = require("../controllers/pdfHandlers");

const {
  uploadAudioFile,
  uploadFile,
  downloadFile,
  transcribe,
} = require("../controllers/transcription.controllers");

const {
  textToSpeechfulltranscript,
  slideText,
  textToSpeechSlides,
} = require("../controllers/tts.controllers");

const {
  uploadSlides,
  uploadVideos,
  extractAudioFunc,
  getAudioDuration,
} = require("../controllers/main.controllers");
const userRoute = express.Router();
app.use("/user", userRoute);

userRoute.route("/uploadSlides").post(uploadSlides);
userRoute.route("/uploadVideos").post(uploadVideos);
userRoute.route("/extractAudio").post(extractAudioFunc);
userRoute.route("/getAudioDuration").get(getAudioDuration);
userRoute.route("/uploadAudio").post(uploadAudioFile);
userRoute.route("/uploadFile").post(uploadFile);
userRoute.route("/downloadFile").get(downloadFile);
userRoute.route("/transcribe").post(transcribe);
userRoute.route("/textToSpeechfulltranscript").post(textToSpeechfulltranscript);
userRoute.route("/textToSpeechSlides").post(textToSpeechSlides);
userRoute.route("/slideText").post(slideText);
userRoute.route("/splitPDF").get(splitPDF);
userRoute.route("/toPNG").post(toPNG);
// userRoute.route("/verify").post(verifyUser);

// userRouters
//   .route("/patientInfo/:id")
//   .get(getPatientPersonalInfo)
//   .delete(deletePatientPersonalInfo)
//   .patch(patchPatientPersonalInfo);
// userRoute.route("/patientInfo").post(postPatientPersonalInfo);
