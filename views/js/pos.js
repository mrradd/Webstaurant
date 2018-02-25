(function ()
  {
  "use strict";

  /****************************************************************************
   * POSController */
  /**
   * Controller for the POS portion of the app.
   ***************************************************************************/
  angular.module("app")
  .controller("POSController", function($scope, $http, TheService)
    {
    /** Data object.*/                          $scope.data            = {};
    /** Items on the Menu list. */              $scope.data.menuItems  = [];
    /** Items on the Order list. */             $scope.data.orderItems = [];
    /** Text entered to filter menu list by. */ $scope.data.menuFilter = "";

    /** Price totals. */
    $scope.data.tax                = 0;
    $scope.data.taxrate            = 0.0875;
    $scope.data.total              = 0.0;
    $scope.data.selectedMenuItems  = [];
    $scope.data.selectedOrderItems = [];
    $scope.data.subtotal           = 0.0;

    /** Grid button templates. */
    var addItemButton    = "<span ng-click='grid.appScope.addToItemOrder(row.entity)' class='glyphicon glyphicon-ok' style='margin-top:5px; cursor: pointer;'></span>"
    var removeItemButton = "<span ng-click='grid.appScope.removeOrderItem(row.entity)' class='glyphicon glyphicon-remove' style='margin-top:5px; cursor: pointer;'></span>"

    /** Menu Item grid. */
    $scope.data.menuGrid =
      {
      enableColumnMenus: false,
      enableFiltering: true,
      columnDefs:[
        {field: "Name",  displayName: "Name", minWidth: 200},
        {field: "Price", displayName: "Price", maxWidth: 150, enableFiltering:false, cellTemplate:"<span>{{row.entity.Price | currency}}</span>"},
        {field: "ID",    displayName: "Actions", maxWidth: 100, enableFiltering:false, cellTemplate: addItemButton}],
      data: []
      };

    /** Order Item Grid. */
    $scope.data.orderGrid =
      {
      enableColumnMenus: false,
      enableFiltering: true,
      columnDefs:[
        {field: "Name",  displayName: "Name", minWidth: 200},
        {field: "Price", displayName: "Price", maxWidth: 150, enableFiltering:false, cellTemplate:"<span>{{row.entity.Price | currency}}</span>"},
        {field: "ID",    displayName: "Actions", maxWidth: 100, enableFiltering:false,  cellTemplate: removeItemButton}],
      data: []
      };

    /**************************************************************************
     * init */
    /**
     * Initialize the controller
     *************************************************************************/
    var init = function()
      {
      $scope.loadMenuItems();
      };

    /**************************************************************************
     * addToItemOrder */
    /**
     * Adds passed in Item to the Order List.
     *************************************************************************/
    $scope.addToItemOrder = function(item)
      {
      var it = angular.copy(item);
      $scope.data.orderGrid.data.push(it);
      totalUp();
      };

    /****************************************************************************
     * deleteAllOrderItems
     ***
     * Resets list of Order Items.
     ***************************************************************************/
    function deleteAllOrderItems()
      {
      $scope.data.orderGrid.data = [];
      totalUp();
      }

    /**************************************************************************
     * loadMenuItems */
    /**
     * Calls the server to load Menu Items.
     *************************************************************************/
    $scope.loadMenuItems = function()
      {
      $http({
        method: "GET",
        url   : TheService.devUrl + "getItems"}).then(
          function success(res)
            {
            $scope.data.menuGrid.data = res.data;
            console.log($scope.data.menuGrid.data );
            },
          function fail(res)
            {
            alert("Failed to load menu items");
            });
      };

    /**************************************************************************
     * removeOrderItem */
    /**
     * Removes passed in Item to the Order List.
     *************************************************************************/
    $scope.removeOrderItem = function(item)
      {
      var i = $scope.data.orderGrid.data.indexOf(item);
      $scope.data.orderGrid.data.splice(i, 1);
      totalUp();
      };

    /****************************************************************************
     * submitOrder *
     ***
     * Submits the order to the database.
     ***************************************************************************/
    $scope.submitOrder = function()
      {
      var d = new Date();
      var header =
        {date           : d.getFullYear() + "/" + Number(d.getMonth() + 1) + "/" + d.getDate(),
         employeeID     : 3,
         paid           : false,
         closed         : false,
         transactionType: "TT_DINE_IN"};

      var order = {order: header, items: $scope.data.orderGrid.data};

      $http({
        method: "POST",
        url   : TheService.devUrl + "postSaveOrder",
        data  : JSON.stringify(order)})
          .then(function success(res)
            {
            alert("Order created.");
            console.log("order created");
            deleteAllOrderItems();
            },
          function fail(res)
            {
            alert("Failed to save order.");
            });
      };

    /**************************************************************************
     * totalUp */
    /**
     * Calculates all the price totals.
     *************************************************************************/
    var totalUp = function()
      {
      /** Zero out the subtotal. */
      $scope.data.subtotal = 0;

      var i   = 0;
      var len = $scope.data.orderGrid.data.length;

      for(; i < len; i++)
        {
        $scope.data.subtotal += $scope.data.orderGrid.data[i].Price;
        }

      $scope.data.tax   = $scope.data.subtotal * $scope.data.taxrate;
      $scope.data.total = $scope.data.subtotal + $scope.data.tax;
      };

    init();
    });//End POSController
  })();