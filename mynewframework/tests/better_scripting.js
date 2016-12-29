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
    setTimeout(done, 5000);
  });

  afterEach(function() {
    driver.end();
  });

  it('Should open ebay and search for orphans', function() {
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

  it('Go to cart page with navigation path', function() {
    return commands.navigateToPage(on, 'ebayCart');
  });

  var tests = [
    {
      page: 'ebayHome',
      description: 'Home Page of Ebay'
    },
    {
      page: 'ebaySearchResults',
      description: 'Search Results Page of Ebay'
    },
    {
      page: 'ebayCart',
      description: 'Shopping Cart Page of ebay'
    }
  ];

  tests.forEach(function(test) {
    it.only('Make sure page ' + test.description + ' loads correctly', function() {
      //check if the page has a navigation path
      if (!on[test.page]().navigationPath) {
          return;
      }
      //if it does navigate to that page and wait for the page to load
      return commands.navigateToPage(on, test.page)
      .then(function(res) {
        on[test.page]().waitForPageToLoad();
      });
    });
  });


});
