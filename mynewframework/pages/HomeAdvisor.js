var util = require('util');
var Promise = require('bluebird');
var PageObject = require('./PageObject');
var commands = require('../lib/commands');
var _ = require('lodash');
var locators;

function HomeAdvisor(passedInDriver) {
  PageObject.call(this, passedInDriver);
};


//This is the old way of inheritence ES6 has a much better way
util.inherits(SamplePageObject, PageObject);

module.exports = SamplePageObject;
