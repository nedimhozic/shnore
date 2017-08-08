var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var config = require('../config');

module.exports.hash = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            callback(err, hash);
        });
    });
}

module.exports.compare = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, callback);
}


module.exports.encode = function (content) {
    var cipher = crypto.createCipher(config.algorithm, config.contentPassword)
    var crypted = cipher.update(content, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

module.exports.decode = function (content) {
    var decipher = crypto.createDecipher(config.algorithm, config.contentPassword)
    var dec = decipher.update(content, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

