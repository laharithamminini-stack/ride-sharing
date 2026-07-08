
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretkey";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Received Token:", token);

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Error:", error);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;