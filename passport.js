/*****************************************************************************
 * Strategy *
 * Passport strategy for the app.
 ****************************************************************************/
var LocalStrategy = require('passport-local').Strategy;
var mDB           = require('./db.js');

module.exports = function(passport)
  {
  /******************************************************************************
   * deserializeUser *
   ***
   * Deserialize the user and check them against the database.
   *****************************************************************************/
  passport.deserializeUser(function(id, done)
    {
    mDB.establishConnection();
    mDB.conn.query("SELECT * FROM Users u JOIN Employees e ON e.ID = u.EmployeeID WHERE e.ID = ?;", [id], function(err,rows)
      {
      mDB.conn.end();

      if (err) throw err;

      var user = rows[0];

      done(err, user);
      });
    });

  /******************************************************************************
   * serializeUser *
   ***
   * Serialized the user.
   *****************************************************************************/
  passport.serializeUser(function(user, done)
    {
    done(null, user.ID);
    });

  /******************************************************************************
   * Passport Local Strategy *
   ***
   * Define the Local Strategy for Passport.
   *****************************************************************************/
  passport.use('local', new LocalStrategy(function(username, password, done)
    {
    process.nextTick(function()
      {
      mDB.establishConnection();

      mDB.conn.query('SELECT * FROM Users u JOIN Employees e ON e.ID = u.EmployeeID  WHERE u.Username = ? AND u.Password = ?;', [username, password],
        function(err, results)
        {
        mDB.conn.end();

        if (err) throw err;

        var user = results[0];

        if(!user)
          return done(null, false);

        return done(null, user);
        });
      });
    }));
  }