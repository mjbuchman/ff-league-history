const db = require("./db");
const config = require("../config");

async function getMatchupsByOwner(owner) {
  return await db.query(`CALL getMatchupsByOwner(?)`, owner);
}

module.exports = {
    getMatchupsByOwner
};