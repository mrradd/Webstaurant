(function ()
  {
  "use strict";

  /****************************************************************************
   * UsersController */
  /**
   * Controller for the Users portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("UsersController", function($scope)
    {

    $scope.data = {};

    $scope.data.test = "Users";

    });//End UsersController
  })();