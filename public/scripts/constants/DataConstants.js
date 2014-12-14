/**
 * Holding constants
 */

var keyMirror = require('react/lib/keyMirror');

module.exports = {

	SearchDataTypes: keyMirror({
		FROM: null, 
		TO: null,
		DATE_DEPARTURE: null,
		DATE_RETURN: null,
		RT: null,  /* Whether or not it is a round trip*/
		CALENDAR: null
	})
};