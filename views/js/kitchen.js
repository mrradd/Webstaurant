(function ()
  {
  "use strict";

  /****************************************************************************
   * KitchenController */
  /**
   * Controller for the Kitchen portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("KitchenController", function($scope, $http, $q, TheService)
    {

    $scope.data = {};

    /** Templates */
    /** Remove order button. */
    var closeOrderButton = "<span ng-click='grid.appScope.updateOrder(row.entity, 1)' class='glyphicon glyphicon-remove' style='margin-top:5px; cursor: pointer;'></span>"

    /** Add order back button. */
    var restoreOrderButton = "<span ng-click='grid.appScope.updateOrder(row.entity, 0)' class='glyphicon glyphicon-ok' style='margin-top:5px; cursor: pointer;'></span>"

    /** Finished Order Items grid. */
    $scope.data.finishedOrdersGrid =
      {
      enableColumnMenus: false,
      enableFiltering: false,
      minRowsToShow: 18,
      columnDefs:[
        {field: "OrderNumber", displayName: "#", maxWidth: 150},
        {field: "Name",        displayName: "Item", minWidth: 200},
        {field: "LIID",        displayName: "Actions", maxWidth: 100, cellTemplate: restoreOrderButton}],
      data: []
      };

    /** Open Order Items grid. */
    $scope.data.ordersGrid =
      {
      enableColumnMenus: false,
      enableFiltering: false,
      minRowsToShow: 18,
      columnDefs:[
        {field: "OrderNumber", displayName: "#", maxWidth: 150},
        {field: "Name",        displayName: "Item", minWidth: 200},
        {field: "LIID",        displayName: "Actions", maxWidth: 100, cellTemplate: closeOrderButton}],
      data: []
      };

    /****************************************************************************
     * init *
     ***
     * Initializes the controller.
     ***************************************************************************/
    var init = function()
      {
      $scope.updateOrderLists();
      };

    /****************************************************************************
     * updateOrder *
     ***
     * Removes order items, and calls the service to close the order in the db.
     *
     * @param  orderItem  Object to update.
     * @param  close      False: close order, True: open order
     ***************************************************************************/
    $scope.updateOrder = function(orderItem, close)
      {
      $http({
        method: "POST",
        url   : TheService.devUrl + "postUpdateOrder",
        data  : JSON.stringify({orderID: orderItem.OID, closeOrder: close})})
        .then(function success(res)
          {
          console.log("Order updated.");
          $scope.updateOrderLists();
          },
        function fail(res)
          {
          alert("Failed to update order.");
          });
      };

    /****************************************************************************
     * loadOrders *
     ***
     * Loads all Orders depending on the passed in filter.
     *
     * @param  isClosed  Order is closed.
     ***************************************************************************/
    $scope.loadOrders = function(isClosed)
      {
      return $http({
        method: "GET",
        url   : TheService.devUrl + "getOrders/" + isClosed})
        .then(function success(res)
            {
            /** Closed orders. */
            if(isClosed)
              $scope.data.finishedOrdersGrid.data = res.data;
            /** Open orders. */
            else
              $scope.data.ordersGrid.data = res.data;

            console.log(res.data);
            },
          function fail(res)
            {
            alert("Failed to load Orders.");
            });
      };

    /****************************************************************************
     * updateOrderLists *
     ***
     * Loads all Orders for the data grids.
     ***************************************************************************/
    $scope.updateOrderLists = function()
      {
      $scope.loadOrders(1)
      .then(function(r)
        {
        $scope.loadOrders(0);
        });
      };

    init();
    });//End KitchenController
  })();