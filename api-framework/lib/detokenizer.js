var _ = require('lodash');
var Promise = require('bluebird');
var detokenizerMethods = require('./detokenize_methods');

module.exports = {

  //Uses a simple Regular Expression to find all tokens in a given string
  findTokens: function(tokenizedString) {
    reg = new RegExp(/{(.*?)}/);
    var matches = tokenizedString.match(/{(.*?)}/g);
    return matches;
  },

  //Determines the correct method name to call to get a value for the token
  computeMethodName: function(token) {
    var expectedMethodName = 'get_default_' + token;
    expectedMethodName = expectedMethodName.replace('{', '');
    expectedMethodName = expectedMethodName.replace('}', '');
    return expectedMethodName;
  },

  //for all the found tokens call the appropriate 'get_default_' method to get a valid value
  callDetokenizerMethods: function(matches) {
    var promiseArray = [];
    matches.forEach(function(token) {
      //Compute the detokenizer method name
      var expectedMethodName = module.exports.computeMethodName(token);
      if (typeof(detokenizerMethods[expectedMethodName]) !== 'function') {
        return reject(new Error('COULD NOT FIND METHOD FOR TOKEN ' + expectedMethodName));
      }
      promiseArray.push(detokenizerMethods[expectedMethodName]());
    });

    return promiseArray;
  },

  //Find all tokens in a string and replace them with valid values
  detokenizeString: function(tokenizedString) {
    return new Promise(function(resolve, reject) {
      //We clone the string to make sure we are returning a new string and not impacting the one passed in
      var newStr = _.clone(tokenizedString);
      var promiseArray = [];

      //match all tokens in the string
      var matches = module.exports.findTokens(newStr)
      if (!matches) {
        return resolve(newStr);
      }
      promiseArray = module.exports.callDetokenizerMethods(matches);

      //wait for all our detokenize calls to complete
      return Promise.all(promiseArray)
      .then(function(results) {

        results.forEach(function(res) {
          //results come back in the form  {token: '{tokenName}', value: 'value to use'}
          newStr = newStr.replace(res.token, res.value);
        });
        return resolve(newStr);
      });
    });
  },

  //Takes an object and checks each field in the object if that field is a string we
  //call detokenize String to replace any tokens with valid values
  //If the field is an object, we recurse and call detokenizeBody again for the sub object
  detokenizeBody: function detokenizeBody(inputBody) {
    var self = this;
    //We use cloneDeep to ensure we return a new object and don't actually change the one passed in
    var body = _.cloneDeep(inputBody);
    var promises = [];
    var totalKeys = Object.keys(body).length;

    //if the object is empty no need to go further
    if (totalKeys === 0) {
      return Promise.resolve(body);
    }

    Object.keys(body).forEach(function iterateKeys(key) {
      var val = body[key];
      var newVal;
      //if its a string call detokenize string to return a new string with all tokens replaced with a valid value
      if (typeof (val) === 'string') {
        promises.push(module.exports.detokenizeString(val)
        .then(function(newVal) {
          body[key] = newVal;
        }));
      //if its an object then start over for the new object
      } else if (typeof (val) === 'object') {
        promises.push(module.exports.detokenizeBody(body[key]));
      }
    });
    //once all tokens are replaced send back our fancy new request body 
    return Promise.all(promises)
    .then(function(result) {
      return Promise.resolve(body);
    });
  }

}
