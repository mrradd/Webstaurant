/*****************************************************************************
 * ValidateUser *
 * Functions for validating the user.
 ****************************************************************************/
var mDB = require('../db.js');

var validateUser = {};

/*****************************************************************************
 * validateType *
 * Validates the type of the user and checks it against a list of types to
 * allow.
 * @param  req       App request.
 * @param  types     List of types to allow to the page.
 * @param  callback  Callback to execute once validation complete.
 ****************************************************************************/
validateUser.validateType = function(req, types, callback)
  {
  process.nextTick(function()
    {
    /** Verify session in the database. */
    var cmd    = 'SELECT * FROM Sess WHERE SessionID = ?';
    var sessID = req.sessionID;

    /** Query the db, and call the call back with the result set. */
    mDB.pool.getConnection(function(err, conn)
      {
      conn.query(cmd,[sessID],function(err,rows)
        {
        conn.release();

        console.log(rows[0]);

        if(err) throw err;

        var user = rows[0];
        var pass = false;

        /** Check against the types. */
        if(user)
          for(var i = 0; i < types.length; i++)
            {
            if(types[i] === user.EmployeeType)
              pass = true;
            }

        console.log(pass);
        callback(pass);
        //callback(true);
        });
      });
    });
  };

module.exports = validateUser;