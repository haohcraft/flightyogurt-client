/**
 * Basic model for the db
 */

var db = require('../../index.js');

var Model =function(collection){
	return db.collection(collection);
};

module.exports = Model;