var Promise = require('bluebird');
var request = require('supertest-as-promised');
var userHelper = require('./user_helper');

//Library of custom detokenizer methods that will return a valid value for any given token
//Some may be simple hardcoded values, others like user_id will create data in the system to ensure the value is always valid
module.exports = {

  //Creates a new user then returns that users Id to guarantee its always a valid user id for the test
  get_default_user_id: function() {
    //create a new user and return that users id
    return module.exports.get_default_username()
    .then(function(username) {
      return userHelper.createNewUser(username, 'glenn', '123-45-6789');
    })
    .then(function(result) {
      return Promise.resolve({token: '{user_id}', value: result.id});
    })
  },

  //Returns a guaranteed unique user name by using a date stamp
  get_default_username: function() {
      return Promise.resolve({token: '{username}', value: Date.now()});
  },

  //Returns a hard coded valid ssn, this might change in the future so we leave the method here
  //Even though this is hardcoded and not asynchronous we still return a promise because the detokenizer treats every method like it might be a promise
  get_default_ssn: function() {
    return Promise.resolve({ token: '{ssn}', value: '755-90-1324'});
  }

};
