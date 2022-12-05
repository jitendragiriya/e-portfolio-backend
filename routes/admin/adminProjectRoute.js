const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/userAuth");
const {
  AddProject,
  AllProject,
  getOneProject,
  deleteProjectAdmin,
} = require("../../controller/admin/adminPojectController");
const router = express.Router();

router.post(
  "/admin/addproject",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AddProject
);

router.delete(
  "/admin/project/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProjectAdmin
);

router.get("/admin/allproject", AllProject);

router.get("/admin/project/:id", getOneProject);
module.exports = router;
