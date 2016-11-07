var Promise = require('bluebird');
var driver;
module.exports = {

  setDriver: function(passedInDriver) {
    driver = passedInDriver;
  },

  click: function(locatorObject) {
    console.log('I am clicking ' + locatorObject.description);
    return new Promise(function(resolve, reject) {
     if (locatorObject.frame) {
       //we know we have a frame
       return resolve(driver.frame(locatorObject.frame)
      .click(locatorObject.locator)
      .frame(null));
     } else {
       return resolve(driver.click(locatorObject.locator));
     }
   });
    //if click fails try again
  },

  setValue: function(locatorObject, textToType) {
    console.log('I am typing ' + textToType + ' into ' + locatorObject.description);
    return new Promise(function(resolve, reject) {
      return resolve(driver.setValue(locatorObject.locator, textToType));
    });
  },

  waitForGroupToBeVisible: function(locatorGroup) {
    //TODO: go through the group and pull out all the descriptions and make it pretty
    console.log('I am waiting for this group of elements to be visible ');
    var promises = [];
    locatorGroup.forEach(function(locator) {
      promises.push(module.exports.waitForVisible(locator));
    });

    //Use Promise.All method to wait for all elements to be visible
    return Promise.all(promises)
    .then(function(result) {
      return result;
    });

  },

  waitForVisible: function(locatorObject) {
    //TODO: go through the group and pull out all the descriptions and make it pretty
    console.log('I am waiting for ' + locatorObject.description + ' to be visible');
    return new Promise(function(resolve,reject) {
      if (locatorObject.frame) {
        //we know we have a frame
        return resolve(driver.frame(locatorObject.frame)
       .waitForVisible(locatorObject.locator)
       .frame(null));
      } else {
        return resolve(driver.waitForVisible(locatorObject.locator));
      }
        //write some logic to wait for a single element to load
    });

  }

};
