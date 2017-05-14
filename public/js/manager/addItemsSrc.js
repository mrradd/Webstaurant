$(document).ready(function()
  {
  /** Self reference. */
  var mThis = this;

  /** Data object for model. */
  mThis.data = {};

  /** List of menu items. */
  mThis.data.menuItems = []

  /** Represents menu item being created. */
  mThis.data.menuItem =
    {
    id:          null,
    name:        "",
    description: "",
    price:       0.00,
    type:        "",
    sku:         "",
    barcode:     ""
    }

  /*********
  * Events *
  *********/
  /****************************************************************************
   * evt: Submit Button click *
   ***
   * Add click event to the submit button that calls the database and submits
   * the item entered into the current item detail fields. The fields are then
   * cleared.
   ***************************************************************************/
  $("#btnSubmit").click(function()
    {
    mThis.data.menuItem.name        = $('#inputItemName').val();
    mThis.data.menuItem.description = $('#inputItemDescription').val();
    mThis.data.menuItem.price       = $('#inputItemPrice').val();
    mThis.data.menuItem.type        = $('#selectItemType').val();
    mThis.data.menuItem.sku         = $('#inputItemSKU').val();
    mThis.data.menuItem.barcode     = $('#inputItemBarcode').val();
    submitItem();
    });

  /************
  * Functions *
  ************/
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

    /** Iterate over the item list adding them as rows to the DOM. */
    for (var i = 0; i < mThis.data.menuItems.length; i++)
      {
      /** Construct the table row. */
      html += "<tr><td>"   + menuItem[i].ID          +
              "</td><td>"  + menuItem[i].Name        +
              "</td><td>"  + menuItem[i].Description +
              "</td><td>$" + menuItem[i].Price       +
              "</td><td>"  + menuItem[i].SKU         +
              "</td><td>"  + menuItem[i].Barcode     +
              "</td></tr>";
      }

    $('#menuList').append(html);
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
      mThis.data.menuItems = result;
      console.log(mThis.data.menuItems);
      appendToMenuTable(mThis.data.menuItems);
      });
    }

  /****************************************************************************
   * submitItem *
   ***
   * Submits the item details entered into the Edit Menu form to the database
   * to create an item.
   ***************************************************************************/
  function submitItem()
    {
    $.ajax(
      {
      url        : 'http://localhost:3000/postCreateItem',
      type       : 'POST',
      contentType: 'application/json',
      data       : JSON.stringify(mThis.data.menuItem)
      });
    }

  /****************************************************************************
   * start *
   ***
   * Initialize the app.
   ***************************************************************************/
  function start()
    {
    getItems();

    //TODO CH  LOAD ITEM TYPES DYNAMICALLY.
    /** Init select list of item types. */
    var arr =
      [
      {val : 'IT_BEVERAGE', text: 'Beverage'},
      {val : 'IT_ENTREE',   text: 'Entree'}
      ];

    /** Add the array of types to a select/options list. */
    $(arr).each(function()
      {
      $('#selectItemType').append($("<option>").attr('value',this.val).text(this.text));
      });
    }

  /** Start the initialization process of the app. */
  start();
  });