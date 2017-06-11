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
  var cmd   = "INSERT INTO Items (Name, Description, Price, Type, SKU, BarCode) VALUES (?,?,?,?,?,?)";
  var parms = [item.name, item.description, item.price, item.type, item.sku, item.barcode];

  mDB.establishConnection();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd, parms, function(err)
    {
    if(err) throw err;

    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDB.conn.end();
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
  var cmd = "SELECT * FROM Items";

  /** Connect to the db. */
  mDB.establishConnection();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd, function(err, rows)
    {
    if(err) throw err;
    console.log(cmd + "\n");
    console.log(rows);
    callBack(err, rows);
    });

  /** Cleanup and close the connection. */
  mDB.conn.end();
  };

  module.exports = items;