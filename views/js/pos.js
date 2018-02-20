(function ()
  {
  "use strict";

  /****************************************************************************
   * POSController */
  /**
   * Controller for the POS portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("POSController", function($scope)
    {

    $scope.data = {};

    $scope.data.test = "POS";

    });//End POSController
  })();