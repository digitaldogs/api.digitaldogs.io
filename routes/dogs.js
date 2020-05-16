const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.send("All dogs for user");
});
router.get("/:id", (req, res) => {
  res.send("Get individual dog details");
});
router.get("/:id/pedigree", (req, res) => {
  res.send(
    JSON.stringify([
      {
        owner: 123,
        name: "fido",
        sex: "male",
        microchip: "abcde123",
        dob: "2018-01-01",
        sire: "557678",
        dam: "45023"
      },
      {
        owner: 456,
        name: "Ralph",
        sex: "female",
        microchip: "asdkjlkln2",
        dob: "2017-01-01",
        sire: "8815465",
        dam: "328668"
      }
    ])
  );
});

router.post("/", (req, res) => {
  res.status(200).send(JSON.stringify({ tokenID: "abcd1234" }));
});
router.put("/:id", (req, res) => {
  res.send("Transfer dog");
});

module.exports = router;
