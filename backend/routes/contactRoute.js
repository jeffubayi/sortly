const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware.js");
const {contactUs} = require("../controllers/contactController.js");

router.post('/', protect, contactUs)

module.exports = router;