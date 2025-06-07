const express = require("express");
const router = express.Router();
const {
  getArticles,getArticle,
  createArticle,
  updateArticle,
} = require("../controllers/articleController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, authorizeAdmin, createArticle);
router.get("/get-all", getArticles);
router.get("/:catId", getArticle);
router.put(
  "/update/:articleId",
  authenticateToken,
  authorizeAdmin,
  updateArticle
);
module.exports = router;
