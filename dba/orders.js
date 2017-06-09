/*****************************************************************************
 * Orders *
 * Database accessors for Orders.
 ****************************************************************************/
var mDB    = require('../db.js');
var utils  = require('../utils.js');

var orders = {};

/******************************************************************************
 * closeOrder *
 ***
 * Marks an order in the database as closed.
 *
 * @param  orderID   Order ID to of order to mark as closed.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
orders.closeOrder = function (orderID, callBack)
  {
  var cmd = "UPDATE Orders SET Closed = 1 WHERE ID = ?;";

  mDB.establishConnection();
  mDB.conn.connect();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd, [orderID], function(err)
    {
    if(err) throw err;
    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDB.conn.end();
  }

/******************************************************************************
 * getOpenOrders *
 ***
 * Gets all orders from the database that are not closed.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
orders.getOpenOrders = function (callBack)
  {
  var cmd =
    "SELECT o.ID AS OID, o.OrderNumber, o.TransactionType, li.ID AS LIID, i.Name\n" +
    "FROM Orders    o\n"                            +
    "JOIN LineItems li ON li.OrderID = o .ID\n"     +
    "JOIN Items     i  ON i .ID      = li.ItemID\n" +
    "WHERE Closed = 0;";

  mDB.establishConnection();
  mDB.conn.connect();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd ,function(err,rows)
    {
    if(err) throw err;

    console.log(cmd + "\n");
    console.log(rows);
    callBack(err, rows);
    });

  /** Cleanup and close the connection. */
  mDB.conn.end();
  }

/******************************************************************************
 * saveOrder *
 ***
 * Creates an Order in the database.
 *
 * @param  order     Order to use to create the new Order record.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
orders.saveOrder = function(order, callBack)
  {

  mDB.establishConnection();
  mDB.conn.connect();

  var orderID = 0;

  //GENERATE RANDOM NUMBER.
  function getRandomInt(min, max)
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }

  //TODO CH  ORDER NUMBER MUST BE DYNAMIC FROM ORDER.
  /** Create the sql command for creating the order, and saving the most recent order id. */
  var ord        = order['order'];
  var ordNum     = getRandomInt(1,999);
  var orderParms = [ord.date,ord.employeeID,ordNum, ord.paid,ord.closed,ord.transactionType];
  var orderCmd   =
    "INSERT INTO Orders (Date, EmployeeID, OrderNumber, Paid, Closed, TransactionType)\n" +
    "VALUES(?,?,?,?,?,?); SET @LastID = LAST_INSERT_ID();";

  /** Save order record. */
  mDB.conn.query(orderCmd, orderParms, function(err)
    {
    if(err) throw err;
    /** Get ID for the order. */
    mDB.conn.query("SELECT @LastID AS OrderID;",  function(err, rows)
      {
      if(err) throw err;
      orderID = rows[0].OrderID;

      /** Iterate through all items, and create the sql command for saving each order line item. */
      var items      = order['items'];
      var itemParms  = [];
      var cmdItem    = "";

      for(var i = 0; i < items.length; i++)
        {
        //TODO CH  TAX RATE, QUANTITY, DISCOUNT, AND DISCOUNT AMOUNT MUST BE DYNAMIC FROM INCOMING ORDER.
        var qty      = 1;
        var subTotal = utils.round(items[i].Price * qty, 2);
        var taxRate  = 0.0875;
        var taxAmt   = utils.round(subTotal * taxRate, 2);
        var total    = subTotal + taxAmt;

        cmdItem +=
          "INSERT INTO LineItems (ItemID, OrderID, Price, Quantity, Discount, DiscountAmount, Subtotal, TaxRate, TaxAmount, TotalAmount)\n" +
          "VALUES (?,?,?,?,?,?,?,?,?,?);\n";

        var itemParms = [items[i].ID,orderID,items[i].Price,qty,0,0,items[i].Price,taxRate,taxAmt,total];

        itemParms.concat(itemParms);
        }

      /** Save order items. */
      mDB.conn.query(cmdItem, itemParms, function(err)
        {
        if(err) throw err;

        /** Cleanup and close the connection. */
        mDB.conn.end();

        callBack(err);
        });
      });
    });
  }

module.exports = orders;