const Contact = require("../../models/public/Contact");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

exports.AllContact = catchAsyncErrors(async (req, res, next) => {
  const response = await Contact.find({});
  res.status(200).json({
    success: true,
    response,
  });
});
