const express = require("express");
const {
  saveUserPersonalInfo,
  getUserPortfolio,
  saveUserSkills,
  saveUserContactUrl,
  saveUserProfilePic,
} = require("../../controller/user/userPortfolioController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/userAuth");

router.post(
  "/user/save/personalinfo",
  isAuthenticatedUser,
  authorizeRoles("user"),
  saveUserPersonalInfo
);

router.post(
  "/user/save/profilepic",
  isAuthenticatedUser,
  authorizeRoles("user"),
  saveUserProfilePic
);

router.post(
  "/user/save/skills",
  isAuthenticatedUser,
  authorizeRoles("user"),
  saveUserSkills
);

router.post(
  "/user/save/contacturl",
  isAuthenticatedUser,
  authorizeRoles("user"),
  saveUserContactUrl
);

router.get(
  "/user/m/portfolio",
  isAuthenticatedUser,
  authorizeRoles("user"),
  getUserPortfolio
);

module.exports = router;
