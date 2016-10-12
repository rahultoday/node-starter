'use strict';
const crypto = require('crypto');
let tokenCache = {};

module.exports = {
  addToCache: function (username, token) {
    var expires = 300000;
    tokenCache[token] = {
      user: username,
      expires: new Date((new Date()).getTime() + expires),
      uses: 0
    };
  },
  validateToken: function (token) {
    return (tokenCache[token] && tokenCache[token]['expires'] > (new Date()).getTime())
  },
  generateToken: function () {
    return crypto.randomBytes(64).toString('hex');
  }
};
