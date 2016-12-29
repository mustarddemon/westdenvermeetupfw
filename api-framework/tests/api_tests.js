var Promise = require('bluebird');
var util = require('util');
var expect = require('chai').expect;
var request = require('supertest-as-promised');
var urlFactory = require('../lib/url_factory');
var detokenizer = require('../lib/detokenizer');
//a sample request body to use when testing create user
var createUserRequestBody = require('../request_bodies/create_user.json');

describe('My first API Test', function() {

    //Basic API test for a get request with Supertest
    it('Should return a 400 when I make a request for a user without a request body', function() {

      var domain = urlFactory.getApiDomain();
      var path = urlFactory.getCreateUserPath();
      var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      var requestBody = {};

      return request(domain)
      .post(path)
      .set(headers)
      .send(requestBody)
      .then(function(response) {
        expect(response.statusCode).to.eql(400, 'Didnt get the status code I wanted with this url ' + domain + path + ' : instead got this body ' + util.inspect(response.body));
        expect(response.body.message).to.include('Could not create user because of error: Cannot create user without the following fields');
      });

    });

    //Basic test with a post
    it('Should return a 200 when I make a successul post request', function() {
      var domain = urlFactory.getApiDomain();
      var path = urlFactory.getCreateUserPath();
      var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      var requestBody = {
        username: Date.now(),
        password: 'nelly',
        firstName: 'nick',
        ssn: 1234
      };

      return request(domain)
      .post(path)
      .set(headers)
      .send(requestBody)
      .then(function(response) {
        expect(response.statusCode).to.eql(201, 'Didnt get the status code I wanted with this url ' + domain + path + ' : instead got this body ' + util.inspect(response.body));
      });

    });

    //Testing the get request again but using our detokenizer to give us valid values
    it('Should create a valid request for our get out of thin air', function() {
      var domain = urlFactory.getApiDomain();
      var path = '/users/{user_id}';

      //detokenize String will replace {user_id} with a valid user id for the test
      return detokenizer.detokenizeString(path)
      .then(function(detokenizedPath) {
        return request(domain)
        .get(detokenizedPath)
        .then(function(response) {
          expect(response.statusCode).to.eql(200);
        });
      })

    });

    //Testing the post request again but using the detokenizer to get valid values for the path and
    //and the request body
    it('Should create a valid request for our post out of thin air', function() {
      var domain = urlFactory.getApiDomain();
      var path = '/users';

      return detokenizer.detokenizeBody(createUserRequestBody)
      .then(function(detokenizedBody) {
        requestBody = detokenizedBody;
        //Even though our path doesn't have tokens in it we still call this in case that changes in the future
        return detokenizer.detokenizeString(path);
      })
      .then(function(detokenizedPath) {
        return request(domain)
        .post(detokenizedPath)
        .send(requestBody)
        .then(function(response) {
          expect(response.statusCode).to.eql(201);
        });
      })

    });
});
