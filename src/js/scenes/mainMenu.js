var Phaser = require('phaser'),
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
