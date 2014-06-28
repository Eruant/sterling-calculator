/**
 * Root file
 *
 * @author Matt Gale <matt@littleball.co.uk>
 */

module.exports = {

  /**
   * @method boot
   * The root method that starts all other methods in this application
   */
  boot: function () {
    window.app = this;
  }

};

module.exports.boot();
