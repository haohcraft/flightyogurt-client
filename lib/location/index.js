/*===================================================
=            For Location Suggestion API            =
===================================================*/

"use strict";

var ItaLocationSuggestion = require('./lib/ita-locationsuggestion.js');
var HipmunkLocationSuggestion = require('./lib/hipmunk-locationsuggestion.js');

var LocationSuggestion = function () {
	// this.itaLocationSuggestion = new ItaLocationSuggestion();
	this.hipmunkLocationSuggestion = new HipmunkLocationSuggestion();
};

/*==========  Public Methods  ==========*/
/**
 * Get the location suggestion by the query
 * @param  {[type]}   query    like `boston`, `bos`
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
LocationSuggestion.prototype.getLocationSuggestion = function (query, callback) {
	// this.itaLocationSuggestion.searchByQueryForLocationSuggestion(query, callback);
	// console.log("query", query);
	this.hipmunkLocationSuggestion.searchByQueryForLocationSuggestion(query, callback);
}

module.exports = LocationSuggestion;


/*-----  End of For Location Suggestion API  ------*/

