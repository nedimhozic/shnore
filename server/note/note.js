var mongoose = require('mongoose');

var db = mongoose.connection;

var NoteSchema = mongoose.Schema({
    code: {
        type: String
    },
    content: {
        type: String
    },
    password: {
        type: String
    }
});

var Note = module.exports = mongoose.model('Note', NoteSchema);

module.exports.getByCode = function (code, callback) {
    Note.findOne({ "code": code }, callback);
}

module.exports.getById = function (id, callback) {
    Note.findById(id, callback);
}

module.exports.createNote = function (newNote, callback) {
    newNote.save(callback);
}

module.exports.updateNote = function (note, callback) {
    var query = { _id: note._id };
    Note.findOneAndUpdate(query, { content: note.content }, { new: true }, callback);
}

module.exports.setPassword = function (code, password, callback) {
    var query = { code: code };
    Note.findOneAndUpdate(query, { password: password }, { new: true }, callback);
}


