const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
} = require("../controllers/categoryController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, authorizeAdmin, createCategory);
router.post("/get-all", getCategories);
router.put(
  "/update/:categoryId",
  authenticateToken,
  authorizeAdmin,
  updateCategory
);
module.exports = router;
