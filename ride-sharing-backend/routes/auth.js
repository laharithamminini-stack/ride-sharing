
console.log("✅ Auth routes loaded");

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

// ================= REGISTER =================
router.post("/register", authController.register);

// ================= LOGIN =================
router.post("/login", authController.login);

// ================= PROFILE =================
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;