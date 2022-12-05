const express = require("express");
const { getPublicAllProject } = require("../../controller/public/publicProjectController");
const router = express.Router();

router.get("/public/project/:user", getPublicAllProject);

module.exports = router;
