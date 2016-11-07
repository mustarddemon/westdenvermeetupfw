
var EbayHome = require('./EbayHome');
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
  //stub
} ;

module.exports = PageObjectCollection;
