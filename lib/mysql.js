require('dotenv').config();
const mysql2 = require('mysql2');

module.exports = Mysql
function Mysql() {
  Events.EventEmitter.call(this);
  this.connection = null;
  this.state = 'disconnected';
}

Mysql.createConnection = function createConnection() {
  const connection = mysql2.createConnection(process.env.DATABASE_URL);
  this.state = 'connected';
  return connection;
};

Mysql.createQuery = function createQuery(sql) {    
  const connection = this.connection.connect();
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
  connection.end();
}