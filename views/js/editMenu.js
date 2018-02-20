(function ()
  {
  "use strict";

  /****************************************************************************
   * EditMenuController */
  /**
   * Controller for the Edit Menu portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("EditMenuController", function($scope)
    {

    $scope.data = {};

    $scope.data.test = "Edit Menu";

    });//End EditMenuController
  })();