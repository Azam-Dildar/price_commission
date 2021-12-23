const db = require("../database/connection");

exports.getAllMobile = (req, res) => {
  db.query("SELECT * FROM websites_table;", (err, payload) => {
    if (err) {
      console.error("error : ", err.message);
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ payload });
    }
  });
};

exports.searchMobiles = (req, res) => {
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
