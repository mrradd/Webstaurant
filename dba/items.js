/*****************************************************************************
 * Items *
 * Database accessors for Items.
 ****************************************************************************/
var mDB = require('../db.js');

var items = {};

/******************************************************************************
 * createItem *
 ***
 * Submits item detail to the database to create an Item entry.
 *
 * @param  item      Item to use to create the new Item record.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
items.createItem = function (item, callBack)
  {
  var cmd   = "INSERT INTO Items (Name, Description, Price, Type) VALUES (?,?,?,?)";
  var parms = [item.name, item.description, item.price, item.type];

  /** Query the db, and call the call back with the result set. */
  mDB.pool.getConnection(function(err, conn)
    {
    conn.query(cmd, parms, function(err)
      {
      conn.release();

      if(err) throw err;

      callBack(err);
      });
    });
  };

/******************************************************************************
 * getItems *
 ***
 * Gets all items from the database.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
items.getItems = function(callBack)
  {
  var cmd = "SELECT i.ID, i.Name, i.Description, i.Price, tc.Name AS Type FROM Items i JOIN TypeConstants tc ON tc.Value = i.Type;"

  /** Query the db, and call the call back with the result set. */
  mDB.pool.getConnection(function(err, conn)
    {
    conn.query(cmd, function(err, rows)
      {

      /** Cleanup and close the connection. */
      conn.release();

      if(err) throw err;

      console.log(rows);

      callBack(err, rows);
      });
    });
  };

  module.exports = items;