const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Request received");
});

module.exports = router;
