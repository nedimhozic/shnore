var bcrypt = require('bcryptjs');

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
