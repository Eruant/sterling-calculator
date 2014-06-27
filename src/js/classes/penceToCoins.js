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
