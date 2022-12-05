const express = require("express");
const { getAdminPortfolio } = require("../../controller/public/publicController");
const router = express.Router();

router.get("/portfolio/admin",getAdminPortfolio);

module.exports = router;
