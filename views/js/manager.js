(function ()
  {
  "use strict";

  /****************************************************************************
   * ManagerController */
  /**
   * Controller for the Manager portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("ManagerController", function($scope)
    {

    $scope.data = {};

    $scope.data.test = "Manager";

    });//End ManagerController
  })();