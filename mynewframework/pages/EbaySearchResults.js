var util = require('util');
var Promise = require('bluebird');
var PageObject = require('./PageObject');
var commands = require('../lib/commands');
var _ = require('lodash');
var locators;

function EbaySearchResults(passedInDriver) {
  PageObject.call(this, passedInDriver);
};

//This is the old way of inheritence ES6 has a much better way
util.inherits(EbaySearchResults, PageObject);

EbaySearchResults.prototype.navigationPath = function() {
  return [
    {
      page: 'ebayHome',
      action: 'open'
    },
    {
      page: 'ebayHome',
      action: 'searchFor',
      data: 'orphans'
    }
  ];
};

EbaySearchResults.prototype.goToCart = function() {
  var self = this;
  commands.click(self.locators.shoppingCartIcon);
};




module.exports = EbaySearchResults;
