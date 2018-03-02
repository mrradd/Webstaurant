(function ()
  {
  "use strict";

  /** Template for Header. Doing it this way rather than template file, because
   *  I couldn't get the template file to load. */
  var temp =
    "<div class='col-sm-offset-7 col-md-offset-8 col-lg-offset-9'  style='margin-bottom:15px;'>" +
      "<ul class='nav nav-pills'>" +
        "<li class='nav-item' ng-class=\"{active: $ctrl.activepill == 'pos'}\"><a href='pos'><span>Point of Sale</span></a></li>"   +
        "<li class='nav-item' ng-class=\"{active: $ctrl.activepill == 'kitchen'}\"><a href='kitchen'><span>Kitchen</span></a></li>" +
        "<li class='nav-item' ng-class=\"{active: $ctrl.activepill == 'manager'}\"><a href='manager'><span>Manager</span></a></li>" +
      "</ul>" +
    "</div>"

  /****************************************************************************
   * Component: header */
  /**
   * Header menu component.
   ***************************************************************************/
  angular.module("app")
  .component("header",
    {
    bindings: {activepill: "@"},
    template: temp,
    controller: HeaderController
    });
  function HeaderController()
    {

    }
  })();