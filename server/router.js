const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "ConnectCord server is running up..." }).status(200);
});

module.exports = router;
