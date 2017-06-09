/*****************************************************************************
 * routes *
 * Server routes.
 ****************************************************************************/
var passport = require('passport');

module.exports = function(app)
  {
  /*****************************************************************************
   * Page loads
   ****************************************************************************/
  /** Initial page to load. Loads login page. */
  app.get('/', function(req, res)
    {
    res.render('login', { message: req.flash('error') });
    });

  /** Loads Manager config page. */
  app.get('/config', function(req, res)
    {
    res.render('config');
    });

  /** Loads Kitchen page. */
  app.get('/kitchen', function(req, res)
    {
    res.render('kitchen');
    });

  /** Loads Manager page. */
  app.get('/manager', function(req, res)
    {
    res.render('manager');
    });

  /** Loads Manager edit menu page. */
  app.get('/manager-edit-menu', function(req, res)
    {
    res.render('manager-edit-menu');
    });

  /** Loads Manager edit user page. */
  app.get('/manager-users', function(req, res)
    {
    res.render('manager-users');
    });

  /** Render POS page. */
  app.get('/pos', function(req, res)
    {
    res.render('pos');
    });

  /** Perform Login authentication. */
  app.post('/login', passport.authenticate('local', { successRedirect: '/pos', failureRedirect: '/',
    failureFlash: 'Username or Password invalid.'}));
  }