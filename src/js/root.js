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

    for (i = 0; i < length; i++) {
      temp = window.document.createElement('div');
      temp.className = 'coin coin_' + coinArray[i];
      tempContainer.appendChild(temp);
    }

    while (this.result.firstChild) {
      this.result.removeChild(this.result.firstChild);
    }
    this.result.appendChild(tempContainer);
  }

};

module.exports.boot();
