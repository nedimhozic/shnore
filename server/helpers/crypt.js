var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports.hash = function(password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            callback(err, hash);
        });
    });
}

module.exports.compare = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, callback);
}


module.exports.encode = function (content) {
    return jwt.sign(content, config.contentSecret);
}

module.exports.decode = function (content) {
    if(!content) return '';
    var result = jwt.verify(content, config.contentSecret);
    return result;
}

