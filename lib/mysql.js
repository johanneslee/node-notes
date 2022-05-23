const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const { DATABASE_URL } = process.env;
const pool = mysql2.createPool(DATABASE_URL);

exports.getPool = () => {
  return pool;
};