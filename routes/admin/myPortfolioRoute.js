const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/userAuth");
const {
  saveAdminPortfolio,
  updateAdminPortfolio,
  getMyPortfolio,
} = require("../../controller/admin/myPortfolioController");
const router = express.Router();

router.post(
  "/admin/portfolio",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  saveAdminPortfolio
);

router.get(
  "/admin/m/portfolio",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getMyPortfolio
);

router.put(
  "/admin/portfolio/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateAdminPortfolio
);
module.exports = router;
