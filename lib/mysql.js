const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const { DATABASE_URL } = process.env;
const pool = mysql2.createPool(DATABASE_URL);

exports.query = (sql) => {
  const results = pool.getConnection((error, connection) => {
    if(error) throw error;
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if (error) throw error;
      console.log(results);
    });
  });
  return results;
};