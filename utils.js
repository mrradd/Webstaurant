/******************************************************************************
 * utils *
 * Utility functions.
 *****************************************************************************/

var utils = {};

/******************************************************************************
 * round *
 ***
 * Rounds to the nearest passed in precision.
 *
 * @param  value     Value to round.
 * @param  decimals  Precision to round to.
 *****************************************************************************/
utils.round = function(value, decimals)
  {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

module.exports = utils;