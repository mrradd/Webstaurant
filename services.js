/*****************************************************************************
 * services *
 * Services that perform operations on data or serve data.
 ****************************************************************************/

var employees = require('./dba/employees.js');
var items     = require('./dba/items.js');
var orders    = require('./dba/orders.js');

module.exports = function(app)
  {
  /******************************************************************************
   * getEmployees *
   ***
   * Gets all Employees from the database.
   *****************************************************************************/
  app.get('/getEmployees', function(req, res)
    {
    console.log("start /getEmployees");
    employees.getEmployees(function(err, results)
      {
      if(err)
        {
        console.log("error /getEmployees");
        throw err;
        }
      else
        {
        console.log("end /getEmployees");
        res.send(results);
        }
      });
    });

  /******************************************************************************
   * getItems *
   ***
   * Gets all Items from the database.
   *****************************************************************************/
  app.get('/getItems', function(req, res)
    {
    console.log("start /getItems");
    items.getItems(function(err, results)
      {
      if(err)
        {
        console.log("error /getItems");
        throw err;
        }
      else
        {
        console.log("end /getItems");
        res.send(results);
        }
      });
    });

  /******************************************************************************
   * getOrders *
   ***
   * Gets all closed/open orders depending on passed in value.
   *
   * @param  isClosed  Order is closed.
   *****************************************************************************/
  app.get('/getOrders/:isClosed', function(req, res)
    {
    console.log("start /getOrders");
    orders.getOrders(req.params.isClosed, function(err, results)
      {
      if(err)
        {
        console.log("error /getOrders");
        throw err;
        }
      else
        {
        console.log("end /getOrders");
        res.send(results);
        }

      });
    });

  /******************************************************************************
   * getOrderTotals *
   ***
   * Gets all totals for orders that are marked closed.
   *****************************************************************************/
  app.get('/getOrderTotals', function(req, res)
    {
    console.log("start /getOrderTotals");
    orders.getOrderTotals(function(err, results)
      {
      if(err)
        {
        console.log("error /getOrderTotals");
        throw err;
        }
      else
        {
        console.log("end /getOrderTotals");
        res.send(results);
        }
      });
    });

  /******************************************************************************
   * postCloseOrder *
   ***
   * Calls the database to close the order with given in ID.
   *****************************************************************************/
  app.post('/postUpdateOrder', function(req, res)
    {
    console.log("start /postUpdateOrder");

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (req.body.length > 1e6)
      req.connection.destroy();

    orders.updateOrder(req.body.closeOrder, req.body.orderID, function(err)
      {
      if(err)
        {
        console.log("error /postUpdateOrder");
        throw err;
        }
      else
        {
        console.log("end /postUpdateOrder");
        res.send({state:"GOOD"});
        }
      });
    });

  /******************************************************************************
   * postCreateEmployee *
   ***
   * Creates an Employee in the database with passed in object.
   *****************************************************************************/
  app.post('/postCreateEmployee', function(req, res)
    {

    console.log("start /postCreateEmployee");

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (req.body.length > 1e6)
      req.connection.destroy();

    employees.createEmployee(req.body, function(err)
      {
      if(err)
        {
        console.log("error /postCreateEmployee");
        throw err;
        }
      else
        {
        console.log("end /postCreateEmployee");
        res.send({state:"GOOD"});
        }
      });
    });

  /******************************************************************************
   * postCreateItem *
   ***
   * Creates an Item in the database with passed in object.
   *****************************************************************************/
  app.post('/postCreateItem', function(req, res)
    {

    console.log("start /postCreateItem");

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (req.body.length > 1e6)
      req.connection.destroy();

    items.createItem(req.body, function(err)
      {
      if(err)
        {
        console.log("error /postCreateItem");
        throw err;
        }
      else
        {
        console.log("end /postCreateItem");
        res.send({state:"GOOD"});
        }
      });
    });

  /******************************************************************************
   * postSaveOrder *
   ***
   * Creates an Oder in the database with passed in object.
   *****************************************************************************/
  app.post('/postSaveOrder', function(req, res)
    {
    console.log("start /postSaveOrder");

    /** Too much POST data, kill the connection 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB */
    if (req.body.length > 1e6)
      req.connection.destroy();

    orders.saveOrder(req.body, function(err)
      {
      if(err)
        {
        console.log("error /postSaveOrder");
        throw err;
        }
      else
        {
        console.log("end /postSaveOrder");
        res.send({state:"GOOD"});
        }
      });
    });

  };
