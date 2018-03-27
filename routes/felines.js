const express = require("express");
const router = express.Router();


router.get("/", function(req, res){
  res.send("Feline Routes");
});

module.exports = router;