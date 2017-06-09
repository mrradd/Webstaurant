/*****************************************************************************
 * app *
 * The main app for the server.
 ****************************************************************************/
var http          = require('http');
var ejs           = require('ejs')
var path          = require('path');
var mysql         = require('mysql');
var mDB           = require('./db.js');
var fs            = require('fs');
var express       = require('express');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var flash         = require('connect-flash');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser    = require('body-parser');
var app           = express();

/** Establish root directory. */
app.use(express.static(__dirname));

/** Setup ejs. */
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(
  {
  secret: 'secret strategic xxzzz code',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
  }));

/** Passport. */
app.use(passport.initialize());
app.use(passport.session());

/** Setup Flash. */
app.use(flash());

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
 * deserializeUser *
 ***
 * Deserialize the user.
 *****************************************************************************/
passport.deserializeUser(function(id, done)
  {
  mDB.establishConnection();
  mDB.conn.query("SELECT * FROM Users WHERE ID = ?", [id],function(err,rows)
    {
    mDB.conn.end();
    done(err, rows[0]);
    });
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
    mDB.conn.query('SELECT * FROM Users WHERE Username = ?', [username, password],
      function(err, results)
      {
      mDB.conn.end();

      if (err) throw error();

      var user = results[0];

      if(!user)
        return done(null, false);

      return done(null, user);
      });
    });
  }));

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

  mDB.establishConnection();
  mDB.conn.connect();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd, function(err)
    {
    if(err) throw err;
    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDB.conn.end();
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
  var cmd = "INSERT INTO Employees (FirstName, LastName, EmployeeNumber, EmployeeType) VALUES(?,?,?,?)"
  var parms = [employee.firstName, employee.lastName, employee.employeeNumber, employee.employeeType];

  mDB.establishConnection();
  mDB.conn.connect();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd, parms, function(err)
    {
    if(err) throw err;
    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDB.conn.end();
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
  var cmd   = "INSERT INTO Items (Name, Description, Price, Type, SKU, BarCode) VALUES (?,?,?,?,?,?)";
  var parms = [item.name, item.description, item.price, item.type, item.sku, item.barcode];

  mDB.establishConnection();
  mDB.conn.connect();

  /** Query the db, and call the call back with the result set. */
  mDB.conn.query(cmd, parms, function(err)
    {
    if(err) throw err;

    console.log(cmd);
    callBack(err);
    });

  /** Cleanup and close the connection. */
  mDB.conn.end();
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
 * getItems *
 ***
 * Gets all items from the database.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
function getItems(callBack)
  {
  var cmd = "SELECT * FROM Items";

  /** Connect to the db. */
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
function saveOrder(order, callBack)
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
      var items = order['items'];
      var itemParms  = [];
      var cmdItem = "";
      for(var i = 0; i < items.length; i++)
        {
        //TODO CH  TAX RATE, QUANTITY, DISCOUNT, AND DISCOUNT AMOUNT MUST BE DYNAMIC FROM INCOMING ORDER.
        var qty      = 1;
        var subTotal = round(items[i].Price * qty, 2);
        var taxRate  = 0.0875;
        var taxAmt   = round(subTotal * taxRate, 2);
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
