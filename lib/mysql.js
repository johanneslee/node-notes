require('dotenv').config();
const mysql = require('mysql2');

var mysql = require('mysql');
module.exports = function() {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  console.log('Connected to PlanetScale!');
  connection.connect();
  connection.query('SELECT 1 + 1 AS SOLUTION', 
  function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  connection.end();
}();