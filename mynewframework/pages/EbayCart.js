var util = require('util');
var Promise = require('bluebird');
var PageObject = require('./PageObject');
var commands = require('../lib/commands');
var _ = require('lodash');
var locators;

function EbayCart(passedInDriver) {
  PageObject.call(this, passedInDriver);
};

EbayCart.prototype.navigationPath = function() {
  return [
    {
      page: 'ebayHome',
      action: 'open'
    },
    {
      page: 'ebayHome',
      action: 'searchFor',
      data: 'orphans'
    },
    {
      page: 'ebaySearchResults',
      action: 'goToCart'
    }
  ];
};

//This is the old way of inheritence ES6 has a much better way
util.inherits(EbayCart, PageObject);


module.exports = EbayCart;
