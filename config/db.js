const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "res",
});
// conn.connect()
// module.exports=conn

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("conn success!");
});

module.exports = {
  dataControl(sql, callback) {
    conn.query(sql, (err, res) => {
      if (err) {
        callback({
          status: false,
          msg: err,
        });
      } else {
        callback({
          status: true,
          data: res,
          msg: "success",
        });
      }
      // conn.release();
    });
  },
};