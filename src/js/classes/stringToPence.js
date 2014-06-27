/**
 * @class stringToPence
 * Returns the value of pence from a string
 *
 * @param rawValue {String} text value of money
 *
 * @example
 *     s2p = require('./stringToPence.js');
 *     var pence = s2p("£12.45p");
 *
 * @author Matt Gale <matt@littleball.co.uk>
 */

/**
 * @private parseAmount {String} {Boolean}
 * Formats the string into a int
 */
var parseAmount = function (inputString, pence) {

  var returnValue = parseFloat(inputString, 10);

  if (!pence) {
    returnValue *= 100;
  }

  return returnValue;

};

module.exports = function (rawValue) {

  var valueMatch, parsedValue;
  
  // validate the string
  valueMatch = rawValue.match(/(^£?)(\d+\.?\d*)p?$/);

  if (valueMatch) {

    if (valueMatch[1] && valueMatch[1] === "£") {

      // value us in pounds
      parsedValue = parseAmount(valueMatch[2]);
    } else {

      if (valueMatch[2].match(/\./)) {

        // value is in pounds
        parsedValue = parseAmount(valueMatch[2]);
      } else {

        // value is in pence
        parsedValue = parseAmount(valueMatch[2], true);
      }
    }

    return Math.round(parsedValue);
  }
  
  return 0;
};
