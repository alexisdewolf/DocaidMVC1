let express = require('express');
let router = express.Router();              
// router.use(express.json({extended: false})); -> déjà dans server
// router.use(express.urlencoded({extended: false}));
var webController = require('./controllers/webController');
let apiController = require ('./controllers/apiController');

router.get('/', webController.landing);
router.get('/zone/:id', webController.showZone);
// router.get('/zone/:id/discipline', webController.showDiscipline);
router.get('/zone/:id/add', webController.addNote);
router.post('/notes/new', webController.notesNew);
router.get('/zone/:id/:note_id/modify', webController.modifyNote);
router.get('/zone/:id/:note_id/delete', webController.deleteNote);
router.get('/notes/deleteall', webController.deleteAll);

router.get('/api', apiController.landing);
router.get('/api/zone/:id', apiController.showZone);
router.post('/api/notes/new', apiController.notesNew);
// router.put('/api/zone/:id/:note_id/modify', apiController.updateNote);
router.put('/api/zone/modify/:id', apiController.updateNote);
// router.delete('/api/zone/:id/:note_id/delete', apiController.deleteNote);
router.delete('/api/zone/delete/:id', apiController.deleteNote);
router.delete('/api/notes/deleteall', apiController.deleteAll);

module.exports = router;