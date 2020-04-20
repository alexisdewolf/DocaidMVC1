let Zone = require('../models/Zone');
let Note = require('../models/Note');
let db = require('../db');


exports.menu_ctrl = function (req, res) { // Sélection de toutes les zones et toutes les notes pour afficher sur landing.ejs
    // Ici on va sélectionner toutes les zones pour afficher des liens sur la landing page.
        db.query("SELECT * FROM body_zone ORDER BY bz_id", (err, data) => {
            if(err){
                console.log(new Date() + ' Echec de la recherche de la liste des Body Zone : '+err);
                res.status(400).send(err);
            } else {
                console.log(new Date() + ' Succes de la recherche de la liste des Body Zone ');
                
                let menu = [];
                data.forEach(elem => {
                    let zone = new Zone(elem.bz_id, elem.bz_name);
                    menu.push(zone);
                });
                res.render('header.ejs', {menu: menu});
                console.log("test");
            }
        })
	};