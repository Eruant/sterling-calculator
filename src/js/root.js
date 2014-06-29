/**
 * Root file
 *
 * @author Matt Gale <matt@littleball.co.uk>
 */

var markdown = require('markdown').markdown;

module.exports = {

  /**
   * @method boot
   * The root method that starts all other methods in this application
   */
  boot: function () {
    var self = window.app = this;
    window.onload = function () {
      self.onload();
    };
    this.template = '# Instructions\n\n' +
      'Enter an amount of coins into the input box\n\n' +
      '<input type="text" id="enter" />';
  },
  
  onload: function () {
    var body = window.document.getElementsByTagName('body')[0];
    body.innerHTML = markdown.toHTML(this.template);
  }

};

module.exports.boot();
