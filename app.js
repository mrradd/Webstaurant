/*****************************************************************************
 * app *
 * The main app for the server.
 ****************************************************************************/
var http          = require('http');
var path          = require('path');
var mysql         = require('mysql');
var mDB           = require('./db.js');
var fs            = require('fs');
var express       = require('express');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var passport      = require('passport');
var bodyParser    = require('body-parser');
var morgan        = require('morgan');
var config        = require('./config.js');
var app           = express();

/** Establish root directory. */
app.use(express.static(__dirname));

/** Setup parsers. */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Setup the session. */
app.use(session(
  {
  secret: config.session.secret,
  cookie: config.session.cookie,
  resave: config.session.resave,
  httpOnly: config.session.httpOnly,
  saveUninitialized: config.session.saveUninitialized
  }));

/** Passport. */
app.use(passport.initialize());
app.use(passport.session());

/** Use morgan to log requests to the console. */
app.use(morgan('dev'));

/** Create db connection pool. */
mDB.establishPool();

/** Setup needed modules. */
require('./passport.js')(passport);
require('./routes.js')(app);
require('./services.js')(app);

module.exports = app;
