

module.exports = {

  getApiDomain: function() {
    return 'http://localhost:3000';
  },

  getCreateUserPath: function() {
    return '/users';
  },

  getUserPath: function(userId) {
    return '/users/' + userId;
  }


};
