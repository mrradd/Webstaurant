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
  mDB.establishConnection();

  var cmd    = 'SELECT * FROM Sess WHERE SessionID = ?';
  var sessID = req.sessionID;

  mDB.conn.query(cmd,[sessID],function(err,rows)
    {

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

    callback(pass);
    });
  }

module.exports = validateUser;