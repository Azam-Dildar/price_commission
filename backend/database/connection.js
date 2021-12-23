const mysql = require("mysql");

require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "price_comparison",
});

// check connection
db.connect((err) => {
  if (err) {
    return console.error("error : ", err.message);
  }

  console.log("Database is connected");
});

module.exports = db;
