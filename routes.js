let express = require('express');
let router = express.Router();              

var webController = require('./controllers/webController');

router.get('/', webController.landing);

router.get('/zone/:id', webController.showZone);
router.get('/zone/:id/add', webController.addNote);
router.post('/notes/new', webController.notesNew);
router.get('/zone/:id/:note_id/modify', webController.modifyNote);
router.get('/zone/:id/:note_id/delete', webController.deleteNote);
router.get('/notes/deleteall', webController.deleteAll);

module.exports = router;
