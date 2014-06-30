(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @class penceToCoins
 * Takes an integer of pence and returns an array of values that add up to the original value
 *
 * @param pence {Number}
 *
 * @author Matt Game <matt@littleball.co.uk>
 */

var coinsAvailable = [200, 100, 50, 20, 10, 5, 2, 1];

module.exports = function (pence) {
  
  var coins, remaining;

  coins = [];
  remaining = pence;

  // loop through each type of coin
  for (var i = 0, il = coinsAvailable.length; i < il; i++) {

    // keep adding this type of coin if we have enough pence left
    while (pence >= coinsAvailable[i] && pence !== 0) {
      coins.push(coinsAvailable[i]);
      pence -= coinsAvailable[i];
    }
  }

  return coins;
};

},{}],2:[function(require,module,exports){
/**
 * Root file
 *
 * @author Matt Gale <matt@littleball.co.uk>
 */
var p2c = require('./penceToCoins.js'),
  stp = require('./stringToPence.js');

module.exports = {

  /**
   * @method boot
   * The root method that starts all other methods in this application
   */
  boot: function () {

    window.app = this;

    var doc = window.document;

    // make a reference to the elements on the page
    this.input = doc.getElementById('moneyInput');
    this.result = doc.getElementById('result');

    // add the event listeners
    this.startListening();
  },

  startListening: function () {

    var el = this.input;

    // not IE
    if (el.addEventListener) {
      el.addEventListener('change', this.change.bind(this), false);
    } else {
      el.attachEvent('onchange', this.change.bind(this), false);
    }
  },

  // calculate the new array
  change: function () {
    var pence = stp(this.input.value),
      coins = p2c(pence);

    this.updateDOM(coins);
  },

  // add the array to the page
  updateDOM: function (coinArray) {

    var tempContainer, i, length, temp;

    tempContainer = window.document.createElement('div');
    tempContainer.className = 'coins';
    length = coinArray.length;

    if (length > 0)  {
      for (i = 0; i < length; i++) {
        temp = window.document.createElement('div');
        temp.className = 'coin coin_' + coinArray[i];
        tempContainer.appendChild(temp);
      }
    } else {
      temp = window.document.createElement('p');
      temp.innerHTML = 'Sorry, but I didn\'t understand that value.';
      tempContainer.appendChild(temp);
    }

    while (this.result.firstChild) {
      this.result.removeChild(this.result.firstChild);
    }
    this.result.appendChild(tempContainer);
  }

};

module.exports.boot();

},{"./penceToCoins.js":1,"./stringToPence.js":3}],3:[function(require,module,exports){
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

},{}]},{},[2])