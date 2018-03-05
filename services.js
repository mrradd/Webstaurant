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
        throw err;
      else
        res.send(results);
      console.log("end /getEmployees");
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
        throw err;
      else
        res.send(results);
      console.log("end /getItems");
      });
    });

  /******************************************************************************
   * getOrders *
   ***
   * Gets all orders that are not marked closed from the database.
   *
   * @param  isClosed  Order is closed.
   *****************************************************************************/
  app.get('/getOrders/:isClosed', function(req, res)
    {
    console.log("start /getOpenOrders");
    orders.getOrders(req.params.isClosed, function(err, results)
      {
      if(err)
        throw err;
      else
        res.send(results);

      console.log("end /getOpenOrders");
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
        throw err;
      else
        res.send(results);

      console.log("end /getOrderTotals");
      });
    });

  /******************************************************************************
   * postCloseOrder *
   ***
   * Calls the database to close the order with passed in ID.
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
        throw err;
      else
        {
        res.send({state:"GOOD"});
        }

      console.log("end /postUpdateOrder");
      });
    });

  /******************************************************************************
   * postCreateEmployee *
   ***
   * Creates an Item in the database.
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
        throw err;
      else
        {
        res.send({state:"GOOD"});
        }

      console.log("end /postCreateEmployee");
      });
    });

  /******************************************************************************
   * postCreateItem *
   ***
   * Creates an Item in the database.
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
        throw err;
      else
        {
        res.send({state:"GOOD"});
        }

      console.log("end /postCreateItem");
      });
    });

  /******************************************************************************
   * postSaveOrder *
   ***
   * Creates an Oder in the database.
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
        res.send({state:"GOOD"});
        }

      console.log("end /postSaveOrder");
      });
    });

  };
