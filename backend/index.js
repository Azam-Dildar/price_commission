const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mysql = require("mysql");

// environment variables access
require("dotenv").config();

//cors allow
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// morgan

//database connection
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

// routes
app.get("/", (req, res) => {
  db.query("SELECT * FROM websites_table;", (err, result) => {
    if (err) {
      console.error("error : ", err);
      res.json(err);
    } else {
      console.log("Result : ", result);
      res.json(result);
    }
  });
  // res.send("Hello world!!!...");
});

//server listen
app.listen(process.env.PORT, () => {
  console.log("Server is running!..");
});
