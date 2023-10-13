var express = require('express');
var router = express.Router();

router.get("/drafts/:year", (req, res) => {
    var query = `select * from Drafts where Year = ${req.params.year}`;
});
  
router.get("/drafts/keepers/:year", (req, res) => {
    var query = `select * from Keepers where Year = ${req.params.year}`;
});

module.exports = router;