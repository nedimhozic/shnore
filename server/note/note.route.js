var express = require('express');
var router = express.Router();

var NoteBO = require('./note.business');

//Get By Code
router.get('/code/:id', function (req, res) {
    let code = req.params.id;

    NoteBO.getByCode(code).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Get By ID
router.get('/:id', function (req, res) {
    let id = req.params.id;

    NoteBO.getById(id).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Post Note
router.post('', function (req, res) {
    let note = req.body;

    NoteBO.createNote(note).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

//Update Note
router.put('', function (req, res) {
    let note = req.body;

    NoteBO.updateNote(note).then((response) => {
        res.status(response.status);
        res.json(response.data);
    }).catch((response) => {
        res.status(response.status);
        if (response.status == 500) {
            res.send(response.error);
        } else {
            res.json({ message: response.error });
        }
    });
});

module.exports = router;