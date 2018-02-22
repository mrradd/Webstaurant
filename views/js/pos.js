(function ()
  {
  "use strict";

  /****************************************************************************
   * POSController */
  /**
   * Controller for the POS portion of the app.
   ***************************************************************************/
  angular.module("app")
  .controller("POSController", function($scope, $http)
    {

    //TODO CH  Load tax dynamically.


    /** Data object.*/                          $scope.data            = {};
    /** Items on the Menu list. */              $scope.data.menuItems  = [];
    /** Items on the Order list. */             $scope.data.orderItems = [];
    /** Text entered to filter menu list by. */ $scope.data.menuFilter = "";

    /** Price totals. */
    $scope.data.tax      = 0.0875;
    $scope.data.subtotal = 0.0;
    $scope.data.total    = 0.0;

    /**************************************************************************
     * init */
    /**
     * Initialize the controller
     *************************************************************************/
    var init = function()
      {
      /** Load the menu items. */
      $http({
        method: "GET",
        url:"http://localhost:3000/getItems"}).then(
          function success(res)
            {
            $scope.data.menuItems = res.data;
            console.log($scope.data.menuItems);
            },
          function fail(res)
            {
            alert("Failed to load menu items");
            });
      };

    /**************************************************************************
     * addToItemOrder */
    /**
     * Adds passed in Item to the Order List.
     *************************************************************************/
    $scope.addToItemOrder = function(item)
      {
      var it = angular.copy(item);
      $scope.data.orderItems.push(it);
      totalUp();
      };

    /**************************************************************************
     * removeOrderItem */
    /**
     * Removes passed in Item to the Order List.
     *************************************************************************/
    $scope.removeOrderItem = function(item)
      {
      var i = $scope.data.orderItems.indexOf(item);
      $scope.data.orderItems.splice(i, 1);
      totalUp();
      };

    /**************************************************************************
     * totalUp */
    /**
     * Calculates all the price totals.
     *************************************************************************/
    var totalUp = function()
      {
      var i   = 0;
      var len = $scope.data.orderItems.length;

      for(; i < len; i++)
        {
        $scope.data.subtotal += $scope.data.orderItems[i].Price;
        }

      $scope.data.total = $scope.data.subtotal + $scope.data.subtotal * $scope.data.tax;
      };

    init();
    });//End POSController
  })();