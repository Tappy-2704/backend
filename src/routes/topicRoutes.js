const express = require("express");
const router = express.Router();
const {
  getTopics,
  createTopic,
  updateTopic,
} = require("../controllers/topicController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, authorizeAdmin, createTopic);
router.get("/get-all", getTopics);
router.put("/update/:topicId", authenticateToken, authorizeAdmin, updateTopic);

module.exports = router;
