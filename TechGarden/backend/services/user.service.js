const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const signupService = async (email, password, conformPassword) => {
  try {
    if (!email || !password || !conformPassword) {
      return {
        status: 409,
        message: "Please fill all field ⚠️",
        success: false,
      };
    }
    let isExist = await userModel.findOne({ email });
    if (isExist) {
      return {
        status: 401,
        message: "Email is allready Exist ⚠️",
        success: false,
      };
    }
    if (password !== conformPassword) {
      return {
        status: 409,
        message: "Password is not equal to conform password ⚠️",
        success: false,
      };
    }
    let hashPassword = await bcrypt.hash(password, 8);
    let user = await userModel.create({
      email,
      password: hashPassword,
      conformPassword,
    });
    return {
      status: 201,
      message: "Signup Successfully 🎉",
      data: user,
      success: true,
    };
  } catch (error) {
    console.error(error.message);
    return {
      status: 500,
      message: "server error",
      error: error.message,
      success: false,
    };
  }
};
const signinService = async (email, password) => {
  try {
    if (!email || !password) {
      return {
        status: 409,
        message: "Please fill all field ⚠️",
        success: false,
      };
    }
    let isExist = await userModel.findOne({ email });
    if (!isExist) {
      return {
        status: 401,
        message: "Email is not found ⚠️",
        success: false,
      };
    }

    let checkPassword = await bcrypt.compare(password, isExist.password);
    if (!checkPassword) {
      return {
        status: 409,
        message: "Password is invalide ⚠️",
        success: false,
      };
    }
    var token = await jwt.sign({ user: isExist }, "zxcvbnm");
    return {
      status: 201,
      message: "Signin Successfully 🎉",
      data: isExist,
      token: token,
      success: true,
    };
  } catch (error) {
    console.error(error.message);
    return {
      status: 500,
      message: "server error",
      error: error.message,
      success: false,
    };
  }
};
module.exports = { signupService, signinService };
