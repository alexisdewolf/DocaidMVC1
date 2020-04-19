let Zone = require('../models/Zone');
let Note = require('../models/Note');
let db = require('../db');

exports.landing = function (req, res) { // Sélection de toutes les zones et toutes les notes pour afficher sur landing.ejs
// Ici on va sélectionner toutes les zones pour afficher des liens sur la landing page.
    db.query("SELECT * FROM body_zone ORDER BY bz_id", (err, data) => {
		if(err){
			console.log(new Date() + ' Echec de la recherche de la liste des Body Zone : '+err);
		} else {
            console.log(new Date() + ' Succes de la recherche de la liste des Body Zone ');
            
            let all_zones = [];

            data.forEach(elem => {
                let zone = new Zone(elem.bz_id, elem.bz_name);
                all_zones.push(zone);
            });

// Ici on va sélectionner toutes les notes pour afficher le résumé sur la landing page.
            db.query("SELECT * FROM notes ORDER BY notes_id", (err, data) => {
                if(err){
                    console.log(new Date() + ' Echec de la recherche de la liste des notes : '+err);
                } else {
                    console.log(new Date() + ' Succes de la recherche de la liste des notes ');
                    
                    let all_notes = [];
        
                    data.forEach(elem => {
                        let note = new Note(elem.notes_id, elem.notes_description, elem.bz_id);
                        all_notes.push(note);
                    });
                
                    res.render('landing.ejs', {all_zones: all_zones, all_notes: all_notes});
                }
            })		
        }
	})
};

exports.showZone = function(req, res) { // Sélection des notes de la zone correspondante pour afficher sur showZone.ejs
    let bz_id = req.params.id;
    
// Ici on va sélectionner la Body Zone sélectionnée. On fait ceci pour pouvoir définir le modèle Zone qui nous permettra de l'afficher dans la vue
    db.query("SELECT * FROM body_zone WHERE bz_id="+bz_id, (err, data) => {
        if(err){
			console.log(new Date() + ' Echec de la recherche de la Body Zone '+bz_id+err);
		} else {
            console.log(new Date() + ' Succès de la recherche de la Body Zone '+bz_id);

            let zone = new Zone(data[0].bz_id, data[0].bz_name);

// Ici on va sélectionner les notes en rapport avec cette zone
            db.query("SELECT * FROM notes WHERE bz_id="+bz_id+" ORDER BY notes_id", (err, data) => {
                if(err){
                    console.log(new Date() + ' Echec de la recherche des notes pour la Body Zone '+bz_id+err);
                } else {
                    console.log(new Date() + ' Succès de la recherche des notes pour la Body Zone '+bz_id);

                    let notes = [];

                    data.forEach(element => {
                        let note = new Note(element.notes_id, element.notes_description, element.bz_id);
                        notes.push(note);
                    });
                    res.render('showZone.ejs', {zone: zone, notes: notes});
                }
            })
        }
    }) 
};

exports.addNote = function(req, res) { // Sélection des zones pour afficher sur la vue addNotes.ejs
    let bz_id = req.params.id;
    db.query("SELECT * FROM body_zone WHERE bz_id="+bz_id, (err, data) => {
        if(err){
			console.log(new Date() + ' Echec de la recherche de la Body Zone '+bz_id+' pour ajouter une note à celle-ci '+err);
		} else {
            console.log(new Date() + ' Succes de la recherche de la Body Zone '+bz_id+' pour ajouter une note à celle-ci ');
            let zone = new Zone(data[0].bz_id, data[0].bz_name);
            let note = new Note(-1, "", zone.id)
            res.render('addNote.ejs', {zone: zone, note: note});
        }
    }) 
};

exports.notesNew =  function(req, res) { // On est en post : ajout de la note de addNotes dans la DB & modification de la note de modifyNote
    let bz_id = req.body.bz_id;
    let description = req.body.description;
    let note_id = req.body.note_id;
    if ( note_id == -1){ // Ici on prend en charge le cas où il n'y a pas encore d'ID, donc le cas où on créé une note
        let note = new Note(-1, description, bz_id);
        db.query("INSERT INTO notes (notes_description, bz_id) VALUES ('"+note.description+"', '"+note.bz_id+"')", function (err,data){
            if(err){
                console.log(new Date() + ' Echec de l\'insertion de la nouvelle note '+err);
            } else {
                console.log(new Date() + ' Succès de l\'insertion de la nouvelle note ');
                res.redirect('/');
            }
        })
    }
    else if ( note_id >=0){ // Ici on prend en charge le cas où il y a déjà un ID, donc le cas où on modifie une note
        let note = new Note(note_id, description, bz_id);
        db.query("UPDATE notes SET notes_description='"+note.description+"' WHERE notes_id='"+note.id+"'",[note, req.body.note_id], function (err, data){
            if(err){
                console.log(new Date() + ' Echec de l\'actualisation de la note '+note.id+' avec la description '+note.description+err);
            }else {
                console.log(new Date() + ' Succès de l\'actualisation de la note '+note.id+' avec la description '+note.description);
                res.redirect("/");
            }
        })
    }
};

exports.modifyNote = function(req,res) { // Sélection de la note qu'on sélectionne sur la page showZone.ejs et affichage à la manière de addNote.ejs
    let bz_id = req.params.id;
    let note_id = req.params.note_id;
    db.query("SELECT * FROM notes WHERE notes_id="+note_id, (err, data) => {
        if(err){
            console.log(new Date() + ' Echec de la recherche de la note '+note_id+ ' de la zone '+bz_id+' pour la modifier '+err);
        } else {
            console.log(new Date() + ' Succès de la recherche de la note '+note_id+ ' de la zone '+bz_id+ ' pour la modifier');

            let note = new Note(data[0].notes_id, data[0].notes_description, data[0].bz_id);

            res.render('addNote.ejs', {note: note});
        }
    })
};

// Fait avec votre code pour utiliser un peu de ce que vous avez fait quand même :) 
exports.deleteNote = function(req,res) { // Suppression de la note sélectionnée depuis la page ShowZone.ejs
    let sql = "DELETE FROM `notes` WHERE `notes`.`notes_id` = ?";
    db.query( sql , [req.params.note_id], (err, resultSQL) => {
        if(err) {
            console.log(new Date() + ' Echec de la suppression de la note '+note_id+err);
        } else{
            console.log(new Date() + ' Succès de la suprression de  la note '+note_id);
            res.redirect('/');
        }
    })
};

exports.deleteAll = function(req,res) { // Suppression de toutes les notes depuis la page Landing.ejs
    db.query("DELETE FROM notes", (err,data) => {
        if(err) {
            console.log(new Date() + ' Echec de la suppression de toutes les notes '+err);
        } else{
            console.log(new Date() + ' Succès de la suprression de toutes les notes ');
            res.redirect('/');
        }
    })
};