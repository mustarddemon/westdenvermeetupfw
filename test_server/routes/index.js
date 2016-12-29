var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var userHelper = require('../lib/user_helper');


/* GET home page. */
router.get('/', function(req, res) {
  return res.render('index');
});

router.get('/users/:user_id', function(req, res) {
  var userId = req.params.user_id;
  var user = userHelper.getUser(userId);

  if (!user) {
    var error = {
      message: "Could not find user with id " + userId
    }
    return res.send(404, error)
  }
  return res.send(200, user);
});

router.post('/users', jsonParser, function(req, res) {

  var result = userHelper.createUser(req.body);

  if (result.message) {
    var error = {
      message: "Could not create user because of error: " + result.message
    }
    return res.send(400, error);
  } else {
    return res.send(201, result);
  }

});


module.exports = router;
