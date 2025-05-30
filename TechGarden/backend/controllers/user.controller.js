const userServices = require("../services/user.service");

const signupController = async (req, res) => {
  try {
    const { email, password, conformPassword } = req.body;
    let result = await userServices.signupService(
      email,
      password,
      conformPassword
    );
    res.status(result.status).json(result);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await userServices.signinService(email, password);
    res
      .cookie("token", result.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        Credential: true,
      })
      .status(200)
      .json(result);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { signupController, signinController };
