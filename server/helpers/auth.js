var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports.getToken = function (code, token) {
    var data = {
        code: code,
        token: token
    };
    return jwt.sign(data, config.secret, { expiresIn: '168h' });
}

module.exports.check = function (token) {
    return jwt.verify(token, config.secret);
}