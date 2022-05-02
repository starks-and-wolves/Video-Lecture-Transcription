const express = require("express");
const multer = require("multer");

const app = express();

app.listen("3001");

app.use(express.json());
// staff ->2 , patient 1, admin ->0 , doctor ->3

const { uploadfiles } = require("../controllers/main.controllers");
const userRoute = express.Router();
app.use("/user", userRoute);

userRoute.route("/uploadFiles").post(uploadfiles);
// userRoute.route("/verify").post(verifyUser);

// userRoute
//   .route("/patientInfo/:id")
//   .get(getPatientPersonalInfo)
//   .delete(deletePatientPersonalInfo)
//   .patch(patchPatientPersonalInfo);
// userRoute.route("/patientInfo").post(postPatientPersonalInfo);
