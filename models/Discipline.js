let db = require('../db');
let Zone = require('./Zone');

class Discipline {
    id = -1;
    description = "";
    bz_id = -1;

    constructor(id, description, bz_id)
    {
        this.id = id;
        this.description = description;
        this.bz_id = bz_id;
    }
};

module.exports = Discipline;