const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getuser,
  forgotPassword,
  loginStatus,
  updateUser,
  changePassword,
  resetPassword,
} = require("../controllers/userControllers.js");
const protect = require("../middleware/authMiddleware.js");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/getUser", protect, getuser);

router.get("/loggedIn", loginStatus);

router.patch("/updateuser", protect, updateUser);

router.patch("/changepassword", protect, changePassword);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;
