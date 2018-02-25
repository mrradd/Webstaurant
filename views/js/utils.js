(function ()
  {
  "use strict";

  /****************************************************************************
   * Array.prototype.removeItem */
  /**
   * Removes passed in object from the array.
   ***************************************************************************/
  Array.prototype.removeItem = function(obj)
    {
    this.splice(this.indexOf(obj), 1);
    }
  })();