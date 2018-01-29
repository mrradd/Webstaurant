(function()
  {
  "use strict"

  angular.module("app")

  /*****************************************************************************
   * Component: POS */
  /**
  * Defines the component for the POS.
  *****************************************************************************/
  .component("pos",
    {
    templateUrl:"../app/routes/pos/pos.html",
    controller: POSController
    });

  /*****************************************************************************
   * POSController */
  /**
  * Controller for the POS component.
  *****************************************************************************/
  function POSController($scope)
    {
    /** Reference to self. */ var mThis = this;
    }//END POSController
  })();
