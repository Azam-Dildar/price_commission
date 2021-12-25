const db = require("../database/connection");

exports.getAllMobile = (req, res) => {
  db.query(
    "SELECT mobile_data_table.mobile_model, mobile_data_table.mobile_price, mobile_data_table.mobile_image, mobile_data_table.site_url FROM mobile_data_table",
    (err, payload) => {
      if (err) {
        console.error("error : ", err.message);
        return res.status(500).json({ err });
      } else {
        return res.status(200).json({ payload });
      }
    }
  );
};

exports.searchMobiles = (req, res) => {
  console.log("Name : ", req.params.model);
  db.query(
    `SELECT mobile_data_table.mobile_model, mobile_data_table.mobile_price, mobile_data_table.mobile_image, mobile_data_table.site_url FROM mobile_data_table WHERE mobile_data_table.mobile_model LIKE CONCAT('%', ?,  '%');`,
    [req.params.model],
    (err, payload) => {
      if (err) {
        console.error("error : ", err.message);
        return res.status(500).json({ err });
      } else {
        return res.status(200).json({ payload });
      }
    }
  );
};
