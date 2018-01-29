/*****************************************************************************
 * db *
 * Database info.
 ****************************************************************************/
/*****************************************************************************
 * Configuration info template. *
 * Enter configuration info in this file, and rename it to config.js. DO NOT
 * COMMIT config.js.
 *****************************************************************************/
var config =
  {
  db :
    {
    host    : "rds.amazonaws.com",
    user    : "user",
    password: "password",
    port    : "8000",
    database: "DBName",
    multipleStatements: true
    },
  session:
    {
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 10, secure:false },
    resave: bool,
    httpOnly: bool,
    saveUninitialized: bool
    }
  };

module.exports = config;
