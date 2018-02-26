(function ()
  {
  "use strict";

  /****************************************************************************
   * EditMenuController */
  /**
   * Controller for the Edit Menu portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("EditMenuController", function($scope, $http, TheService)
    {
    $scope.data = {};

    $scope.data.item = {};

    $scope.data.types = [
      {val: "IT_BEVERAGE", text: "Beverage"},
      {val: "IT_ENTREE",   text: "Entree"},
      {val: "IT_SIDE",     text: "Side"},
      {val: "IT_DESSERT",  text: "Dessert"}];

    /** Items grid. */
    $scope.data.itemsGrid =
      {
      enableColumnMenus: false,
      enableFiltering: true,
      minRowsToShow: 10,
      columnDefs:[
        {field: "Name",        displayName: "Name",        minWidth: 200},
        {field: "Description", displayName: "Description", minWidth: 200},
        {field: "Price",       displayName: "Price",       maxWidth: 100, cellTemplate:"<span>{{row.entity.Price | currency}}</span>"},
        {field: "Type",        displayName: "Type",        maxWidth: 150}],
      data: []
      };

    /****************************************************************************
     * init *
     ***
     * Initializes the controller.
     ***************************************************************************/
    var init = function()
      {
      resetItem();
      loadItems();
      };

    /****************************************************************************
     * loadItems *
     ***
     * Calls the database to retrieve the list of items.
     ***************************************************************************/
    var loadItems = function()
      {
      $http({
        method: "GET",
        url   : TheService.devUrl + "getItems"}).then(
        function success(res)
          {
          $scope.data.itemsGrid.data = res.data;
          console.log($scope.data.itemsGrid.data);
          },
        function fail(res)
          {
          alert("Failed to load Items.");
          });
      };

    /****************************************************************************
     * resetItem *
     ***
     * Resets the Item.
     ***************************************************************************/
    var resetItem = function()
      {
      $scope.data.item =
        {
        name: "",
        description: "",
        price: 0.00,
        type: ""
        };
      };

    /****************************************************************************
     * submitItem *
     ***
     * Saves an Item record to the db.
     ***************************************************************************/
    $scope.submitItem = function()
      {
      $http({
        method: "POST",
        url   : TheService.devUrl + "postCreateItem",
        data  : JSON.stringify($scope.data.item)}).then(
        function success(res)
          {
          alert("Item saved.");
          resetItem();
          loadItems();
          },
        function fail(res)
          {
          alert("Failed to save Item.");
          });
      };

    init();
    });//End EditMenuController
  })();