$(document).ready(function()
  {

  /** Data model for the app. */
  var data =
    {
    menuItems:  [],
    orderItems: []
    };

  /*********
  * Events *
  *********/
  /****************************************************************************
   * evt: Add Order Button click *
   ***
   * Add click event to add order button that adds all order items to an order
   * record in the database.
   ***************************************************************************/
  $("#btnAddOrder").on("click", function()
    {
    createOrder();
    deleteAllOrderItems();
    });

  /****************************************************************************
   * evt: Delete Button click *
   ***
   * Add click event to delete button that removes all rows from the order list
   * items.
   ***************************************************************************/
  $("#btnDelete").on("click", function()
    {
    deleteAllOrderItems();
    });

  /****************************************************************************
   * evt: Menu List Click *
   ***
   * Add click event to table row on the menu item list. Delegated event
   * needed since the rows are dynamically created.
   ***************************************************************************/
  $("#menuList").on("click", "tr",function()
    {
    addMenuItemToOrderList($(this).data('id'));
    });

  /************
  * Functions *
  ************/
  /****************************************************************************
   * addMenuItemToOrderList *
   ***
   * Adds an item with the passed in id to the order list. Searches the list of
   * menu items for the passed in id, and adds it to the list of order items.
   *
   * @param  id  long  ID of the item to add to the order list.
   ***************************************************************************/
  function addMenuItemToOrderList(id)
    {
    for(var i = 0; i < data.menuItems.length; i++)
      {
      if(data.menuItems[i].ID == id)
        {
        data.orderItems.push(data.menuItems[i]);
        appendToOrderTable(data.menuItems[i]);
        }
      }
    }

  /****************************************************************************
   * appendToMenuTable *
   ***
   * Appends a row to the menu table with the passed in values.
   *
   * @param  menuItem  object  Menu item to add to the table.
   ***************************************************************************/
  function appendToMenuTable(menuItem)
    {
    var html = "";

    //TODO CH  RE-EVALUATE LOGIC...
    /** Iterate over the item list adding them as rows to the DOM. */
    for (var i = 0; i < data.menuItems.length; i++)
      {
      var id    = menuItem[i].ID;
      var name  = menuItem[i].Name;
      var price = menuItem[i].Price;

      /** Construct the table row. */
      html += "<tr data-id='"   + id + "'>" +
        "<td>"                  + name  +
        "</td><td id='price'>$" + price +
        "</td></tr>";
      }
    $('#menuList').append(html);
    }

  /****************************************************************************
   * appendToOrderTable *
   ***
   * Appends a row to the order table with the passed in values.
   *
   * @param  orderItem  object  Order item to add to the table.
   ***************************************************************************/
  function appendToOrderTable(orderItem)
    {
    var id    = orderItem.ID;
    var index = data.orderItems.length;
    var name  = orderItem.Name;
    var price = orderItem.Price;

    var html = "";
    html = "<tr data-index=\"" + index + "\" data-id=\"" + id +"\">" +
      "<td>" + name  + "</td>" +
      "<td>" + price + "</td>" +
      "<td></td>"  +
      "</tr>";
    $('#orderList').append(html);
    }

  /****************************************************************************
   * createOrder *
   ***
   * Adds the order items to an order record in the database.
   ***************************************************************************/
  function createOrder()
    {
    //TODO  PRE-POPULATE ORDER NUMBER USING LARGEST ORDER NUMBER IN DATABASE.
    var orderNum       = $('#inputOrderNumber').val();
    var tempEmployeeID = 3;
    var tempTxnType    = 'TT_DINE_IN';

    var header =
      {date           : new Date(),
        employeeID     : tempEmployeeID,
        orderNumber    : orderNum,
        paid           : false,
        closed         : false,
        transactionType: tempTxnType};

    var order = {order: header, items: data.orderItems};

    $.ajax(
      {
      url        : 'http://localhost:3000/postCreateOrder',
      type       : 'POST',
      contentType: 'application/json',
      data       : JSON.stringify(order)
      });

    alert("Order has been Submitted!");
    deleteAllOrderItems();
    }

  /****************************************************************************
   * deleteAllOrderItems1
   ***
   * Resets the order items object and clears all rows from the order items
   * table.
   ***************************************************************************/
  function deleteAllOrderItems()
    {
    data.orderItems = [];
    $('#theOrderList tbody').empty();
    }

  /****************************************************************************
   * getItems *
   ***
   * Load items into a table to display and append it to the DOM.
   ***************************************************************************/
  function getItems()
    {
    $.get("http://localhost:3000/getItems", function(result)
      {
      data.menuItems = result;
      console.log(data.menuItems);
      appendToMenuTable(data.menuItems);
      });
    }

  /** Initialize the app. */
  function start()
    {
    getItems();
    }

  /** Start the initialization process of the app. */
  start();
  });