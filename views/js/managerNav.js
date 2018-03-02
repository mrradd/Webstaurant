(function ()
  {
  "use strict";

  /** Template for Manager Nav. Doing it this way rather than template file, because
   *  I couldn't get the template file to load. */
  var temp =
    "<ul class='nav nav-pills nav-stacked'>"+
      "<li ng-class=\"{active: $ctrl.activepill == 'dashboard'}\"><a href='manager'>Dashboard</a></li>"+
      "<li ng-class=\"{active: $ctrl.activepill == 'editMenu'}\"> <a href='editMenu'>Edit Menu</a></li>"+
      "<li ng-class=\"{active: $ctrl.activepill == 'employees'}\"><a href='employees'>Employees</a></li>"+
    "</ul>";

  /****************************************************************************
   * Component: header */
  /**
   * Header menu component.
   ***************************************************************************/
  angular.module("app")
  .component("managerNav",
    {
    bindings: {activepill: "@"},
    template: temp
    });
  })();