const Project = require("../../models/user/ProjectModel");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorhander");
const cloudinary = require("cloudinary").v2;

//adding project
exports.addUserProject = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "project",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user;

  const response = await Project.create(req.body);
  res.status(200).json({
    success: true,
    response: "your project added successfully.",
  });
});

//getting all projects
exports.getUserAllProject = catchAsyncErrors(async (req, res, next) => {
  const response = await Project.find({ "user.username": req.user.username });

  res.status(200).json({
    success: true,
    response,
  });
});

//get one project by id
exports.getUserProjectDetail = catchAsyncErrors(async (req, res, next) => {
  const response = await Project.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    response,
  });
});

//update one project by id
exports.updateUserProject = catchAsyncErrors(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Please try again!", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "project",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    response: "project updated successfully.",
  });
});

//delete one project by id
exports.deleteUserProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < project.images.length; i++) {
    await cloudinary.uploader.destroy(project.images[i].public_id);
  }
  await Project.deleteOne(project);
  res.status(200).json({
    success: true,
    response: "project deleted successfully!",
  });
});
