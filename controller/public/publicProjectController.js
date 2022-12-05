const Project = require("../../models/user/ProjectModel");

const catchAsyncErrors = require("../../middleware/catchAsyncErrors");

exports.getPublicAllProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.find({ "user.username": req.params.user });
  res.status(200).json({
    success: true,
    response: project,
  });
});
