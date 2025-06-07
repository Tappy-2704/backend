const express = require("express");
const router = express.Router();
const {
  register,
  login,
  loginAdmin,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// admin

router.post("/admin/login", loginAdmin);
module.exports = router;
