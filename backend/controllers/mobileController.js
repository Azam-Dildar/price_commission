const db = require("../database/connection");

const getAllMobile = (req, res) => {
  db.query("SELECT * FROM websites_table;", (err, payload) => {
    if (err) {
      console.error("error : ", err.message);
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ payload });
    }
  });
};
const searchMobiles = (req, res) => {
  console.log(req.params.name);
  db.query("SELECT * FROM websites_table;", (err, payload) => {
    if (err) {
      console.error("error : ", err.message);
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ payload });
    }
  });
};

module.exports = { getAllMobile, searchMobiles };
