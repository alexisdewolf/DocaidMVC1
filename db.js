//Route & connexion db
const mysql = require('mysql'); // Est-ce ici ou index ?
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'docaid'
});

db.connect((err)=>{
	if(!err){
        console.log(new Date() + ' Connexion à la base de données réusssie ');
	}else{
        console.log(new Date() + ' Connexion à la base de données échouée \n Erreur : ' + JSON.stringify(err, undefined,2)); //No idea de ce que JSON fait mais bon :D 
	}
})

module.exports = db;