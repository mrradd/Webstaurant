(function ()
  {
  "use strict";

  /****************************************************************************
   * KitchenController */
  /**
   * Controller for the Kitchen portion of the app.
   ****************************************************************************/
  angular.module("app")
  .controller("KitchenController", function($scope)
    {

    $scope.data = {};

    $scope.data.test = "Kitchen";

    });//End KitchenController
  })();