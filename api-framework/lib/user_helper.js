var util = require('util');
var Promise = require('bluebird');
var request = require('supertest-as-promised');
var urlFactory = require('./url_factory');

module.exports = {

  //Will hit the /users endpoint to create a new user it's assumed all users will have the same PW
  //This is used as part of some methods in the detokenizer but can also be used for any test that needs a new user to work with
  createNewUser: function(username, firstName, ssn) {

    //our request body for our new user
    var userInfo = {
      username: username,
      password: 'welcome2',
      firstName: firstName,
      ssn: ssn
    };

    var domain = urlFactory.getApiDomain();
    var path = '/users';

    return request(domain)
    .post(path)
    .send(userInfo)
    .then(function(response) {
      if (response.statusCode !== 201) {
        return Promise.reject('Failure occurred trying to create user received ' + response.statusCode + 'and request body ' + util.inspect(response.body));
      }
      return response.body;
    })

  }

};
