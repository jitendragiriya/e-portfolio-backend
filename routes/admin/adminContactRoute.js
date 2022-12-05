const express = require("express");
const { AllContact } = require("../../controller/admin/adminContactController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/userAuth");
const router = express.Router();

router.get(
  "/admin/allcontact",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AllContact
);

module.exports = router;
