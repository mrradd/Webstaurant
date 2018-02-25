(function ()
  {
  "use strict";

  /****************************************************************************
   * TheService */
  /**
   * General Service to use throughout the app.
   ***************************************************************************/
  angular.module("app")
  .service("TheService", function()
    {
    this.devUrl = "http://localhost:3000/";

    });//End TheService
  })();