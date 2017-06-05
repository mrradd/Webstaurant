/*****************************************************************************
 * db *
 * Database info.
 ****************************************************************************/
/*****************************************************************************
 * MySQL Connection info. *
 *****************************************************************************/
var mysql = require('mysql');
var db    = {};
db.conn   = null;
db.establishConnection = function()
  {
  db.conn = mysql.createConnection(
    {
    host    : "testdb3.cilqftni5rud.us-west-2.rds.amazonaws.com",
    user    : "testuser3",
    password: "Testuser3",
    port    : "3306",
    database: "DBMain",
    multipleStatements: true
    });
  }

module.exports = db;
