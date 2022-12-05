const express = require("express");
const {
  getPublicUserPortfolio,
} = require("../../controller/public/publicPortfolioController");

const router = express.Router();

router.get("/portfolio/user/:user", getPublicUserPortfolio);

module.exports = router;
