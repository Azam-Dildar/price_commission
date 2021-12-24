const db = require("../database/connection");

exports.getAllMobile = (req, res) => {
  db.query(
    "SELECT mobile_data_table.mobile_model, mobile_data_table.mobile_price, mobile_data_table.mobile_image, websites_table.site_name, websites_table.site_url FROM websites_table RIGHT JOIN mobile_data_table ON websites_table.site_id = mobile_data_table.site_id ORDER BY mobile_data_table.mobile_price;",
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
    `SELECT mobile_data_table.mobile_model, mobile_data_table.mobile_price, mobile_data_table.mobile_image, websites_table.site_name, websites_table.site_url FROM websites_table RIGHT JOIN mobile_data_table ON mobile_data_table.mobile_model LIKE CONCAT('%', ?,  '%') AND websites_table.site_id = mobile_data_table.site_id ORDER BY mobile_data_table.mobile_price;`,
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
