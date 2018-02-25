(function ()
  {
  "use strict";

  /****************************************************************************
   * EmployeesController */
  /**
   * Controller for the Edit Employees portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("EmployeesController", function($scope, $http, TheService)
    {

    $scope.data = {};

    $scope.data.employee =
      {
      firstName: "",
      lastName:  "",
      number:    "",
      type:      ""
      };

    $scope.data.types = [
      {val : 'ET_MANAGER', text: 'Manager'},
      {val : 'ET_COOK',    text: 'Cook'},
      {val : 'ET_WAITER',  text: 'Waiter'}];

    /** Employees grid. */
    $scope.data.employeesGrid =
      {
      enableColumnMenus: false,
      enableFiltering: true,
      minRowsToShow: 10,
      columnDefs:[
        {field: "FirstName",      displayName: "First Name", minWidth: 200},
        {field: "LastName",       displayName: "Last Name",  minWidth: 200},
        {field: "EmployeeNumber", displayName: "#",          maxWidth: 100},
        {field: "EmployeeType",   displayName: "Type",       maxWidth: 150, minWidth: 150}],
      data: []
      };

    /****************************************************************************
     * init *
     ***
     * Initializes the controller.
     ***************************************************************************/
    var init = function()
      {
      loadEmployees();
      };

    /****************************************************************************
     * loadEmployees *
     ***
     * Loads all Employees.
     ***************************************************************************/
    var loadEmployees = function()
      {
      $http({
        method: "GET",
        url   : TheService.devUrl + "getEmployees"}).then(
          function success(res)
            {
            $scope.data.employeesGrid.data = res.data;
            console.log($scope.data.employeesGrid.data);
            },
          function fail(res)
            {
            alert("Failed to load Employees.");
            });
      };

    init();
    });//End UsersController
  })();