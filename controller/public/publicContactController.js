const Contact = require("../../models/public/Contact");

const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

exports.savePublicContact = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;

  let prevContact = await Contact.findOne({ email });

  if (prevContact) {
    response = await Contact.updateOne(
      { email },
      {
        $push: { message: { msg: message } },
      }
    );
  } else {
    response = await Contact.create({
      name,
      email,
      message: { msg: message },
      sendTo:req.params.user
    });
  }
  res.status(200).json({
    success: true,
    response: "Thank you for contacting us.",
  });
});

