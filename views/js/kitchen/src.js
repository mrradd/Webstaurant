$(document).ready(function()
  {
  /** Data model for the app. */
  var data =
    {
    orders: [],

    /** Key=Order ID, Value= Order Items Array. */
    orderDic: {}
    };

  /*********
   * Events *
   *********/
  /****************************************************************************
   * evt: Order List Click *
   ***
   * Add click event to the button in a table row on the order list. Delegated
   * event needed since the rows are dynamically created.
   ***************************************************************************/
  $("#orderList").on("click", "button",function()
    {
    completeOrder($(this).data('id'));
    });

  /*************
   * Functions *
   ************/
  /****************************************************************************
   * completeOrder *
   ***
   * Calls database to mark an order with the passed in ID as cleared.
   ***************************************************************************/
  function completeOrder(orderID)
    {
    var obj = {};
    obj.orderID = orderID;

    $('.'+orderID).remove();
    $.ajax(
      {
        url        : 'http://localhost:3000/postCloseOrder',
        type       : 'POST',
        contentType: 'application/json',
        data       : JSON.stringify(obj) //Sending object instead of value is a hack to force body-parser to accept JSON.
      });
    }

  /****************************************************************************
   * createOrderTable *
   ***
   * Goes through the order dictionary and appends each order to the Order
   * Table.
   *
   * NOTE: a class with value of the order id is added to each row of data,
   * even the button, so we can remove all rows related to that order en masse
   * with jquery.
   ***************************************************************************/
  function createOrderTable()
    {
    /** Iterate over the order dictionary. */
    for(var key in data.orderDic)
      {
      var html = "";

      var orderItems = data.orderDic[key];
      var oid        = orderItems[0].OID;
      var oNum       = orderItems[0].OrderNumber;
      var txnType    = orderItems[0].TransactionType;

      /** Create header info. */
      html +=
        "<tr class='"+oid+"' data-id='"   + oid     + "'>"    +
        "<td>"               + oNum    + "</td>" +
        "<td></td><td></td>" +
        "<td>"               + txnType + "</td></tr>";

      /** Iterate over the items, and add them to the order table. */
      for(var i = 0; i < orderItems.length; i++)
        {
        var name  = orderItems[i].Name;
        var notes = "";

        /** Add an item detail row. */
        html +=
          "<tr class='"+oid+"' data-id='"+ oid    + "'>" +
          "<td></td>"    +
          "<td>"+ name   +"</td>" +
          "<td>"+ notes  +"</td>" +
          "<td></td>"    +
          "</tr>";
        }

      /** Add Complete Order Button. */
      html += "<tr class='"+oid+"'><td><button data-id='" + oid + "' " + "type=\"button\" class=\"btn btn-success btn-lg btn-block\">Complete Order</button></td></tr>";

      $('#orderList').append(html);
      }
    }

  /****************************************************************************
   * getOpenOrders *
   ***
   * Get Orders from the database and load them into a table to display.
   ***************************************************************************/
  function getOpenOrders()
    {
    /** Clear out the data. */
    data.orders   = [];
    data.orderDic = {};

    $.get("http://localhost:3000/getOpenOrders", function(result)
      {
      data.orders = result;
      console.log(data.orders);
      loadOrderDictionary();
      createOrderTable();
      });
    }

  /****************************************************************************
   * loadOrderDictionary *
   ***
   * Iterates through the order items, and loads a dictionary with the order
   * items. The key is the order id, and the values are arrays of JSON objects.
   ***************************************************************************/
  function loadOrderDictionary()
    {

    /** Load the order dictionary with keys. */
    for(var i = 0; i < data.orders.length; i++)
      {
      /** Verify the dictionary has a given order id. */
      if(!data.orderDic.hasOwnProperty(data.orders[i].OID))
        {
        /** Add order id as a key to the orderDic. */
        data.orderDic[data.orders[i].OID] = [];

        /** Find all orders with order ids that match the dictionary key, and
         *  add them to the dictionary at that location. */
        for(var j = 0; j < data.orders.length; j++)
          {
          if(data.orders[j].OID == data.orders[i].OID)
            data.orderDic[data.orders[i].OID].push(data.orders[j]);
          }
        }
      }
    }

  /** Initialize the app. */
  function start()
    {
    getOpenOrders();
    };

  start();
  });