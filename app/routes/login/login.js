(function()
  {
  "use strict"

  angular.module("app")

  /*****************************************************************************
   * Component: Login */
  /**
  * Defines the component for the Login.
  *****************************************************************************/
  .component("login",
    {
    templateUrl:"../app/routes/login/login.html",
    controller: LoginController
    });

  /*****************************************************************************
   * LoginController */
  /**
  * Controller for the POS component.
  *****************************************************************************/
  function LoginController($scope)
    {
    /** Reference to self. */ var mThis = this;
    }//END LoginController
  })();
