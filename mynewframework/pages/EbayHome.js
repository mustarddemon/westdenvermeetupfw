var util = require('util');
var Promise = require('bluebird');
var PageObject = require('./PageObject');
var commands = require('../lib/commands');
var _ = require('lodash');
var locators;

function EbayHome(passedInDriver) {
  PageObject.call(this, passedInDriver);
  this.locators = require('../locators/EbayHome.json');
};

//This is the old way of inheritence ES6 has a much better way
util.inherits(EbayHome, PageObject);

EbayHome.prototype.open = function() {
    var self = this;
    //open the ebay home page
    return new Promise(function(resolve, reject) {
      return resolve(self.driver.url('http://www.ebay.com'));
    });
};

EbayHome.prototype.searchFor = function(textToSearchFor) {
  // type something and search for it
  var self = this;
  return commands.setValue(self.locators.topSearchBar, textToSearchFor)
  .then(function() {
    return  commands.click(self.locators.topSearchButton);
  });
};


module.exports = EbayHome;
