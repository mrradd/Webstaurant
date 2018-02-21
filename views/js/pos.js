(function ()
  {
  "use strict";

  /****************************************************************************
   * POSController */
  /**
   * Controller for the POS portion of the app.
   ***************************************************************************/
  angular.module("app")
  .controller("POSController", function($scope)
    {

    /** Data object.*/ $scope.data = {};
    /** Items on the Menu list. */ $scope.data.menuItems = [];
    /** Items on the Order list. */ $scope.data.orderItems = [];
    /** Text entered to filter menu list by. */ $scope.data.menuFilter = ""

    /**************************************************************************
     * init */
    /**
     * Initialize the controller
     *************************************************************************/
    var init = function()
      {
      //TODO CH  TEST
      
      $scope.data.menuItems.push({id: 1, name: "Hamburger", price: 5.00});
      $scope.data.menuItems.push({id: 2, name: "Soda", price: 1.00});
      $scope.data.menuItems.push({id: 3, name: "Fries", price: 2.00});
      $scope.data.menuItems.push({id: 4, name: "Ice Cream", price: 3.00});
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
      };

    init();
    });//End POSController
  })();