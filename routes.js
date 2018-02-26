/*****************************************************************************
 * routes *
 * Server routes.
 ****************************************************************************/
var path         = require('path');
var passport     = require('passport');
var validateUser = require('./dba/validateuser.js');

module.exports = function(app)
  {
  const etManager = 'ET_MANAGER';
  const etWaiter  = 'ET_WAITER';
  const etCook    = 'ET_COOK';

  /*****************************************************************************
   * Page loads
   ****************************************************************************/
  /** Initial page to load. Loads login page. */
  app.get('/', function(req, res)
    {
    console.log('serving ' + __dirname + '/views/login.html');
    res.sendFile(path.join(__dirname +'/views/login.html'));
    });

  /** Loads Manager config page. */
  app.get('/config', function(req, res)
    {
    console.log('serving ' + __dirname + '/views/config.html');
    validateUser.validateType(req, [etWaiter, etManager, etCook], function(pass)
      {
      if(pass)
        res.sendFile(path.join(__dirname +'/views/config.html'));
      else
        res.redirect('/');
      });
    });

  /** Loads Kitchen page. */
  app.get('/kitchen', function(req, res)
    {
    console.log('serving ' + __dirname + '/views/kitchen.html');
    validateUser.validateType(req, [etManager, etCook], function(pass)
      {
      if(pass)
        res.sendFile(path.join(__dirname +'/views/kitchen.html'));
      else
        res.redirect('/config');
      });
    });

  /** Loads Metrics page. */
  app.get('/metrics', function(req, res)
    {
    console.log('serving ' + __dirname + '/views/metrics.html');
    validateUser.validateType(req, [etManager], function(pass)
      {
      if(pass)
        res.sendFile(path.join(__dirname +'/views/metrics.html'));
      else
        res.redirect('/config');
      });
    });

  /** Loads Edit Menu page. */
  app.get('/editMenu', function(req, res)
    {
    console.log('serving ' + __dirname + '/views/editMenu.html');
    validateUser.validateType(req, [etManager], function(pass)
      {
      if(pass)
        res.sendFile(path.join(__dirname +'/views/editMenu.html'));
      else
        res.redirect('/config');
      });
    });

  /** Loads Edit User page. */
  app.get('/employees', function(req, res)
    {
    console.log('serving ' + __dirname + '/views/employees.html');
    validateUser.validateType(req, [etManager], function(pass)
      {
      if(pass)
        res.sendFile(path.join(__dirname +'/views/employees.html'));
      else
        res.redirect('/config');
      });
    });

  /** Render POS page. */
  app.get('/pos', function(req, res)
    {
    console.log('serving ' + __dirname + '/views/pos.html');
    validateUser.validateType(req, [etWaiter, etManager], function(pass)
      {
      if(pass)
        res.sendFile(path.join(__dirname +'/views/pos.html'));
      else
        res.redirect('/config');
      });
    });

  /** Perform Login authentication, and save session info. */
  app.post('/login', passport.authenticate('local'), function(req, res)
    {
    if(!req.user)
      res.redirect('/');

    var mDB = require('./db.js');
    mDB.establishConnection();
    mDB.conn.query('INSERT INTO Sess(SessionID, UserID, EmployeeType) VALUES(?,?,?);',
      [req.sessionID, req.user.ID, req.user.EmployeeType], function(err)
      {
      mDB.conn.end();

      if (err) throw err;

      res.redirect('/config');
      });
    });
  }