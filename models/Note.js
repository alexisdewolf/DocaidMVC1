let db = require('../db');
let Zone = require('./Zone');

class Note {
    id = -1;
    description = "";
    bz_id = -1;
    zone = [];

    constructor(id, description, bz_id)
    {
        this.id = id;
        this.description = description;
        this.bz_id = bz_id;
    }
};

module.exports = Note;