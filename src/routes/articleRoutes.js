const express = require("express");
const router = express.Router();
const {
  getArticles,
  createArticle,
  updateArticle,
} = require("../controllers/articleController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, authorizeAdmin, createArticle);
router.post("/get-all", getArticles);
router.put(
  "/update/:topicId",
  authenticateToken,
  authorizeAdmin,
  updateArticle
);
module.exports = router;
