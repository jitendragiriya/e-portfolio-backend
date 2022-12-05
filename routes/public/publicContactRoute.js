const express = require("express");
const {
  savePublicContact,
} = require("../../controller/public/publicContactController");

const router = express.Router();

router.post("/public/contact/:user", savePublicContact);

module.exports = router;
