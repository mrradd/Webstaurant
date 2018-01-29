/*****************************************************************************
 * db *
 * Database info.
 ****************************************************************************/
/*****************************************************************************
 * MySQL Connection info. *
 *****************************************************************************/
var mysql  = require('mysql');
var config = require('./config.js');
var db     = {};
db.conn    = null;
db.establishConnection = function()
  {
  db.conn = mysql.createConnection(
    {
    host    : config.db.host,
    user    : config.db.user,
    password: config.db.password,
    port    : config.db.port,
    database: config.db.database,
    multipleStatements: config.db.multipleStatements
    });
  }

module.exports = db;
