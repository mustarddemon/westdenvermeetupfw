var webdriverio = require('webdriverio');



describe('Basic tests without a framework', function() {
  this.timeout(30000);

  it('Should open google', function() {
    var options = {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    };

    return webdriverio.remote(options)
    .init()
    .url('http://www.google.com')
    .end();

  });


});
