const User = require("../../models/User");
const Portfolio = require("../../models/user/PortfolioModel");

const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

const ErrorHandler = require("../../utils/errorhander");

const sendToken = require("../../utils/JwtToken");

//user register
exports.userSignup = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("This user is already exist!", 401));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("password does not match, please try again!"));
  }

  user = await User.create(req.body);
  await Portfolio.create({ user });

  sendToken(user, 200, res);
});

//user login
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email and password!"));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }

  const passwordCompare = await user.comparePassword(password);

  if (!passwordCompare) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }
  sendToken(user, 200, res);
});

//user logout
exports.userLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout successfully",
  });
});

// user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
