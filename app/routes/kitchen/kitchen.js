(function()
  {
  "use strict"

  angular.module("app")

  /*****************************************************************************
   * Component: Kitchen */
  /**
  * Defines the component for the Kitchen.
  *****************************************************************************/
  .component("kitchen",
    {
    templateUrl:"../app/routes/kitchen/kitchen.html",
    controller: KitchenController
    });

  /*****************************************************************************
  * KitchenController */
  /**
  * Controller for the Kitchen component.
  *****************************************************************************/
  function KitchenController($scope)
    {
    /** Reference to self. */ var mThis = this;
    }//END KitchenController
  })();
