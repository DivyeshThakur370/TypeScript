const fs = require("fs");
const path = require("path");
const contactModel = require("../models/contact.model");

const contactService = async (image, name, email, number, id) => {
  try {
    const data = await contactModel.create({
      image,
      name,
      email,
      number,
      userId: id,
    });
    return {
      status: 201,
      message: "User created successfully 🎉",
      data,
      success: true,
    };
  } catch (error) {
    console.error(error);
  }
};

const allServices = async (id) => {
  try {
    const data = await contactModel.find({ userId: id });
    if (data.length < 0) {
      return {
        status: 409,
        message: "You don't have data ⚠️",
        success: false,
      };
    }
    return {
      status: 201,
      message: "Data get successfully 🎉",
      data,
      success: true,
    };
  } catch (error) {
    console.error(error.message);
  }
};

const deleteServices = async (id) => {
  try {
    const data = await contactModel.findOne({ _id: id });
    if (!data) {
      return {
        status: 409,
        message: "Data does not exist ⚠️",
        success: false,
      };
    }

    // Check if image field exists and is a string before joining the path
    if (data.image && typeof data.image === "string") {
      const imagePath = path.join(__dirname, "../photos", data.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted successfully");
      }
    } else {
      console.log("No valid image path to delete");
    }

    // Correct usage: findByIdAndDelete accepts id, not object
    let deletedData = await contactModel.findByIdAndDelete(id);

    return {
      status: 201,
      message: "Data Deleted successfully 🎉",
      deletedData,
      success: true,
    };
  } catch (error) {
    console.error(error.message);
    // Return error object instead of undefined to avoid caller errors
    return {
      status: 500,
      message: "Internal server error",
      success: false,
      error: error.message,
    };
  }
};

const oneServices = async (id) => {
  try {
    const data = await contactModel.findOne({ _id: id });
    if (!data) {
      return {
        status: 409,
        message: "You don't have data ⚠️",
        success: false,
      };
    }
    return {
      status: 201,
      message: "Data get successfully 🎉",
      data,
      success: true,
    };
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  contactService,
  allServices,
  deleteServices,
  // updateService,
  oneServices,
};
