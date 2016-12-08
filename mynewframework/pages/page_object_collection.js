
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

module.exports = PageObjectCollection;
