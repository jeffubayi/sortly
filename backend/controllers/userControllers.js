const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with that email already exists. Please log in");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });
  //Generate token
  const token = generateToken(user._id);

  // Send HTTP only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio,role } = user;
    res.status(201).json({ _id, name, email, photo, phone, bio,role, token });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }
  // Check is user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found,please register");
  }

  //User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //Generate token
  const token = generateToken(user._id);

  // Send HTTP only cookie
  if (passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio,role } = user;
    res.status(200).json({ _id, name, email, photo, phone, bio, role,token });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully logged out" });
});

//Get UserData
const getuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio,role } = user;
    res.status(200).json({ _id, name, email, photo, phone, bio,role });
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

//Check login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.photo = req.body.photo || photo;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, password } = req.body;
  if (!user) {
    res.status(404);
    throw new Error("User not found, please sign up!");
  }

  // Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password!");
  }

  //Check if oldpassword is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  //Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password changed successfully");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect!");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist!");
  }
  //Delete token if it exists in db
  let token = await Token.findOne({userId: user._id})
  if(token) {
    await token.deleteOne()
  }

  //Create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken)

  //Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //save token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), //30 mins
  }).save()

  // Construct a reset url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

  // Reset email
  const message = `
  <h2>Hello ${user.name} </h2>
  <p>Please use the url below to reset your password.</p>
  <p>This reset link is valid for 30 minutes</p>

  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  <p>Regards...</p>
  <p>Invent Team</p>
  `;

  const subject = "Password Reset Request";

  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({success: true, message: "Reset email sent"})
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent! Please try again");
  }

});

//Reset password
const resetPassword = asyncHandler(async(req,res) => {
  
  const  { password } = req.body;
  const { resetToken } = req.params;
  
  //Hash token, then compare to that in database
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    //Find token in db
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: {$gt: Date.now()}
    })

    if(!userToken) {
      res.status(404);
      throw new Error("Invalid or expired token")
    }
    
    // Find user
    const user = await User.findOne({_id: userToken.userId})
    user.password = password
    await user.save()
    res.status(200).json({message: "Password reset successful, Please log in"})
})

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getuser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword
};
