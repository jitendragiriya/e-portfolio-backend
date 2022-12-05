const Portfolio = require("../../models/user/PortfolioModel");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const ErrorHandler = require("../../utils/errorhander");

exports.saveAdminPortfolio = catchAsyncErrors(async (req, res, next) => {
  let portfolio = await Portfolio.findOne({
    "user._id": req.user._id,
  });

  if (portfolio) {
    return next(new ErrorHandler("You have already a portfolio", 409));
  }
  req.body.user = req.user;
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "portfolioImg",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const saveMyData = await Portfolio.create(req.body);
  res.status(200).json({
    success: true,
    response: saveMyData,
  });
});

exports.getMyPortfolio = catchAsyncErrors(async (req, res, next) => {
  let portfolio = await Portfolio.findOne({
    "user._id": req.user._id,
  });

  res.status(200).json({
    success: true,
    response: portfolio,
  });
});

exports.updateAdminPortfolio = catchAsyncErrors(async (req, res, next) => {
  let portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return next(new ErrorHandler("Please create portfolio", 404));
  }

  portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    response: portfolio,
  });
});
