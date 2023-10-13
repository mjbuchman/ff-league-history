const config = {
    db: {
      host: "us-cdbr-east-04.cleardb.com",
      user: process.env.REACT_APP_DB_USERNAME,
      password: process.env.REACT_APP_DB_PASSWORD,
      database: "heroku_b07eee809c333e6",
      connectTimeout: 60000,
      multipleStatements: true
    },
};
module.exports = config;