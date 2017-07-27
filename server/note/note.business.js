var Promise = require('bluebird');

var Note = require('./note');
var Crypt = require('../helpers/crypt');
const HttpStatus = require('../helpers/statuses');

var ErrorResponse = {
    status: 500,
    error: ''
};

module.exports.getByCode = function (code, token) {
    return new Promise((resolve, reject) => {
        Note.getByCode(code, (err, note) => {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            if (note == null) {
                var newNote = new Note({
                    code: code,
                    content: '',
                    password: ''
                });
                Note.createNote(newNote, (err, createdNote) => {
                    if (err) {
                        ErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    let response = {
                        status: HttpStatus.Created,
                        data: createdNote
                    }
                    resolve(response);
                    return;
                });
                return;
            }
            let response = {
                status: HttpStatus.Accepted,
                data: note
            }

            if (note.password) {
                if (!token) {
                    ErrorResponse.status = HttpStatus.Unauthorized;
                    ErrorResponse.error = 'Missing token.';
                    reject(ErrorResponse);
                    return;
                }

                Crypt.compare(token, note.password, function (err, isMatch) {
                    if (err) {
                        ErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    if (isMatch) {
                        resolve(response);
                        return;
                    } else {
                        ErrorResponse.status = HttpStatus.Unauthorized;
                        ErrorResponse.error = 'Invalid token.';
                        reject(ErrorResponse);
                        return;
                    }
                });
                return;
            }
            resolve(response);
        });
    });
}

module.exports.getById = function (id) {
    return new Promise((resolve, reject) => {
        Note.getById(id, (err, note) => {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            let response = {
                status: HttpStatus.Accepted,
                data: note
            };
            resolve(response);
        });
    });
}

module.exports.createNote = function (note) {
    return new Promise((resolve, reject) => {
        if (!note.content) {
            ErrorResponse.status = HttpStatus.BadRequest
            ErrorResponse.error = 'Bad Data';
            reject(ErrorResponse);
            return;
        } else {
            var newNote = new Note({
                code: note.code,
                content: note.content
            });
            Note.createNote(newNote, (err, note) => {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Created,
                    data: note
                }
                resolve(response);
            });
        }
    });
}

module.exports.updateNote = function (note) {
    return new Promise((resolve, reject) => {
        if (!note || !note._id) {
            ErrorResponse.status = HttpStatus.BadRequest
            ErrorResponse.error = 'Bad Data';
            reject(ErrorResponse);
            return;
        } else {
            Note.updateNote(note, function (err, note) {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                let response = {
                    status: HttpStatus.Accepted,
                    data: note
                };
                resolve(response);
            });
        }
    });
}

module.exports.setPassword = function (code, password) {
    return new Promise((resolve, reject) => {
        if (!password) {
            ErrorResponse.status = HttpStatus.BadRequest
            ErrorResponse.error = 'Bad Data';
            reject(ErrorResponse);
            return;
        } else {
            Crypt.hash(password, function (err, hash) {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }

                Note.setPassword(code, hash, function (err, note) {
                    if (err) {
                        ErrorResponse.status = HttpStatus.InternalServerError;
                        ErrorResponse.error = err;
                        reject(ErrorResponse);
                        return;
                    }
                    let response = {
                        status: HttpStatus.Accepted,
                        data: note
                    };
                    resolve(response);
                });
            });

        }
    });
}