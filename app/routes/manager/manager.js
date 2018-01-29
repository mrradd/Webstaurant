(function()
  {
  "use strict"

  angular.module("app")

  /*****************************************************************************
  * Component: Manager */
  /**
  * Defines the component for the Manager.
  *****************************************************************************/
  .component("manager",
    {
    templateUrl:"../app/routes/manager/manager.html",
    controller: ManagerController
    });

  /*****************************************************************************
  * POSController */
  /**
  * Controller for the Manager component.
  *****************************************************************************/
  function ManagerController($scope)
    {
    /** Reference to self. */ var mThis = this;
    }//END ManagerController
  })();
