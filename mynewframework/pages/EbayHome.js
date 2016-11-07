var Promise = require('bluebird');
var commands = require('../lib/commands');
var _ = require('lodash');
var driver;
var locators;

function EbayHome(passedInDriver) {
  this.driver = passedInDriver;
  this.locators = require('../locators/EbayHome.json');
};

var findRequiredLocators = function(locators) {
  var returnArray = [];
  //Loop through all the locators
  _.forOwn(locators, function(locator) {
    //Check if it has the groups field
    if (locator.groups) {
      //if so check if it has requiredForPage
      if (locator.groups.indexOf("requiredForPage") !== -1) {
        //if so add it to our return array
        returnArray.push(locator);
      }
    }

  });

  //return when done
  return returnArray;
}

EbayHome.prototype.waitForPageToLoad = function() {
  var self = this;
  //dig through all elements on the page and find any that are in the requiredForPage group
  var requiredElements = findRequiredLocators(self.locators);
  //forEach element I found call wait for Element to load
  commands.waitForGroupToBeVisible(requiredElements);
};

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
