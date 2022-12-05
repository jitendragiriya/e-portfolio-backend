const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Portfolio = require("../../models/user/PortfolioModel");

exports.getAdminPortfolio = catchAsyncErrors(async (req, res, next) => {
  const response = await Portfolio.findOne({});

  res.status(200).json({
    success: true,
    response,
  });
});
