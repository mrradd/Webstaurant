(function ()
  {
  "use strict";

  /****************************************************************************
   * KitchenController */
  /**
   * Controller for the Kitchen portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("KitchenController", function($scope, $http, TheService)
    {

    $scope.data = {};

    /** Templates */
    /** Remove order button. */
    var closeOrderButton = "<span ng-click='grid.appScope.closeOrder(row.entity)' class='glyphicon glyphicon-ok' style='margin-top:5px; cursor: pointer;'></span>"

    /** Order Item grid. */
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
      $scope.loadOpenOrders();
      ;

    /****************************************************************************
     * closeOrder *
     ***
     * Removes order items, and calls the service to close the order in the db.
     ***************************************************************************/
    $scope.closeOrder = function(orderItem)
      {
      $http({
        method: "POST",
        url   : TheService.devUrl + "postCloseOrder",
        data  : JSON.stringify({orderID: orderItem.OID})})
        .then(function success(res)
          {
          console.log("Order closed.");
          $scope.loadOpenOrders();
          },
        function fail(res)
          {
          alert("Failed to close order.");
          });
      };

    /****************************************************************************
     * loadOpenOrders *
     ***
     * Loads all open Orders.
     ***************************************************************************/
    $scope.loadOpenOrders = function()
      {
      $http({
        method: "GET",
        url   : TheService.devUrl + "getOpenOrders"}).then(
          function success(res)
            {
            $scope.data.ordersGrid.data = res.data;
            console.log($scope.data.ordersGrid.data);
            },
          function fail(res)
            {
            alert("Failed to load Orders.");
            });
      };

    init();
    });//End KitchenController
  })();