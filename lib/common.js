var common = exports;
var path = require('path');

common.lib = path.resolve(__dirname, '..', 'lib');

// Useful for triggering ECONNREFUSED errors on connect()
common.bogusPort = 47378;
// Useful for triggering ER_ACCESS_DENIED_ERROR errors on connect()
common.bogusPassword = 'INVALID PASSWORD';
// Used for simulating a fake mysql server
common.fakeServerSocket = __dirname + '/fake_server.sock';

common.testDatabase = process.env.MYSQL_DATABASE || 'TEST_DATABASE';

// Export common modules
common.Mysql = require(common.lib + '/mysql');