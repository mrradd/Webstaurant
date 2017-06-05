/******************************************************************************
 * loginApp *
 ***
 * App for the Login Screen.
 *****************************************************************************/
angular.module('loginApp', [])
/******************************************************************************
 * loginCtrl *
 ***
 * Controller for the Login Application.
 *****************************************************************************/
.controller('loginCtrl', function($scope)
  {
  /** Self reference. */ var mThis = this;

  /** Data object. */    $scope.data = {};
  /** Login Username. */ $scope.data.username = null;
  /** Login Password. */ $scope.data.password = null;

  /****************************************************************************
   * handleButtons *
   ***
   * Handle input button clicks.
   * @param  event  Event sent from the input on ng-click.
   ***************************************************************************/
  $scope.handleButtons = function(event)
    {
    alert(event.target.id);
    };
  });