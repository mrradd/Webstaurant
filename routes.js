/*****************************************************************************
 * routes *
 * Server routes.
 ****************************************************************************/
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
    res.sendfile('./app/index.html');
    });

  /** Loads Manager config page. */
  app.get('/config', function(req, res)
    {
    validateUser.validateType(req, [etWaiter, etManager, etCook], function(pass)
      {
      if(pass)
        res.render('config');
      else
        res.redirect('/');
      });
    });

  /** Loads Kitchen page. */
  app.get('/kitchen', function(req, res)
    {
    validateUser.validateType(req, [etManager, etCook], function(pass)
      {
      if(pass)
        res.render('kitchen');
      else
        res.redirect('/config');
      });
    });

  /** Loads Manager page. */
  app.get('/manager', function(req, res)
    {
    validateUser.validateType(req, [etManager], function(pass)
      {
      if(pass)
        res.render('manager');
      else
        res.redirect('/config');
      });
    });

  /** Loads Manager edit menu page. */
  app.get('/manager-edit-menu', function(req, res)
    {
    validateUser.validateType(req, [etManager], function(pass)
      {
      if(pass)
        res.render('manager-edit-menu');
      else
        res.redirect('/config');
      });
    });

  /** Loads Manager edit user page. */
  app.get('/manager-users', function(req, res)
    {
    validateUser.validateType(req, [etManager], function(pass)
      {
      if(pass)
        res.render('manager-users');
      else
        res.redirect('/config');
      });
    });

  /** Render POS page. */
  app.get('/pos', function(req, res)
    {
    validateUser.validateType(req, [etWaiter, etManager], function(pass)
      {
      if(pass)
        res.render('pos');
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