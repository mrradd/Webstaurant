(function ()
  {
  "use strict";

  /** Template for Header. Doing it this way rather than template file, because
   *  I couldn't get the template file to load. */
  var temp =
    "<div class='col-sm-offset-2 col-md-offset-4'>" +
      "<ul class='nav nav-pills'>" +
        "<li class='nav-item'><a href='pos'><span>Point of Sale</span></a></li>" +
        "<li class='nav-item'><a href='kitchen'><span>Kitchen View</span></a></li>" +
        "<li class='nav-item'><a href='metrics'><span>Metrics</span></a></li>" +
        "<li class='nav-item'><a href='editMenu'><span>Edit Menu</span></a></li>" +
        "<li class='nav-item'><a href='users'><span>Edit Personnel</span></a></li>" +
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
    template: temp,
    });
  })();