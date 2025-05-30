const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not found!", success: false });
    }

    const decoded = jwt.verify(token, "zxcvbnm");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res
      .status(401)
      .json({ message: "Invalid or expired token!", success: false });
  }
};

module.exports = isAuth;
