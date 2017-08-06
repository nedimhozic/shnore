var Promise = require('bluebird');

var Note = require('./note');
var Crypt = require('../helpers/crypt');
var Auth = require('../helpers/auth');
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
            note.content = Crypt.decode(note.content);
            let response = {
                status: HttpStatus.Accepted,
                data: note
            };

            if (note.password) {
                if (!token) {
                    let error = {
                        status: HttpStatus.NonAuthoritative,
                        data: 'Missing token'
                    }
                    resolve(error);
                    return;
                }
                var data = Auth.check(token);
                if (data.code == note.code && data.token == note.password) {
                    response.data.password = '';
                    resolve(response);
                    return;
                } else {
                    let error = {
                        status: HttpStatus.NonAuthoritative,
                        data: 'Invalid password'
                    }
                    resolve(error);
                    return;
                }
            } else {
                resolve(response);
                return;
            }
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

module.exports.updateNote = function (note, token) {
    return new Promise((resolve, reject) => {
        if (!note || !note._id) {
            ErrorResponse.status = HttpStatus.BadRequest
            ErrorResponse.error = 'Bad Data';
            reject(ErrorResponse);
            return;
        } else {
            Note.getByCode(note.code, function (err, dbNote) {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }

                if (dbNote.password) {
                    if (!token) {
                        ErrorResponse.status = HttpStatus.Unauthorized
                        ErrorResponse.error = 'Unauthorized';
                        reject(ErrorResponse);
                        return;
                    } else {
                        let data = Auth.check(token);
                        if (data.code == dbNote.code && data.token == dbNote.password) {
                            note.content = Crypt.encode(note.content);
                            Note.updateNote(note, function (err, note) {
                                if (err) {
                                    ErrorResponse.status = HttpStatus.InternalServerError;
                                    ErrorResponse.error = err;
                                    reject(ErrorResponse);
                                    return;
                                }
                                note.content = Crypt.decode(note.content);
                                let response = {
                                    status: HttpStatus.Accepted,
                                    data: note
                                };
                                resolve(response);
                            });
                        } else {
                            ErrorResponse.status = HttpStatus.Unauthorized
                            ErrorResponse.error = 'Invalid token';
                            reject(ErrorResponse);
                            return;
                        }
                    }
                } else {
                    note.content = Crypt.encode(note.content);
                    Note.updateNote(note, function (err, note) {
                        if (err) {
                            ErrorResponse.status = HttpStatus.InternalServerError;
                            ErrorResponse.error = err;
                            reject(ErrorResponse);
                            return;
                        }
                        note.content = Crypt.decode(note.content);
                        let response = {
                            status: HttpStatus.Accepted,
                            data: note
                        };
                        resolve(response);
                    });
                }
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
                    let token = Auth.getToken(code, hash);
                    let response = {
                        status: HttpStatus.Accepted,
                        data: token
                    };
                    resolve(response);
                });
            });

        }
    });
}

module.exports.getToken = function (code, password) {
    return new Promise((resolve, reject) => {
        Note.getByCode(code, function (err, note) {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            Crypt.compare(password, note.password, function (err, isMatch) {
                if (err) {
                    ErrorResponse.status = HttpStatus.InternalServerError;
                    ErrorResponse.error = err;
                    reject(ErrorResponse);
                    return;
                }
                if (isMatch) {
                    var token = Auth.getToken(code, note.password);
                    let response = {
                        status: HttpStatus.Accepted,
                        data: token
                    };
                    resolve(response);
                } else {
                    ErrorResponse.status = HttpStatus.Unauthorized
                    ErrorResponse.error = 'Invalid password';
                    reject(ErrorResponse);
                    return;
                }
            });
        });
    });
}