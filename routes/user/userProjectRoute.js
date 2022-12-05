const express = require("express");
const {
  addUserProject,
  getUserAllProject,
  getUserProjectDetail,
  deleteUserProject,
  updateUserProject,
} = require("../../controller/user/userProjectController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/userAuth");
const router = express.Router();

router.post(
  "/user/addproject",
  isAuthenticatedUser,
  authorizeRoles("user"),
  addUserProject
);

router.get(
  "/user/allproject/",
  isAuthenticatedUser,
  authorizeRoles("user"),
  getUserAllProject
);

router.get(
  "/user/project/:id",
  isAuthenticatedUser,
  authorizeRoles("user"),
  getUserProjectDetail
);

router.post(
  "/user/project/update/:id",
  isAuthenticatedUser,
  authorizeRoles("user"),
  updateUserProject
);

router.delete(
  "/user/project/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("user"),
  deleteUserProject
);

module.exports = router;
