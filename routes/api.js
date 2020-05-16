const express = require("express");
const router = new express.Router();
const dogsRouter = require("./dogs");

router.get("/", (req, res) => {
  res.send("try again");
});

router.use("/dogs", dogsRouter);

module.exports = router;
