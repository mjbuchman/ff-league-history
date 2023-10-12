var express = require('express');
var router = express.Router();
const queryDB = require("../connection/connection")

router.get("/drafts/:year", (req, res) => {
    var query = `select * from Drafts where Year = ${req.params.year}`;
    queryDB(res, query);
});
  
router.get("/drafts/keepers/:year", (req, res) => {
    var query = `select * from Keepers where Year = ${req.params.year}`;
    queryDB(res, query);
});

module.exports = router;