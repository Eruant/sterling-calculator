(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @class base
 * This is the root file for the Phaser Boilerplate. All other files are included from this one.
 *
 * @author Matt Gale <matt@littleball.co.uk>
 **/


var game = require('./game'),
    boot = require('./scenes/boot.js'),
    preloader = require('./scenes/preloader'),
    mainMenu = require('./scenes/mainMenu'),
    mainGame = require('./scenes/mainGame');

// set the default language
game.language = "en";

// add add states
game.state.add('boot', boot, false);
game.state.add('preloader', preloader, false);
game.state.add('mainMenu', mainMenu, false);
game.state.add('mainGame', mainGame, false);

// kick off the game
game.state.start('boot');

},{"./game":5,"./scenes/boot.js":7,"./scenes/mainGame":8,"./scenes/mainMenu":9,"./scenes/preloader":10}],2:[function(require,module,exports){
(function (global){
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game');

var Label = function (x, y, textContent, fontStyle) {

  // set a basic style
  var style = fontStyle || {
    font: '30px Arial',
    fill: '#4488cc',
    align: 'center'
  };

  // call the superclass method
  Phaser.Text.call(this, game, x, y, textContent, style);
  this.anchor.setTo(0.5, 0.5);

};

Label.prototype = Object.create(Phaser.Text.prototype);
Label.prototype.contructor = Label;

module.exports = Label;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../game":5}],3:[function(require,module,exports){
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

  for (var i = 0, il = coinsAvailable.length; i < il; i++) {
    while (pence >= coinsAvailable[i] && pence !== 0) {
      coins.push(coinsAvailable[i]);
      pence -= coinsAvailable[i];
    }
  }

  return coins;
};

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
(function (global){
/**
 * @class game
 * This is used to store a reference to the Phaser game object
 *
 * @author Matt Gale <matt@littleball.co.uk>
 **/
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null);

var game = new Phaser.Game(600, 300, Phaser.AUTO, 'content', null);

module.exports = game;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
/**
 * @class locale
 * A simple object to store translations for each language requred
 *
 * @author Matt Gale <matt@littleball.co.uk>
 */
module.exports = {
  "en": {
    "mainMenu": {
      "labelTitle": "Enter an amount and we will let you\nknow how many coins you will need."
    },
    "mainGame": {
      "labelTitle": "Add you game code goes here..."
    }
  }
};

},{}],7:[function(require,module,exports){
(function (global){
/**
 * @class boot
 *
 * @author Matt Gale <matt@littleball.co.uk>
 */
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game');

module.exports = {

  preload: function () {

    // add any images for the pre-loader here

  },

  create: function () {

    // max number of fingers to detect
    this.input.maxPointers = 1;

    // auto pause if window looses focus
    this.stage.disableVisibilityChange = true;

    if (game.device.desktop) {
      this.stage.scale.pageAlignHorizontally = true;
    }
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

    game.state.start('preloader', true, false);
  }

};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../game":5}],8:[function(require,module,exports){
var game = require('../game'),
  localisation = require('../locale'),
  Label = require('../classes/label');

module.exports = {

  create: function () {

    game.stage.backgroundColor = '#fff';

    this.labelTitle = new Label(game.width * 0.5, game.height * 0.5, localisation[game.language].mainGame.labelTitle);
    game.add.existing(this.labelTitle);

  },

  update: function () {
    // add your game loop code here
  },

  restartGame: function () {
    game.state.start('mainMenu');
  }

};

},{"../classes/label":2,"../game":5,"../locale":6}],9:[function(require,module,exports){
(function (global){
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game'),
  localisation = require('../locale'),
  Label = require('../classes/label'),
  s2p = require('../classes/stringToPence.js'),
  p2c = require('../classes/penceToCoins.js');

module.exports = {

  create: function () {

    var tween,
      style = {
        font: '30px Arial',
        fill: '#ffffff',
        align: 'center'
      };

    // set the background colour
    game.stage.backgroundColor = '#4488cc';
    
    // add a label based on our custom class
    this.labelTitle = new Label(game.width * 0.5, game.height * 0.5, localisation[game.language].mainMenu.labelTitle, style);
    this.labelTitle.alpha = 0;
    game.add.existing(this.labelTitle);

    this.enter = null;

    // fade the label in
    tween = this.add.tween(this.labelTitle);
    tween.to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.addKeyboardListener, this);
  },

  addKeyboardListener: function () {

    this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.enter.onDown.add(this.calculateMoney, this);
  },

  calculateMoney: function () {

    console.log(p2c(s2p(document.getElementById("textInput").value)));
  },

  startGame: function () {
    
    // go to the main game scene
    game.state.start('mainGame', true, false);
  }

};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../classes/label":2,"../classes/penceToCoins.js":3,"../classes/stringToPence.js":4,"../game":5,"../locale":6}],10:[function(require,module,exports){
(function (global){
var Phaser = (typeof window !== "undefined" ? window.Phaser : typeof global !== "undefined" ? global.Phaser : null),
  game = require('../game');

module.exports = {

  preload: function () {

    game.stage.backgroundColor = '#4488cc';

    var bmd = game.add.bitmapData(game.width, game.height);
    bmd.context.fillStyle = '#fff';
    bmd.context.fillRect(0, game.height - 10, game.width, 10);
    bmd.dirty = true;

    this.loadingBar = this.add.sprite(game.world.centerX, game.world.centerY, bmd);
    this.load.setPreloadSprite(this.loadingBar);

    // load any other assets here
  },

  create: function () {
    var tween = this.add.tween(this.loadingBar)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.startMainMenu, this);
  },

  startMainMenu: function () {
    game.state.start('mainMenu', true, false);
  }

};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../game":5}]},{},[1])