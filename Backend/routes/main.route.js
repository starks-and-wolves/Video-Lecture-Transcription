const express = require("express");
const multer = require("multer");

const app = express();

app.listen("3001");

app.use(express.json());
// staff ->2 , patient 1, admin ->0 , doctor ->3

const {
  uploadAudioFile,
  uploadFile,
  downloadFile,
  transcribe,
} = require("../controllers/transcription.controllers");

const {
  uploadSlides,
  uploadVideos,
  extractAudioFunc,
} = require("../controllers/main.controllers");
const userRoute = express.Router();
app.use("/user", userRoute);

userRoute.route("/uploadSlides").post(uploadSlides);
userRoute.route("/uploadVideos").post(uploadVideos);
userRoute.route("/extractAudio").post(extractAudioFunc);
userRoute.route("/uploadAudio").post(uploadAudioFile);
userRoute.route("/uploadFile").post(uploadFile);
userRoute.route("/downloadFile").get(downloadFile);
userRoute.route("/transcribe").post(transcribe);
// userRoute.route("/verify").post(verifyUser);

// userRouters
//   .route("/patientInfo/:id")
//   .get(getPatientPersonalInfo)
//   .delete(deletePatientPersonalInfo)
//   .patch(patchPatientPersonalInfo);
// userRoute.route("/patientInfo").post(postPatientPersonalInfo);
