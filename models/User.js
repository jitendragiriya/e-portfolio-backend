const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please Enter Your username"],
      maxLenght: [30, "Name cannot exceed 30 lcharacters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    firstname: {
      type: String,
      required: [true, "Please Enter Your firstname"],
      maxLenght: [30, "firstname cannot exceed 30 lcharacters"],
      minLength: [4, "firstname should have more than 4 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Please Enter Your lastname"],
      maxLenght: [30, "lastname cannot exceed 30 lcharacters"],
      minLength: [4, "lastname should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "please enter a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Please Enter your Password!"],
      minLength: [8, "Password should have more than 8 characters"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// hashing password before storing in the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// generate authToken

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};

//comparePassword
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating password reset Token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding the resetPasswordToken to the userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // reset Password token expire time is this
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
