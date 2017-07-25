var Promise = require('bluebird');

var Note = require('../models/note');
var HttpStatus = require('../helpers/statuses');

var ErrorResponse = {
    status: 500,
    error: ''
};

module.exports.getByCode = function (code) {
    return new Promise((resolve, reject) => {
        Note.getByCode(code, (err, note) => {
            if (err) {
                ErrorResponse.status = HttpStatus.InternalServerError;
                ErrorResponse.error = err;
                reject(ErrorResponse);
                return;
            }
            let response = {
                status: HttpStatus.Accepted,
                data: note
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
        if (!note.note) {
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
                    rErrorResponse.status = HttpStatus.InternalServerError;
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