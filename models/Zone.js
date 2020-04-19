let db = require('../db');
let Note = require('./Note');

class Zone {
	id = -1;
	name = "";
	notes = [];

    constructor(id, name)
    {
		this.id = id;
		this.name = name;
	}
};

module.exports = Zone;