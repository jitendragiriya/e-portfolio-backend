const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Portfolio = require("../../models/user/PortfolioModel");
const ErrorHandler = require("../../utils/errorhander");

exports.getPublicUserPortfolio = catchAsyncErrors(async (req, res, next) => {
  const user = req.params.user;
  const portfolio = await Portfolio.findOne({ "user.username": user });

  if (!portfolio) return next(new ErrorHandler("This user is not exist", 404));
  res.status(200).json({
    success: true,
    response: portfolio,
  });
});
