const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name : {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      , "Please add a valid email"]
  },
  password : {
    type: String,
    required: [true, 'Please add a password'],
    minLength: [6, "Password must be upto 6 characters"],
  },
  photo: {
    type: String,
    required: [true, 'Please add a profile photo'],
    default: 'http://i.ibb.co/4pDNDk1/avatar.png'
  },
  phone : {
    type: String,
    default: "+254"
  },
  bio: {
    type: String,
    maxLength: [250, "Bio can't be more than 250 caharacters"],
    default:"bio"
  },
  role: {
    type: String,
    required: [true, 'Please add a name'],
    default:"bio"
  }
}, {
  timestamps: true,
});

  // Encrypt password before saving to DB
  userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
      return next()
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
  })

const User = mongoose.model("User", userSchema);

module.exports = User;