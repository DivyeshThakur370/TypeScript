const express = require("express");
const {
  contactController,
  allController,
  deleteController,
  updateController,
  oneController,
} = require("../controllers/contact.controller");
const upload = require("../middlewares/multer");
const isAuth = require("../middlewares/isAuth");

const contactRouter = express.Router();

// create data
contactRouter.post(
  "/create",
  upload.single("image"),
  isAuth,
  contactController
);

//get all data
contactRouter.get("/all/:id", allController);

// delete card
contactRouter.delete("/delete/:id", deleteController);

//update card
contactRouter.patch("/update/:id", upload.single("image"), updateController);

//get one card

contactRouter.get("/one/:id", oneController);

module.exports = contactRouter;
