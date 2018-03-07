/*****************************************************************************
 * Orders *
 * Database accessors for Orders.
 ****************************************************************************/
var mDB    = require('../db.js');
var utils  = require('../utils.js');
var config = require('../config.js');

var orders = {};

/******************************************************************************
 * getOrders *
 ***
 * Gets all orders from the database that opened or closed depending on the
 * passed in filter.
 *
 * @param  isClosed
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
orders.getOrders = function (isClosed, callBack)
  {
  var cmd =
    "SELECT o.ID AS OID, o.OrderNumber, o.TransactionType, li.ID AS LIID, i.Name\n" +
    "FROM Orders    o\n"                            +
    "JOIN LineItems li ON li.OrderID = o .ID\n"     +
    "JOIN Items     i  ON i .ID      = li.ItemID\n" +
    "WHERE Closed = ?" +
    "ORDER BY o.OrderNumber, i.Name;";

  mDB.pool.getConnection(function(err, conn)
    {
    /** Query the db, and call the call back with the result set. */
    conn.query(cmd, [isClosed] ,function(err,rows)
      {
      conn.release();

      if(err) throw err;

      console.log(rows);

      callBack(err, rows);
      });
    });
  }

/******************************************************************************
 * getOrderTotals *
 ***
 * Gets totals for closed orders.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
orders.getOrderTotals = function (callBack)
  {
  var cmd = "SELECT o.OrderNumber, SUM(li.TotalAmount) AS Total\n" +
              "FROM Orders    o\n" +
              "JOIN LineItems li ON li.OrderID = o.ID\n" +
             "WHERE o.Closed = 1\n" +
             "GROUP BY o.OrderNumber;\n";

  mDB.pool.getConnection(function(err, conn)
    {
    /** Query the db, and call the call back with the result set. */
    conn.query(cmd ,function(err,rows)
      {
      conn.release();

      if(err) throw err;

      console.log(rows);

      callBack(err, rows);
      });
    });
  };

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

  var orderID = 0;

  //TODO CH  GENERATE RANDOM NUMBER FOR ORDER. SHOULD BE GENERATED DYNAMICALLY.
  function getRandomInt(min, max)
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }

  /** Create the sql command for creating the order, and saving the most recent order id. */
  var ord        = order['order'];
  var ordNum     = getRandomInt(1,10000);
  var orderParms = [ord.date, ord.employeeID, ordNum, ord.paid, ord.closed, ord.transactionType];
  var orderCmd   =
    "INSERT INTO Orders (Date, EmployeeID, OrderNumber, Paid, Closed, TransactionType)\n" +
    "VALUES(?,?,?,?,?,?); SET @LastID = LAST_INSERT_ID();";

  /** Save order record. */
  mDB.pool.getConnection(function(err, conn)
    {
    conn.query(orderCmd, orderParms, function(err)
      {
      if(err) throw err;

      /** Get ID for the order. */
      conn.query("SELECT @LastID AS OrderID;",  function(err, rows)
        {
        if(err) throw err;
        orderID = rows[0].OrderID;

        /** Iterate through all items, and create the sql command for saving each order line item. */
        var items   = order['items'];
        var cmdItem = "";

        for(var i = 0; i < items.length; i++)
          {
          //TODO CH  load tax rate, discount, discount amount dynamically from incoming order.
          var qty      = 1;
          var subTotal = utils.round(items[i].Price * qty, 2);
          var taxRate  = config.app.tax;
          var taxAmt   = utils.round(subTotal * taxRate, 2);
          var total    = subTotal + taxAmt;

          cmdItem +=
            "INSERT INTO LineItems (ItemID, OrderID, Price, Quantity, Discount, DiscountAmount, Subtotal, TaxRate, TaxAmount, TotalAmount)\n" +
            "VALUES (" +
            mDB.conn.escape(items[i].ID)          + "," +
            mDB.conn.escape(orderID)              + "," +
            mDB.conn.escape(items[i].Price)       + "," +
            mDB.conn.escape(qty)                  + ",0,0," +
            mDB.conn.escape(items[i].Price * qty) + "," +
            mDB.conn.escape(taxRate)              + "," +
            mDB.conn.escape(taxAmt)               + "," +
            mDB.conn.escape(total)                + ");\n";
          }

        /** Save order items. */
        conn.query(cmdItem, function(err)
          {
          /** Cleanup the connection. */
          conn.release();

          if(err) throw err;

          callBack(err);
          });
        });
      });
    });
  };

/******************************************************************************
 * updateOrder *
 ***
 * Marks an order in the database as closed.
 *
 * @param  orderID     Order ID to of order to mark as closed.
 * @param  closeOrder  True: close order. False: open order.
 * @param  callBack    Callback function to handle response from database call.
 *****************************************************************************/
orders.updateOrder = function (closeOrder, orderID, callBack)
  {
  var cmd = "UPDATE Orders SET Closed = ? WHERE ID = ?;";

  mDB.establishConnection();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd, [closeOrder, orderID], function(err)
    {
    mDB.conn.end();
    if(err) throw err;
    console.log(cmd);
    callBack(err);
    });
  };

module.exports = orders;