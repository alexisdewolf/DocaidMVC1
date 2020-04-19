let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let db = require('./db.js');

let router = require('./routes');
app.use('/', router);

var port = 8080
app.listen(port, function () { console.log('Running server on port ' + port); })

