(function()
  {
  "use strict";

  /****************************************************************************
  * Component: header */
  /**
  * Defines the component Header.
  ****************************************************************************/
  angular.module("app")
  .component("header",
    {
    templateUrl: "../app/elements/header/header.html",
    controller: HeaderController
    });

  /****************************************************************************
  * HeaderController */
  /**
  * Controller for the Header component.
  ****************************************************************************/
  function HeaderController($rootScope)
    {
    /** Reference to this. */
    var mThis  = this;
    mThis.hide = false;//true; //TODO CH  WHEN TRUE, HEADER HIDES ON RELOAD.

    }//TODO CH  END HeaderController
  })();