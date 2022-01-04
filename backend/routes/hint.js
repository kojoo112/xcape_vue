const express = require("express");
const router = express.Router();
const db_config = require("../config/database.js");
const connection = db_config.init();

connection.connect();

/**
 *  가맹점을 불러오는 쿼리
 */
router.get("/merchant/list", function (req, res) {
  let sql = "SELECT merchant_code, merchant_name FROM merchant;";
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    else res.send(rows);
  });
});

/**
 *  테마를 불러오는 쿼리
 */
router.get("/theme/list", function (req, res) {
  let sql = `SELECT theme_code, theme_name FROM theme WHERE merchant_code = '${req.query.merchantCode}';`;
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    else res.send(rows);
  });
});

/**
 *  힌트를 불러오는 쿼리
 */
router.get("/hint/list", function (req, res) {
  let sql = `SELECT message1, message2 FROM hint 
             WHERE 
              merchant_code = '${req.query.merchantCode}' 
             AND 
              theme_code = '${req.query.themeCode}';`;
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    else res.send(rows);
  });
});

module.exports = router;
