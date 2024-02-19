const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware.js");
const { sendMessage } = require("../controllers/smsController.js");

router.post("/", protect, sendMessage);

module.exports = router;
