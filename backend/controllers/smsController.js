const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendSMS = require("../utils/send_sms");

const sendMessage = asyncHandler(async(req,res) => {
  const { recipients, message } = req.body;
  const user = await User.findById(req.user._id)

  if(!user) {
    res.status(400);
    throw new Error("User not found, Please sign up");
  }

  //Validation
  if(!message || !recipients) {
    res.status(400);
    throw new Error("Please add a message and recipient");
  }

  try {
    await sendSMS(message,recipients);
    res.status(200).json({success: true, message: `SMS successfully sent to ${recipients}`})
  } catch (error) {
    res.status(500);
    throw new Error("SMS not sent! Please try again");
  }
})

module.exports = {
    sendMessage 
}
