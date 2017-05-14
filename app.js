//This will be the main Node app. This is configured for local host.
var http    = require('http');
var path    = require('path');
var mysql   = require('mysql');
var fs      = require('fs');
var express = require('express');
var app     = express();

/** Establish root directory. */
app.use(express.static(__dirname));

/*****************************************************************************
 * Page loads
 ****************************************************************************/
/** Initial page to load. Loads POS page. */
app.get('/', function(req, res)
  {
  console.log('serving '+__dirname+'/public/pos.html');
  res.sendFile(path.join(__dirname+'/public/pos.html'));
  });

/** Loads Kitchen page. */
app.get('/kitchen', function(req, res)
  {
  console.log('serving '+__dirname+'/public/kitchen.html');
  res.sendFile(path.join(__dirname+'/public/kitchen.html'));
  });

/** Loads Manager page. */
app.get('/manager', function(req, res)
  {
  console.log('serving '+__dirname+'/public/manager.html');
  res.sendFile(path.join(__dirname+'/public/manager.html'));
  });

/** Loads Manager edit menu page. */
app.get('/manager-edit-menu', function(req, res)
  {
  console.log('serving '+__dirname+'/public/manager-edit-menu.html');
  res.sendFile(path.join(__dirname+'/public/manager-edit-menu.html'));
  });

/** Loads Manager edit user page. */
app.get('/manager-users', function(req, res)
  {
  console.log('serving '+__dirname+'/public/manager-users.html');
  res.sendFile(path.join(__dirname+'/public/manager-users.html'));
  });
/** Loads Manager edit user page. */
app.get('/config', function(req, res)
  {
  console.log('serving '+__dirname+'/public/config.html');
  res.sendFile(path.join(__dirname+'/public/config.html'));
  });

/*****************************************************************************
 * SQL Routes
 ****************************************************************************/
/******************************************************************************
 * route: getEmployees *
 ***
 * Gets all Employees from the database.
 *****************************************************************************/
app.get('/getEmployees', function(req, res)
  {
  console.log("start /getEmployees");
  getEmployees(function(err, results)
    {
    if(err)
      throw err;
    else
      res.send(results);
    console.log("end /getEmployees");
    });
  });

/******************************************************************************
 * route: getItems *
 ***
 * Gets all Items from the database.
 *****************************************************************************/
app.get('/getItems', function(req, res)
  {
  console.log("start /getItems");
  getItems(function(err, results)
    {
    if(err)
      throw err;
    else
      res.send(results);
    console.log("end /getItems");
    });
  });

/******************************************************************************
 * route: getOpenOrders *
 ***
 * Gets all orders that are not marked closed from the database.
 *****************************************************************************/
app.get('/getOpenOrders', function(req, res)
  {
  console.log("start /getOpenOrders");
  getOpenOrders(function(err, results)
    {
    if(err)
      throw err;
    else
      res.send(results);
    console.log("end /getOpenOrders");
    });
  });

/******************************************************************************
 * route postCloseOrder *
 ***
 * Calls the database to close the order with passed in ID.
 *****************************************************************************/
app.post('/postCloseOrder', function(req, res)
  {
  console.log("start /postCloseOrder");

  var body = '';

  /** Capture data from request. */
  req.on('data', function (data)
    {
    body += data;

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (body.length > 1e6)
      req.connection.destroy();
    });

  /** Parse JSON data, and create item.*/
  req.on('end', function ()
    {
    var obj = JSON.parse(body);
    closeOrder(obj, function(err)
      {
      if(err)
        throw err;
      console.log("end /postCloseOrder");
      });
    });
  });

/******************************************************************************
 * route postCreateEmployee *
 ***
 * Creates an Item in the database.
 *****************************************************************************/
app.post('/postCreateEmployee', function(req, res)
  {
  console.log("start /postCreateEmployee");

  var body = '';

  /** Capture data from request. */
  req.on('data', function (data)
    {
    body += data;

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (body.length > 1e6)
      req.connection.destroy();
    });

  /** Parse JSON data, and create item.*/
  req.on('end', function ()
    {
    var obj = JSON.parse(body);
    createEmployee(obj, function(err)
      {
      if(err)
        throw err;
      console.log("end /postCreateEmployee");
      });
    });
  });

/******************************************************************************
 * route postCreateItem *
 ***
 * Creates an Item in the database.
 *****************************************************************************/
app.post('/postCreateItem', function(req, res)
  {
  console.log("start /postCreateItem");
  var body = '';

  /** Capture data from request. */
  req.on('data', function (data)
    {
    body += data;

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (body.length > 1e6)
      req.connection.destroy();
    });

  /** Parse JSON data, and create item.*/
  req.on('end', function ()
    {
    var obj = JSON.parse(body);
    createItem(obj, function(err)
      {
      if(err)
        throw err;

      console.log("end /postCreateItem");
      });
    });
  });

/******************************************************************************
 * route postCreateOrder *
 ***
 * Creates an Oder in the database.
 *****************************************************************************/
app.post('/postCreateOrder', function(req, res)
  {
  console.log("start /postCreateOrder");

  var body = '';

  /** Capture data from request. */
  req.on('data', function (data)
    {
    body += data;

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (body.length > 1e6)
      req.connection.destroy();
    });

  /** Parse JSON data, and create item.*/
  req.on('end', function ()
    {
    var obj = JSON.parse(body);
    saveOrder(obj, function(err)
      {
      if(err)
        throw err;

      console.log("end /postCreateOrder");
      });
    });
  });

/*****************************************************************************
 * SQL
 ****************************************************************************/
/** Database connection. */
var mDBConn = null;

/******************************************************************************
 * closeOrder *
 ***
 * Marks an order in the database as closed.
 *
 * @param  orderID   Order ID to of order to mark as closed.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function closeOrder(orderID, callBack)
  {
  var cmd = "UPDATE Orders SET Closed = 1 WHERE ID = "+orderID+";";

  createConnection();

  /** Connect to the db. */
  mDBConn.connect(function(err)
    {
    if(err)
      {
      console.log('Error connecting to Db');
      return;
      }
    console.log('Connection established');
    });

  /** Query the db, and call the call back with the result set. */
  mDBConn.query(cmd, function(err)
    {
    if(err) throw err;
    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDBConn.end(function(err)
    {
    console.log('Connection closed.');
    });
  }

/******************************************************************************
 * createConnection *
 ***
 * Establish database connection.
 *****************************************************************************/
function createConnection()
  {
  mDBConn = mysql.createConnection(
    {
      host    : "testdb3.cilqftni5rud.us-west-2.rds.amazonaws.com",
      user    : "testuser3",
      password: "Testuser3",
      port    : "3306",
      database: "DBMain",
      multipleStatements: true
    });
  }

/******************************************************************************
 * createEmployee *
 ***
 * Submits Employee detail to the database to create an Employee entry.
 *
 * @param  employee  Employee to use to create the new Employee record.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function createEmployee(employee, callBack)
  {
  var cmd = "INSERT INTO Employees (FirstName, LastName, EmployeeNumber, EmployeeType) "+
    "VALUES ('"+employee.firstName+"', '"+employee.lastName+"', "+employee.employeeNumber+", '"+employee.employeeType+"');";

  createConnection();

  /** Connect to the db. */
  mDBConn.connect(function(err)
    {
    if(err)
      {
      console.log('Error connecting to Db');
      return;
      }
    console.log('Connection established');
    });

  /** Query the db, and call the call back with the result set. */
  mDBConn.query(cmd, function(err)
    {
    if(err) throw err;
    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDBConn.end(function(err)
    {
    console.log('Connection closed.');
    });
  }

/******************************************************************************
 * createItem *
 ***
 * Submits item detail to the database to create an Item entry.
 *
 * @param  item      Item to use to create the new Item record.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function createItem(item, callBack)
  {
  var cmd = "INSERT INTO Items (Name, Description, Price, Type, SKU, BarCode) " +
            "VALUES ('" + item.name + "', '"+ item.description + "', " + item.price +
            ", '" + item.type + "', '"+ item.sku +"', '"+item.barcode+"');";

  createConnection();

  /** Connect to the db. */
  mDBConn.connect(function(err)
    {
    if(err)
      {
      console.log('Error connecting to Db');
      return;
      }
    console.log('Connection established');
    });

  /** Query the db, and call the call back with the result set. */
  mDBConn.query(cmd, function(err)
    {
    if(err) throw err;

    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDBConn.end(function(err)
    {
    console.log('Connection closed.');
    });
  }

/******************************************************************************
 * getEmployees *
 ***
 * Gets all Employees from the database.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function getEmployees(callBack)
  {
  var cmd = "SELECT * FROM Employees";

  createConnection();

  /** Connect to the db. */
  mDBConn.connect(function(err)
    {
    if(err)
      {
      console.log('Error connecting to Db');
      return;
      }
    console.log('Connection established');
    });

  /** Query the db, and call the call back with the result set. */
  mDBConn.query(cmd ,function(err,rows)
    {
    if(err) throw err;

    console.log(cmd + "\n");
    console.log(rows);
    callBack(err, rows);
    });

  /** Cleanup and close the connection. */
  mDBConn.end(function(err)
    {
    console.log('Connection closed.');
    });
  }

/******************************************************************************
 * getItems *
 ***
 * Gets all items from the database.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function getItems(callBack)
  {
  var cmd = "SELECT * FROM Items";

  createConnection();

  /** Connect to the db. */
  mDBConn.connect(function(err)
    {
    if(err)
      {
      console.log('Error connecting to Db');
      return;
      }
    console.log('Connection established');
    });

  /** Query the db, and call the call back with the result set. */
  mDBConn.query(cmd ,function(err,rows)
    {
    if(err) throw err;

    console.log(cmd + "\n");
    console.log(rows);
    callBack(err, rows);
    });

  /** Cleanup and close the connection. */
  mDBConn.end(function(err)
    {
    console.log('Connection closed.');
    });
  }

/******************************************************************************
 * getOpenOrders *
 ***
 * Gets all orders from the database that are not closed.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function getOpenOrders(callBack)
  {

  var cmd =
    "SELECT o.ID AS OID, o.OrderNumber, o.TransactionType, li.ID AS LIID, i.Name\n" +
      "FROM Orders    o\n"                            +
      "JOIN LineItems li ON li.OrderID = o .ID\n"     +
      "JOIN Items     i  ON i .ID      = li.ItemID\n" +
      "WHERE Closed = 0;";

  createConnection();

  /** Connect to the db. */
  mDBConn.connect(function(err)
    {
    if(err)
      {
      console.log('Error connecting to Db');
      return;
      }
    console.log('Connection established');
    });

  /** Query the db, and call the call back with the result set. */
  mDBConn.query(cmd ,function(err,rows)
    {
    if(err) throw err;

    console.log(cmd + "\n");
    console.log(rows);
    callBack(err, rows);
    });

  /** Cleanup and close the connection. */
  mDBConn.end(function(err)
    {
    console.log('Connection closed.');
    });
  }

/******************************************************************************
 * saveOrder *
 ***
 * Creates an Order in the database.
 *
 * @param  order     Order to use to create the new Order record.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function saveOrder(order, callBack)
  {
  //GENERATE RANDOM NUMBER.
  function getRandomInt(min, max)
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }
  //TODO CH  ORDER NUMBER MUST BE DYNAMIC FROM ORDER.
  /** Create the sql command for creating the order, and saving the most recent order id. */
  var ord      = order['order'];
  var ordNum   = getRandomInt(1,999);
  var cmdOrder =
    "INSERT INTO Orders (Date, EmployeeID, OrderNumber, Paid, Closed, TransactionType)\n" +
    "VALUES('"+ord.date+"', "+ord.employeeID+", "+ordNum+", "+ ord.paid+", "+ord.closed+", '"+ord.transactionType+"'); \n"
    + "SET @LastID = LAST_INSERT_ID();\n ";

  /** Iterate through all items, and create the sql command for saving each order line item. */
  var items = order['items'];
  for(var i = 0; i < items.length; i++)
    {
    //TODO CH  TAX RATE, QUANTITY, DISCOUNT, AND DISCOUNT AMOUNT MUST BE DYNAMIC FROM INCOMING ORDER.
    var qty      = 1;
    var subTotal = round(items[i].Price * qty, 2);
    var taxRate  = 0.0875;
    var taxAmt   = round(subTotal * taxRate, 2);
    var total    = subTotal + taxAmt;

    var cmdItem =
      "INSERT INTO LineItems (ItemID, OrderID, Price, Quantity, Discount, DiscountAmount, Subtotal, TaxRate, TaxAmount, TotalAmount)\n" +
      "VALUES ("+items[i].ID+", @LastID, "+items[i].Price+", "+qty+", 0, 0, "+items[i].Price+", "+taxRate+", "+taxAmt+", "+total+");\n";

    cmdOrder += cmdItem;
    }

  createConnection();

  /** Connect to the db. */
  mDBConn.connect(function(err)
    {
    if(err)
      {
      console.log('Error connecting to Db');
      return;
      }
    console.log('Connection established');
    });

  /** Query the db, and call the call back with the result set. */
  mDBConn.query(cmdOrder, function(err)
    {
    console.log(cmdOrder);

    if(err) throw err;

    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDBConn.end(function(err)
    {
    console.log('Connection closed.');
    });
  }

/*****************************************************************************
 * Functions
 ****************************************************************************/
/******************************************************************************
 * round *
 ***
 * Rounds to the nearest passed in precision.
 *
 * @param  value     Value to round.
 * @param  decimals  Precision to round to.
 *****************************************************************************/
function round(value, decimals)
  {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

module.exports = app;
