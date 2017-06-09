/*****************************************************************************
 * app *
 * The main app for the server.
 ****************************************************************************/
var http          = require('http');
var ejs           = require('ejs')
var path          = require('path');
var mysql         = require('mysql');
var mDB           = require('./db.js');
var fs            = require('fs');
var express       = require('express');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var flash         = require('connect-flash');
var passport      = require('passport');
var bodyParser    = require('body-parser');
var app           = express();

/** Establish root directory. */
app.use(express.static(__dirname));

/** Setup ejs. */
app.set('view engine', 'ejs');

/** Setup parsers. */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Setup the session. */
app.use(session(
  {
  secret: 'secret strategic xxzzz code',
  cookie: { maxAge: 1000 },
  resave: true,
  saveUninitialized: true
  }));

/** Passport. */
app.use(passport.initialize());
app.use(passport.session());

/** Setup Flash. */
app.use(flash());

/** Setup needed modules. */
require('./passport.js')(passport);
require('./routes.js')(app);
require('./services.js')(app);

module.exports = app;
