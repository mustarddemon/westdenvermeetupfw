
var EbayHome = require('./EbayHome');
var EbaySearchResults = require('./EbaySearchResults');
var EbayCart = require('./EbayCart');
var driver;

function PageObjectCollection(passedInDriver) {
  this.driver = passedInDriver;
};

PageObjectCollection.prototype.ebayHome = function() {
    var self = this;
    var ebayHome = new EbayHome(self.driver);
    return ebayHome;
};

PageObjectCollection.prototype.samplePageObject = function() {
  var self = this;
  var samplePageObject = new SamplePageObject(self.driver);
  return samplePageObject;
}

PageObjectCollection.prototype.ebaySearchResults = function() {
    var self = this;
    var ebaySearchResults = new EbaySearchResults(self.driver);
    return ebaySearchResults;
} ;

PageObjectCollection.prototype.ebayCart = function() {
    var self = this;
    var ebayCart = new EbayCart(self.driver);
    return ebayCart;
} ;

PageObjectCollection.prototype.homeAdvisor = function() {
    var self = this;
    var homeAdvisor = new HomeAdvisor(self.driver);
    return homeAdvisor;
} ;

module.exports = PageObjectCollection;
