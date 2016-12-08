var webdriverio = require('webdriverio');
var EbayHome = require('../pages/EbayHome');
var commands = require('../lib/commands');
var PageObjectCollection = require('../pages/page_object_collection');

var driver;
var on;

describe('Basic tests without a framework', function() {
  this.timeout(30000);


  beforeEach(function(done) {
    var options = {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    };

    driver = webdriverio.remote(options)
    .init();
    commands.setDriver(driver);
    on = new PageObjectCollection(driver);
    //temporary way to give the browser a chance to open
    setTimeout(done, 3000);
  });

  afterEach(function() {
    driver.end();
  });

  it.skip('Should open ebay and search for orphans', function() {
    //I want to open a browser
    //I want to load google
    var ebayHome = new EbayHome(driver);
    return ebayHome.open()
    .then(function() {
      return ebayHome.searchFor('orphans');
    });

  });

  it('Should open ebay and search for orphans but better this time', function() {

    return on.ebayHome().open()
    .then(function(result) {
      return on.ebayHome().waitForPageToLoad();
    })
    .then(function(result) {
      return on.ebayHome().searchFor('orphans');
    });

  });

  it('Should open ebay and search for orphans and go to the cart', function() {

    return on.ebayHome().open()
    .then(function(result) {
      return on.ebayHome().waitForPageToLoad();
    })
    .then(function(result) {
      return on.ebayHome().searchFor('orphans');
    })
    .then(function(result) {
      return on.ebaySearchResults().goToCart();
    })
    .then(function(result) {
      return on.ebayCart().waitForPageToLoad();
    });

  });


});
