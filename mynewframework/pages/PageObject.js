var _ = require('lodash');
var commands = require('../lib/commands');
var drivers;
var locators;

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
  return returnArray;
};

function PageObject(passedInDriver) {
  this.driver = passedInDriver;
  this.locators = require('../locators/' + this.constructor.name);
};

PageObject.prototype.waitForPageToLoad = function() {
  var self = this;
  //dig through all elements on the page and find any that are in the requiredForPage group
  var requiredElements = findRequiredLocators(self.locators);
  //forEach element I found call wait for Element to load
  return commands.waitForGroupToBeVisible(requiredElements);
};

module.exports = PageObject;
