let Zone = require('../models/Zone');
let Note = require('../models/Note');
let Discipline = require('../models/Discipline')
let db = require('../db');

exports.landing = function (req, res) { // Sélection de toutes les zones et toutes les notes pour afficher sur landing.ejs
// Ici on va sélectionner toutes les zones pour afficher des liens sur la landing page.
    db.query("SELECT * FROM body_zone ORDER BY bz_id", (err, data) => {
		if(err){
			console.log(new Date() + ' Echec de la recherche de la liste des Body Zone : '+err);
            res.status(400).json ({'message' : 'error'}.send(err));
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
                    res.status(400).json ({'message' : 'error'}.send(err));
                } else {
                    console.log(new Date() + ' Succes de la recherche de la liste des notes ');
                    
                    let all_notes = [];
        
                    data.forEach(elem => {
                        let note = new Note(elem.notes_id, elem.notes_description, elem.bz_id);
                        all_notes.push(note);
                    });
                
                    res.status(200).json({all_zones: all_zones, all_notes: all_notes});
                }
            })		
        }
	})
};

exports.showZone = function(req, res) { // Sélection des notes de la zone correspondante pour afficher sur showZone.ejs
    let bz_id = req.params.id;
        db.query("SELECT * FROM body_zone ORDER BY bz_id", (err, data) => {
		if(err){
			console.log(new Date() + ' Echec de la recherche de la liste des Body Zone : '+err);
            res.status(400).json ({'message' : 'error'}.send(err));
		} else {
            console.log(new Date() + ' Succes de la recherche de la liste des Body Zone ');
            let all_zones = [];
            data.forEach(elem => {
                let zone = new Zone(elem.bz_id, elem.bz_name);
                all_zones.push(zone);})

            // Ici on va sélectionner la Body Zone sélectionnée. On fait ceci pour pouvoir définir le modèle Zone qui nous permettra de l'afficher dans la vue
            db.query("SELECT * FROM body_zone WHERE bz_id="+bz_id, (err, data) => {
            if(err){
                console.log(new Date() + ' Echec de la recherche de la Body Zone '+bz_id+err);
                res.status(400).json ({'message ' : 'error'}.send(err));
		    } else {
                console.log(new Date() + ' Succès de la recherche de la Body Zone '+bz_id);
                let zone = new Zone(data[0].bz_id, data[0].bz_name);

                // Ici on va sélectionner les notes en rapport avec cette zone
                db.query("SELECT * FROM notes WHERE bz_id="+bz_id+" ORDER BY notes_id", (err, data) => {
                    if(err){
                        console.log(new Date() + ' Echec de la recherche des notes pour la Body Zone '+bz_id+err);
                        res.status(400).json ({'message ' : 'error'}.send(err));
                    } else {
                        console.log(new Date() + ' Succès de la recherche des notes pour la Body Zone '+bz_id);
                        res.status(200);
                        let notes = [];
                        data.forEach(element => {
                            let note = new Note(element.notes_id, element.notes_description, element.bz_id);
                            notes.push(note);
                        })
                        
                        //Ici on va sélectionner les disciplines où le Bz_id correspond à la page, afin d'aider à rediriger vers la bonne section
                        db.query("SELECT * FROM Discipline where bz_id ="+bz_id, (err, data) => {
                            if(err){
                                console.log(new Date() + ' Echec de la recherche de la liste des disciplines : '+err);
                                res.status(400).json ({'message error' : 'error'}.send(err));
                            } else {
                                console.log(new Date() + ' Succes de la recherche de la liste des disciplines ');
                            let all_disciplines = [];
                            data.forEach(elem => {
                                let disci = new Discipline (elem.id, elem.discipline_name, elem.bz_id);
                                all_disciplines.push(disci);})  
                                res.status(200).json({zone: zone, notes: notes, all_zones: all_zones, all_disciplines: all_disciplines});
                            }
                        })
                    }
                })
            }
        })
    }})
};

exports.notesNew =  function(req, res) { // On est en post : ajout de la note de addNotes dans la DB & modification de la note de modifyNote
    db.query("INSERT INTO notes (notes_description, bz_id) VALUES ('"+req.body.description+"', '"+req.body.bz_id+"')", function (err,data){
        if(err){
            console.log(new Date() + ' Echec de l\'insertion de la nouvelle note '+err);
            res.status(400).json ({'message ' : 'error'}.send(err));
        } else {
            console.log(new Date() + ' Succès de l\'insertion de la nouvelle note ');
            res.status(201).json({'message':'succes'});
        }
    })
};

exports.updateNote =  function(req, res) { // Modificiation d'une note via API
    db.query("UPDATE notes SET notes_description ='"+req.body.description+"'  WHERE notes_id = "+req.params.id, function (err, data){
        if(err){
            res.status(400).json ({'message ' : 'error'}.send(err));
            console.log(new Date() + ' Echec de l\'actualisation de la note '+err);
        }else {
            console.log(new Date() + ' Succès de l\'actualisation de la note ');
            res.status(202).json({'message':'succes'});
        }
    })
};

exports.deleteNote = function(req,res) { // Suppression de la note sélectionnée depuis la page ShowZone.ejs
    db.query("DELETE FROM notes where notes_id="+req.params.id, (err,data) => {
        if(err) {
            console.log(new Date() + ' Echec de la suppression de la note '+req.params.id+err);
            res.status(400).json ({'message ' : 'error'}.send(err));
        } else{
            console.log(new Date() + ' Succès de la supression de  la note '+req.params.id);
            res.status(200).json({'message':'succes'});
        }
    })
};

exports.deleteAll = function(req,res) { // Suppression de toutes les notes depuis la page Landing.ejs
    db.query("DELETE FROM notes", (err,data) => {
        if(err) {
            res.status(400).json ({'message ' : 'error'}.send(err));
            console.log(new Date() + ' Echec de la suppression de toutes les notes '+err);
        } else{
            console.log(new Date() + ' Succès de la suprression de toutes les notes ');
            res.status(202).json({'message':'succes'});
        }
    })
};