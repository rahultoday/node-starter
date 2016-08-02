var crypto = require('crypto');
// larger numbers mean better security, less
var config = {
  // size of the generated hash
  hashBytes: 32,
  // larger salt means hashed passwords are more resistant to rainbow table, but
  // you get diminishing returns pretty fast
  saltBytes: 16,
  // more iterations means an attacker has to take longer to brute force an
  // individual password, so larger is better. however, larger also means longer
  // to hash the password. tune so that hashing the password takes about a
  // second
  iterations: 872791
};
var hash = function(password, callback){
  // generate a salt for pbkdf2
  crypto.randomBytes(config.saltBytes, function(err, salt) {
    if (err) {
      return callback(err);
    }

    crypto.pbkdf2(password, salt, config.iterations, config.hashBytes,
      function(err, hash) {

      if (err) {
        return callback(err);
      }

      var combined = new Buffer(hash.length + salt.length + 8);

      // include the size of the salt so that we can, during verification,
      // figure out how much of the hash is salt
      combined.writeUInt32BE(salt.length, 0, true);
      // similarly, include the iteration count
      combined.writeUInt32BE(config.iterations, 4, true);

      salt.copy(combined, 8);
      hash.copy(combined, salt.length + 8);
      callback(combined);
    });
  });
};
module.exports = hash;
