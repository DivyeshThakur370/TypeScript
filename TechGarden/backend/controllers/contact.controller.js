const contactModel = require("../models/contact.model");
const {
  contactService,
  allServices,
  deleteServices,
  updateService,
  oneServices,
} = require("../services/contact.service");
const fs = require("fs");
const path = require("path");

const contactController = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    console.log(image);
    const { name, email, number } = req.body;
    const id = req.user.user._id;
    let result = await contactService(image, name, email, number, id);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const allController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await allServices(id);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const deleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteServices(id);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Update controller
const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, number, removeImage } = req.body;

    const updateData = { email, name, number };

    const existingContact = await contactModel.findById(id);
    if (!existingContact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    if (removeImage === "true" && existingContact.image) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "photos",
        existingContact.image
      );
      console.log("Trying to delete image at:", oldImagePath);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Image deleted successfully");
      } else {
        console.log("Image file not found to delete");
      }
      updateData.image = null;
    }

    // Replace image if new file uploaded
    if (req.file) {
      if (existingContact.image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "photos",
          existingContact.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.filename;
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

const oneController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await oneServices(id);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  contactController,
  allController,
  deleteController,
  updateController,
  oneController,
};
