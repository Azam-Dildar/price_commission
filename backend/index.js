const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
// const mysql = require("mysql");
const controllers = require("./controllers/mobileController");

// environment variables access
require("dotenv").config();

//cors allow
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// morgan

//database connection

// routes
app.get("/", controllers.getAllMobile);
app.get("/model=:model", controllers.searchMobiles);

//server listen
app.listen(process.env.PORT, () => {
  console.log("Server is running!..");
});
