(function ()
  {
  "use strict";



  /****************************************************************************
   * ManagerController */
  /**
   * Controller for the Manager portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("ManagerController", function($scope, $http, TheService)
    {
    /** Load Charts. */
    $scope.data = {};

    $scope.data.test = "Manager";

    var menuItems    = [];
    var ordersServed = [];

    google.charts.load('current', {packages: ['corechart']});

    /**************************************************************************
     * drawCharts */
    /**
     * Draws the menu Google Charts.
     *************************************************************************/
    var drawCharts = function()
      {
      drawMenuItemChart();
      drawOrdersChart();
      }

    /**************************************************************************
     * drawMenuItemChart */
    /**
     * Draws the menu item chart.
     *************************************************************************/
    var drawMenuItemChart = function()
      {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Item");
      data.addColumn("number", "Price");

      for(var i = 0; i < menuItems.length; i++)
        {
        data.addRow([menuItems[i].Name, menuItems[i].Price]);
        }

      var options =
        {
        title: "Menu Value",
        backgroundColor: "transparent",
        width: "1000",
        height: "700",
        is3D:true
        };

      var chart = new google.visualization.PieChart(document.getElementById('menuItemsChart'));

      chart.draw(data, options);
      };

    /**************************************************************************
     * drawOrdersChart */
    /**
     * Draws the Orders chart.
     *************************************************************************/
    var drawOrdersChart = function()
      {
      var data = new google.visualization.DataTable();
      data.addColumn("string", "Order");
      data.addColumn("number", "Total");

      for(var i = 0; i < ordersServed.length; i++)
        {
        var num = "" + ordersServed[i].OrderNumber;
        data.addRow([num, ordersServed[i].Total]);
        }

      var options =
        {
        title: "Order Totals",
        backgroundColor: "transparent",
        width: "700",
        height: "450",
        legend: "none",
        vAxis: {format: "currency", title: "Total"},
        hAxis: {title: "Order Number"}
        };

      var chart = new google.visualization.ScatterChart(document.getElementById('ordersChart'));

      chart.draw(data, options);
      };

    /**************************************************************************
     * getData */
    /**
     * Calls the server to load Menu Items, and also draws the menu items
     * chart.
     *************************************************************************/
    var getData = function()
      {
      /** Get Items. */
      $http({
        method: "GET",
        url   : TheService.devUrl + "getItems"}).then(
        function success(res)
          {
          menuItems = res.data;
          console.log(menuItems);
          },
        function fail(res)
          {
          alert("Failed to load Menu Items.");
          });

      /** Get Order Totals. */
      $http({
        method: "GET",
        url   : TheService.devUrl + "getOrderTotals"}).then(
        function success(res)
          {
          ordersServed = res.data;
          console.log(ordersServed);
          },
        function fail(res)
          {
          alert("Failed to load Order Totals.");
          });
      };

    getData();
    google.charts.setOnLoadCallback(drawCharts);
    });//End ManagerController
  })();