const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  registerAdmin,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

module.exports = router;
