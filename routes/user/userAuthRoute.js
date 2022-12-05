const express = require("express");
const {
  userLogin,
  userSignup,
  userLogout,
  getUserDetails,
} = require("../../controller/user/userAuthController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/userAuth");

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/user/me", isAuthenticatedUser, getUserDetails);

module.exports = router;
